# 1. Base image: Use lightweight Linux Alpine with Node.js 20 pre-installed
FROM node:20-alpine

# 2. Set working directory inside the container to /app
WORKDIR /app

# 3. Copy dependency definitions first (for Docker layer caching)
COPY package.json package-lock.json ./

# 4. Install all project dependencies inside the Linux environment
RUN npm install

# 5. Copy the remaining project source code
COPY . .

# 6. Build the production bundle (Vite client + Server bundle in dist/)
RUN npm run build

# 7. Document the port the container will listen on
EXPOSE 3001

# 8. Set default environment variables
ENV NODE_ENV=production
ENV PORT=3001

# 9. Specify the command to execute when the container starts
CMD ["npm", "start"]
