import type { ReactElement } from 'react';

import {
  useEffect,
  useState
} from 'react';

import type {
  GridSize,
  OperatorOrUnknown,
  SolverInput
} from './types';

import { CageConfigurator } from './components/CageConfigurator/CageConfigurator';
import { GridSizeSelector } from './components/GridSizeSelector/GridSizeSelector';
import { ResultsPanel } from './components/ResultsPanel/ResultsPanel';
import { ShapeDrawer } from './components/ShapeDrawer/ShapeDrawer';
import { useShapeDrawer } from './hooks/useShapeDrawer';
import { useSolver } from './hooks/useSolver';
import './App.css';

const DEFAULT_GRID_SIZE: GridSize = 6;
const DEFAULT_TARGET = 10;

function App(): ReactElement {
  const [gridSize, setGridSize] = useState<GridSize>(DEFAULT_GRID_SIZE);
  const [target, setTarget] = useState(DEFAULT_TARGET);
  const [operator, setOperator] = useState<OperatorOrUnknown>('+');

  const { clearAll, isShapeConnected, selectedCells, shape, toggleCell } = useShapeDrawer();

  const { compute, isComputing, result } = useSolver();

  // Auto-compute when inputs change
  useEffect(() => {
    if (shape.length === 0 || !isShapeConnected) {
      return;
    }

    const input: SolverInput = {
      gridSize,
      operator,
      shape,
      target
    };

    compute(input);
  }, [gridSize, shape, target, operator, isShapeConnected, compute]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Mathdoku Calculator</h1>
        <p className="app__subtitle">
          Find all valid combinations for a KenKen cage
        </p>
      </header>

      <main className="app__main">
        <section className="app__config">
          <GridSizeSelector onChange={setGridSize} value={gridSize} />
          <CageConfigurator
            onOperatorChange={setOperator}
            onTargetChange={setTarget}
            operator={operator}
            target={target}
          />
        </section>

        <section className="app__shape">
          <ShapeDrawer
            gridSize={gridSize}
            isConnected={isShapeConnected}
            onClear={clearAll}
            onToggleCell={toggleCell}
            selectedCells={selectedCells}
            shape={shape}
          />
        </section>

        <section className="app__results">
          <ResultsPanel
            cageSize={shape.length}
            isComputing={isComputing}
            result={isShapeConnected ? result : null}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
