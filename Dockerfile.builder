FROM registry.access.redhat.com/ubi8/nodejs-16:latest as build

ARG BUILD_ENV

# Install app dependencies
USER 0
RUN dnf -y update && dnf -y install git
USER 1001

ADD --chown=1001 package.json ./package.json
ADD --chown=1001 ckeditor5 ./ckeditor5

# Install dependencies
RUN npm install --force --silent

RUN npm install pdfjs-dist@2.6.347 --silent

# Copy the app
ADD --chown=1001 public ./public
ADD --chown=1001 src ./src
ADD --chown=1001 .env.${BUILD_ENV} ./.env.${BUILD_ENV}
ADD --chown=1001 .build.sh ./.build.sh

CMD ["sh", "./.build.sh"]
