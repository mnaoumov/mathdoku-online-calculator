export type CageShape = readonly Cell[];

export interface Cell {
  readonly col: number;
  readonly row: number;
}

/* eslint-disable no-magic-numbers -- Grid size literal union. */
export type GridSize = 4 | 5 | 6 | 7 | 8 | 9;

export const GRID_SIZES: readonly GridSize[] = [4, 5, 6, 7, 8, 9] as const;
/* eslint-enable no-magic-numbers -- Grid size literal union. */

export const MIN_GRID_SIZE: GridSize = GRID_SIZES[0]!;
export const MAX_GRID_SIZE: GridSize = GRID_SIZES[GRID_SIZES.length - 1]!;
