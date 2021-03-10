import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function UpgradeUser() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'USER_SEARCH' });
  };
  return (
    <div>
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
    </div>
  );
}
