import { useCallback, useState } from 'react';

export function useModalState<T>(initialState?: T) {
  const [state, setState] = useState<T | undefined>(initialState);
  const open = useCallback(
    (newState?: T) => setState(newState ?? (true as T)),
    [],
  );
  const close = useCallback(() => setState(undefined), []);
  return { data: state, isOpen: Boolean(state), open, close };
}
