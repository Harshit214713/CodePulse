import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ObsDx12Service } from './obs-dx-12.service.ts';

describe('ObsDx12Service (OBS-DX-12)', () => {
  it('initializes with default configuration', () => {
    const service = new ObsDx12Service();
    const config = service.getConfig();
    assert.strictEqual(config.enabled, true);
    assert.strictEqual(config.retries, 3);
  });

  it('updates configuration dynamically', () => {
    const service = new ObsDx12Service();
    service.updateConfig({ retries: 7, enabled: false });
    const config = service.getConfig();
    assert.strictEqual(config.retries, 7);
    assert.strictEqual(config.enabled, false);
  });

  it('executes operation cycle cleanly', async () => {
    const service = new ObsDx12Service();
    const status = await service.executeOperation();
    assert.strictEqual(status.healthy, true);
    assert.strictEqual(status.operationsCompleted, 1);
    assert.ok(status.lastCheckTimestamp > 0);
  });
});
