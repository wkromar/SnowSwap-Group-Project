import React from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';

export default function EditProfile({ user, setEditMode, editMode }) {
  const paymentMethods = [
    'Choose a Payment Method',
    'Cash',
    'Cash App',
    'Venmo',
    'PayPal',
  ];
  return (
    <div>
      <ImageUpload />
      <button onClick={() => setEditMode(!editMode)}>Submit</button>
    </div>
  );
}
