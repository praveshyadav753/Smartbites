from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=200)  # Removed unique constraint for name
    barcode = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(max_length=1024, blank=True, null=True)
    rating= models.DecimalField(max_digits=3,decimal_places=1,default=1 )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Nutrition(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='nutrition')
    
    # Serving Information
    serving_size = models.CharField(max_length=50, blank=True, null=True)

    # Macronutrients
    calories = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    calories_from_fat = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    total_fat = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    saturated_fat = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    trans_fat = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    polyunsaturated_fat = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    monounsaturated_fat = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    cholesterol = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    sodium = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    potassium = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    total_carbohydrates = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    dietary_fiber = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    sugars = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    added_sugars = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    sugar_alcohol = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    protein = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)

    # Vitamins and Minerals
    vitamin_a = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    vitamin_c = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    calcium = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    iron = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    vitamin_d = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    vitamin_e = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    vitamin_k = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    thiamin = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    riboflavin = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    niacin = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    vitamin_b6 = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    folate = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    vitamin_b12 = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    biotin = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    pantothenic_acid = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    phosphorus = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    iodine = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    magnesium = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    zinc = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    selenium = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    copper = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    manganese = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    chromium = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    molybdenum = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    chloride = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)

    salt = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)

    # Daily Value Percentage for RDA (Recommended Daily Allowance)
    rda_percentage = models.DecimalField(max_digits=5, decimal_places=4, blank=True, null=True)

    def __str__(self):
        return f"Nutrition for {self.product.name}"


class Ingredient(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ingredients')
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField()  # Lower numbers indicate higher quantities

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} in {self.product.name} (Order: {self.order})"
