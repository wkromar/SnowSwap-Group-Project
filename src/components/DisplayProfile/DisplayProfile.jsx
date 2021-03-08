import React from 'react';
import './DisplayProfile.css';

export default function DisplayProfile({ user, setEditMode, editMode }) {
  return (
    <div className="profile-container">
      <div className="profile-info-container">
        <div className="left-side">
          {user?.user_img ? (
            <div>
              <img src={user?.user_img} />
            </div>
          ) : (
            <div>Add a profile picture</div>
          )}
          <div>
            {user?.preferred_payment ? (
              <div>
                <label>Preferred Payment Method:</label>
                <div>{user?.preferred_payment}</div>
                {user?.preferred_payment != 'Cash' ? (
                  <div>
                    <label>{user?.preferred_payment} Username:</label>
                    <div>{user?.payment_username}</div>
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
        <div className="right-side">
          <label>First Name:</label>
          <div>{user.first_name}</div>
          <label>Last Name:</label>
          <div>{user.last_name}</div>
          <label>Email:</label>
          <div>{user.email}</div>
        </div>
      </div>

      <button onClick={() => setEditMode(!editMode)}>Edit</button>
    </div>
  );
}
