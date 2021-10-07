// Require Packages
const express = require('express');
const loginController = require('../controllers/loginController');

// Initializer our router
const router = express.Router();

/* Handle routes to the /login route */

// Handle request to /createUser to create a new user
/*
  Get user specified in req.body in getUser store in res.locals.user
  Check if a user was found in createUser:
    If user found, remove user from res.locals and move on
    If user not found, create user in database, store new user in res.locals.user and move on
  Finally, check if user was created:
    If created succesfully redirect them to the main container
    If unsucsessful return message that could not create user
*/

router.post('/createuser',
  //loginController.getUser,
  loginController.createUser,
  //loginController.setCookie,
  (req, res) => {
    const userInfo = {success: true, userID: res.locals.user._id};
    // if (res.locals.user == false) {
    //   userInfo.success = false;
    // }
    // else{
    //   userInfo.success = true;
    //   userInfo.userID = res.locals.user._id;
    // }
    // console.log(userInfo);
    res.status(200).json(userInfo);
  });

// Handle request to / for loging in a user
/*
  Get the user in the req.body in getUser middleware and store in res.locals.user
  In verifyUser middleware, if we have a user in res.locals.user, verify password matches
    If there is no user with that name or the password does not match, return a message and remove user from res.locals to avoid passing client user information
  Finally, if we have succesfully verified a user(data is in res.locals.user) redirect to main container. If failed to verify user, send failure message
*/

router.post('/',
  loginController.getUser,
  //loginController.verifyUser,
  // loginController.setCookie,
  (req, res) => {
    const userInfo = {success: true};
    if (res.locals.user == false) {
      userInfo.success = false;
    }
    else{
      userInfo.success = true;
      userInfo.userID = res.locals.user._id;
      userInfo.username = res.locals.user.username;
    }
    res.status(200).json(userInfo);
  });

// export as router
module.exports = router;