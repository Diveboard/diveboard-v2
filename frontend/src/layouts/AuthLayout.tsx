import React, {
  FC, useMemo, useState,
} from 'react';
import { UserSettingsType } from '../firebase/firestore/models';

type UserContext = {
  userAuth: UserSettingsType;
  setUserAuth: React.Dispatch<React.SetStateAction<UserSettingsType>>;
};

export const AuthStatusContext = React.createContext<UserContext>(undefined);

type Props = {
  user?: UserSettingsType
};

export const AuthLayout: FC<Props> = ({ user, children }) => {
  const [userData, setUserData] = useState<UserSettingsType>(user);

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
