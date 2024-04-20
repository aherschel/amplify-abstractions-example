#!/usr/bin/env node
import 'source-map-support/register';
import { App, Environment } from 'aws-cdk-lib';
import { BackendStack } from './stacks/backend-stack';

const app = new App();
const env: Environment = { region: 'us-west-2' };
new BackendStack(app, 'MyBackend', { env });
