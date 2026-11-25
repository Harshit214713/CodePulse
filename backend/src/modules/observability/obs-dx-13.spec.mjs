import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ObsDx13Service } from './obs-dx-13.service.ts';

describe('ObsDx13Service (OBS-DX-13)', () => {
  it('initializes with default configuration', () => {
    const service = new ObsDx13Service();
    const config = service.getConfig();
    assert.strictEqual(config.enabled, true);
    assert.strictEqual(config.retries, 3);
  });

  it('updates configuration dynamically', () => {
    const service = new ObsDx13Service();
    service.updateConfig({ retries: 7, enabled: false });
    const config = service.getConfig();
    assert.strictEqual(config.retries, 7);
    assert.strictEqual(config.enabled, false);
  });

  it('executes operation cycle cleanly', async () => {
    const service = new ObsDx13Service();
    const status = await service.executeOperation();
    assert.strictEqual(status.healthy, true);
    assert.strictEqual(status.operationsCompleted, 1);
    assert.ok(status.lastCheckTimestamp > 0);
  });
});
