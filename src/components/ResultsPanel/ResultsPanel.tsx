import type { ReactElement } from 'react';

import type {
  Operator,
  SolverResult,
  ValidCombination
} from '../../types';

import { OPERATOR_SYMBOLS } from '../../types';
import './ResultsPanel.css';

interface ResultsPanelProps {
  cageSize: number;
  isComputing: boolean;
  result: null | SolverResult;
}

export function ResultsPanel({ cageSize, isComputing, result }: ResultsPanelProps): null | ReactElement {
  if (cageSize === 0) {
    return (
      <div className='results-panel'>
        <p className='results-panel__empty'>
          Draw a cage shape above to see valid combinations.
        </p>
      </div>
    );
  }

  if (isComputing) {
    return (
      <div className='results-panel'>
        <p className='results-panel__computing'>Computing...</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className='results-panel'>
      <div className='results-panel__summary'>
        <span className='results-panel__count'>
          {result.totalCount} combination{result.totalCount === 1 ? '' : 's'} found
        </span>
        <span className='results-panel__time'>
          {result.elapsedMs.toFixed(1)}ms
        </span>
      </div>

      {result.totalCount > 0 && (
        <>
          <CellValueSummary possiblePerCell={result.possiblePerCell} />
          <CombinationList combinations={result.combinations} />
        </>
      )}

      {result.totalCount === 0 && (
        <p className='results-panel__none'>
          No valid combinations exist for these constraints.
        </p>
      )}
    </div>
  );
}

function CellValueSummary({
  possiblePerCell
}: {
  possiblePerCell: readonly ReadonlySet<number>[];
}): ReactElement {
  return (
    <div className='cell-summary'>
      <h3 className='cell-summary__title'>Possible values per cell</h3>
      <div className='cell-summary__grid'>
        {possiblePerCell.map((values, idx) => (
          <div className='cell-summary__cell' key={idx}>
            <span className='cell-summary__cell-label'>{idx + 1}</span>
            <span className='cell-summary__cell-values'>
              {[...values].sort((a, b) => a - b).join(', ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CombinationCard({ values }: { values: readonly number[] }): ReactElement {
  return (
    <div className='combination-card'>
      {values.map((v, idx) => (
        <span className='combination-card__value' key={idx}>
          {v}
        </span>
      ))}
    </div>
  );
}

function CombinationList({
  combinations
}: {
  combinations: readonly ValidCombination[];
}): ReactElement {
  // Group by operator
  const grouped = new Map<Operator, ValidCombination[]>();
  for (const combo of combinations) {
    const existing = grouped.get(combo.operator);
    if (existing) {
      existing.push(combo);
    } else {
      grouped.set(combo.operator, [combo]);
    }
  }

  const groups = [...grouped.entries()];

  return (
    <div className='combination-list'>
      {groups.map(([op, combos]) => (
        <div className='combination-list__group' key={op}>
          {groups.length > 1 && (
            <h4 className='combination-list__group-title'>
              {OPERATOR_SYMBOLS[op]} ({combos.length})
            </h4>
          )}
          <div className='combination-list__items'>
            {combos.map((combo, idx) => <CombinationCard key={idx} values={combo.values} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
