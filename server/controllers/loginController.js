// TODO: import DB models
const db = require('../models/models');

const loginController = {};

/*Get user specified in req.body in getUser store in res.locals.user */
loginController.getUser = async (req, res, next) => {
  const { username, password } = req.body;
  //console.log(username);
  // Construct a DB query for username
  const query = {
    text: `
    SELECT *
    FROM users
    WHERE username = $1 AND pass = $2;
    `,
    params: [username, password]
  };

  // Query our DB o find username store result in res.locals.user
  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      console.log(err.message);
      next({
        log: 'ERROR: loginController.getUser',
        message: { err: err.message }
      });
    }
    console.log(dbResponse.rows[0]);
    res.locals.user = dbResponse.rows[0] || false;
    console.log(res.locals.user);
    return next();
  });


};

/*
  In verifyUser middleware, if we have a user in res.locals.user, verify password matches
    If there is no user with that name or the password does not match, return a message 
    and remove user from res.locals to avoid passing client user information
*/
loginController.verifyUser = (req, res, next) => {
  if(!res.locals.user) {  
    return next(); 
  } 

  const { password } = req.body;
  if(password !== res.locals.user.password) {
    delete res.locals.user;
  }
  
  return next();
};

/* 
  Check if a user was found in createUser:
  If user found, remove user from res.locals and move on
  If user not found, create user in database, store new user in res.locals.user and move on
*/     
loginController.createUser = (req, res, next) => {
  //probably don't need this right now
  // if(res.locals.user) {
  //   delete res.locals.user;
  //   return next();
  // }
  
  const { username, password } = req.body;
  console.log(req.body);
  const query = {
    text: `
      INSERT INTO users (username, pass)
      VALUES ($1, $2);
    `,
    params: [username, password]
  };
  
  db.query(query.text, query.params)
    .then(dbResponse=>{
      return next();
    })
    .catch((err)=>{
      console.log(err.message);
      next({
        log: 'ERROR: loginController.createUser',
        message: { err: err.message }
      });
    });
};

loginController.setCookie = (req, res, next) => {
  if(!res.locals.user) return next();

  // Get user's _id primary key and save in a variable
  const userID = res.locals.user._id;

  // Set a cookie equal to the user's _id primary key
  res.cookie('userID', userID);
  // Move on
  return next();
};


module.exports = loginController;