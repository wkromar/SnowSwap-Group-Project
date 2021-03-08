import React from 'react';

export default function EditProfile({ user, setEditMode, editMode }) {
  return (
    <div>
      <button onClick={() => setEditMode(!editMode)}>Submit</button>
    </div>
  );
}
