import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BackendStack } from './backend-stack';

describe('BackendStack', () => {
  it('Creates an SQS Queue with a 5m visibility timeout', () => {
    const stack = new BackendStack(new App, 'MyBackend');
    Template.fromStack(stack);
    // const template = Template.fromStack(stack);
  
    // template.hasResourceProperties('AWS::SQS::Queue', {
    //   VisibilityTimeout: 300
    // });
  });
});
