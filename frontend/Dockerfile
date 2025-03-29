# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy rest of the project
COPY . .

# Expose frontend port
EXPOSE 3000

# Start Next.js in development mode for hot reload
CMD ["npm", "run", "dev"]