# Use an official Node image based on Alpine
FROM node:current-alpine

ARG ENV_FILE

# Install necessary dependencies and tools
RUN apk add --no-cache git

# Set the working directory
WORKDIR /opt/doublequotes

# Copy the environment file
COPY $ENV_FILE /tmp/.env.backend

# Expose the application port
EXPOSE 3000

# Start MongoDB and the Node.js server
CMD ["sh", "-c", "git clone https://github.com/Yet-Zio/doublequotes.git . && cd backend && mv /tmp/.env.backend ./config/.env.backend && npm i && npm run dev"]