import React, {
  FC, useMemo, useState,
} from 'react';
import { UserType } from '../types';

type UserContext = {
  userAuth: UserType;
  setUserAuth: React.Dispatch<React.SetStateAction<UserType>>;
};

export const AuthStatusContext = React.createContext<UserContext>(undefined);

type Props = {
  user?: UserType
};

export const AuthLayout: FC<Props> = ({ user, children }) => {
  const [userData, setUserData] = useState<UserType>(user);

  const authMemoizedState = useMemo(() => ({
    userAuth: userData,
    setUserAuth: setUserData,
  }), [userData, setUserData]);

  return (
    <AuthStatusContext.Provider
      value={authMemoizedState}
    >
      {children}
    </AuthStatusContext.Provider>
  );
};
