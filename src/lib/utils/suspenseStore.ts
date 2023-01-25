import { notFound } from "next/navigation";

export type SuspenseDataType<T> =
  | { type: "pending"; promise: Promise<T> }
  | { type: "resolved"; value: T };
export type Cache<T, A extends any[]> = {
  get(...args: A): SuspenseDataType<T>;
};

export function createCache<T, A extends any[]>(
  fetcher: (...args: A) => Promise<T>,
): Cache<T, A> {
  const cache = new Map<string, SuspenseDataType<T>>();
  return {
    get(...args) {
      const key = JSON.stringify(args);
      let value = cache.get(key);
      if (value === undefined) {
        value = {
          type: "pending",
          promise: fetcher(...args).then((value) => {
            cache.set(key, { type: "resolved", value });
            return value;
          }),
        };
        cache.set(key, value);
      }

      return value;
    },
  };
}

export function useCacheValue<T>(value: SuspenseDataType<T>): T {
  switch (value.type) {
    case "resolved":
      return value.value;
    case "pending":
      throw value.promise;
  }
}
