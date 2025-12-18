from django.core.management.base import BaseCommand
from django.db import transaction
from django.conf import settings
import pymongo
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data using the Django ORM (ensures FK integrity)'

    def handle(self, *args, **options):
        # Drop raw collections first to remove any incompatible pymongo-inserted documents
        client = pymongo.MongoClient('mongodb://localhost:27017')
        dbname = settings.DATABASES['default'].get('NAME', 'octofit_db')
        db = client[dbname]
        for coll in ['octofit_tracker_leaderboard', 'octofit_tracker_workout', 'octofit_tracker_activity', 'octofit_tracker_user', 'octofit_tracker_team']:
            if coll in db.list_collection_names():
                db[coll].drop()

        with transaction.atomic():
            # Clear any ORM-managed records (safe now that raw collections are dropped)
            Leaderboard.objects.all().delete()
            Workout.objects.all().delete()
            Activity.objects.all().delete()
            User.objects.all().delete()
            Team.objects.all().delete()

            # Create teams
            marvel = Team.objects.create(name='Marvel')
            dc = Team.objects.create(name='DC')

            # Create users
            users = [
                User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel),
                User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel),
                User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc),
                User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc),
            ]

            # Activities
            activities = []
            for u in users:
                activities.append(Activity(user=u, type='run', duration=30))
                activities.append(Activity(user=u, type='cycle', duration=45))
            Activity.objects.bulk_create(activities)

            # Workouts
            workouts = [Workout(user=u, description='Pushups', reps=20) for u in users]
            Workout.objects.bulk_create(workouts)

            # Leaderboard
            Leaderboard.objects.create(team=marvel, points=100)
            Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('Populated octofit_db with test data (Django ORM).'))
