FROM node:20-alpine

WORKDIR /app

COPY package.json /app

COPY bun.lockb /app

RUN npm install --global bun

COPY . .

RUN bun run build

EXPOSE 8080

ENV ADDRESS=0.0.0.0 PORT=8080

CMD ["bun", "run", "preview"]