import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ImageUpload from '../ImageUpload/ImageUpload';

export default function EditProfile({ user, setEditMode, editMode }) {
  const [userProfileEdit, setUserProfileEdit] = useState(user);
  const dispatch = useDispatch();

  console.log(userProfileEdit);

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
        <div className="profile-info-container">
          <div className="left-side">
            <ImageUpload
              state={userProfileEdit}
              setState={setUserProfileEdit}
            />
            {user?.user_img ? (
              <div>
                <img src={user?.user_img} />
              </div>
            ) : (
              <div>Add a profile picture</div>
            )}
            <div>
              <div>
                <label>Preferred Payment Method:</label>
                <select
                  onChange={(event) => handleChange(event)}
                  name="preferred_payment"
                  value={userProfileEdit?.preferred_payment}
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
