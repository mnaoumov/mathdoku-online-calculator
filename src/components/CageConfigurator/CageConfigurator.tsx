import type { ReactElement } from 'react';

import type { OperatorOrUnknown } from '../../types';

import {
  OPERATOR_SYMBOLS,
  OPERATORS
} from '../../types';
import './CageConfigurator.css';

const RADIX = 10;

interface CageConfiguratorProps {
  onOperatorChange: (op: OperatorOrUnknown) => void;
  onTargetChange: (target: number) => void;
  operator: OperatorOrUnknown;
  target: number;
}

const ALL_OPERATORS: readonly OperatorOrUnknown[] = [...OPERATORS, 'unknown'];

export function CageConfigurator({
  onOperatorChange,
  onTargetChange,
  operator,
  target
}: CageConfiguratorProps): ReactElement {
  return (
    <div className="cage-configurator">
      <div className="cage-configurator__field">
        <label className="cage-configurator__label" htmlFor="cage-target">
          Target Value
        </label>
        <input
          className="cage-configurator__input"
          id="cage-target"
          inputMode="numeric"
          min={0}
          onChange={(e) => {
            const val = parseInt(e.target.value, RADIX);
            if (!isNaN(val) && val >= 0) {
              onTargetChange(val);
            }
          }}
          type="number"
          value={target}
        />
      </div>

      <div className="cage-configurator__field">
        <label className="cage-configurator__label">Operator</label>
        <div className="cage-configurator__operators">
          {ALL_OPERATORS.map((op) => (
            <button
              aria-pressed={op === operator}
              className={`cage-configurator__op-button ${op === operator ? 'cage-configurator__op-button--active' : ''}`}
              key={op}
              onClick={() => {
                onOperatorChange(op);
              }}
              title={op === 'unknown' ? 'Try all operators' : undefined}
              type="button"
            >
              {OPERATOR_SYMBOLS[op]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
