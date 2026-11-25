/**
 * DevOps Infrastructure Service: CI Matrix Runner
 * Subsystem: Cloud Infrastructure & Pipeline Reliability [DEVOPS-INFRA-26]
 */

export interface MatrixTarget {
  id: string;
  service: 'postgresql' | 'clickhouse' | 'redis';
  version: string;
  image: string;
  port: number;
  healthEndpoint?: string;
}

export interface MatrixExecutionResult {
  matrixId: string;
  targetsEvaluated: number;
  successfulTargets: string[];
  failedTargets: string[];
  durationMs: number;
  status: 'SUCCESS' | 'FAILED' | 'PARTIAL';
}

export class CiMatrixRunnerService {
  private supportedMatrices: Map<string, MatrixTarget[]> = new Map();

  constructor() {
    this.registerDefaultMatrices();
  }

  private registerDefaultMatrices(): void {
    this.supportedMatrices.set('integration-db', [
      { id: 'pg-15', service: 'postgresql', version: '15.6', image: 'postgres:15.6-alpine', port: 5432 },
      { id: 'pg-16', service: 'postgresql', version: '16.2', image: 'postgres:16.2-alpine', port: 5432 },
      { id: 'ch-23', service: 'clickhouse', version: '23.8', image: 'clickhouse/clickhouse-server:23.8', port: 8123 },
      { id: 'ch-24', service: 'clickhouse', version: '24.1', image: 'clickhouse/clickhouse-server:24.1', port: 8123 },
    ]);
  }

  public getMatrixTargets(suite: string): MatrixTarget[] {
    return this.supportedMatrices.get(suite) || [];
  }

  public registerMatrix(suite: string, targets: MatrixTarget[]): void {
    this.supportedMatrices.set(suite, targets);
  }

  public async runSuite(suite: string, runnerFn: (target: MatrixTarget) => Promise<boolean>): Promise<MatrixExecutionResult> {
    const start = Date.now();
    const targets = this.getMatrixTargets(suite);
    const successful: string[] = [];
    const failed: string[] = [];

    for (const target of targets) {
      try {
        const ok = await runnerFn(target);
        if (ok) successful.push(target.id);
        else failed.push(target.id);
      } catch {
        failed.push(target.id);
      }
    }

    return {
      matrixId: suite,
      targetsEvaluated: targets.length,
      successfulTargets: successful,
      failedTargets: failed,
      durationMs: Date.now() - start,
      status: failed.length === 0 ? 'SUCCESS' : (successful.length > 0 ? 'PARTIAL' : 'FAILED')
    };
  }
}
