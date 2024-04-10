FROM node:20-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build:prod
EXPOSE 9200
CMD [ "node", "dist/main.js" ]

