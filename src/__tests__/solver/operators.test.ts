import {
  describe,
  expect,
  it
} from 'vitest';

import { evaluateForTarget } from '../../solver/operators';

describe('evaluateForTarget', () => {
  describe('addition', () => {
    it('returns true when values sum to target', () => {
      expect(evaluateForTarget([1, 2, 3], '+', 6)).toBe(true);
    });
    it('returns false when values do not sum to target', () => {
      expect(evaluateForTarget([1, 2, 3], '+', 7)).toBe(false);
    });
    it('works with single value', () => {
      expect(evaluateForTarget([5], '+', 5)).toBe(true);
    });
  });

  describe('multiplication', () => {
    it('returns true when product equals target', () => {
      expect(evaluateForTarget([2, 3, 4], '\u00d7', 24)).toBe(true);
    });
    it('returns false when product does not equal target', () => {
      expect(evaluateForTarget([2, 3, 4], '\u00d7', 25)).toBe(false);
    });
    it('handles multiplication by 1', () => {
      expect(evaluateForTarget([1, 1, 5], '\u00d7', 5)).toBe(true);
    });
  });

  describe('subtraction', () => {
    it('returns true for absolute difference matching target', () => {
      expect(evaluateForTarget([5, 2], '-', 3)).toBe(true);
      expect(evaluateForTarget([2, 5], '-', 3)).toBe(true);
    });
    it('returns false for non-matching difference', () => {
      expect(evaluateForTarget([5, 2], '-', 4)).toBe(false);
    });
    it('returns false for more than 2 cells', () => {
      expect(evaluateForTarget([5, 2, 1], '-', 2)).toBe(false);
    });
  });

  describe('division', () => {
    it('returns true when max/min equals target', () => {
      expect(evaluateForTarget([6, 2], '\u00f7', 3)).toBe(true);
      expect(evaluateForTarget([2, 6], '\u00f7', 3)).toBe(true);
    });
    it('returns false for non-integer division', () => {
      expect(evaluateForTarget([5, 2], '\u00f7', 2)).toBe(false);
    });
    it('returns false for more than 2 cells', () => {
      expect(evaluateForTarget([6, 2, 1], '\u00f7', 3)).toBe(false);
    });
  });
});
