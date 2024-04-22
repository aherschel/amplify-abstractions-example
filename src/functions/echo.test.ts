import type { Schema } from '../schema';
import { handler } from './echo';

type HandlerEvent =  Schema['echo']['functionHandler']['arguments'];

describe('EchoFunction', () => {
  it('can be invoked', async () => {
    const payload: HandlerEvent = {
      arguments: {
        content: 'hi',
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await handler(payload, null as unknown as any, null as unknown as any);

    expect(response).toBeDefined();
    expect(response?.content).toEqual('Echoing content: hi');
    expect(response?.executionDuration).toBeGreaterThanOrEqual(0);
  });
});
