FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

ENV VITE_APP_BACKEND_HOST=https://note-rest-api-5e74ajfmaa-ew.a.run.app/api/v1/
ENV VITE_NODE_ENV=test

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]