import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "registered_activities";

function getRegistered(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

const emptySet = new Set<string>();

function getServerSnapshot(): Set<string> {
  return emptySet;
}

function saveRegistered(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

let listeners: (() => void)[] = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  for (const l of listeners) l();
}

export function useRegisteredActivities() {
  const registered = useSyncExternalStore(subscribe, getRegistered, getServerSnapshot);

  const isRegistered = useCallback(
    (slug: string) => registered.has(slug),
    [registered],
  );

  const register = useCallback((slug: string) => {
    const set = getRegistered();
    set.add(slug);
    saveRegistered(set);
    emitChange();
  }, []);

  const unregister = useCallback((slug: string) => {
    const set = getRegistered();
    set.delete(slug);
    saveRegistered(set);
    emitChange();
  }, []);

  return { registered, isRegistered, register, unregister };
}
