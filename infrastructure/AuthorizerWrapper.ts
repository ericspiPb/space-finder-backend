import { CfnOutput, Construct } from '@aws-cdk/core';
import { CognitoUserPoolsAuthorizer, RestApi } from '@aws-cdk/aws-apigateway';
import { UserPool, UserPoolClient } from '@aws-cdk/aws-cognito';

export class AuthorizerWrapper {
  private userPool: UserPool;
  private userPoolClient: UserPoolClient;
  public authorizer: CognitoUserPoolsAuthorizer;
  
  constructor(private scope: Construct, private api: RestApi) {
    this.initialize();
  }

  private initialize() {
    this.createUserPool();
    this.addUserPoolClient();
    this.createAuthorizer();
  }

  private createUserPool() {
    this.userPool = new UserPool(this.scope, 'SpaceUserPool', {
      userPoolName: 'SpaceUserPool',
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
    });

    new CfnOutput(this.scope, 'UserPoolId', {
      value: this.userPool.userPoolId,
    });
  }

  private addUserPoolClient() {
    this.userPoolClient = this.userPool.addClient('SpaceUserPool-client', {
      userPoolClientName: 'SpaceUserPool-client',
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
      generateSecret: false,
    });

    new CfnOutput(this.scope, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
    });
  }

  private createAuthorizer() {
    this.authorizer = new CognitoUserPoolsAuthorizer(this.scope, 'SpaceUserAuthroizer', {
      cognitoUserPools: [this.userPool],
      authorizerName: 'SpaceUserAuthroizer',
      identitySource: 'method.request.header.Authorization',
    });
    this.authorizer._attachToApi(this.api);
  }
}
