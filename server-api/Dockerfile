FROM node:20


WORKDIR /server-api
COPY package*.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]

