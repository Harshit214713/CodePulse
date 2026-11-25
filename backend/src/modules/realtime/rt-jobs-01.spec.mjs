import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { RtJobs01Service } from './rt-jobs-01.service.ts';

describe('RtJobs01Service (RT-JOBS-01)', () => {
  it('initializes with default configuration', () => {
    const service = new RtJobs01Service();
    const config = service.getConfig();
    assert.strictEqual(config.enabled, true);
    assert.strictEqual(config.retries, 3);
  });

  it('updates configuration dynamically', () => {
    const service = new RtJobs01Service();
    service.updateConfig({ retries: 7, enabled: false });
    const config = service.getConfig();
    assert.strictEqual(config.retries, 7);
    assert.strictEqual(config.enabled, false);
  });

  it('executes operation cycle cleanly', async () => {
    const service = new RtJobs01Service();
    const status = await service.executeOperation();
    assert.strictEqual(status.healthy, true);
    assert.strictEqual(status.operationsCompleted, 1);
    assert.ok(status.lastCheckTimestamp > 0);
  });
});
