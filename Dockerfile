# Use an official Node.js runtime as a parent image
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application
COPY . .

# Build the Nuxt app for production
RUN npm run build

# Expose the port that Nuxt will run on
EXPOSE 3000

# Command to run the app in production mode
CMD ["npm", "run", "preview"]