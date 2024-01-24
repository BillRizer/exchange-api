FROM node:20.5.0-slim

WORKDIR /app 

COPY package.json /app 

COPY yarn.lock /app

RUN yarn install 

COPY . /app 

CMD yarn migration:run && yarn dev 

EXPOSE 3000