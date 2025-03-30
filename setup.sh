#!/bin/bash

# Define the directory structure
directories=(
    "backend/controllers"
    "backend/models"
    "backend/routes"
    "backend/config"
    "frontend/components"
    "frontend/pages"
    "frontend/styles"
    "frontend/utils"
)

# Create directories
for dir in "${directories[@]}"; do
    mkdir -p "$dir"
done


# Output the structure
echo "Project structure created successfully:"
tree