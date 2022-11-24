import React, { useContext, useState } from 'react';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import {
  firestorePublicProfileService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { SaveThisButton } from '../SaveThisButton';
import { TextArea } from '../../../../../Input/TextArea';
import { MarginWrapper } from '../../../../../MarginWrapper';

export const EditedProfileAbout = () => {
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [about, setAbout] = useState(userAuth.about);
  const [loading, setLoading] = useState(false);

  const saveUsersAbout = async () => {
    if (!userAuth.uid) {
      throw new Error('you are not authorized');
    }
    setLoading(true);
    setUserAuth({ ...userAuth, about });
    await firestorePublicProfileService.setAbout(about, userAuth.uid);
    setLoading(false);
    setEditedSettings({ settingsBlock: '', settingsItem: '' });
  };
  return (
    <div>
      <MarginWrapper top={10} bottom={30} display="block">
        <TextArea
          value={about}
          setValue={
            setAbout
          }
          height={126}
        />
      </MarginWrapper>

      <SaveThisButton
        disabled={about?.length < 3 || loading}
        onClick={saveUsersAbout}
        loading={loading}
      />
    </div>
  );
};
