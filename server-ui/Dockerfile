FROM node:20

WORKDIR /server-ui
COPY package*.json ./
COPY package-lock.json ./
COPY . .
RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
