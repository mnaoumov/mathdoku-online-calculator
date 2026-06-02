import {
  useCallback,
  useMemo,
  useState
} from 'react';

import type { CageShape } from '../types';

import {
  cellKey,
  isConnected
} from '../utils/adjacency';

interface UseShapeDrawerReturn {
  clearAll: () => void;
  isShapeConnected: boolean;
  selectedCells: ReadonlyMap<string, number>;
  shape: CageShape;
  toggleCell: (row: number, col: number) => void;
}

export function useShapeDrawer(): UseShapeDrawerReturn {
  // Map from cell key "row,col" to selection order (0-indexed)
  const [selectedCells, setSelectedCells] = useState<ReadonlyMap<string, number>>(
    () => new Map()
  );

  const shape: CageShape = useMemo(() => {
    const entries = [...selectedCells.entries()].sort(
      ([, orderA], [, orderB]) => orderA - orderB
    );

    return entries.map(([key]) => {
      const parts = key.split(',');
      return {
        col: Number(parts[1]),
        row: Number(parts[0])
      };
    });
  }, [selectedCells]);

  const isShapeConnected = useMemo(() => isConnected(shape), [shape]);

  const toggleCell = useCallback((row: number, col: number) => {
    const key = cellKey({ col, row });

    setSelectedCells((prev) => {
      const next = new Map(prev);
      if (next.has(key)) {
        // Remove cell and reindex remaining cells
        const removedOrder = next.get(key)!;
        next.delete(key);

        // Reindex: shift down orders that were after the removed one
        for (const [k, order] of next) {
          if (order > removedOrder) {
            next.set(k, order - 1);
          }
        }
      } else {
        next.set(key, next.size);
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedCells(new Map());
  }, []);

  return {
    clearAll,
    isShapeConnected,
    selectedCells,
    shape,
    toggleCell
  };
}
