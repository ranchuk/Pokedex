import { useState, useEffect } from 'react';

function useSessionStorage<T>(key: string, initialValue: T) {
  // Initialize state from session storage or use initial value
  const [value, setValue] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Update session storage when state changes
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, (value: T) => void];
}

export default useSessionStorage;
