FROM node:16

WORKDIR /web
COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]