# AWS Serverless API base template For *me*

## Get Start

```sh
cp ./credentials.example ./credentials
vi credentials
# Please note your AWS credentials
```

## yarn install

```sh
make yarn-install
```

※ As using esbuild-linux-64, npm plugins are gotten via docker container

## deploy

```sh
make deploy-dev
```
