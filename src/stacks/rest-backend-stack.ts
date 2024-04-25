import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { createNodeJsFunction } from '../utils/lambda-utils';
import { RestApiMonitoring } from '../constructs/rest-api-monitoring';

export class RestBackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = createNodeJsFunction(this, 'GatewayFn', 'gateway.ts');

    const api = new LambdaRestApi(this, 'MyRestApi', { handler });

    new RestApiMonitoring(this, 'Monitoring', {
      api,
      handler,
    });
  }
}
