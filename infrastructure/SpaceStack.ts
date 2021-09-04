import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Code, Function as LamdaFunction, Runtime } from '@aws-cdk/aws-lambda';

export class SpaceStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new LamdaFunction(this, 'helloLamda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('services'),
      handler: 'hello.main',
    });
  }

}
