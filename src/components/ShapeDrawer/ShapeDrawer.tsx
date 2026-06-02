import type { ReactElement } from 'react';

import { useMemo } from 'react';

import type { CageShape } from '../../types';

import { cellKey } from '../../utils/adjacency';
import './ShapeDrawer.css';

const MAX_CANVAS_SIZE = 6;

interface CellBorders {
  bottom: boolean;
  left: boolean;
  right: boolean;
  top: boolean;
}

interface ShapeDrawerProps {
  gridSize: number;
  isConnected: boolean;
  onClear: () => void;
  onToggleCell: (row: number, col: number) => void;
  selectedCells: ReadonlyMap<string, number>;
  shape: CageShape;
}

export function ShapeDrawer({
  gridSize,
  isConnected,
  onClear,
  onToggleCell,
  selectedCells,
  shape
}: ShapeDrawerProps): ReactElement {
  const canvasSize = Math.min(gridSize, MAX_CANVAS_SIZE);

  const selectedKeys = useMemo(() => new Set(selectedCells.keys()), [selectedCells]);

  const borderMap = useMemo(() => {
    const map = new Map<string, CellBorders>();
    for (const key of selectedKeys) {
      const parts = key.split(',');
      const row = Number(parts[0]);
      const col = Number(parts[1]);
      map.set(key, {
        bottom: !selectedKeys.has(cellKey({ col, row: row + 1 })),
        left: !selectedKeys.has(cellKey({ col: col - 1, row })),
        right: !selectedKeys.has(cellKey({ col: col + 1, row })),
        top: !selectedKeys.has(cellKey({ col, row: row - 1 }))
      });
    }
    return map;
  }, [selectedKeys]);

  const rows = Array.from({ length: canvasSize }, (_, i) => i);
  const cols = Array.from({ length: canvasSize }, (_, i) => i);

  return (
    <div className='shape-drawer'>
      <div className='shape-drawer__header'>
        <label className='shape-drawer__label'>Cage Shape</label>
        {shape.length > 0 && (
          <button
            className='shape-drawer__clear-btn'
            onClick={onClear}
            type='button'
          >
            Clear
          </button>
        )}
      </div>

      <div
        className='shape-drawer__grid'
        style={{ '--grid-cols': canvasSize } as React.CSSProperties}
      >
        {rows.map((row) =>
          cols.map((col) => {
            const key = cellKey({ col, row });
            const isSelected = selectedKeys.has(key);
            const order = selectedCells.get(key);
            const borders = borderMap.get(key);

            const borderClasses = isSelected && borders
              ? [
                borders.top ? 'border-top' : '',
                borders.bottom ? 'border-bottom' : '',
                borders.left ? 'border-left' : '',
                borders.right ? 'border-right' : ''
              ]
                .filter(Boolean)
                .join(' ')
              : '';

            return (
              <button
                aria-label={`Cell row ${String(row + 1)}, column ${String(col + 1)}${isSelected ? `, selected as position ${String((order ?? 0) + 1)}` : ''}`}
                aria-pressed={isSelected}
                className={`shape-drawer__cell ${isSelected ? 'shape-drawer__cell--selected' : ''} ${borderClasses}`}
                key={key}
                onClick={() => {
                  onToggleCell(row, col);
                }}
                type='button'
              >
                {isSelected && order !== undefined ? order + 1 : ''}
              </button>
            );
          })
        )}
      </div>

      <div className='shape-drawer__info'>
        {shape.length === 0 && (
          <span className='shape-drawer__hint'>
            Tap cells to draw the cage shape
          </span>
        )}
        {shape.length > 0 && !isConnected && (
          <span className='shape-drawer__warning'>
            Cells must be orthogonally connected
          </span>
        )}
        {shape.length > 0 && isConnected && (
          <span className='shape-drawer__status'>
            {shape.length} cell{shape.length === 1 ? '' : 's'} selected
          </span>
        )}
      </div>
    </div>
  );
}
