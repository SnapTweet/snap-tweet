#!/bin/bash
# Build and start backend Docker container
cd /home/ec2-user/snaptweet/backend
sudo docker build -t snaptweet-backend .
sudo docker run -d -p 5000:5000 snaptweet-backend

# Build and start frontend Docker container
cd /home/ec2-user/snaptweet/frontend
sudo docker build -t snaptweet-frontend .
sudo docker run -d -p 3000:3000 snaptweet-frontend