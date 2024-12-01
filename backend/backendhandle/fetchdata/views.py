from django.http import JsonResponse
import requests

def fetch_openfoodfact_response(request, barcode):
    api_url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    response = requests.get(api_url)
    
    if response.status_code == 200:
        data = response.json()
        return JsonResponse({
            "status": "success",
            "message": "Product data fetched successfully!",
            "data": data
        })
    else:
        return JsonResponse({
            "status": "error",
            "message": f"Failed to fetch data. Status code: {response.status_code}",
            "data": response.text
        }, status=400)
