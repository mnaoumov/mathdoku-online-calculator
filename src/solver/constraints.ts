import type {
  CageShape,
  Combination,
  ConstraintPair,
  ConstraintSet
} from '../types';

export function filterByConstraints(
  combinations: readonly Combination[],
  constraints: ConstraintSet
): Combination[] {
  return combinations.filter((combo) => constraints.every(({ i, j }) => combo[i] !== combo[j]));
}

export function getConstraintPairs(shape: CageShape): ConstraintSet {
  const pairs: ConstraintPair[] = [];

  for (let i = 0; i < shape.length; i++) {
    for (let j = i + 1; j < shape.length; j++) {
      const cellI = shape[i];
      const cellJ = shape[j];
      if (!cellI || !cellJ) {
        continue;
      }

      if (cellI.row === cellJ.row) {
        pairs.push({ i, j, kind: 'same-row' });
      }
      if (cellI.col === cellJ.col) {
        pairs.push({ i, j, kind: 'same-col' });
      }
    }
  }

  return pairs;
}
