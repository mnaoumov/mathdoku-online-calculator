# Mathdoku Online Calculator

A web-based calculator that finds every valid number combination for a single cage in a [Mathdoku / KenKen](https://en.wikipedia.org/wiki/KenKen) puzzle.

Draw the cage shape, pick the target value and operator, and the solver lists every combination that satisfies the puzzle's row/column uniqueness rules — together with the set of possible values for each individual cell.

## Features

- **Configurable grid size** — 4 x 4 through 9 x 9.
- **Visual shape drawer** — click cells to build a connected cage of any orthogonally connected shape.
- **Cage configuration** — set the target value and pick an operator: `+`, `-`, `×`, `÷`, or `?` (unknown — tries them all).
- **Live solving** — results recompute automatically whenever the inputs change.
- **Per-cell candidate sets** — for each cell in the cage, see exactly which digits can still appear across all valid combinations.
- **Mathdoku-correct constraints** — values inside a single row or column of the cage must be distinct, matching real puzzle rules.
- **Subtract / divide handling** — these operators are only enumerated for 2-cell cages, as in standard Mathdoku.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/) for dev server and bundling
- [Vitest](https://vitest.dev/) for unit tests
- [ESLint](https://eslint.org/) (typescript-eslint, perfectionist, react-hooks, react-refresh, stylistic, eslint-comments)
- [dprint](https://dprint.dev/) for formatting
- [cspell](https://cspell.org/) for spellcheck

## Getting started

```sh
npm install
npm run dev
```

Then open the URL printed by Vite (typically `http://localhost:5173`).

## Scripts

| Script         | What it does                                                |
|----------------|-------------------------------------------------------------|
| `dev`          | Start the Vite dev server with HMR.                         |
| `build`        | Type-check the project and produce a production bundle.     |
| `preview`      | Serve the production bundle locally.                        |
| `test`         | Run the Vitest unit-test suite.                             |
| `lint`         | Run ESLint over the repo.                                   |
| `lint:fix`     | Run ESLint with autofix.                                    |
| `format`       | Format the codebase with dprint.                            |
| `format:check` | Check formatting without writing changes.                   |
| `spellcheck`   | Run cspell across the repo.                                 |
| `check`        | Run spellcheck + lint + format check + build (CI gate).     |

## Project layout

```
src/
  App.tsx          Top-level layout and state wiring.
  components/      UI: GridSizeSelector, CageConfigurator, ShapeDrawer, ResultsPanel.
  hooks/           useShapeDrawer (cage drawing), useSolver (solver integration).
  solver/          Pure solver: candidate generation, operator handling, constraints.
  types/           Shared domain types (grid, operator, solver I/O, constraints).
  utils/           Adjacency check, formatting helpers.
```

Unit tests live next to the source file they cover (e.g., `solver/solve.ts` is tested by `solver/solve.test.ts`).

The solver lives in `src/solver/` and is independent of React — it takes a `SolverInput` (`gridSize`, `shape`, `target`, `operator`) and returns a `SolverResult` with all valid combinations, per-cell candidate sets, and timing.
