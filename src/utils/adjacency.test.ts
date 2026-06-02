import {
  describe,
  expect,
  it
} from 'vitest';

import type { Cell } from '../types';

import {
  isConnected,
  isOrthogonallyAdjacent
} from './adjacency';

describe('isOrthogonallyAdjacent', () => {
  it('returns true for horizontally adjacent cells', () => {
    expect(isOrthogonallyAdjacent({ col: 0, row: 0 }, { col: 1, row: 0 })).toBe(true);
  });

  it('returns true for vertically adjacent cells', () => {
    expect(isOrthogonallyAdjacent({ col: 0, row: 0 }, { col: 0, row: 1 })).toBe(true);
  });

  it('returns false for diagonal cells', () => {
    expect(isOrthogonallyAdjacent({ col: 0, row: 0 }, { col: 1, row: 1 })).toBe(false);
  });

  it('returns false for non-adjacent cells', () => {
    expect(isOrthogonallyAdjacent({ col: 0, row: 0 }, { col: 2, row: 0 })).toBe(false);
  });

  it('returns false for same cell', () => {
    expect(isOrthogonallyAdjacent({ col: 0, row: 0 }, { col: 0, row: 0 })).toBe(false);
  });
});

describe('isConnected', () => {
  it('returns true for empty cells', () => {
    expect(isConnected([])).toBe(true);
  });

  it('returns true for single cell', () => {
    expect(isConnected([{ col: 0, row: 0 }])).toBe(true);
  });

  it('returns true for horizontal line', () => {
    const cells: Cell[] = [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 2, row: 0 }
    ];
    expect(isConnected(cells)).toBe(true);
  });

  it('returns true for L-shape', () => {
    const cells: Cell[] = [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 }
    ];
    expect(isConnected(cells)).toBe(true);
  });

  it('returns true for T-shape', () => {
    const cells: Cell[] = [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 2, row: 0 },
      { col: 1, row: 1 }
    ];
    expect(isConnected(cells)).toBe(true);
  });

  it('returns false for disconnected cells', () => {
    const cells: Cell[] = [
      { col: 0, row: 0 },
      { col: 2, row: 2 }
    ];
    expect(isConnected(cells)).toBe(false);
  });

  it('returns false for diagonally connected cells', () => {
    const cells: Cell[] = [
      { col: 0, row: 0 },
      { col: 1, row: 1 }
    ];
    expect(isConnected(cells)).toBe(false);
  });

  it('returns true for 2x2 square', () => {
    const cells: Cell[] = [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 },
      { col: 1, row: 1 }
    ];
    expect(isConnected(cells)).toBe(true);
  });
});
