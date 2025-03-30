#!/bin/bash

# Ensure the necessary Docker images are built and containers are started

# Step 1: Build and start backend Docker container
echo "Building and starting backend container..."
cd /home/ec2-user/snaptweet/backend
sudo docker build -t snaptweet-backend .
sudo docker run -d -p 5000:5000 snaptweet-backend

# Step 2: Build and start frontend Docker container
echo "Building and starting frontend container..."
cd /home/ec2-user/snaptweet/frontend
sudo docker build -t snaptweet-frontend .
sudo docker run -d -p 3000:3000 snaptweet-frontend

echo "Containers started successfully."
