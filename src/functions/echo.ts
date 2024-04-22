import type { Schema } from '../schema';

export const handler: Schema['echo']['functionHandler'] = async (event) => {
  const start = performance.now();
  return {
    content: `Echoing content: ${event.arguments.content}`,
    executionDuration: performance.now() - start,
  };
};
