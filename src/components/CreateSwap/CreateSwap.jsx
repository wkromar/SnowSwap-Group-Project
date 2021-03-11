import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateSwap() {
  const user = useSelector((state) => state.user);
  const authLevel = user.auth_level;
  const swapAccessCode = Math.random().toString(36).slice(2);

  const dispatch = useDispatch();

  console.log(swapAccessCode);
  console.log(authLevel);

  const handleRequestAccess = () => {
    dispatch({ type: 'REQUEST_UPGRADE', payload: user });
  };

  return (
    <div>
      {authLevel < 1 ? (
        <div>
          <p>You do not have authorization to create your own swap.</p>
          <button onClick={handleRequestAccess}>Request Access</button>
        </div>
      ) : (
        <div>You're in</div>
      )}
    </div>
  );
}
