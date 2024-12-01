# from rest_framework import serializers
# import re

# class OTPRequestSerializer(serializers.Serializer):
#     # Either email or phone number can be used
#     email = serializers.EmailField(required=False)
#     phone_number = serializers.CharField(max_length=15, required=False)

#     def validate(self, data):
#         email = data.get('email')
#         phone_number = data.get('phone_number')

#         # Ensure that either email or phone number is provided
#         if not email and not phone_number:
#             raise serializers.ValidationError("Either email or phone number is required.")

#         # Validate phone number if provided
#         if phone_number:
#             if not re.match(r'^\+?1?\d{9,15}$', phone_number):  # basic international phone number validation
#                 raise serializers.ValidationError("Enter a valid phone number (e.g., +123456789).")
        
#         return data
