import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { RtJobs14Service } from './rt-jobs-14.service.ts';

describe('RtJobs14Service (RT-JOBS-14)', () => {
  it('initializes with default configuration', () => {
    const service = new RtJobs14Service();
    const config = service.getConfig();
    assert.strictEqual(config.enabled, true);
    assert.strictEqual(config.retries, 3);
  });

  it('updates configuration dynamically', () => {
    const service = new RtJobs14Service();
    service.updateConfig({ retries: 7, enabled: false });
    const config = service.getConfig();
    assert.strictEqual(config.retries, 7);
    assert.strictEqual(config.enabled, false);
  });

  it('executes operation cycle cleanly', async () => {
    const service = new RtJobs14Service();
    const status = await service.executeOperation();
    assert.strictEqual(status.healthy, true);
    assert.strictEqual(status.operationsCompleted, 1);
    assert.ok(status.lastCheckTimestamp > 0);
  });
});
