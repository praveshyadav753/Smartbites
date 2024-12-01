# Inside apps.py of your app
from django.apps import AppConfig

class YourAppNameConfig(AppConfig):
    name = 'userprofile'

    # def ready(self):
        # Import the signals module to ensure it's loaded
        # import userprofile.signals
