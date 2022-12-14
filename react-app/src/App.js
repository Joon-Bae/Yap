import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/HomePage/homepage';
import IndividualBusiness from './components/Businesses/IndividualBusiness';
import NewBusinessForm from './components/Businesses/NewBusinessForm';
import EditBusinessForm from './components/Businesses/EditBusiness';
import NewReviewForm from './components/Reviews/NewReviewForm';
import EditReviewForm from './components/Reviews/EditReviewForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Redirect to='/home'/>
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <Home/>
        </ProtectedRoute>
        <ProtectedRoute path='/businesses/new' exact={true} >
          <NewBusinessForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/businesses/:businessId/edit' exact={true} >
          <EditBusinessForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/businesses/:businessId' exact={true} >
          <IndividualBusiness/>
        </ProtectedRoute>
        <ProtectedRoute path='/businesses/:businessId/reviews/:id/edit' exact={true} >
          <EditReviewForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/businesses/:businessId/reviews/new' exact={true} >
          <NewReviewForm/>
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
