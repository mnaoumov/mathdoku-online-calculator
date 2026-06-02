export interface ConstraintPair {
  readonly i: number;
  readonly j: number;
  readonly kind: 'same-col' | 'same-row';
}

export type ConstraintSet = readonly ConstraintPair[];
