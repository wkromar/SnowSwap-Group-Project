import React from 'react';
import './DisplayProfile.css';

export default function DisplayProfile({ user, setEditMode, editMode }) {
  return (
    <>
      <div className="swap-header center">
        {user?.first_name} {user?.last_name}'s Profile
      </div>
      <div className="profile-container">
        {user?.user_image ? (
          <div className="round-frame">
            <img className="profile-img" src={user?.user_image} />
          </div>
        ) : (
          <div>Add a profile picture</div>
        )}
        <div className="profile-info-container">
          <div className="left-side">
            <div>Email: {user.email}</div>
            <div>
              {user?.preferred_payment ? (
                <div>
                  <div>Preferred Payment Method: {user?.preferred_payment}</div>
                  {user?.preferred_payment != 'Cash' ? (
                    <div>
                      <div>
                        {user?.preferred_payment} Username:{' '}
                        {user?.payment_username}
                      </div>
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
        </div>

        <div>
          <button className="ss-btn" onClick={() => setEditMode(!editMode)}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
}
