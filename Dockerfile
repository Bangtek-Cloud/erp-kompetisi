FROM node:20-alpine

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build --mode $NODE_ENV

EXPOSE 8080

CMD ["pnpm", "run", "preview"]
