// Create a context for loading and error states
import React, { createContext, useContext, useState } from "react";

const LoadingErrorContext = createContext();

export const LoadingErrorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <LoadingErrorContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </LoadingErrorContext.Provider>
  );
};

export const useLoadingError = () => {
  return useContext(LoadingErrorContext);
};
