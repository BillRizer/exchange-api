FROM node:20.11-slim as builder

RUN apt-get update
RUN apt-get install -y curl bash git

COPY package*.json ./

RUN npm install --production
RUN npm ci --only=production

FROM node:20.11-slim

WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

ENV NODE_ENV=production

COPY . .

RUN npm install typescript -g
RUN npm run build

CMD ["npm", "start"]

EXPOSE 8080
