from django.test import TestCase
from .models import Team, User, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(email='test@example.com', name='Test User', team=self.team)
        self.activity = Activity.objects.create(user=self.user, type='run', duration=30)
        self.workout = Workout.objects.create(user=self.user, description='Pushups', reps=20)
        self.leaderboard = Leaderboard.objects.create(team=self.team, points=100)

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Test Team')

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Test User')

    def test_activity_str(self):
        self.assertIn('Test User', str(self.activity))

    def test_workout_str(self):
        self.assertIn('Test User', str(self.workout))

    def test_leaderboard_str(self):
        self.assertIn('Test Team', str(self.leaderboard))
