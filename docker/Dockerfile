FROM node:10-buster

RUN apt-get update -y

RUN apt-get install -y curl openjdk-11-jre-headless

RUN apt-get install -y nodejs

RUN npm install -g firebase-tools && mkdir app

COPY ./ ./app/.
