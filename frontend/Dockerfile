# FROM node:18-alpine AS base

# FROM base AS deps

# RUN apk add --no-cache libc6-compat

# WORKDIR /app

# COPY package.json package.lock.json ./
# RUN npm ci

# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# FROM baseImage AS runner
# WORKDIR /app
# ENV NODE_ENV production

# RUN addgroup --system -gid 1001 nodejs
# RUN adduser --system -uid 1001 nextjs

# COPY --from=builder /app/public ./public

# RUN mkdir .next

# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT=3000

# CMD HOSTNAME="0.0.0.0" nod server.js

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Expose Next.js default dev port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
