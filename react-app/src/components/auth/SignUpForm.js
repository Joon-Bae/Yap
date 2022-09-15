import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import welcomeImage from '../../Images/signup_illustration.png'
import yelpLogo from '../../Images/yelp-logo-3.png'
import githubLogo from '../../Images/github-logo.svg'
import Footer from '../Footer/footer.js'
import './SignupForm.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const validEmailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const onSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = [];
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      if (!password || !repeatPassword) {
        validationErrors.push('Please enter matching passwords')
      } else {
        validationErrors.push('Password and Confirm Password fields need to match')
      }
      setErrors(validationErrors)
    }
  };

  const validationErrors=[];
  useEffect(()=> {

    if (email?.length > 0 && !email?.match(validEmailRegex)) {
      validationErrors.push("Please enter a valid email.")
    }
    if (email?.trim().length > 255) {
      validationErrors.push("Email Address cannot be longer than 255 characters")
    }
    if (username?.trim().length > 40) {
      validationErrors.push("User Name cannot be longer than 40 characters")
    }
    if (password?.trim().length > 255 || repeatPassword?.trim().length > 255) {
      validationErrors.push("Passwords cannot be longer than 255 characters")
    }
    setErrors(validationErrors)
  }, [email, , username, password, repeatPassword])

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <>
    <div className='header-top-login'>
        <NavLink to ='/home'>
        <img className='yelp-logo' src={yelpLogo}/>
      </NavLink>
    </div>
    <div className='signup-form-container-main'>

    <form  className='signup-form' onSubmit={onSignUp}>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
       <div className='signup-title-container'>
        <div >
        <h2 className='signup-form-header'>Sign Up to Yap</h2>
        </div>
        <div className='header-2'>
        <p className='link-to-login'> Already have an account?</p>
        <NavLink className='login-link' to='/login'> Log In</NavLink>
        </div>
        <div >
        <p className='app-description'>Yap is a fullstack application inspired by "Yelp"</p>
        </div>
         </div>
      <div>
        <input
        className='signup-input'
          type='text'
          name='username'
          placeholder='User Name*'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <input
        className='signup-input'
          type='text'
          name='email'
          placeholder='Email*'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>

        <input
        className='signup-input'
          type='password'
          name='password'
          placeholder='Password*'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <input
        className='signup-input'
          type='password'
          name='repeat_password'
          placeholder='Confirm Password*'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button disabled={errors.length > 0 } className='signup-button' type='submit'>Sign Up</button>
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

export default SignUpForm;
