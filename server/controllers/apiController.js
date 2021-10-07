// TODO: import DB models
const db = require('../models/models');

const apiController = {};

apiController.getTopic = (req, res, next) => {

  const topic = req.params.topic; 
  // console.log('hey');
  const queryAll = 'SELECT * FROM posts';
  const querySingle = {
    text: `
      SELECT *
      FROM posts
      WHERE topic = $1;
    `,
    params: [topic]
  };
  if(topic == 'all'){
    db.query(queryAll, (err, dbResponse) => {
      if(err) {
        next({
          log: 'ERROR: apiController.getTopic',
          message: { err: err.message }
        });
      }
      // console.log(dbResponse);
      res.locals.topic = dbResponse.rows;
      return next();
    });
  }
  else{
    db.query(querySingle.text, querySingle.params, (err, dbResponse) => {
      if(err) {
        next({
          log: 'ERROR: apiController.getTopic',
          message: { err: err.message }
        });
      }
      //console.log(dbResponse);
      res.locals.topic = dbResponse.rows;
      return next();
    });
  }
};

apiController.getPost = (req, res, next) => {
  const id = req.params.post; 

  const query = {
    text: `
      SELECT *
      FROM posts
      WHERE id = $1;
    `,
    params: [id]
  };
  
  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.getPost',
        message: { err: err.message }
      });
    }
    //console.log(dbResponse)

    res.locals.post.postContent = dbResponse.rows[0];
    return next();
  });
};

apiController.getComments = (req, res, next) => {
  const id = req.params._id;
  console.log(id);

  // get comments from comments table using foreign key of correct post
  const query = {
    text: `
     SELECT *
     FROM replies 
     WHERE post_id = $1;
    `,
    params: [id]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.getComments',
        message: { err: err.message }
      });
    }
    console.log('dbres', dbResponse.rows);
    res.locals.comments = dbResponse.rows;
    console.log('locals', res.locals);
    return next();
  });
};

/*
  const createdPost = {
      topic: enteredTopic,
      date: Date.now(),
      upvotes: 0,
      downvotes: 0,
      title: enteredTitle,
      issue: enteredIssue,
      tried: enteredTried,
      cause: enteredCause,
      // description: enteredDescription,
      code: enteredCode,
      userId: null, // use cookie data to input user ID
    };
*/
apiController.createPost = (req, res, next) => {
  console.log('About to create a post'); 
  const user_id = 1; //req.cookies.userID;
  const { 
    topic,
    // date,
    upvotes,
    downvotes,
    title,
    issue,
    tried,
    cause,
    code
  } = req.body;

  const query = {
    text: `
      INSERT INTO posts (
        topic,
        upvotes,
        downvotes,
        title,
        issue,
        tried,
        cause,
        code,
        user_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `,
    params: [
      topic,
      // date,
      upvotes,
      downvotes,
      title,
      issue,
      tried,
      cause,
      code,
      user_id
    ]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.createPost',
        message: { err: err.message }
      });
    }
    res.locals.createdPost = dbResponse.rows[0];
    return next();
  });
};

apiController.editPost = (req, res, next) => {
    
  const { 
    _id,
    topic,
    date,
    upvotes,
    downvotes,
    title,
    issue,
    tried,
    cause,
    code
  } = req.body.editPost;

  const query = {
    text: `
      UPDATE posts
      SET 
        topic = $2,
        date = $3,
        upvotes = $4,
        downvotes = $5,
        title = $6,
        issue = $7,
        tried = $8,
        cause = $9,
        code = $10,
      WHERE _id = $1;
    `,
    params: [
      _id,
      topic,
      date,
      upvotes,
      downvotes,
      title,
      issue,
      tried,
      cause,
      code
    ]
  };
  
  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.editPost',
        message: { err: err.message }
      });
    }

    res.locals.editedPost = dbResponse.rows[0];
    return next();
  });
};

apiController.createComment = (req, res, next) => {

  const { 
    post_id,
    user_id, 
    reply
  } = req.body;

  const query = {
    text: `
      INSERT INTO comments (
        reply,
        post_id,
        user_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    params: [
      post_id,
      user_id,
      reply
    ]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
    if(err) {
      next({
        log: 'ERROR: apiController.createComment',
        message: { err: err.message }
      });
    }

    res.locals.createdComment = dbResponse.rows[0];
    return next();
  });
};


module.exports = apiController;