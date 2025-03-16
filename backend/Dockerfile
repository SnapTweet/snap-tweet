# Use Node.js LTS for stability
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Expose backend port
EXPOSE 5000

# Install nodemon globally (needed for hot reload)
RUN npm install -g nodemon

# Start Express server with nodemon for hot reload
CMD ["nodemon", "server.js"]