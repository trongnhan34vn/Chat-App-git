import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  return {
    isLoading: isLoading,
    setLoading: setLoading
  }
};
