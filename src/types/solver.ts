import type {
  CageShape,
  GridSize
} from './grid';
import type {
  Operator,
  OperatorOrUnknown
} from './operator';

export type Combination = readonly number[];

export interface SolverInput {
  readonly gridSize: GridSize;
  readonly operator: OperatorOrUnknown;
  readonly shape: CageShape;
  readonly target: number;
}

export interface SolverResult {
  readonly combinations: readonly ValidCombination[];
  readonly elapsedMs: number;
  readonly possiblePerCell: readonly ReadonlySet<number>[];
  readonly totalCount: number;
}

export interface ValidCombination {
  readonly operator: Operator;
  readonly values: Combination;
}
