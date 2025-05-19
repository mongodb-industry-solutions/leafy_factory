# Stage 1: Build the application
FROM node:23 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY src/package*.json ./

# Install dependencies (you mentioned using --legacy-peer-deps)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev", "--prefix", "/app/src"]
