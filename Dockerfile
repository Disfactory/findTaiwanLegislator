FROM node:lts

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable
RUN corepack prepare pnpm@8.10.2 --activate
RUN pnpm install --frozen-lockfile

COPY . .
EXPOSE 8888
CMD [ "node", "index.js" ]
