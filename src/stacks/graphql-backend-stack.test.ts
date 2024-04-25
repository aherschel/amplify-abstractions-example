import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GraphqlBackendStack } from './graphql-backend-stack';

describe('GraphqlBackendStack', () => {
  it('Creates cognito user and identity pools', () => {
    const stack = new GraphqlBackendStack(new App, 'TestBackend');
    const template = Template.fromStack(stack);
  
    template.hasResource('AWS::Cognito::UserPool', {});
    template.hasResource('AWS::Cognito::IdentityPool', {});
  });

  it('Creates an appsync api', () => {
    const stack = new GraphqlBackendStack(new App, 'TestBackend');
    const template = Template.fromStack(stack);
  
    template.hasResource('AWS::AppSync::GraphQLApi', {});
  });

  it('Creates a cloudwatch dashboard', () => {
    const stack = new GraphqlBackendStack(new App, 'TestBackend');
    const template = Template.fromStack(stack);
  
    template.hasResource('AWS::CloudWatch::Dashboard', {});
  });
});
