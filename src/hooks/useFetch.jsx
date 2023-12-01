import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [fetchData, setFetchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network Error 😢");
        }
        const result = await response.json();
        setFetchData(result);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { fetchData, isLoading, isError };
};

export default useFetch;
