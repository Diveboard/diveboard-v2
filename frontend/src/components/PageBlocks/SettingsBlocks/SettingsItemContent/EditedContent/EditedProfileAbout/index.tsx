import React, { FC, useContext, useState } from 'react';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import {
  firestorePublicProfileService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { SaveThisButton } from '../SaveThisButton';
import { TextArea } from '../../../../../Input/TextArea';
import { MarginWrapper } from '../../../../../MarginWrapper';
import { UserSettingsType } from '../../../../../../firebase/firestore/models';

type Props = {
  userAbout: string;
  setUserInfo: React.Dispatch<React.SetStateAction<UserSettingsType>>
};

export const EditedProfileAbout: FC<Props> = ({ userAbout, setUserInfo }) => {
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [about, setAbout] = useState(userAbout);
  const [loading, setLoading] = useState(false);

  const saveUsersAbout = async () => {
    if (!userAuth.uid) {
      throw new Error('you are not authorized');
    }
    setLoading(true);
    setUserAuth({ ...userAuth, about });
    await firestorePublicProfileService.setAbout(about, userAuth.uid);
    setUserInfo((prev) => ({ ...prev, about }));
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
