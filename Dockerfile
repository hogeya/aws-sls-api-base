FROM node:14-alpine as node
FROM docker:dind

COPY --from=node /opt/yarn* /opt/yarn
COPY --from=node /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/npm
COPY --from=node /usr/local/bin/node /usr/local/bin/
RUN ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn && \
    ln -s /opt/yarn/bin/yarn /usr/local/bin/yarnpkg
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

RUN apk update --no-cache

RUN apk add git bash make python2 python3 python3-dev py3-pip g++ jq && \
    apk add --no-cache --virtual build-deps build-base gcc && \
    pip3 install --no-cache-dir --upgrade pip && \
    pip3 install awscli aws-sam-cli && \
    apk del build-deps

ENV TZ Asia/Tokyo
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone && \
    apk del tzdata

RUN yarn global add serverless

RUN mkdir /root/.aws
COPY ./credentials /root/.aws/credentials

WORKDIR /app
