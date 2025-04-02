# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install --production

# Copy the rest of the application code
COPY . .

# Build the Vite project
RUN bun run build

# Expose port 8080
EXPOSE 8080

# Start the production server
CMD ["bun", "run", "preview"]