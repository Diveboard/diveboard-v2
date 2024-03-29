import React, {
  FC, useContext, useEffect, useState,
} from 'react';

import { useRouter } from 'next/router';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { Button } from '../../../../Buttons/Button';
import { Input } from '../../../../Input/CommonInput';
import { Icon } from '../../../../Icons/Icon';
import { FileWithTags } from './FileWithTags';
import { StepsNavigation } from '../../StepsNavigation';
import { AddedUrl } from './AddedUrl';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';
import { SixthStepType } from '../../types/stepTypes';
import { StepProps } from '../../types/commonTypes';
import stylesContainer from '../../styles.module.scss';
import styles from './styles.module.scss';
import { StepsIndicator } from '../../StepsIndicator';
import { MediaUrls } from '../../../../../firebase/firestore/models';
import { firestoreGalleryService } from '../../../../../firebase/firestore/firestoreServices/firestoreGalleryService';
import { notify } from '../../../../../utils/notify';
import { firestoreDivesService } from '../../../../../firebase/firestore/firestoreServices/firestoreDivesService';
import { AuthStatusContext } from '../../../../../layouts/AuthLayout';

export const SixthStep: FC<StepProps> = (
  { step, setStep },
) => {
  const { setStepData, getStepData } = useContext(LogDiveDataContext);
  const isMobile = useWindowWidth(500, 768);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [mediaUrl, setMediaUrl] = useState<MediaUrls[]>([]);
  const [files, setFiles] = useState<{ tags: string; file: File }[]>([]);

  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const router = useRouter();

  const { id: diveId } = router.query;

  const checkFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setFiles([
      ...files,
      {
        tags: '',
        file,
      },
    ]);
  };
  const addUrlHandler = () => {
    const urlReg = /^(ftp|http|https):\/\/[^ "]+$/;
    if (url.match(urlReg)) {
      if (mediaUrl.some((img) => img.url === url)) {
        setError('duplicate url');
        return;
      }
      setMediaUrl((prevMediaUrl) => [...prevMediaUrl, { url }]);
      setUrl('');
    } else {
      setError('incorrect url');
    }
  };

  const filesComponents = files.map((item) => (
    <FileWithTags key={item.file.lastModified} file={item} setFile={setFiles} />
  ));
  const deleteUrlHandler = async (imgUrl: MediaUrls) => {
    try {
      if (imgUrl.id) {
        await firestoreGalleryService.deleteImageById(imgUrl.id, imgUrl.url);
        await firestoreDivesService.deletePictureFromDive(
          userAuth.uid,
          diveId as string,
          imgUrl.id,
        );
      }
      setMediaUrl((prevUrls) => prevUrls.filter((item) => item.url !== imgUrl.url));
    } catch (e) {
      notify(e.message);
    }
  };

  const urlsComponent = mediaUrl.map((item) => (
    <AddedUrl key={item.id} mediaUrl={item} deleteUrlHandler={deleteUrlHandler} />
  ));

  useEffect(() => {
    const data = getStepData(6) as SixthStepType;
    if (data.mediaUrl) {
      setMediaUrl(data.mediaUrl);
    }
  }, [step]);

  if (step !== 6) {
    return null;
  }

  const nextStep = async () => {
    setStepData(6, {
      files,
      mediaUrl,
    });
  };

  return (
    <>
      <StepsIndicator
        step={step}
        setStep={setStep}
        setStepData={nextStep}
      />
      <div className={stylesContainer.container}>
        <div className={styles.sixthStep}>
          <h2>Pictures and Videos</h2>
          <p>Upload media from your local device</p>

          <div>{filesComponents}</div>

          <div className={styles.fileButton}>
            <label className={styles.label} htmlFor="file-manager">
              Browse images
            </label>
            <input
              className={styles.file}
              type="file"
              name="file"
              id="file-manager"
              accept=".jpg, .jpeg, .png, .svg, .webp,"
              onChange={checkFile}
            />
          </div>

          <p className={styles.or}>OR</p>
          <p>Link media from the Internet:</p>

          {urlsComponent}

          <div className={styles.mediaWrapper}>
            <Input
              value={url}
              setValue={setUrl}
              placeholder="URL"
              error={error}
              setError={setError}
              height={isMobile ? 46 : 56}
            />
            <div className={styles.btnWrapper}>
              <Button
                width={127}
                height={isMobile ? 46 : 56}
                borderRadius={30}
                border="none"
                backgroundColor="#F4BF00"
                onClick={addUrlHandler}
              >
                <div className={styles.btnContentWrapper}>
                  <Icon iconName="plus-blue" />
                  <span className={styles.btnTextBlue}>Add</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <StepsNavigation
        setStep={setStep}
        setStepData={nextStep}
      />
    </>
  );
};
