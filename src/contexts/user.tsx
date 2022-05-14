import useAxios from 'axios-hooks';
import React, { createContext, useEffect } from 'react';
import config from '../config';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface UserContextProperties {
  authorization: {
    accessToken: string;
    refreshToken: string;
  } | undefined;
  user: User | undefined;
  // eslint-disable-next-line no-unused-vars
  setAuthorization(authorization: UserContextProperties['authorization']): void;
}

export const UserContext = createContext<UserContextProperties>({
  authorization: undefined,
  user: undefined,
  setAuthorization: () => {},
});

const useProvideContext = (): UserContextProperties => {
  const [authorization, setAuthorization] = React.useState<
    UserContextProperties['authorization'] | undefined
  >(undefined);
  const [user, setUser] = React.useState<User | undefined>(undefined);

  const [{ data: userData }, execute] = useAxios({
    url: `${config.API_URL}/user/@me`,
    method: 'GET',
  }, { manual: true });

  useEffect(() => {
    if (authorization && authorization.accessToken) {
      execute({
        headers: {
          Authorization: `Bearer ${authorization.accessToken}`,
        },
      });
    }
  }, [authorization]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return {
    authorization,
    user,
    setAuthorization,
  };
};

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const context = useProvideContext();
  return (<UserContext.Provider value={context}>{children}</UserContext.Provider>);
}
