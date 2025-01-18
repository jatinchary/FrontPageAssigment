# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install && npm install --save-dev @types/ws

# Copy the rest of the application code
COPY . .

# Expose API and WebSocket ports
EXPOSE 3000 8080

# Start the application
CMD ["npx", "ts-node", "src/index.ts"]
