import type { AWS } from '@serverless/typescript'

export const cognitoIdentityPoolConf: Omit<NonNullable<AWS['resources']>['Resources'], 'Fn::Transform'> = {
  CognitoUserIdentityPool: {
    Type: 'AWS::Cognito::IdentityPool',
    Properties: {
      IdentityPoolName:
        '${self:custom.stage}-${self:service}-CognitoUserIdentityPool',
      AllowUnauthenticatedIdentities: false,
      CognitoIdentityProviders: [
        {
          ClientId: {
            Ref: 'CognitoUserPoolClient',
          },
          ProviderName: {
            'Fn::GetAtt': ['CognitoUserPool', 'ProviderName'],
          },
        },
      ],
    },
  },
  CognitoUserIdentityPoolRoleAttachment: {
    Type: 'AWS::Cognito::IdentityPoolRoleAttachment',
    Properties: {
      IdentityPoolId: {
        Ref: 'CognitoUserIdentityPool',
      },
      Roles: {
        authenticated: {
          'Fn::GetAtt': ['CognitoUserAuthRole', 'Arn'],
        },
      },
    },
  },
}

export const cognitoIdentityPoolOutputConf: NonNullable<AWS['resources']>['Outputs'] = {
  CognitoUserIdentityPoolArn: {
    Value: {
      Ref: 'CognitoUserIdentityPool',
    },
    Export: {
      Name: '${self:service}:${self:custom.stage}:CognitoUserIdentityPoolArn',
    },
  },
}
