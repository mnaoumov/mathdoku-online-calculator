import type { Operator } from '../types';

const PAIR_SIZE = 2;

export function evaluateForTarget(
  values: readonly number[],
  op: Operator,
  target: number
): boolean {
  switch (op) {
    case '-': {
      if (values.length !== PAIR_SIZE) {
        return false;
      }
      const [a, b] = values;
      if (a === undefined || b === undefined) {
        return false;
      }
      return Math.abs(a - b) === target;
    }

    case '+':
      return values.reduce((sum, v) => sum + v, 0) === target;

    case '\u00f7': {
      if (values.length !== PAIR_SIZE) {
        return false;
      }
      const [a, b] = values;
      if (a === undefined || b === undefined) {
        return false;
      }
      const max = Math.max(a, b);
      const min = Math.min(a, b);
      return min !== 0 && max % min === 0 && max / min === target;
    }

    case '\u00d7':
      return values.reduce((prod, v) => prod * v, 1) === target;

    default:
      return false;
  }
}
