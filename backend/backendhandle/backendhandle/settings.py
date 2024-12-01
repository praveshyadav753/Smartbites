from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
STATICFILES_DIRS = [
    BASE_DIR / "frontend" / "dist" / "assets",
]

# Quick-start development settings - unsuitable for production
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-5j+j%_^t)p(8(as945of@cut!rjimt=_g1@920_tqhvn5!zfmt'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'coderzombie58@gmail.com'
EMAIL_HOST_PASSWORD = 'euwx dbez fdli zcvq'
DEFAULT_FROM_EMAIL = 'SmartBites <coderzombie58@gmail.com>'

# Twilio settings
TWILIO_ACCOUNT_SID = 'AC30a56d39cccd89cc65b7b2ebc5495312'
TWILIO_AUTH_TOKEN = '440385ee294d95bc3ccd8ad6c7868440'
TWILIO_PHONE_NUMBER = '+1801 784 4950'




REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'loginprocess.authentication.JWTAuthentication',  # Custom JWT authentication
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',  # Ensure only authenticated users can access views
    ),
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'loginprocess',
    'dbs',
    'evalutiondata',
    'info_response',
    'userprofile',
    'recentlyview',
    'corsheaders',
    'django_otp',
    'social_django',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django_otp.middleware.OTPMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS settings - updated for cookies
# OLD: CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
CORS_ALLOW_CREDENTIALS = True  # Allow cookies to be included in CORS requests

# Session settings
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_AGE = 1209600  # 2 weeks (in seconds)
# NEW: Set cookies to be secure if in a production environment (commented for development)
# SESSION_COOKIE_SECURE = True  # Uncomment for production with HTTPS
# CSRF_COOKIE_SECURE = True  # Uncomment for production with HTTPS

ROOT_URLCONF = 'backendhandle.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backendhandle.wsgi.application'

# JWT settings - moved from the original location to include cookie considerations
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=400),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=10),
    'ROTATE_REFRESH_TOKENS': True,  # Optional: Automatically issue a new refresh token when used
    'BLACKLIST_AFTER_ROTATION': True,  # Optional: Blacklist old refresh tokens
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    # Include custom settings for token handling with cookies if needed
    'AUTH_COOKIE': 'access_token',  # Custom cookie name for access token
    'AUTH_COOKIE_HTTP_ONLY': True,  # Prevent JavaScript access to cookies
    'AUTH_COOKIE_SECURE': False,  # Set to True in production with HTTPS
    'AUTH_COOKIE_SAMESITE': 'Lax',
}

CSRF_COOKIE_NAME = "csrftoken"  # This should match the name used in your frontend code
CSRF_COOKIE_HTTPONLY = False 

# Database setup remains unchanged
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation remains unchanged
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Authentication backends
AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',  # Google authentication backend
    'django.contrib.auth.backends.ModelBackend',
)

# Internationalization remains unchanged
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files remain unchanged
STATIC_URL = 'static/'

# Default primary key field type remains unchanged
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# External API keys remain unchanged
NUTRITIONIX_API_KEY = '754add0100e66eef524a38f1fdcaa033'
NUTRITIONIX_APP_ID = '9ec0faa0'
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  # Add your frontend URL here
    # Add any other trusted origins you have
]