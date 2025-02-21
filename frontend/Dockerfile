# Use Node.js v23.7.0
FROM node:23.7.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire app
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "dev"]
