import { describe, expect, it } from '@voidzero-dev/vite-plus/test';

import { FACTORIES } from '../routes';

describe('PATH_FACTORIES', () => {
  it('should generate correct paths', () => {
    expect(
      FACTORIES.admin.settings.module({
        module: 'auth',
      })
    ).toBe('/admin/settings/auth');
  });
});
