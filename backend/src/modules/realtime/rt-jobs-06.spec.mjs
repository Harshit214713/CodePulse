import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { RtJobs06Service } from './rt-jobs-06.service.ts';

describe('RtJobs06Service (RT-JOBS-06)', () => {
  it('initializes with default configuration', () => {
    const service = new RtJobs06Service();
    const config = service.getConfig();
    assert.strictEqual(config.enabled, true);
    assert.strictEqual(config.retries, 3);
  });

  it('updates configuration dynamically', () => {
    const service = new RtJobs06Service();
    service.updateConfig({ retries: 7, enabled: false });
    const config = service.getConfig();
    assert.strictEqual(config.retries, 7);
    assert.strictEqual(config.enabled, false);
  });

  it('executes operation cycle cleanly', async () => {
    const service = new RtJobs06Service();
    const status = await service.executeOperation();
    assert.strictEqual(status.healthy, true);
    assert.strictEqual(status.operationsCompleted, 1);
    assert.ok(status.lastCheckTimestamp > 0);
  });
});
