import {
  describe,
  expect,
  it
} from 'vitest';

import type {
  Cell,
  ConstraintSet
} from '../types';

import {
  filterByConstraints,
  getConstraintPairs
} from './constraints';

describe('getConstraintPairs', () => {
  it('returns all pairs for horizontal line (all same row)', () => {
    const shape: Cell[] = [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 2, row: 0 }
    ];
    const pairs = getConstraintPairs(shape);
    expect(pairs).toHaveLength(3);
    expect(pairs).toEqual(
      expect.arrayContaining([
        { i: 0, j: 1, kind: 'same-row' },
        { i: 0, j: 2, kind: 'same-row' },
        { i: 1, j: 2, kind: 'same-row' }
      ])
    );
  });

  it('returns all pairs for vertical line (all same column)', () => {
    const shape: Cell[] = [
      { col: 0, row: 0 },
      { col: 0, row: 1 },
      { col: 0, row: 2 }
    ];
    const pairs = getConstraintPairs(shape);
    expect(pairs).toHaveLength(3);
    expect(pairs).toEqual(
      expect.arrayContaining([
        { i: 0, j: 1, kind: 'same-col' },
        { i: 0, j: 2, kind: 'same-col' },
        { i: 1, j: 2, kind: 'same-col' }
      ])
    );
  });

  it('returns correct pairs for L-shape', () => {
    // O-o
    // |
    // O
    const shape: Cell[] = [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 }
    ];
    const pairs = getConstraintPairs(shape);
    // (0,0) and (0,1) share row 0
    // (0,0) and (1,0) share col 0
    // (0,1) and (1,0) share neither
    expect(pairs).toHaveLength(2);
    expect(pairs).toEqual(
      expect.arrayContaining([
        { i: 0, j: 1, kind: 'same-row' },
        { i: 0, j: 2, kind: 'same-col' }
      ])
    );
  });

  it('returns pairs for 2x2 square (all pairs constrained)', () => {
    const shape: Cell[] = [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 },
      { col: 1, row: 1 }
    ];
    const pairs = getConstraintPairs(shape);
    // (0,0)-(0,1): same-row
    // (0,0)-(1,0): same-col
    // (0,0)-(1,1): neither -- wait, no constraint here!
    // (0,1)-(1,0): neither
    // (0,1)-(1,1): same-col
    // (1,0)-(1,1): same-row
    expect(pairs).toHaveLength(4);
  });

  it('returns empty for single cell', () => {
    const shape: Cell[] = [{ col: 0, row: 0 }];
    expect(getConstraintPairs(shape)).toHaveLength(0);
  });

  it('returns empty for empty shape', () => {
    expect(getConstraintPairs([])).toHaveLength(0);
  });
});

describe('filterByConstraints', () => {
  it('filters out combinations where constrained cells have same value', () => {
    const constraints: ConstraintSet = [{ i: 0, j: 1, kind: 'same-row' }];
    const combos = [
      [1, 1, 3],
      [1, 2, 3],
      [2, 2, 1],
      [3, 1, 1]
    ];
    const filtered = filterByConstraints(combos, constraints);
    expect(filtered).toEqual([
      [1, 2, 3],
      [3, 1, 1]
    ]);
  });

  it('allows duplicates when cells are not constrained', () => {
    // L-shape: cells 1 and 2 share neither row nor column
    const constraints: ConstraintSet = [
      { i: 0, j: 1, kind: 'same-row' },
      { i: 0, j: 2, kind: 'same-col' }
    ];
    // [2, 3, 3] - cell0!=cell1 (2!=3 ✓), cell0!=cell2 (2!=3 ✓), cell1 and cell2 unconstrained
    const combos = [[2, 3, 3]];
    const filtered = filterByConstraints(combos, constraints);
    expect(filtered).toEqual([[2, 3, 3]]);
  });

  it('returns all combinations when no constraints', () => {
    const combos = [[1, 1], [1, 2], [2, 2]];
    const filtered = filterByConstraints(combos, []);
    expect(filtered).toEqual(combos);
  });
});
