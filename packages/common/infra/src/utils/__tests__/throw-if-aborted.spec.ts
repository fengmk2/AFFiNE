import { describe, expect, test } from '@voidzero-dev/vite-plus/test';

import { throwIfAborted } from '../throw-if-aborted';

describe('throw-if-aborted', () => {
  test('basic', async () => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    expect(throwIfAborted(abortSignal)).toBe(true);
    abortController.abort('TEST_ABORT');
    expect(() => throwIfAborted(abortSignal)).toThrowError('TEST_ABORT');
  });
});
