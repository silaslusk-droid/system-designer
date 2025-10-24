# Design System Generator - Dockerfile
# This allows you to run the app using Docker Desktop without installing Node.js

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the development server
# --host 0.0.0.0 allows access from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
