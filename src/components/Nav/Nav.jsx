import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './Nav.css';


// header component
function Nav() {
  const user = useSelector((store) => store.user);

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
      <Link to="/user">
        <h1 className="snow-swaps-header">SnowSwaps</h1>
      </Link>
      <div>
        {user.id && (
          <>
            <Menu />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
