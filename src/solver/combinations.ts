import type {
  Combination,
  Operator
} from '../types';

export function generateCandidates(
  gridSize: number,
  cageSize: number,
  target: number,
  operator: Operator
): Combination[] {
  if (cageSize <= 0) {
    return [];
  }

  if (cageSize === 1) {
    if (target >= 1 && target <= gridSize) {
      return [[target]];
    }
    return [];
  }

  switch (operator) {
    case '-':
      return generateSubtractCandidates(gridSize, target);
    case '+':
      return generateAddCandidates(gridSize, cageSize, target);
    case '\u00f7':
      return generateDivideCandidates(gridSize, target);
    case '\u00d7':
      return generateMultiplyCandidates(gridSize, cageSize, target);
    default:
      return [];
  }
}

function generateAddCandidates(
  gridSize: number,
  cageSize: number,
  target: number
): Combination[] {
  const results: Combination[] = [];

  function recurse(current: number[], depth: number, currentSum: number): void {
    if (depth === cageSize) {
      if (currentSum === target) {
        results.push([...current]);
      }
      return;
    }

    const remaining = cageSize - depth;
    for (let v = 1; v <= gridSize; v++) {
      const newSum = currentSum + v;
      // Prune: if remaining cells all have minimum value 1, can we still reach target?
      if (newSum + (remaining - 1) > target) {
        break;
      }
      // Prune: if remaining cells all have maximum value, can we reach target?
      if (newSum + (remaining - 1) * gridSize < target) {
        continue;
      }

      current.push(v);
      recurse(current, depth + 1, newSum);
      current.pop();
    }
  }

  recurse([], 0, 0);
  return results;
}

function generateDivideCandidates(
  gridSize: number,
  target: number
): Combination[] {
  const results: Combination[] = [];
  for (let a = 1; a <= gridSize; a++) {
    for (let b = 1; b <= gridSize; b++) {
      const max = Math.max(a, b);
      const min = Math.min(a, b);
      if (min !== 0 && max % min === 0 && max / min === target) {
        results.push([a, b]);
      }
    }
  }
  return results;
}

function generateMultiplyCandidates(
  gridSize: number,
  cageSize: number,
  target: number
): Combination[] {
  const results: Combination[] = [];

  function recurse(current: number[], depth: number, currentProduct: number): void {
    if (depth === cageSize) {
      if (currentProduct === target) {
        results.push([...current]);
      }
      return;
    }

    for (let v = 1; v <= gridSize; v++) {
      const newProduct = currentProduct * v;
      // Prune: product can only grow (all values >= 1), so if already exceeded, stop
      if (newProduct > target) {
        break;
      }

      current.push(v);
      recurse(current, depth + 1, newProduct);
      current.pop();
    }
  }

  recurse([], 0, 1);
  return results;
}

function generateSubtractCandidates(
  gridSize: number,
  target: number
): Combination[] {
  const results: Combination[] = [];
  for (let a = 1; a <= gridSize; a++) {
    for (let b = 1; b <= gridSize; b++) {
      if (Math.abs(a - b) === target) {
        results.push([a, b]);
      }
    }
  }
  return results;
}
