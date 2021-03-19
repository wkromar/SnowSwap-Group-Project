import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import AddGear from '../AddGear/AddGear';
import AllSwaps from '../AllSwaps/AllSwaps';
import CreateSwap from '../CreateSwap/CreateSwap';
import EditGear from '../EditGear/EditGear.jsx';
import Favorites from '../Favorites/Favorites.jsx';
import Footer from '../Footer/Footer';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import MyGear from '../MyGear/MyGear';
import Nav from '../Nav/Nav';
import Profile from '../Profile/Profile.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import RegisterPage from '../RegisterPage/RegisterPage';
import SwapItems from '../SwapItems/SwapItems';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/user" />

          {/* Visiting localhost:3000/about will show the about page. */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <Nav />
            <AllSwaps />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <Nav />
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/addGear"
          >
            <Nav />
            <AddGear />
          </ProtectedRoute>

          <ProtectedRoute exact path="/myGear">
            <Nav />
            <MyGear />
          </ProtectedRoute>

          <ProtectedRoute exact path="/editGear">
            <Nav />
            <EditGear />
          </ProtectedRoute>

          <ProtectedRoute exact path="/favorites">
            <Nav />
            <Favorites />
          </ProtectedRoute>

          <ProtectedRoute exact path="/swapItems/:id">
            <Nav />
            <SwapItems />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}

          <ProtectedRoute exact path="/profile">
            <Nav />
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute exact path="/createEvent">
            <Nav />
            <CreateSwap />
          </ProtectedRoute>

          {/* edit route */}
          <ProtectedRoute exact path="/createEvent/:slug/:id">
            <Nav />
            <CreateSwap />
          </ProtectedRoute>

          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
