import React from 'react';

export default function DisplayProfile({ user, setEditMode, editMode }) {
  return (
    <div>
      <div>
        {user?.user_img ? (
          <div>
            <img src={user?.user_img} />
          </div>
        ) : (
          <div>Add a profile picture</div>
        )}

        <div>
          {typeof user?.preferred_payment != 'string' ? (
            <div>
              <label>Preferred Payment Method</label>
              <div>{user?.preferred_payment}</div>
              {user?.preferred_payment != 'Cash' ? (
                <div>
                  <label>{user?.preferred_payment} Username</label>{' '}
                  {user?.payment_username}
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            'Select a preferred payment method by editing your profile'
          )}
        </div>
      </div>
      <div>
        <label>First Name</label>
        <div>{user.first_name}</div>
        <label>Last Name</label>
        <div>{user.last_name}</div>
        <label>Email</label>
        <div>{user.email}</div>
      </div>

      <button onClick={() => setEditMode(!editMode)}>Edit</button>
    </div>
  );
}
