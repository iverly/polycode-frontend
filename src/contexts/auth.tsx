import useAxios from 'axios-hooks';
import React, {
  createContext, useState, useEffect, useCallback, useMemo,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export interface AuthentificationProperties {
  isAuthenticated: boolean;
  accessToken?: string;
  // eslint-disable-next-line no-unused-vars
  setAccessToken(accessToken: AuthentificationProperties['accessToken']): void;
  headers: Record<string, string>;
  // eslint-disable-next-line no-unused-vars
  login(accessToken: string): void;
  logout(): void;
}

export const AuthentificationContext = createContext<AuthentificationProperties>({
  isAuthenticated: false,
  accessToken: undefined,
  setAccessToken: () => {},
  headers: {},
  login: () => {},
  logout: () => {},
});

const useProvideContext = (): AuthentificationProperties => {
  const [accessToken, setAccessToken] = useState<
    AuthentificationProperties['accessToken']
  >(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [authority, setAuthority] = useLocalStorage<{ accessToken: string | undefined } | undefined>('authority', {
    accessToken: undefined,
  });
  const [
    { data: testAccessTokenData, error: testAccessTokenError },
    testAccessToken,
  ] = useAxios(`${process.env.REACT_APP_API_ENDPOINT}/user/@me`, { manual: true });

  const login = useCallback((newAccessToken: string) => {
    setAccessToken(newAccessToken);
    setAuthority({ accessToken: newAccessToken });
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authority?.accessToken) {
      testAccessToken({
        headers: {
          Authorization: `Bearer ${authority.accessToken}`,
        },
      });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (testAccessTokenData) {
      login(authority?.accessToken as string);
    } else if (testAccessTokenError) {
      setAuthority(undefined);
      setIsAuthenticated(false);
    }
  }, [testAccessTokenData, testAccessTokenError]);

  return {
    isAuthenticated,
    accessToken,
    setAccessToken,
    headers: useMemo(() => ({ Authorization: `Bearer ${accessToken}` }), [accessToken]),
    login,
    logout: useCallback(() => {
      setIsAuthenticated(false);
      setAuthority(undefined);
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
