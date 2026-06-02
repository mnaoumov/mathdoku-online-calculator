export type Operator = '-' | '\u00d7' | '\u00f7' | '+';
export type OperatorOrUnknown = 'unknown' | Operator;

export const OPERATORS: readonly Operator[] = ['+', '-', '\u00d7', '\u00f7'] as const;

export const OPERATOR_LABELS: Readonly<Record<OperatorOrUnknown, string>> = {
  '-': 'Subtract (\u2212)',
  '+': 'Add (+)',
  '\u00f7': 'Divide (\u00f7)',
  '\u00d7': 'Multiply (\u00d7)',
  'unknown': 'Unknown (?)'
} as const;

export const OPERATOR_SYMBOLS: Readonly<Record<OperatorOrUnknown, string>> = {
  '-': '\u2212',
  '+': '+',
  '\u00f7': '\u00f7',
  '\u00d7': '\u00d7',
  'unknown': '?'
} as const;
