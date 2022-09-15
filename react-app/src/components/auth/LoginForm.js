import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import welcomeImage from '../../Images/signup_illustration.png'
import yelpLogo from '../../Images/yelp-logo-3.png'
import githubLogo from '../../Images/github-logo.svg'
import './LoginForm.css'
import Footer from '../Footer/footer.js'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log(data)
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemoUser = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <>
    <div className='header-top-login'>
        <div>
        <img className='yelp-logo' src={yelpLogo}/>
        </div>
    </div>
    <div className='login-form-container-main'>
      <form className='login-form' onSubmit={onLogin}>
        {/* <div className='errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div className='login-title-container'>
        <div >
        <h2 className='login-form-header'>Log in to Yap</h2>
        </div>
        <div className='header-2'>
        <p className='link-to-signup'> New to Yap?</p>
        <NavLink className='signup-link' to='/sign-up'> Sign Up</NavLink>
        </div>
        <div >
        <p className='app-description'>Yap is a fullstack application inspired by "Yelp"</p>
        </div>
         </div>
        <div className='email-container'>
          <label className='custom' htmlFor='email'>
            <input
              className='login-input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            {/* <span className='placeholder'>Email</span> */}
          </label>
        </div>
        <div className='password-container'>
          <label htmlFor='password'></label>
          <input
            className='login-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className='login-button' type='submit' disabled={email.length < 1 || password.length < 1}>Log In</button>
        <div className='login-or'>
          <div className='login-line'></div>
          <div className='login-or-word'>OR</div>
          <div className='login-line'></div>
        </div>
        <div className='demo-user-container'>
          <button onClick={handleDemoUser} className='login-button-demo'>Demo User</button>
        </div>
        <div className='landing-project-repo'>
                Check out the project repo here
                <a target='_blank' href='https://github.com/Joon-Bae/Yap'>
                <img className='project-repo-image' src={githubLogo}/>
                </a>
          </div>
        <div style={{ marginTop: 20 }} className='errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </form>
      <div className='login-image-right'>
            <img className='welcome-image' src={welcomeImage}/>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default LoginForm;
