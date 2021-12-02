import type { AWS } from '@serverless/typescript'

export const cognitoUserPoolConf: Omit<NonNullable<AWS['resources']>['Resources'], 'Fn::Transform'> = {
    CognitoUserPool: {
      Type: 'AWS::Cognito::UserPool',
      Properties: {
        AutoVerifiedAttributes: ['email'],
        MfaConfiguration: 'OFF',
        Policies: {
          PasswordPolicy: {
            MinimumLength: 8,
            RequireLowercase: true,
            RequireNumbers: true,
            RequireSymbols: true,
            RequireUppercase: true,
          },
        },
        UserPoolName: '${self:custom.stage}-${self:service}-CognitoUserPool',
        UsernameAttributes: ['email'],
      },
    },
    CognitoUserPoolClient: {
      Type: 'AWS::Cognito::UserPoolClient',
      Properties: {
        ClientName:
          '${self:custom.stage}-${self:service}-CognitoUserPoolClient',
        ExplicitAuthFlows: [
          'ALLOW_ADMIN_USER_PASSWORD_AUTH',
          'ALLOW_REFRESH_TOKEN_AUTH',
        ],
        GenerateSecret: false,
        UserPoolId: {
          Ref: 'CognitoUserPool',
        },
      },
    },
}

export const cognitoUserPoolOutputConf: NonNullable<AWS['resources']>['Outputs'] = {
  CognitoUserPoolArn: {
    Value: {
      Ref: 'CognitoUserPool',
    },
    Export: {
      Name: '${self:service}:${self:custom.stage}:CognitoUserPoolArn',
    },
  },
  CognitoUserPoolClientArn: {
    Value: {
      Ref: 'CognitoUserPoolClient',
    },
    Export: {
      Name: '${self:service}:${self:custom.stage}:CognitUserPoolClientArn',
    },
  },
}
