FROM alpine
WORKDIR "/app"
COPY ./package.json ./index.js ./keys.js ./
RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node \
    && apk update \
    && apk add nodejs npm \
    && npm install \
    && chown node:node -R /app
USER node
EXPOSE 5000
CMD ["npm", "run", "start"]