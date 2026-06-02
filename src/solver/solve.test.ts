import {
  describe,
  expect,
  it
} from 'vitest';

import type { SolverInput } from '../types';

import { solve } from './solve';

describe('solve', () => {
  it('finds all valid combos for a horizontal pair with addition', () => {
    // Grid 4x4, horizontal pair, target 5
    const input: SolverInput = {
      gridSize: 4,
      operator: '+',
      shape: [
        { col: 0, row: 0 },
        { col: 1, row: 0 }
      ],
      target: 5
    };
    const result = solve(input);
    // Same row → must be distinct. Pairs summing to 5: (1,4), (4,1), (2,3), (3,2)
    expect(result.totalCount).toBe(4);
    const values = result.combinations.map((c) => c.values);
    expect(values).toEqual(
      expect.arrayContaining([[1, 4], [4, 1], [2, 3], [3, 2]])
    );
  });

  it('finds valid combos for subtraction pair', () => {
    const input: SolverInput = {
      gridSize: 4,
      operator: '-',
      shape: [
        { col: 0, row: 0 },
        { col: 1, row: 0 }
      ],
      target: 3
    };
    const result = solve(input);
    // |a-b| = 3 with a,b in [1..4] and a != b (same row)
    // (1,4), (4,1)
    expect(result.totalCount).toBe(2);
  });

  it('allows duplicate values in L-shape when cells dont share row/col', () => {
    // L-shape:
    // O-o  (row 0, col 0 and col 1)
    // |
    // O    (row 1, col 0)
    const input: SolverInput = {
      gridSize: 6,
      operator: '+',
      shape: [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 0, row: 1 }
      ],
      target: 6
    };
    const result = solve(input);
    // Check that some combos have cell[1] == cell[2] (they share neither row nor col)
    const hasDuplicateInUnconstrained = result.combinations.some(
      (c) => c.values[1] === c.values[2]
    );
    expect(hasDuplicateInUnconstrained).toBe(true);
  });

  it('returns no results for subtraction with 3+ cells', () => {
    const input: SolverInput = {
      gridSize: 6,
      operator: '-',
      shape: [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 2, row: 0 }
      ],
      target: 2
    };
    const result = solve(input);
    expect(result.totalCount).toBe(0);
  });

  it('handles single-cell cage', () => {
    const input: SolverInput = {
      gridSize: 6,
      operator: '+',
      shape: [{ col: 0, row: 0 }],
      target: 4
    };
    const result = solve(input);
    expect(result.totalCount).toBe(1);
    expect(result.combinations[0]?.values).toEqual([4]);
  });

  it('handles empty shape', () => {
    const input: SolverInput = {
      gridSize: 6,
      operator: '+',
      shape: [],
      target: 5
    };
    const result = solve(input);
    expect(result.totalCount).toBe(0);
  });

  it('tries all operators when operator is unknown', () => {
    const input: SolverInput = {
      gridSize: 6,
      operator: 'unknown',
      shape: [
        { col: 0, row: 0 },
        { col: 1, row: 0 }
      ],
      target: 2
    };
    const result = solve(input);
    // Should include results from +, -, ×, ÷
    const operators = new Set(result.combinations.map((c) => c.operator));
    // Target=2: + gives pairs summing to 2 (only [1,1] but same-row so excluded? No: 1!=1 fails)
    // Actually [1,1] is filtered because same row. So + gives nothing for target=2 in 6x6? No wait.
    // For +: pairs summing to 2 from [1..6] = (1,1) only, but same row means 1 != 1 fails. So 0 results.
    // For -: |a-b|=2, distinct: (1,3),(3,1),(2,4),(4,2),(3,5),(5,3),(4,6),(6,4) = 8 results
    // For ×: pairs with product 2 from [1..6] = (1,2),(2,1), distinct (same row) both are fine = 2 results
    // For ÷: max/min=2: (1,2),(2,1),(2,4),(4,2),(3,6),(6,3), all distinct = 6 results
    expect(operators.size).toBeGreaterThanOrEqual(2);
    expect(result.totalCount).toBeGreaterThan(0);
  });

  it('computes possiblePerCell correctly', () => {
    const input: SolverInput = {
      gridSize: 4,
      operator: '+',
      shape: [
        { col: 0, row: 0 },
        { col: 1, row: 0 }
      ],
      target: 3
    };
    const result = solve(input);
    // Pairs summing to 3, distinct (same row): (1,2), (2,1)
    expect(result.totalCount).toBe(2);
    expect(result.possiblePerCell[0]).toEqual(new Set([1, 2]));
    expect(result.possiblePerCell[1]).toEqual(new Set([1, 2]));
  });

  it('handles division with grid size 6', () => {
    const input: SolverInput = {
      gridSize: 6,
      operator: '÷',
      shape: [
        { col: 0, row: 0 },
        { col: 0, row: 1 }
      ],
      target: 3
    };
    const result = solve(input);
    // Same column → must be distinct. max/min=3:
    // (1,3), (3,1), (2,6), (6,2) → all distinct ✓
    expect(result.totalCount).toBe(4);
  });
});
