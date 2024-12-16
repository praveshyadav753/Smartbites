# Use Python 3.13 base image
FROM python:3.13-slim

# Install system dependencies (required for cryptography and other packages)
RUN apt-get update && apt-get install -y \
    build-essential python3-dev rustc libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only the requirements file first to leverage Docker cache
COPY requirements.txt .

# Create a virtual environment and install dependencies
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app/

# Set the virtual environment's bin directory as the PATH
ENV PATH="/opt/venv/bin:$PATH"

# Expose the port your app runs on (adjust if needed)
EXPOSE 8000

# Run the application (adjust this if necessary for your project)
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]
