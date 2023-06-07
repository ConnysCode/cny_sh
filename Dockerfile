FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /docker/next

COPY package.json package-lock.json ./
COPY .env .env ./
COPY .env.production .env.production ./
RUN  npm install --production

FROM node:18-alpine AS builder
WORKDIR /docker/next
COPY --from=deps /docker/next/node_modules ./node_modules
COPY --from=deps /docker/next/.env ./.env
COPY --from=deps /docker/next/.env.production ./.env.production

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /docker/next

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /docker/next/.next ./.next
COPY --from=builder /docker/next/node_modules ./node_modules
COPY --from=builder /docker/next/package.json ./package.json
COPY --from=builder /docker/next/.env ./.env
COPY --from=builder /docker/next/.env.production ./.env.production

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start:next"]
