/**
 * Let's steal code from our past selves!
 * This hook takes care of debouncing an input value using
 * a sync or async function. Use this to avoid spamming your
 * api with a call on every keystroke
 */
import { useState, useEffect } from 'react';

const useDebouncedInput = (
  debouncingFunction,
  initialValue = '',
  delay = 500
) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    // wrap our debouncing function in an async wrapper
    const debounceWrapper = async (val) => {
      return await debouncingFunction(val);
    };

    const debounceTimer = setTimeout(async () => {
      const val = await debounceWrapper(inputValue);
      setDebouncedValue(val);
    }, delay);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, delay, debouncingFunction]);

  const debounce = (value) => {
    setInputValue(value);
  };

  return { inputValue, debouncedValue, debounce };
};

export default useDebouncedInput;
