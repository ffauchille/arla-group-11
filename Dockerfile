FROM node:14-alpine AS build

COPY frontend /code/
WORKDIR /code
ARG api_url
ENV API_ENDPOINT=${api_url}
RUN npm install
RUN npm run build

FROM nginx:stable

COPY --from=build /code/build/* /usr/share/nginx/html/
