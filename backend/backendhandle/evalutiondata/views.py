from django.shortcuts import render
from django.http import HttpResponse
from .models import Ingredient

def insert_ingredients(request):
    # List of ingredients with their associated data
    ingredients_data = [
        {"name": "Artificial Trans Fats", "risk_level": 1, "health_effects": "Heart disease, inflammation, cardiovascular issues"},
        {"name": "High Fructose Corn Syrup", "risk_level": 1, "health_effects": "Obesity, diabetes, metabolic disorders"},
        {"name": "Artificial Colors (e.g., Red 40, Yellow 5)", "risk_level": 2, "health_effects": "Hyperactivity in children, behavioral issues"},
        {"name": "Preservatives (e.g., BHA, BHT)", "risk_level": 2, "health_effects": "Carcinogenic risks, allergic reactions"},
        {"name": "Monosodium Glutamate (MSG)", "risk_level": 2, "health_effects": "Headaches, flushing, nausea in sensitive individuals"},
        {"name": "Sugars", "risk_level": 2, "health_effects": "Obesity, diabetes, dental issues"},
        {"name": "Bisphenol A (BPA)", "risk_level": 1, "health_effects": "Hormone disruption, reproductive issues"},
        {"name": "Titanium Dioxide", "risk_level": 1, "health_effects": "Carcinogenic risks, respiratory issues"},
        {"name": "Propylparaben", "risk_level": 1, "health_effects": "Endocrine disruption, reproductive issues"},
        {"name": "Sodium (Salt)", "risk_level": 2, "health_effects": "High blood pressure, heart disease, stroke"},
        {"name": "Algal Toxins", "risk_level": 1, "health_effects": "Diarrhea, vomiting, paralysis"},
        {"name": "Ciguatera Toxins", "risk_level": 1, "health_effects": "Nausea, vomiting, neurological symptoms"},
        {"name": "Aflatoxins", "risk_level": 1, "health_effects": "Liver damage, cancer"},
        {"name": "Ochratoxin A", "risk_level": 1, "health_effects": "Kidney damage, cancer"},
        {"name": "Lead", "risk_level": 1, "health_effects": "Neurological damage, developmental issues"},
        {"name": "Mercury", "risk_level": 1, "health_effects": "Neurological and developmental issues"},
        {"name": "Pesticides", "risk_level": 1, "health_effects": "Harmful residues, health risks"},
        {"name": "Acrylamide", "risk_level": 1, "health_effects": "Carcinogenic risks"},
        {"name": "Formaldehyde", "risk_level": 1, "health_effects": "Carcinogenic risks"},
        {"name": "Phthalates", "risk_level": 1, "health_effects": "Hormone disruption"},
        {"name": "Sodium Nitrate", "risk_level": 2, "health_effects": "Carcinogenic risks"},
        {"name": "Sulfites", "risk_level": 2, "health_effects": "Allergic reactions, respiratory issues"},
        {"name": "Azodicarbonamide", "risk_level": 2, "health_effects": "Respiratory issues"},
        {"name": "Potassium Bromate", "risk_level": 1, "health_effects": "Carcinogenic risks"},
        {"name": "Propylene Glycol", "risk_level": 2, "health_effects": "Skin and eye irritation"},
        {"name": "Butylated Hydroxyanisole (BHA)", "risk_level": 1, "health_effects": "Potential carcinogen"},
        {"name": "Butylated Hydroxytoluene (BHT)", "risk_level": 1, "health_effects": "Potential carcinogen, nervous system effects"},
        {"name": "Sodium Benzoate", "risk_level": 2, "health_effects": "Carcinogenic risks with vitamin C, allergic reactions"},
        {"name": "Sorbic Acid", "risk_level": 2, "health_effects": "Allergic reactions"},
        {"name": "Propyl Gallate", "risk_level": 2, "health_effects": "Carcinogenic risks"},
        {"name": "Aspartame", "risk_level": 2, "health_effects": "Headaches, dizziness, potential carcinogen"},
        {"name": "Sucralose", "risk_level": 2, "health_effects": "Gut bacteria impact"},
        {"name": "Saccharin", "risk_level": 2, "health_effects": "Potential carcinogen in high doses"},
        {"name": "Acesulfame Potassium", "risk_level": 2, "health_effects": "Carcinogenic risks, metabolism effects"},
        {"name": "Monoglycerides", "risk_level": 2, "health_effects": "Contains trans fats"},
        {"name": "Diglycerides", "risk_level": 2, "health_effects": "Contains trans fats"},
        {"name": "Polysorbates", "risk_level": 2, "health_effects": "Gut health impact"},
        {"name": "Carrageenan", "risk_level": 2, "health_effects": "Digestive issues, inflammation"},
        {"name": "Xanthan Gum", "risk_level": 3, "health_effects": "Digestive issues in large amounts"},
        {"name": "Guar Gum", "risk_level": 3, "health_effects": "Digestive issues in large amounts"},
        {"name": "Cellulose Gum", "risk_level": 3, "health_effects": "Digestive issues in large amounts"},
        {"name": "Soy Lecithin", "risk_level": 2, "health_effects": "Allergic reactions"},
        {"name": "Caramel Color", "risk_level": 2, "health_effects": "Carcinogenic risks"},
        {"name": "Potassium Sorbate", "risk_level": 2, "health_effects": "Allergic reactions, respiratory issues"},
        {"name": "Calcium Propionate", "risk_level": 2, "health_effects": "Digestive issues, allergic reactions"},
        {"name": "Sodium Propionate", "risk_level": 2, "health_effects": "Digestive issues, allergic reactions"},
        {"name": "Sodium Stearoyl Lactylate", "risk_level": 2, "health_effects": "Digestive issues"},
        {"name": "Calcium Stearoyl Lactylate", "risk_level": 2, "health_effects": "Digestive issues"},
        {"name": "Soy Protein Isolate", "risk_level": 2, "health_effects": "Allergic reactions, phytoestrogens"},
        {"name": "Whey Protein Isolate", "risk_level": 2, "health_effects": "Allergic reactions"},
        {"name": "Modified Food Starch", "risk_level": 2, "health_effects": "Digestive issues"},
        {"name": "Vegetable Gum", "risk_level": 3, "health_effects": "Digestive issues in large amounts"},
        {"name": "Vegetable Protein", "risk_level": 3, "health_effects": "Digestive issues in large amounts"},
        {"name": "Maltodextrin", "risk_level": 2, "health_effects": "Blood sugar impact"},
        {"name": "Dextrose", "risk_level": 2, "health_effects": "Blood sugar impact"},
        {"name": "Mannitol", "risk_level": 2, "health_effects": "Sugar alcohol effects"},
        {"name": "Palm Oil", "risk_level": 4, "health_effects": "Excessive intake linked to heart disease"},
        {"name": "Corn Starch", "risk_level": 4, "health_effects": "Digestive issues in large amounts"},
        {"name": "Table Salt", "risk_level": 4, "health_effects": "High intake linked to high blood pressure"},
    ]
    
    # Create Ingredient objects from ingredients_data
    ingredients_objects = [
        Ingredient(
            name=ingredient['name'],
            risk_level=ingredient['risk_level'],
            health_effects=ingredient['health_effects']
        ) for ingredient in ingredients_data
    ]
    
    # Perform a bulk insert to add all ingredients at once
    Ingredient.objects.bulk_create(ingredients_objects)

    return HttpResponse("Ingredients data inserted successfully.")
