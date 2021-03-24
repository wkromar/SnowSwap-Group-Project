import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayProfile from '../DisplayProfile/DisplayProfile';
import EditProfile from '../EditProfile/EditProfile';
import SwapAdmin from '../SwapAdmin/SwapAdmin';
import UpgradeUser from '../UpgradeUser/UpgradeUser';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      {editMode ? (
        <EditProfile
          user={user}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <DisplayProfile
          user={user}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
      {/* The auth level of the user determines how much or little admin features are shown on their profile page. */}
      {user?.auth_level >= 1 && <SwapAdmin />}
      {user?.auth_level === 2 && <UpgradeUser />}
    </div>
  );
}
