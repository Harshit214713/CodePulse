import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { QaTest25Harness } from './qa-test-25.spec.ts';

describe('QaTest25Harness (QA-TEST-25)', () => {
  it('registers and stores test fixtures correctly', () => {
    const harness = new QaTest25Harness();
    harness.registerFixture({
      id: 'fix-1',
      scenario: 'edge-boundary',
      expectedOutcome: true,
      executionTimeMs: 15,
    });
    const fixtures = harness.getFixtures();
    assert.strictEqual(fixtures.length, 1);
    assert.strictEqual(fixtures[0].id, 'fix-1');
  });

  it('executes suite and produces valid pass report', () => {
    const harness = new QaTest25Harness();
    harness.registerFixture({
      id: 'fix-1',
      scenario: 'nominal',
      expectedOutcome: true,
      executionTimeMs: 10,
    });
    harness.registerFixture({
      id: 'fix-2',
      scenario: 'stress',
      expectedOutcome: true,
      executionTimeMs: 25,
    });
    const report = harness.executeSuite();
    assert.strictEqual(report.status, 'PASSED');
    assert.strictEqual(report.passedCount, 2);
    assert.strictEqual(report.failedCount, 0);
  });
});
