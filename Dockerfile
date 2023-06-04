FROM node:17-alpine as builder
WORKDIR /usr/src/idm-gateway-ui

COPY package*.json ./

RUN npm install

ARG API_BASE_URL
ENV API_BASE_URL "$API_BASE_URL"
COPY . .
RUN npm run build

EXPOSE 3000
RUN chmod +x ./replace_api_url.sh
CMD ["sh", "replace_api_url.sh"]