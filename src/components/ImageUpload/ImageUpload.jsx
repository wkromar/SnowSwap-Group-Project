import React from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import Swal from "sweetalert2";
import DropZone from '../DropZone/DropZone';

export default function ImageUpload({ state, setState, keyName }) {
  //ImageUpload takes three props state, setState and keyName. These props are used to make this component
  //reusable throughout the app.

  const handleFinishedUpload = (info) => {
    //if keyName = multiple it is coming from the add or edit gear views and behaves slightly different
    //than it does in the create/edit profile/swap views.  THe photos are added to an array that is iterated over
    //on the post or put request on the backend
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
    //environment variable need to be set up for the origin server to avoid CORS errors
    server: process.env.REACT_APP_SERVER,
  };

  //environment variable for the url of your Amazon S3 bucket where pictures are being uploaded to.
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
