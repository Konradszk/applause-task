FROM node:14-alpine

WORKDIR /srv/app
COPY --chown=node:node . .
RUN apk add --no-cache jq curl \
  && npm install --production
USER node
EXPOSE 3333
CMD [ "node", "main.js" ]
