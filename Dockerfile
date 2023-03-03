FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm i

COPY . .
EXPOSE 8888
CMD [ "node", "index.js" ]
