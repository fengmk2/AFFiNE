import { Buffer } from 'node:buffer';

import { describe, expect, test } from '@voidzero-dev/vite-plus/test';

import { isSvgBuffer } from '../buffer-to-blob';

describe('isSvgBuffer', () => {
  test('basic', async () => {
    expect(isSvgBuffer(Buffer.from('<svg></svg>'))).toBe(true);
    expect(isSvgBuffer(Buffer.from(' \n\r\t<svg></svg>'))).toBe(true);
    expect(isSvgBuffer(Buffer.from('<123>'))).toBe(false);
    expect(
      isSvgBuffer(
        Buffer.from('<?xml version="1.0" encoding="UTF-8"?><svg></svg>')
      )
    ).toBe(true);
  });
});
