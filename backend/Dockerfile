FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM deps AS build
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && npx prisma db seed && node dist/index.js"
