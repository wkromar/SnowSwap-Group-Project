import React from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import DropZone from '../DropZone/DropZone';
import Swal from "sweetalert2";

export default function ImageUpload({ state, setState, keyName }) {
  const handleFinishedUpload = (info) => {
    console.log('File uploaded with filename', info.filename);
    if (keyName === 'multiple' && state.img.length < 6) {
      setState({ ...state, img: [...state.img, info.fileUrl] });
    } else if (keyName === 'multiple' && state.img.length >= 6) {
      Swal.fire({
        title: `Photo upload limit reached.`,
        text: `Only 6 photos are allowed for each piece of gear.`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {
      setState({ ...state, [keyName]: info.fileUrl });
    }
  };

  const uploadOptions = {
    server: process.env.REACT_APP_SERVER,
  };

  const s3Url = process.env.REACT_APP_S3URL;

  return (
    <DropzoneS3Uploader
      onFinish={handleFinishedUpload}
      s3Url={s3Url}
      maxSize={1024 * 1024 * 5}
      maxFiles={6}
      upload={uploadOptions}
    >
      {keyName === 'multiple' && <DropZone />}
    </DropzoneS3Uploader>
  );
}
