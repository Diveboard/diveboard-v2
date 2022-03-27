import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { auth, onAuthStateChanged } from '../firebase/firebaseAuth';

type UserType = {
  uid: null | string;
  email: null | string;
  photoURL: null | string;
  name: null | string;
};

type UserContext = {
  userAuth: UserType;
  setUserAuth: React.Dispatch<React.SetStateAction<UserType>>;
};

export const AuthStatusContext = React.createContext<UserContext>(undefined);

export const AuthLayout: FC = ({ children }) => {
  const [userData, setUserData] = useState<UserType>(null);

  const authMemoizedState = useMemo(() => ({
    userAuth: userData,
    setUserAuth: setUserData,
  }), [userData, setUserData]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          name: user.displayName,
        });
      }
    });
  }, []);

  return (
    <AuthStatusContext.Provider
      value={authMemoizedState}
    >
      {children}
    </AuthStatusContext.Provider>
  );
};
