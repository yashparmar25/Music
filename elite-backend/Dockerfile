# elite-backend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose backend port (update if it's different)
EXPOSE 5000

CMD ["node", "index.js"]
