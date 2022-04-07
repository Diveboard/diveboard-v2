import React, { FC, useContext, useState } from 'react';
import { ProfileImage } from '../../NotEditedContent/ProfileImage';
import { SaveThisButton } from '../SaveThisButton';
import { getAvatarUrl, uploadAvatar } from '../../../../../../firebase/store/storeService';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';

import styles from './styles.module.scss';
import { EditContext } from '../../../EditContextWrapper';
import { updateUserAvatar } from '../../../../../../firebase/user/userService';

type Props = {
  imgSrc: string;
};

export const EditedProfileImage: FC<Props> = ({ imgSrc }) => {
  const [imgPath, setImgPath] = useState(imgSrc);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);

  const checkFileAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files[0];
    const objectURL = window.URL.createObjectURL(avatar);
    setImgPath(objectURL);
    setAvatarFile(avatar);
  };

  const uploadFileAvatar = async () => {
    if (userAuth.uid) {
      setLoading(true);
      const res = await uploadAvatar(userAuth.uid, avatarFile);
      const url = await getAvatarUrl(res.ref);
      await updateUserAvatar(url);
      if (res) {
        setUserAuth({ ...userAuth, photoURL: url });
        setEditedSettings({ settingsBlock: '', settingsItem: '' });
        setLoading(false);
      }
    } else {
      throw new Error('you are not authorized');
    }
  };

  return (
    <div className={styles.editedImgWrapper}>
      <div className={styles.imgUploadWrapper}>
        <ProfileImage imgSrc={imgPath} />

        <div className={styles.fileInputWrapper}>
          <label className={styles.label} htmlFor="file-manager">
            Update photo
          </label>
          <input
            className={styles.fileInput}
            type="file"
            name="avatar"
            id="file-manager"
            accept=".jpg, .jpeg, .png, .svg, webp"
            onChange={checkFileAvatar}
          />
        </div>
      </div>
      <SaveThisButton
        disabled={!avatarFile || loading}
        onClick={uploadFileAvatar}
        loading={loading}
      />
    </div>
  );
};
