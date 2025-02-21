provider "aws" {
  region = "us-east-1"
}

# Variables
variable "AWS_ACCOUNT_ID" {
  type = string
  description = "Your AWS Account ID"
}

variable "APP_NAME" {
  type = string
  default = "snap-tweet"
  description = "Name of the application"
}

variable "REGION" {
  type = string
  default = "us-east-1"
  description = "AWS region"
}

# EC2 Instance
resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"  # Use a compatible Ubuntu AMI
  instance_type = "t3.medium"
  key_name      = "your-key-name"

  security_groups = [aws_security_group.app_sg.name]

user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install -y docker.io docker-compose awscli git

              systemctl start docker
              systemctl enable docker

              # Clone the GitHub repository
              cd /home/ubuntu
              git clone https://github.com/SnapTweet/snap-tweet.git snap-tweet

              # Login to AWS ECR
              aws ecr get-login-password --region ${var.REGION} | docker login --username AWS --password-stdin ${var.AWS_ACCOUNT_ID}.dkr.ecr.${var.REGION}.amazonaws.com

              # Pull the latest Docker images from ECR
              docker pull ${var.AWS_ACCOUNT_ID}.dkr.ecr.${var.REGION}.amazonaws.com/${var.APP_NAME}-frontend:latest
              docker pull ${var.AWS_ACCOUNT_ID}.dkr.ecr.${var.REGION}.amazonaws.com/${var.APP_NAME}-backend:latest

              # Run Docker Compose
              cd /home/ubuntu/snap-tweet
              docker-compose -f docker-compose.yml up -d
              EOF


  tags = {
    Name = "SnapTweetAppServer"
  }
}

# Security Group
resource "aws_security_group" "app_sg" {
  name        = "app-security-group"
  description = "Allow inbound traffic for the app"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
