/**
 * Stealing more code from past self
 * I use something like this hook to get any initial state
 * from some API.
 */

import { useState, useEffect } from 'react';
import { getLocations } from '../mock-api/apis';

// const useOptions = (apiUrl, defaultOption = '...') => {
const useOptions = (defaultOption = '...') => {
  const [options, setOptions] = useState([defaultOption]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    // const controller = new AbortController()
    const fetchData = async () => {
      try {
        // const response = await axios.get(apiUrl, { signal: controller.signal });
        // const responseOptions = response.data
        const responseOptions = await getLocations();
        setOptions([defaultOption, ...responseOptions]);
        // setLoading(false);
      } catch (error) {
        // setError(error);
        // setLoading(false);
        setOptions([defaultOption]);
      }
    };

    fetchData();

    // Clean up the effect to avoid memory leaks.
    return () => {
      // controller.abort()
    };
  }, [defaultOption]);

  // return { options, error, loading };
  return { options };
};

export default useOptions;
