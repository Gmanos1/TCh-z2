FROM alpine
RUN apk update && \
    apk add nginx
COPY ./default.conf /etc/nginx/http.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]