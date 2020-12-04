FROM node:14-alpine

COPY . /code
WORKDIR /code

RUN npm i
ARG db_host
ARG db_port
ARG db_name
ARG db_user
ARG db_password
CMD RDS_HOST=${db_host} RDS_PORT=${db_port} RDS_NAME=${db_name} RDS_USER=${db_user} RDS_PASSWORD=${db_password}} npm start

EXPOSE 3000
