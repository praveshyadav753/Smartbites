from django.db import models

class Ingredient(models.Model):
    RISK_LEVEL_CHOICES = [
        (0, 'Low Risk'),
        (1, 'Moderate Risk'),
        (2, 'High Risk'),
        (3, 'Very High Risk'),
        (4, 'Safe in Moderation'),
    ]
    
    name = models.CharField(max_length=255, unique=True)  # Name of the ingredient
    risk_level = models.IntegerField(choices=RISK_LEVEL_CHOICES)  # Risk level (0-4)
    health_effects = models.TextField()  # Health effects description
    def __str__(self):
        return self.name

