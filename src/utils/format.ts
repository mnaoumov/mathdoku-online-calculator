import type { Operator } from '../types';

import { OPERATOR_SYMBOLS } from '../types';

export function formatCombination(values: readonly number[]): string {
  return values.join(', ');
}

export function formatOperator(op: Operator): string {
  return OPERATOR_SYMBOLS[op];
}

export function formatResult(values: readonly number[], op: Operator, target: number): string {
  return `${values.join(` ${formatOperator(op)} `)} = ${String(target)}`;
}
