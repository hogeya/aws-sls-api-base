import type { AWS } from '@serverless/typescript'

export const iamRoleConf: Omit<NonNullable<AWS['resources']>['Resources'], 'Fn::Transform'>  = {
  CognitoUserAuthRole: {
    Type: 'AWS::IAM::Role',
    Properties: {
      Path: '/',
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Federated: ['cognito-identity.amazonaws.com'],
            },
            Action: 'sts:AssumeRoleWithWebIdentity',
            Condition: {
              StringEquals: {
                'cognito-identity.amazonaws.com:aud': {
                  Ref: 'CognitoUserIdentityPool',
                },
              },
              'ForAnyValue:StringLike': {
                'cognito-identity.amazonaws.com:amr': 'authenticated',
              },
            },
          },
        ],
      },
      Policies: [
        {
          PolicyName: 'CognitoAuthorizedPolicy',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Action: [
                  'mobileanalytics:PutEvents',
                  'cognito-sync:*',
                  'cognito-identity:*',
                ],
                Resource: '*',
              },
              {
                Effect: 'Allow',
                Action: ['execute-api:Invoke'],
                Resource: {
                  'Fn::Join': [
                    '',
                    [
                      'arn:aws:execute-api:${self:provider.region}:${aws:accountId}',
                      ':',
                      { Ref: 'ApiGatewayRestApi' },
                      '/*/POST/hello',
                    ],
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
}
