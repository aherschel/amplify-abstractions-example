import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './gateway';

describe('GatewayFunction', () => {
  it('can be invoked', async () => {
    const payload: APIGatewayProxyEvent = {} as unknown as APIGatewayProxyEvent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await handler(payload, null as unknown as any, null as unknown as any);

    expect(response).toBeDefined();
    expect(response?.statusCode).toEqual(200);
  });
});
