FROM swaggerapi/swagger-ui

ARG OAS_NAME=taskforse
ARG URL=/oas/api/${OAS_NAME}.json
ENV URL=${URL}

COPY ${OAS_NAME}.json /usr/share/nginx/html/api/
