import { ID } from '@local/types';
import 'react-testing-library';

declare module 'react' {
  export function memo<T, P>(
    component: T,
    areEqual?: (prevProps: P, nextProps: P) => boolean,
  ): T;

  export function useContext<T>(context: Context<T>): T;

  export function useState<T>(state: T): [T, (state: T | ((state: T) => T)) => void];

  export function useEffect(fn: () => void | (() => void), update: any[]): void;

  export function useMutationEffect(fn: () => void | (() => void), update: any[]): void;

  export function useLayoutEffect(fn: () => void | (() => void), update: any[]): void;

  export function useRef<T>(): { current: T };

  export function useReducer<S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S,
    initialAction?: A,
  ): [S, (action: A) => void];

  export function useCallback(fn: () => void, updateOn?: any[]): () => void;

  export function useMemo(fn: () => void, updateOn: any[]): () => void;
}

declare global {
  interface Glyph {
    id: ID;
    viewBox: string;
    content?: string;
    node?: Node;
  }
}
