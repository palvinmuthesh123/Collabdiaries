# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --omit=dev

# Copy the rest of the application source code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start:prod"]