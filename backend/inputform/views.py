from django.shortcuts import render, redirect
from .forms import ProductForm, NutritionForm, IngredientForm
from django.forms import modelformset_factory
from dbs.models import Product, Nutrition, Ingredient

def add_product_view(request):
    # Create a formset for ingredients
    IngredientFormSet = modelformset_factory(Ingredient, form=IngredientForm, extra=3)

    if request.method == 'POST':
        product_form = ProductForm(request.POST)
        nutrition_form = NutritionForm(request.POST)
        ingredient_formset = IngredientFormSet(request.POST)

        if product_form.is_valid() and nutrition_form.is_valid() and ingredient_formset.is_valid():
            product_data = product_form.cleaned_data

            # Fetch or create the product based on the barcode
            product, created = Product.objects.get_or_create(barcode=product_data['barcode'])

            # Update product fields only if new data is provided
            updated = False
            for field, value in product_data.items():
                if value != getattr(product, field, None):  # Only update if the value has changed
                    setattr(product, field, value)
                    updated = True

            # Handle the image URL update
            if 'image' in product_data and product_data['image']:
                product.image = product_data['image']  # Set the image URL
                updated = True

            if updated:  # Only save if there are changes
                product.save()

            # Handle Nutrition data (either create or update the record)
            nutrition_data = nutrition_form.cleaned_data
            nutrition, _ = Nutrition.objects.get_or_create(product=product)
            for field, value in nutrition_data.items():
                if value:  # Only update if the value is provided
                    setattr(nutrition, field, value)
            nutrition.save()

            # Handle Ingredient data (either create or update the record)
            for ingredient_form in ingredient_formset:
                if ingredient_form.cleaned_data:
                    ingredient_data = ingredient_form.cleaned_data
                    ingredient, _ = Ingredient.objects.get_or_create(
                        product=product,
                        name=ingredient_data['name']  # Match by product and ingredient name
                    )
                    for field, value in ingredient_data.items():
                        if value:  # Only update if the value is provided
                            setattr(ingredient, field, value)
                    ingredient.save()

            return redirect('inputform:success')  # Redirect to a success page

    else:
        product_form = ProductForm()
        nutrition_form = NutritionForm()
        ingredient_formset = IngredientFormSet(queryset=Ingredient.objects.none())

    return render(request, 'add_product.html', {
        'product_form': product_form,
        'nutrition_form': nutrition_form,
        'ingredient_formset': ingredient_formset,
    })
