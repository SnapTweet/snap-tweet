# Use Node.js LTS for stability
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install ts-node globally
RUN npm install -g ts-node

# Copy rest of the project
COPY . .

# Build TypeScript
RUN npm run build

# Expose backend port
EXPOSE 5000

# Start Express server
CMD ["npm", "start"]