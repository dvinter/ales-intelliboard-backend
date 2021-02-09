# Node.js app Docker file

FROM node:14

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . /usr/src

RUN npm install

RUN npm run build

EXPOSE 3000

CMD npm run prod
