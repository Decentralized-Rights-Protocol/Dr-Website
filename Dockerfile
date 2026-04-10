# Stage 1: Build the Next.js app
FROM node:18-slim AS builder
WORKDIR /app

# Install dependencies based on preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and other config files
COPY . .

# Environment variables for build time (if needed)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the app
RUN npm run build

# Stage 2: Run the Next.js app in standalone mode
FROM node:18-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files from builder
# Next.js standalone output includes everything needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]
