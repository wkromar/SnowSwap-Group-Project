import React, { useState } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';

export default function EditProfile({ user, setEditMode, editMode }) {
  const [userProfileEdit, setUserProfileEdit] = useState(user);

  console.log(userProfileEdit);

  const handleChange = (event) => {
    setUserProfileEdit({
      ...userProfileEdit,
      [event.target.name]: event.target.value,
    });
  };
  const paymentMethods = ['Cash', 'Cash App', 'Venmo', 'PayPal'];
  return (
    <form action="">
      <div className="profile-container">
        <div className="profile-info-container">
          <div className="left-side">
            <ImageUpload
              userProfileEdit={userProfileEdit}
              setUserProfileEdit={setUserProfileEdit}
            />
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
                  <select
                    onChange={(event) => handleChange(event)}
                    name="preferred_payment"
                  >
                    <option value="Choose a Payment Method" disabled selected>
                      Choose a Payment Method
                    </option>
                    {paymentMethods.map((method) => {
                      return <option value={method}>{method}</option>;
                    })}
                  </select>
                  {userProfileEdit?.preferred_payment != 'Cash' ? (
                    <div>
                      <label>
                        {userProfileEdit?.preferred_payment} Username:
                      </label>
                      <input
                        type="text"
                        value={userProfileEdit.payment_username}
                        onChange={(event) => handleChange(event)}
                        name="payment_username"
                      />
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
            <input
              type="text"
              value={userProfileEdit.first_name}
              onChange={(event) => handleChange(event)}
              name="first_name"
            />
            <label>Last Name:</label>
            <input
              type="text"
              value={userProfileEdit.last_name}
              onChange={(event) => handleChange(event)}
              name="last_name"
            />
            <label>Email:</label>
            <input
              type="text"
              value={userProfileEdit.email}
              onChange={(event) => handleChange(event)}
              name="email"
            />
          </div>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setEditMode(!editMode)}>
          Cancel Edit
        </button>
      </div>
    </form>
  );
}
