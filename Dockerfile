FROM node:lts-alpine as build

# "app" will be the current working directory
WORKDIR /app
ARG BUILD_ENV

# Install app dependencies
COPY . ./

RUN apk add git

# Install dependencies
RUN npm install --force --silent

# Copy the app
COPY . .

# build app for production with minification
RUN npm run build:${BUILD_ENV}

# Use nginx on Prod
FROM nginx:stable-alpine as production

# Copy dist from build
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

# Run Nginx without daemon
CMD [ "nginx", "-g", "daemon off;" ]
