import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CiMatrixRunnerService } from './devops-infra-26.service.ts';

describe('CiMatrixRunnerService (DEVOPS-INFRA-26)', () => {
  it('loads default postgresql 15, 16 and clickhouse matrix configurations', () => {
    const runner = new CiMatrixRunnerService();
    const targets = runner.getMatrixTargets('integration-db');
    assert.strictEqual(targets.length, 4);
    assert.ok(targets.some(t => t.id === 'pg-15' && t.version === '15.6'));
    assert.ok(targets.some(t => t.id === 'pg-16' && t.version === '16.2'));
    assert.ok(targets.some(t => t.id === 'ch-24' && t.service === 'clickhouse'));
  });

  it('executes matrix test runner across all targets with status reporting', async () => {
    const runner = new CiMatrixRunnerService();
    const result = await runner.runSuite('integration-db', async (target) => {
      return target.port > 0;
    });

    assert.strictEqual(result.status, 'SUCCESS');
    assert.strictEqual(result.targetsEvaluated, 4);
    assert.strictEqual(result.successfulTargets.length, 4);
    assert.strictEqual(result.failedTargets.length, 0);
  });
});
