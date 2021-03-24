import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ImageUpload from '../ImageUpload/ImageUpload';

export default function EditProfile({ user, setEditMode, editMode }) {
  const [userProfileEdit, setUserProfileEdit] = useState(user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setUserProfileEdit({
      ...userProfileEdit,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'EDIT_USER', payload: userProfileEdit });
    // setEditMode(!editMode);
  };

  const paymentMethods = ['Cash', 'Cash App', 'Venmo', 'PayPal'];

  useEffect(() => {
    if (user.preferred_payment === null) {
      setUserProfileEdit({ ...userProfileEdit, preferred_payment: '' });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-container">
        <div className="profile-info-container center">
          {userProfileEdit?.user_image ? (
            <div className="center">
              <div className="round-frame">
                <img
                  className="profile-img"
                  src={userProfileEdit?.user_image}
                />
              </div>
              <button
                type="button"
                className="ss-btn"
                onClick={() =>
                  setUserProfileEdit({ ...userProfileEdit, user_image: '' })
                }
              >
                Edit Image
              </button>
            </div>
          ) : (
            <div>
              <ImageUpload
                keyName={'user_image'}
                state={userProfileEdit}
                setState={setUserProfileEdit}
              />
              <div>Add a profile picture</div>
            </div>
          )}
          <div className="profile-input-container">
            <div className="input-tag">First Name</div>
            <input
              type="text"
              value={userProfileEdit.first_name}
              onChange={(event) => handleChange(event)}
              name="first_name"
              className="styled-input"
            />
          </div>
          <div className="profile-input-container">
            <div className="input-tag">Last Name</div>
            <input
              type="text"
              value={userProfileEdit.last_name}
              onChange={(event) => handleChange(event)}
              name="last_name"
              className="styled-input"
            />
          </div>
          <div className="profile-input-container">
            <div className="input-tag">Email</div>
            <input
              type="text"
              value={userProfileEdit.email}
              onChange={(event) => handleChange(event)}
              name="email"
              className="styled-input"
            />
          </div>

          <div className="profile-input-container">
            <div className="input-tag">Payment Method</div>
            <select
              onChange={(event) => handleChange(event)}
              name="preferred_payment"
              value={userProfileEdit?.preferred_payment}
              className="styled-input"
            >
              <option value="" disabled>
                Choose a Payment Method
              </option>
              {paymentMethods.map((method) => {
                return (
                  <option key={method} value={method}>
                    {method}
                  </option>
                );
              })}
            </select>
          </div>
          {userProfileEdit?.preferred_payment != 'Cash' ? (
            <div className="profile-input-container">
              <div className="input-tag">
                {userProfileEdit?.preferred_payment} Username:
              </div>
              <input
                type="text"
                value={userProfileEdit.payment_username}
                onChange={(event) => handleChange(event)}
                name="payment_username"
                className="styled-input"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="button-container">
          <button className="ss-btn" type="submit">
            Submit
          </button>
          <button
            className="ss-btn"
            type="button"
            onClick={() => setEditMode(!editMode)}
          >
            Cancel Edit
          </button>
        </div>
      </div>
    </form>
  );
}
