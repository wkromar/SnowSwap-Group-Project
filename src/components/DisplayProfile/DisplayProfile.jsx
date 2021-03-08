import React from 'react';

export default function DisplayProfile({ user, setEditMode, editMode }) {
  return (
    <div>
      {user?.user_img ? (
        <div>
          <img src={user?.user_img} />
        </div>
      ) : (
        <div>Add a profile picture</div>
      )}

      <button onClick={() => setEditMode(!editMode)}>Edit</button>
      
    </div>
  );
}
