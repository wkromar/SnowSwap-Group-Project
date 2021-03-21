import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UpgradeUser() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSelector((state) => state.searchedUser);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'USER_SEARCH', payload: searchTerm });
  };

  const handleClick = (id) => {
    dispatch({ type: 'USER_UPGRADE', payload: { userNumber: id } });
    dispatch({ type: 'USER_SEARCH', payload: searchTerm });
  };

  return (
    <div className="swap-admin-container">
      <p className="modal-header white-text">Upgrade User</p>
      <div className="upgrade-user-container">
        <form onSubmit={handleSubmit}>
          <div className="input-button-inline">
            <div className="input-container">
              <div className="input-tag">User Search</div>
              <input
                onChange={(event) => setSearchTerm(event.target.value)}
                value={searchTerm}
                type="text"
                className="styled-input"
              />
            </div>
            <button className="ss-btn" type="submit">
              Search
            </button>
          </div>
        </form>
        <p>Results:</p>
        <ul>
          {searchResults.map((user) => {
            return (
              <li key={user.id} className="search-results">
                <div className="li-with-button">
                  <p>
                    {user.username}
                    <br/>
                     {user.first_name} {user.last_name}
                  </p>
                  {user.auth_level < 1 ? (
                    <button className="ss-btn" onClick={() => handleClick(user.id)}>
                      Grant Access
                    </button>
                  ) : (
                    <p>Access Granted</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
