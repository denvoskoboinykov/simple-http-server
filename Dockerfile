FROM node:12.16.1

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD node src/app.js

EXPOSE 8000