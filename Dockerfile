# 1. Base Image
FROM node:18-alpine AS base

# 2. Dependencies Stage
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (using 'npm ci' for a clean install)
RUN npm ci

# 3. Builder Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
# Note: If you use environment variables during build, you might need to declare them here or in .env
RUN npm run build

# 4. Runner Stage (Production)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Create a system user for security (don't run as root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder (images, icons)
COPY --from=builder /app/public ./public

# Copy the standalone build output
# This was created because we added output: 'standalone' in next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the port
EXPOSE 3000
ENV PORT 3000

# Start the application
CMD ["node", "server.js"]