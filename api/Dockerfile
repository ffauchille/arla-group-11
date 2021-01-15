FROM node:14-alpine

COPY . /code
WORKDIR /code


ARG db_host
ARG db_port
ARG db_name
ARG db_user
ARG db_password

ARG doc_db_host
ARG doc_db_port
ARG doc_db_name
ARG doc_db_user
ARG doc_db_password
ARG doc_db_auth_source

ENV RDS_HOST=${db_host}
ENV RDS_PORT=${db_port}
ENV RDS_NAME=${db_name}
ENV RDS_USER=${db_user}
ENV RDS_PASSWORD=${db_password}

ENV DOC_DB_HOST=${doc_db_host}
ENV DOC_DB_PORT=${doc_db_port}
ENV DOC_DB_NAME=${doc_db_name}
ENV DOC_DB_USER=${doc_db_user}
ENV DOC_DB_PASSWORD=${doc_db_password}
ENV DOC_DB_AUTH_SOURCE=${doc_db_auth_source}

RUN npm i
CMD npm start

EXPOSE 3000
