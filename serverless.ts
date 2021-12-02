import hello from '@functions/hello'
import type { AWS } from '@serverless/typescript'
import { cognitoIdentityPoolConf, cognitoIdentityPoolOutputConf } from 'backend/cognitoIdentityPool'
import { cognitoUserPoolConf, cognitoUserPoolOutputConf } from 'backend/cognitoUserPool'
import { iamRoleConf } from 'backend/iamRoles'

const serverlessConfiguration: AWS = {
  service: 'aws-sls-api-base',
  frameworkVersion: '2',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-prune-plugin',
  ],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'cognito-idp:ListUsers',
              'cognito-idp:AdminListGroupsForUser',
            ],
            Resource: 'arn:aws:cognito-idp:ap-northeast-1:*:*',
          },
        ],
      },
    },
  },
  functions: { hello },
  package: { individually: true },
  custom: {
    stage: '${opt:stage}',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    prune: {
      automatic: true,
      number: 3,
    },
  },
  resources: {
    Resources: {
      ...cognitoIdentityPoolConf,
      ...cognitoUserPoolConf,
      ...iamRoleConf,
    },
    Outputs: {
      ...cognitoIdentityPoolOutputConf,
      ...cognitoUserPoolOutputConf,
    },
  },
}

module.exports = serverlessConfiguration
