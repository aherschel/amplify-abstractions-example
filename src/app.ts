#!/usr/bin/env node
import 'source-map-support/register';
import { App, Environment } from 'aws-cdk-lib';
import { GraphqlBackendStack } from './stacks/graphql-backend-stack';
import { RestBackendStack } from './stacks/rest-backend-stack';

const app = new App();
const env: Environment = { region: 'us-west-2' };
new GraphqlBackendStack(app, 'MyGraphqlBackend', {
  description: 'A backend stack which contains cognito, auth, and a graphql api using the Amplify pattern.',
  env,
});
new RestBackendStack(app, 'MyRestBackend', {
  description: 'A backend stack which contains rest api using api gateway.',
  env,
});
