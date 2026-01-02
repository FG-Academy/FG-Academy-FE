# Dockerfile.prod
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Enable corepack for pnpm support
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the entire project to the working directory
COPY . .

ARG NEXT_PUBLIC_IMAGE_URL
ARG NEXT_PUBLIC_API_URL
ARG AUTH_TRUST_HOST
ARG AUTH_SECRET

# Build the Next.js application for production
RUN pnpm build

# Set the environment variable to run the Next.js application in production mode
ENV NODE_ENV=production

# Expose the port that the application will run on
EXPOSE 3000

ENV NEXT_PUBLIC_IMAGE_URL=${NEXT_PUBLIC_IMAGE_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV AUTH_TRUST_HOST=${AUTH_TRUST_HOST}
ENV AUTH_SECRET=${AUTH_SECRET}

# Start the application
CMD ["pnpm", "start"]
