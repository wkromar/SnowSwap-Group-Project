import { useState } from "react";
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import Menu from "../Menu/Menu";

function Nav() {
  const user = useSelector((store) => store.user);

  const [state, setState] = useState(false)

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">SNOWSWAPS</h2>
      </Link>
      <div>

        {user.id && (
          <>
            <Menu/>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
