# Use Node.js v23.7.0
FROM node:23.7.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app
COPY . .

# Set environment variables
ENV MONGO_URI=mongodb://mongo:27017/twitter-clone
ENV PORT=5000

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
