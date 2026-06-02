import type { Cell } from '../types';

export function cellKey(cell: Cell): string {
  return `${String(cell.row)},${String(cell.col)}`;
}

export function isConnected(cells: readonly Cell[]): boolean {
  if (cells.length <= 1) {
    return true;
  }

  const key = (c: Cell): string => `${String(c.row)},${String(c.col)}`;
  const cellSet = new Set(cells.map(key));
  const visited = new Set<string>();

  const first = cells[0];
  if (!first) {
    return true;
  }

  const queue: Cell[] = [first];
  visited.add(key(first));

  const directions: readonly [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const [dr, dc] of directions) {
      const neighbor: Cell = { col: current.col + dc, row: current.row + dr };
      const nk = key(neighbor);
      if (cellSet.has(nk) && !visited.has(nk)) {
        visited.add(nk);
        queue.push(neighbor);
      }
    }
  }

  return visited.size === cells.length;
}

export function isOrthogonallyAdjacent(a: Cell, b: Cell): boolean {
  return (
    (Math.abs(a.row - b.row) === 1 && a.col === b.col)
    || (a.row === b.row && Math.abs(a.col - b.col) === 1)
  );
}

export function parseCellKey(key: string): Cell | null {
  const parts = key.split(',');
  const row = Number(parts[0]);
  const col = Number(parts[1]);
  if (isNaN(row) || isNaN(col)) {
    return null;
  }
  return { col, row };
}
