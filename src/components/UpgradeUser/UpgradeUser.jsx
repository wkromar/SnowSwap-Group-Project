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
  };

  return (
    <div className="top-margin">
      <form onSubmit={handleSubmit}>
        <p>UPGRADE USER:</p>
        <label htmlFor="search">Search For User:</label>
        <input
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          type="text"
        />
        <button type="submit">Search</button>
      </form>
      <p>Results:</p>
      <ul>
        {searchResults.map((user) => {
          return (
            <li key={user.id}>
              <div className="li-with-button">
                <p>
                  {user.username} | {user.first_name} {user.last_name}
                </p>
                {user.auth_level < 1 ? (
                  <button onClick={() => handleClick(user.id)}>
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
  );
}
