FROM registry.access.redhat.com/ubi8/nodejs-16:latest as build

ARG BUILD_ENV

# Install app dependencies
USER 0
RUN dnf -y update && dnf -y install git
USER 1001

COPY package.json ./package.json
COPY ckeditor5 ./ckeditor5

# Install dependencies
RUN npm install --force --silent

RUN npm install pdfjs-dist@2.6.347 --silent

# Copy the app
COPY public ./public
COPY src ./src
COPY .env.${BUILD_ENV} ./.env.${BUILD_ENV}
COPY .build.sh ./.build.sh

CMD ["sh", "./.build.sh"]
