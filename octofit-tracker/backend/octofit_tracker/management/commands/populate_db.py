from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

# Example models for demonstration (should be replaced with actual models)
from octofit_tracker import models as app_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete all data
        app_models.User.objects.all().delete()
        app_models.Team.objects.all().delete()
        app_models.Activity.objects.all().delete()
        app_models.Leaderboard.objects.all().delete()
        app_models.Workout.objects.all().delete()

        # Create Teams
        marvel = app_models.Team.objects.create(name='Marvel')
        dc = app_models.Team.objects.create(name='DC')

        # Create Users (super heroes)
        users = [
            app_models.User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel),
            app_models.User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel),
            app_models.User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc),
            app_models.User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc),
        ]

        # Create Activities
        for user in users:
            app_models.Activity.objects.create(user=user, type='run', duration=30)
            app_models.Activity.objects.create(user=user, type='cycle', duration=45)

        # Create Workouts
        for user in users:
            app_models.Workout.objects.create(user=user, description='Pushups', reps=20)

        # Create Leaderboard
        app_models.Leaderboard.objects.create(team=marvel, points=100)
        app_models.Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
