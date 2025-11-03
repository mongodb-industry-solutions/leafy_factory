FROM node:18-alpine

WORKDIR /app

# Copy package.json from frontend/src directory
COPY frontend/src/package.json ./

# Install dependencies with legacy peer deps
RUN npm install --only=production --legacy-peer-deps

# Copy source code from frontend/src directory  
COPY frontend/src/ .

# Build the application
RUN npm run build

# Expose port 8080 for Kanopy
EXPOSE 8080

# Start the application on port 8080 (not default 3000)
# Set PORT environment variable for custom server
ENV PORT=8080
CMD ["npm", "start"]
