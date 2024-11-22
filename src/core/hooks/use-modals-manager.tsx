import { useReducer, useCallback, useMemo } from 'react';

type ModalKey = string;

type ModalArgs = Record<string, string>;

type ModalDefinition = {
  [key in ModalKey]: ModalArgs;
};

type ModalState = Record<ModalKey, { isOpen: boolean; args?: ModalArgs }>;

type Action =
  | { type: 'SET_MODAL'; key: ModalKey; value: ModalArgs }
  | { type: 'CLOSE_MODAL'; key: ModalKey }
  | { type: 'OPEN_MODAL'; key: ModalKey }
  | { type: 'CLOSE_ALL_MODALS' };

const modalReducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case 'SET_MODAL':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          args: action.value,
        },
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        [action.key]: { ...state[action.key], isOpen: true },
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        [action.key]: { ...state[action.key], isOpen: false },
      };
    case 'CLOSE_ALL_MODALS':
      return Object.keys(state).reduce(
        (acc, key) => ({
          ...acc,
          [key]: { ...state[key], isOpen: false },
        }),
        {}
      );
    default:
      return state;
  }
};

const useModalsManager = (modalDefinitions: ModalDefinition) => {
  const initialState: ModalState = useMemo(
    () =>
      Object.keys(modalDefinitions).reduce(
        (acc, key) => ({
          ...acc,
          [key]: { isOpen: false, args: modalDefinitions[key] },
        }),
        {}
      ),
    [modalDefinitions]
  );

  const [state, dispatch] = useReducer(modalReducer, initialState);

  const get = useCallback(
    (key: ModalKey) => state[key] || { isOpen: false, args: {} },
    [state]
  );

  const set = useCallback((key: ModalKey, args: ModalArgs) => {
    dispatch({ type: 'SET_MODAL', key, value: args });
  }, []);

  const close = useCallback((key: ModalKey) => {
    dispatch({ type: 'CLOSE_MODAL', key });
  }, []);

  const closeAll = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL_MODALS' });
  }, []);

  const open = useCallback((key: ModalKey) => {
    dispatch({ type: 'OPEN_MODAL', key });
  }, []);

  return useMemo(
    () => ({ get, set, close, open, closeAll }),
    [get, set, close, open, closeAll]
  );
};

export default useModalsManager;
