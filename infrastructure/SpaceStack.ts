import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Code, Function as LamdaFunction, Runtime } from '@aws-cdk/aws-lambda';
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

import { GenericTable } from './GenericTable';

export class SpaceStack extends Stack {

  private api = new RestApi(this, 'SpaceApi');
  private spacesTable = new GenericTable(this, 'SpacesTable', 'spaceId');

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLamda = new LamdaFunction(this, 'helloLamda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('services/hello'),
      handler: 'hello.main',
    });

    const helloLamdaWebpack = new LamdaFunction(this, 'helloLamdaWebpack', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('build/nodeHelloLambda'),
      handler: 'nodeHelloLambda.handler',
    });

    // Hello Api lamda integration:
    const helloLamdaIntegration = new LambdaIntegration(helloLamdaWebpack);
    const helloLamdaResource = this.api.root.addResource('hello');
    helloLamdaResource.addMethod('GET', helloLamdaIntegration);

    const helloLambdaNodejs = new NodejsFunction(this, 'helloLamdaNodeJs', {
      entry: 'services/node-lambda/hello.ts',
      handler: 'handler',
    });
  }

}
