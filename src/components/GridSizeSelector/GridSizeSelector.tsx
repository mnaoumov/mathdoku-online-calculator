import type { ReactElement } from 'react';

import type { GridSize } from '../../types';

import { GRID_SIZES } from '../../types';
import './GridSizeSelector.css';

interface GridSizeSelectorProps {
  onChange: (size: GridSize) => void;
  value: GridSize;
}

export function GridSizeSelector({ onChange, value }: GridSizeSelectorProps): ReactElement {
  return (
    <div className='grid-size-selector'>
      <label className='grid-size-selector__label'>Grid Size</label>
      <div className='grid-size-selector__buttons'>
        {GRID_SIZES.map((size) => (
          <button
            aria-pressed={size === value}
            className={`grid-size-selector__button ${size === value ? 'grid-size-selector__button--active' : ''}`}
            key={size}
            onClick={() => {
              onChange(size);
            }}
            type='button'
          >
            {size}&times;{size}
          </button>
        ))}
      </div>
    </div>
  );
}
