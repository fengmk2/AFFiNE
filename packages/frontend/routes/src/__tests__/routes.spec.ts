import { describe, expect, it } from 'vite-plus/test';

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
