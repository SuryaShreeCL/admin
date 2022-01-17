FROM node:lts-alpine as build

# "app" will be the current working directory
WORKDIR /app
ARG BUILD_ENV

# Install app dependencies
RUN apk add git -q

COPY package.json /app/package.json
COPY ckeditor5 /app/ckeditor5

# Install dependencies
RUN npm install --force --silent

RUN npm install pdfjs-dist@2.6.347 --silent

# Copy the app
COPY public /app/public
COPY src /app/src
COPY .env.${BUILD_ENV} /app/.env.${BUILD_ENV}
COPY .build.sh /app/.build.sh

CMD ["sh", "./.build.sh"]