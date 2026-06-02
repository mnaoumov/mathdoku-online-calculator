import type {
  Operator,
  SolverInput,
  SolverResult,
  ValidCombination
} from '../types';

import { OPERATORS } from '../types';
import { generateCandidates } from './combinations';
import {
  filterByConstraints,
  getConstraintPairs
} from './constraints';

export function solve(input: SolverInput): SolverResult {
  const startTime = performance.now();
  const { gridSize, operator, shape, target } = input;
  const cageSize = shape.length;

  if (cageSize === 0) {
    return emptyResult(startTime);
  }

  const constraints = getConstraintPairs(shape);

  const operatorsToTry: readonly Operator[] = operator === 'unknown' ? OPERATORS : [operator];

  const allCombinations: ValidCombination[] = [];

  for (const op of operatorsToTry) {
    // Subtraction and division only work with 2-cell cages
    const PAIR_SIZE = 2;
    if ((op === '-' || op === '\u00f7') && cageSize > PAIR_SIZE) {
      continue;
    }

    const candidates = generateCandidates(gridSize, cageSize, target, op);
    const valid = filterByConstraints(candidates, constraints);

    for (const values of valid) {
      allCombinations.push({ operator: op, values });
    }
  }

  const possiblePerCell: Set<number>[] = Array.from(
    { length: cageSize },
    () => new Set<number>()
  );

  for (const combo of allCombinations) {
    combo.values.forEach((v, idx) => {
      possiblePerCell[idx]?.add(v);
    });
  }

  const elapsedMs = performance.now() - startTime;

  return {
    combinations: allCombinations,
    elapsedMs,
    possiblePerCell,
    totalCount: allCombinations.length
  };
}

function emptyResult(startTime: number): SolverResult {
  return {
    combinations: [],
    elapsedMs: performance.now() - startTime,
    possiblePerCell: [],
    totalCount: 0
  };
}
