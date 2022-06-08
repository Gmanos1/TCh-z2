FROM node:alpine as builder
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM alpine
RUN apk update \
    && apk add nginx \
    && adduser -D -g 'www' www \
    && mkdir /www \
    && chown -R www:www /var/lib/nginx \
    && chown -R www:www /www 
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /www
EXPOSE 3000
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]