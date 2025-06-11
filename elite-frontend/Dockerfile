# Stage 1: Build the app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the static files using serve
FROM node:18

WORKDIR /app

# Install 'serve' to serve the build folder
RUN npm install -g serve

# Copy the built files from builder
COPY --from=builder /app/build ./build

EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
