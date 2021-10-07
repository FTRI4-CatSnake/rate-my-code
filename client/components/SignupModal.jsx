import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import classes from './SignupModal.module.css';

//create the SignupModal Class
export default function SignupModal(props) {
  const [verified, setVerified] = useState(false);
  const [signedup, setSignedup] = useState(false);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  //create the signup function
  function signup() {
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const user = {
      username: enteredUsername,
      password: enteredPassword,
    };

    // send new user data to the DB
    fetch('/login/createuser', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          props.accountCreateToggle();
        }
      })
      .catch((err) => console.log('POST REQUEST ERROR: ', err));
  }

  return (
    <Container className={classes.insideContainer}>
      {/* temp bar to delete after development */}
      <h1 style={{textAlign: 'center'}}>Sign up for <br /> Rate-My-Code!</h1>
      <form>
        <div className={classes.inputContainer}>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            required
            id="username"
            ref={usernameInputRef}
          ></input>
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
          ></input>
        </div>
        <div className={classes.buttonContainer}>
          <Button variant="contained" onClick={signup}>
            Sign Up
          </Button>
        </div>
        <div className={classes.buttonContainer}>
          <Button variant="outlined" onClick={props.accountCreationToggle}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
}
