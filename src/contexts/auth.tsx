import React, {
  createContext, useState, useEffect, useCallback, useMemo,
} from 'react';

export interface AuthentificationProperties {
  isAuthenticated: boolean;
  accessToken?: string;
  // eslint-disable-next-line no-unused-vars
  setAccessToken(accessToken: AuthentificationProperties['accessToken']): void;
  headers: Record<string, string>;
  logout(): void;
}

export const AuthentificationContext = createContext<AuthentificationProperties>({
  isAuthenticated: false,
  accessToken: undefined,
  setAccessToken: () => {},
  headers: {},
  logout: () => {},
});

const useProvideContext = (): AuthentificationProperties => {
  const [accessToken, setAccessToken] = useState<
    AuthentificationProperties['accessToken']
  >(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [accessToken]);

  return {
    isAuthenticated,
    accessToken,
    setAccessToken,
    headers: useMemo(() => ({ Authorization: `Bearer ${accessToken}` }), [accessToken]),
    logout: useCallback(() => {
      setIsAuthenticated(false);
      setAccessToken(undefined);
    }, []),
  };
};

export default function AuthentificationProvider({ children }: { children: React.ReactNode }) {
  const context = useProvideContext();
  return (
    <AuthentificationContext.Provider value={context}>
      {children}
    </AuthentificationContext.Provider>
  );
}
