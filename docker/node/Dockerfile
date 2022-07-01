# FROM node:14-alpine as base
FROM node:14-bullseye-slim as base
# FROM alpine as base
# FROM circleci/node:14-browsers as base
# FROM docker:20.10 as base

# ARG USER_NAME=circleci
# ARG USER_ID=3434
USER 1000
ENV DATA_FOLDER=/var/tmp/data
ENV NPM_CONFIG_CACHE="${DATA_FOLDER}/.cache/npm"
ENV CYPRESS_CACHE_FOLDER="${DATA_FOLDER}/.cache/Cypress"
ENV NPM_CONFIG_PREFIX="${DATA_FOLDER}/.npm-global"
ENV PATH=$DATA_FOLDER/.npm-global/bin:./node_modules/.bin:$PATH
RUN mkdir -p $NPM_CONFIG_CACHE && \
  mkdir -p $CYPRESS_CACHE_FOLDER && \
  mkdir -p $NPM_CONFIG_PREFIX
USER root
RUN  apt-get update \
  && apt-get install -y git bzip2 wget ca-certificates openssh-client curl jq \
  && wget -O docker.tgz "https://download.docker.com/linux/static/stable/x86_64/docker-20.10.11.tgz" \
  && tar --extract --file docker.tgz --strip-components 1 --directory /usr/local/bin/ \
  && rm docker.tgz
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
COPY modprobe.sh /usr/local/bin/modprobe
COPY docker-entrypoint.sh /usr/local/bin/
ENV DOCKER_TLS_CERTDIR=/certs
RUN mkdir /certs /certs/_client && chmod 1777 /certs /certs/_client
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["bash"]
USER $USER

FROM base as ci
# COPY ./package-lock.json /tmp
# COPY ./package.json /tmp
# COPY .npmrc /tmp
# RUN --mount=type=ssh,mode=0666 \
#   mkdir -p ~/.ssh && \
#   ssh-keyscan github.com >> ~/.ssh/known_hosts && \
#   cd /tmp && \
#   npm install && \
#   rm -rf /tmp/node_modules

FROM base as user
USER root
RUN if [ "$USER_ID" != "1000" ]; then adduser $USER_NAME; fi
USER $USER_NAME

