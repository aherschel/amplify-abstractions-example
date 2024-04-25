import { Construct } from 'constructs';
import { Duration } from 'aws-cdk-lib';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

/**
 * Create a NodeJsFunction with project defaults based on a given filename.
 * @param scope to create this construct within
 * @param id for the resource
 * @param fileName within the `functions` directory where this lambda lives
 * @param props any additional or props to overwrite
 * @returns the lambda function
 */
export const createNodeJsFunction = (
  scope: Construct,
  id: string,
  fileName: string,
  props?: Partial<NodejsFunctionProps>,
) => new NodejsFunction(scope, id, {
  entry: path.join(__dirname, '..', 'functions', fileName),
  runtime: Runtime.NODEJS_20_X,
  architecture: Architecture.ARM_64,
  timeout: Duration.seconds(15),
  ...props,
});
