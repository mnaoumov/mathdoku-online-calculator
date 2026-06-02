import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import type {
  SolverInput,
  SolverResult
} from '../types';

import { solve } from '../solver';

const DEBOUNCE_MS = 100;

interface UseSolverReturn {
  compute: (input: SolverInput) => void;
  isComputing: boolean;
  result: null | SolverResult;
}

export function useSolver(): UseSolverReturn {
  const [result, setResult] = useState<null | SolverResult>(null);
  const [isComputing, setIsComputing] = useState(false);
  const debounceRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return (): void => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const compute = useCallback((input: SolverInput): void => {
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }

    setIsComputing(true);

    debounceRef.current = setTimeout(() => {
      const solverResult = solve(input);
      setResult(solverResult);
      setIsComputing(false);
      debounceRef.current = null;
    }, DEBOUNCE_MS);
  }, []);

  return { compute, isComputing, result };
}
