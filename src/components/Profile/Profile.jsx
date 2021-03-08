import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayProfile from '../DisplayProfile/DisplayProfile';
import EditProfile from '../EditProfile/EditProfile';

export default function Profile() {
  const user = useSelector((state) => state.userReducer);
  const [editMode, setEditMode] = useState(false);
  console.log(editMode);

  const paymentMethods = [
    'Choose a Payment Method',
    'Cash',
    'Cash App',
    'Venmo',
    'PayPal',
  ];

  return (
    <div>
      {editMode ? (
        <EditProfile
          user={user}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <DisplayProfile
          user={user}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
      
    </div>
  );
}
