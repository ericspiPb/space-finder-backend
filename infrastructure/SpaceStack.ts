import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Code, Function as LamdaFunction, Runtime } from '@aws-cdk/aws-lambda';
import { AuthorizationType, LambdaIntegration, MethodOptions, RestApi } from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { PolicyStatement } from '@aws-cdk/aws-iam';

import { GenericTable } from './GenericTable';
import { AuthorizerWrapper } from './AuthorizerWrapper';

export class SpaceStack extends Stack {

  private api = new RestApi(this, 'SpaceApi');
  private spacesTable = new GenericTable(this, {
    tableName: 'SpacesTable',
    primaryKey: 'spaceId',
    createLambdaPath: 'create',
    readLambdaPath: 'read',
    secondaryIndexes: ['location'],
    updateLambdaPath: 'update',
    deleteLambdaPath: 'delete',
  });
  private authorizer: AuthorizerWrapper;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);    

    // using js
    const helloLamda = new LamdaFunction(this, 'helloLamda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('services/hello'),
      handler: 'hello.main',
    });

    // using webpack
    const helloLamdaWebpack = new LamdaFunction(this, 'helloLamdaWebpack', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('build/nodeHelloLambda'),
      handler: 'nodeHelloLambda.handler',
    });

    // using typescript
    const helloLambdaNodejs = new NodejsFunction(this, 'helloLamdaNodeJs', {
      entry: 'services/node-lambda/hello.ts',
      handler: 'handler',
    });

    // add list buckets policy
    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*');
    helloLambdaNodejs.addToRolePolicy(s3ListPolicy);

    // Hello Api lamda integration
    const helloLamdaIntegration = new LambdaIntegration(helloLambdaNodejs);
    const helloLamdaResource = this.api.root.addResource('hello');
    const spaceResource = this.api.root.addResource('spaces');
    
    this.authorizer = new AuthorizerWrapper(this, this.api);
    const optionsWithAuthorizer: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: this.authorizer.authorizer.authorizerId,
      },
    };

    helloLamdaResource.addMethod('GET', helloLamdaIntegration, optionsWithAuthorizer);

    // Spaces API integrations
    spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
    spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
    spaceResource.addMethod('PUT', this.spacesTable.updateLambdaIntegration);
    spaceResource.addMethod('DELETE', this.spacesTable.deleteLambdaIntegration);
  }

}
