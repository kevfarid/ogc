import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import type { PersistOptions, PersistStorage } from 'zustand/middleware';
import { devtools, persist } from 'zustand/middleware';

interface Options extends PersistOptions<PersistStorage<unknown>> {
  hydrate?: boolean;
}

export default function createStore<T>(
  callback: StateCreator<T>,
  options?: Options
) {
  const { hydrate = false, ...rest } = options || {};

  const store = create<T>()(
    devtools(
      persist(callback, {
        ...rest,
      } as PersistOptions<T>)
    )
  );

  const storeWithoutPersist = create<T>()(devtools(callback));

  return hydrate ? store : storeWithoutPersist;
}
