FROM node:16

RUN mkdir -p /usr/src/app/client

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]