import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  const start = performance.now();
  console.log('Got Event', event);
  return {
    statusCode: 200,
    body: `Hello, I took ${performance.now() - start}ms long!`,
  };
};
