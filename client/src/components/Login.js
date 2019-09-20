import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Redirect } from 'react-router-dom';

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = e =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  // make a post request to retrieve a token from the api
  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage');
      })
      .catch(err => console.log(err));
  };

  // when you have handled the token, navigate to the BubblePage route
  if (localStorage.getItem('token')) return <Redirect to='/bubblepage' />;

  return (
    <>
      <h1>Welcome to the Bubbles App!</h1>
      {/* <p>Build a login page here</p> */}
      <div className='login-wrap'>
        <form onSubmit={login}>
          <label>
            username:
            <input
              type='text'
              name='username'
              placeholder='...username'
              // autoComplete='off'
              value={credentials.username}
              onChange={handleChange}
            />
          </label>
          <label>
            password:
            <input
              type='password'
              name='password'
              placeholder='...password'
              // autoComplete='off'
              value={credentials.password}
              onChange={handleChange}
            />
          </label>
          <button className='btn-login'>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
