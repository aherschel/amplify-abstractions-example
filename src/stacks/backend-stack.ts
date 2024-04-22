import { Construct } from 'constructs';
import { Stack, StackProps, NestedStack, Duration } from 'aws-cdk-lib';
import { AmplifyAuth } from '@aws-amplify/auth-construct-alpha';
import { AmplifyGraphqlApi, AmplifyGraphqlDefinition } from '@aws-amplify/graphql-api-construct';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { schema } from '../schema';
import { GraphqlApiMonitoring } from '../constructs/graphql-api-monitoring';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const authStack = new NestedStack(this, 'AuthStack');
    const auth = new AmplifyAuth(authStack, 'Auth', { loginWith: { email: true } });

    const graphqlStack = new NestedStack(this, 'GraphqlStack');

    const createNodeJsFunction = (
      id: string,
      fileName: string,
      props?: Partial<NodejsFunctionProps>,
    ) => new NodejsFunction(graphqlStack, id, {
      entry: path.join(__dirname, '..', 'functions', fileName),
      runtime: Runtime.NODEJS_20_X,
      architecture: Architecture.ARM_64,
      ...props,
    });

    const echo = createNodeJsFunction('EchoFn', 'echo.ts');

    const api = new AmplifyGraphqlApi(graphqlStack, 'Api', {
      apiName: 'Blotto',
      definition: AmplifyGraphqlDefinition.fromString(schema.transform().schema),
      authorizationModes: {
        defaultAuthorizationMode: 'AWS_IAM',
        apiKeyConfig: { expires: Duration.days(30) },
        userPoolConfig: { userPool: auth.resources.userPool },
        iamConfig: {
          identityPoolId: auth.resources.cfnResources.cfnIdentityPool.ref,
          authenticatedUserRole: auth.resources.authenticatedUserIamRole,
          unauthenticatedUserRole: auth.resources.unauthenticatedUserIamRole,
        },
      },
      functionNameMap: {
        echo,
      },
    });

    new GraphqlApiMonitoring(graphqlStack, 'ApiMonitoring', {
      api,
      additionalResources: {
        functions: [
          echo,
        ],
      },
    });
  }
}
