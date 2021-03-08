import React from 'react';

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
      <button onClick={() => setEditMode(!editMode)}>Submit</button>
    </div>
  );
}
