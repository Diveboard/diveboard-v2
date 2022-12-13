import React from 'react';
import pageRoutes from '../routes/pagesRoutes.json';

export const statusUserRedirect = async (
  mode: 'signup' | 'login' | 'login/signup' | 'community',
  push:(url: string)=> Promise<boolean>,
  setMode: React.Dispatch<React.SetStateAction<'login/signup' | 'signup' | 'login' | 'community'>>,
) => {
  const diveUser = localStorage.getItem('diveBoardUser');// check if this new user
  if (diveUser === 'newUser' && mode === 'signup') {
    await push(pageRoutes.settingsPageRout);
  } else if (diveUser === 'newUser' && mode === 'login') {
    localStorage.setItem('diveBoardUser', 'oldUser');
    setMode('community');
  } else {
    await push(pageRoutes.mainPageUser);
  }
};
