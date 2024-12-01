from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User  
from dbs.models import Product

class RecentlyViewed(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to User model
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Link to Product model
    viewed_at = models.DateTimeField(auto_now=True)  # Automatically update timestamp when saved

    class Meta:
        ordering = ['-viewed_at']  # Order by the most recently viewed item
        unique_together = ('user', 'product')  # Prevent duplicates

    def __str__(self):
        return f"{self.user.username} viewed {self.product.name}"
