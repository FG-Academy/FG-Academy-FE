# Dockerfile
FROM node:20.4.0-alpine3.18
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Next.js application for production
RUN npm run build
# Set the environment variable to run the Next.js application in production mode
ENV NODE_ENV production
ENV PORT 80
ENV AUTH_SECRET YzQc0Xv71rFTPAFixXHsPSo57XVdXa9osnatKRtf+/c=
# ENV NEXT_PUBLIC_BASE_URL http://43.202.237.172:3000
# ENV NEXT_PUBLIC_BASE_URL http://43.202.237.172:3000
ENV NEXT_PUBLIC_BASE_URL=http://43.202.237.172:3000
ENV NEXT_PUBLIC_API_URL=http://43.202.237.172:3000
ENV NEXT_PUBLIC_BASE_HOST=http://43.202.237.172:80
ENV NEXTAUTH_URL=http://43.202.237.172:80
# Expose the port that the application will run on
EXPOSE 80

# Start the application
CMD ["npm", "start"]