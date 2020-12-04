FROM node:14-alpine

COPY . /code
WORKDIR /code


ARG db_host
ARG db_port
ARG db_name
ARG db_user
ARG db_password

ENV RDS_HOST=${db_host}
ENV RDS_PORT=${db_port}
ENV RDS_NAME=${db_name}
ENV RDS_USER=${db_user}
ENV RDS_PASSWORD=${db_password}

RUN npm i
CMD npm start

EXPOSE 3000
