FROM swaggerapi/swagger-ui

ARG OAS_NAME=taskforse
ARG URL=/oas/api/${OAS_NAME}.yml
ENV URL=${URL}

COPY ${OAS_NAME}.yml /usr/share/nginx/html/api/
