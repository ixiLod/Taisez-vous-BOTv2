FROM node:20-alpine

LABEL maintainer="ixiLod"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start", "index.js"]