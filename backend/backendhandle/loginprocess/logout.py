# In your views.py, assuming you're using a blacklist mechanism for JWT tokens

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework_simplejwt.tokens import RefreshToken

# class LogoutView(APIView):
#     def post(self, request):
#         try:
#             # Get refresh token from the client and blacklist it
#             refresh_token = request.data.get("refresh_token")
#             token = RefreshToken(refresh_token)
#             token.blacklist()  # Blacklist the token so it can't be used anymore
#             return Response({"message": "Logged out successfully"}, status=200)
#         except Exception as e:
#             return Response({"error": str(e)}, status=400)
from django.http import JsonResponse
from django.views import View
from rest_framework_simplejwt.tokens import RefreshToken

class LogoutView(View):
     def post(self, request):
        # Log out logic
        
        response = JsonResponse({'message': 'Logged out successfully'})
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        print('Logged out successfully')
        return response
