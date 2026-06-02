import {
  describe,
  expect,
  it
} from 'vitest';

import { generateCandidates } from './combinations';

describe('generateCandidates', () => {
  describe('addition', () => {
    it('generates all pairs summing to 5 in a 4x4 grid', () => {
      const results = generateCandidates(4, 2, 5, '+');
      // Pairs from [1..4] summing to 5: (1,4), (2,3), (3,2), (4,1)
      expect(results).toHaveLength(4);
      expect(results).toEqual(
        expect.arrayContaining([[1, 4], [2, 3], [3, 2], [4, 1]])
      );
    });

    it('generates triples summing to 6 in a 4x4 grid', () => {
      const results = generateCandidates(4, 3, 6, '+');
      // All triples from [1..4] summing to 6:
      // (1,1,4), (1,2,3), (1,3,2), (1,4,1),
      // (2,1,3), (2,2,2), (2,3,1),
      // (3,1,2), (3,2,1),
      // (4,1,1)
      expect(results).toHaveLength(10);
    });

    it('returns empty for impossible target', () => {
      expect(generateCandidates(4, 2, 9, '+')).toHaveLength(0);
    });
  });

  describe('multiplication', () => {
    it('generates pairs with product 6 in a 6x6 grid', () => {
      const results = generateCandidates(6, 2, 6, '×');
      // (1,6), (2,3), (3,2), (6,1)
      expect(results).toHaveLength(4);
    });

    it('generates triples with product 12 in a 6x6 grid', () => {
      const results = generateCandidates(6, 3, 12, '×');
      // (1,2,6), (1,3,4), (1,4,3), (1,6,2), (2,1,6), (2,2,3), (2,3,2), (2,6,1),
      // (3,1,4), (3,2,2), (3,4,1), (4,1,3), (4,3,1), (6,1,2), (6,2,1)
      expect(results).toHaveLength(15);
    });
  });

  describe('subtraction', () => {
    it('generates pairs with difference 2 in a 4x4 grid', () => {
      const results = generateCandidates(4, 2, 2, '-');
      // |1-3|=2, |2-4|=2, |3-1|=2, |4-2|=2
      expect(results).toHaveLength(4);
    });

    it('returns empty for impossible target', () => {
      expect(generateCandidates(4, 2, 5, '-')).toHaveLength(0);
    });
  });

  describe('division', () => {
    it('generates pairs with quotient 2 in a 6x6 grid', () => {
      const results = generateCandidates(6, 2, 2, '÷');
      // (1,2), (2,1), (2,4), (3,6), (4,2), (6,3)
      expect(results).toHaveLength(6);
    });

    it('returns empty for impossible quotient', () => {
      expect(generateCandidates(4, 2, 5, '÷')).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('returns single value for cage size 1', () => {
      expect(generateCandidates(6, 1, 3, '+')).toEqual([[3]]);
    });

    it('returns empty for cage size 0', () => {
      expect(generateCandidates(6, 0, 0, '+')).toHaveLength(0);
    });

    it('returns empty when target exceeds grid size for single cell', () => {
      expect(generateCandidates(4, 1, 5, '+')).toHaveLength(0);
    });
  });
});
