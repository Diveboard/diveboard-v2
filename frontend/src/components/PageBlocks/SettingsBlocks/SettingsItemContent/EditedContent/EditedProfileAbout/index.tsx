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
import { notify } from '../../../../../../utils/notify';
import { deleteCache } from '../../../../../../utils/refreshCache';

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
      notify('You are not authorized');
    }
    try {
      setLoading(true);
      setUserAuth({ ...userAuth, about });
      await firestorePublicProfileService.setAbout(about, userAuth.uid);
      setUserInfo((prev) => ({ ...prev, about }));
      setLoading(false);
      await deleteCache();
      setEditedSettings({ settingsBlock: '', settingsItem: '' });
    } catch (e) {
      notify('Something went wrong');
    }
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
