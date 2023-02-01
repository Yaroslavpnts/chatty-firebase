import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import { Crop, PixelCrop } from 'react-image-crop/dist/types';
import { ChooseImageStyled, LabelStyled } from './CropImage.styled';
import ChoosePhoto from '../../assets/svg/choosePhoto.svg';
import ChangePhoto from '../../assets/svg/changePhoto.svg';
import 'react-image-crop/dist/ReactCrop.css';

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setFieldValue: (field: string, value: Blob, shouldValidate?: boolean | undefined) => void;
}

const CropImage: React.FC<InputWithIconProps> = ({ setFieldValue }) => {
  const [isShowPhoto, setIsShowPhoto] = useState(true);

  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [src, setSrc] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL(e.target.files![0]);
    setIsShowPhoto(false);
    setSrc(url);
  };

  const onCropChange = (crop: PixelCrop) => {
    setCrop(crop);
  };

  const onCropComplete = (crop: PixelCrop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop: PixelCrop) => {
    if (imageRef.current && crop.width && crop.height) {
      await getCroppedImg(imageRef.current, crop, 'newFile.jpeg');
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop, fileName: string) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx!.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }

      const file = new File([blob], 'userPhoto.jpeg', {
        type: blob.type,
      });

      setFieldValue('file', file);
    }, 'image/jpeg');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        gap: '5px',
        alignItems: 'end',
      }}
    >
      <LabelStyled htmlFor='cropFile' order={isShowPhoto ? 1 : 2}>
        {isShowPhoto ? (
          <ChooseImageStyled src={ChoosePhoto} alt='' />
        ) : (
          <img src={ChangePhoto} alt='' />
        )}
      </LabelStyled>
      <input id='cropFile' type='file' onChange={handleChangeInput} accept='image/*' />
      {src && (
        <ReactCrop
          maxWidth={160}
          maxHeight={160}
          crop={crop}
          onChange={onCropChange}
          circularCrop={true}
          onComplete={onCropComplete}
          aspect={1}
        >
          <img
            src={src}
            alt=''
            style={{
              objectFit: 'cover',
              maxWidth: '100%',
              maxHeight: '220px',
            }}
            ref={imageRef}
          />
        </ReactCrop>
      )}
    </div>
  );
};

export default CropImage;
