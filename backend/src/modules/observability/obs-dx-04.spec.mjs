import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ObsDx04Service } from './obs-dx-04.service.ts';

describe('ObsDx04Service (OBS-DX-04)', () => {
  it('initializes with default configuration', () => {
    const service = new ObsDx04Service();
    const config = service.getConfig();
    assert.strictEqual(config.enabled, true);
    assert.strictEqual(config.retries, 3);
  });

  it('updates configuration dynamically', () => {
    const service = new ObsDx04Service();
    service.updateConfig({ retries: 7, enabled: false });
    const config = service.getConfig();
    assert.strictEqual(config.retries, 7);
    assert.strictEqual(config.enabled, false);
  });

  it('executes operation cycle cleanly', async () => {
    const service = new ObsDx04Service();
    const status = await service.executeOperation();
    assert.strictEqual(status.healthy, true);
    assert.strictEqual(status.operationsCompleted, 1);
    assert.ok(status.lastCheckTimestamp > 0);
  });
});
