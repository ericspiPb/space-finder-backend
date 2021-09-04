import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Code, Function as LamdaFunction, Runtime } from '@aws-cdk/aws-lambda';
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';

export class SpaceStack extends Stack {

  private api = new RestApi(this, 'SpaceApi');

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLamda = new LamdaFunction(this, 'helloLamda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('services'),
      handler: 'hello.main',
    });

    // Hello Api lamda integration:
    const helloLamdaIntegration = new LambdaIntegration(helloLamda);
    const helloLamdaResource = this.api.root.addResource('hello');
    helloLamdaResource.addMethod('GET', helloLamdaIntegration);
  }

}
