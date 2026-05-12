import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "registered_activities";

function getRegisteredFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

let snapshot = getRegisteredFromStorage();
let listeners: (() => void)[] = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      emitChange();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot() {
  return snapshot;
}

const emptySet = new Set<string>();

function getServerSnapshot() {
  return emptySet;
}

function emitChange() {
  snapshot = getRegisteredFromStorage();
  for (const l of listeners) l();
}

function saveRegistered(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  emitChange();
}

export function useRegisteredActivities() {
  const registered = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isRegistered = useCallback(
    (slug: string) => registered.has(slug),
    [registered],
  );

  const register = useCallback((slug: string) => {
    const set = getRegisteredFromStorage();
    set.add(slug);
    saveRegistered(set);
  }, []);

  const unregister = useCallback((slug: string) => {
    const set = getRegisteredFromStorage();
    set.delete(slug);
    saveRegistered(set);
  }, []);

  return { registered, isRegistered, register, unregister };
}

