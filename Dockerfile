FROM node:19

LABEL maintainer="ixiLod"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start", "index.js"]