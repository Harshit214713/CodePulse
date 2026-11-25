import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ObsDx15Service } from './obs-dx-15.service.ts';

describe('ObsDx15Service (OBS-DX-15)', () => {
  it('initializes with default configuration', () => {
    const service = new ObsDx15Service();
    const config = service.getConfig();
    assert.strictEqual(config.enabled, true);
    assert.strictEqual(config.retries, 3);
  });

  it('updates configuration dynamically', () => {
    const service = new ObsDx15Service();
    service.updateConfig({ retries: 7, enabled: false });
    const config = service.getConfig();
    assert.strictEqual(config.retries, 7);
    assert.strictEqual(config.enabled, false);
  });

  it('executes operation cycle cleanly', async () => {
    const service = new ObsDx15Service();
    const status = await service.executeOperation();
    assert.strictEqual(status.healthy, true);
    assert.strictEqual(status.operationsCompleted, 1);
    assert.ok(status.lastCheckTimestamp > 0);
  });
});
