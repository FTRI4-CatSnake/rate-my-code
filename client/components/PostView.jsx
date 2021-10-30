import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import FeedCodeBlock from './FeedCodeBlock.jsx';
import ReplyContainer from '../containers/ReplyContainer.jsx';
import Container from '@mui/material/Container';
import classes from '../containers/LogInContainer.module.css';

export default function PostView({post}) {
  // React hooks for state - store the data from the database
  const [codeBlocks, setCodeBlocks] = useState([]);
  
  // create codeblock components and save them in an array
  const codeBlockEl = codeBlocks.map((code, i) => {
    return <FeedCodeBlock key={i} info={code} />;
  });

  //return the PostView with comments below
  return (
    <Container className={classes.mainContainer}>
      <Container className={classes.insideContainer}>
        <header className={classes.postHeader}>
          <p>{post.title}</p>
          <p>{post.date}</p>
        </header>
        <div className={classes.postTopic}>
          <p>{post.topic}</p>
        </div>
        <div className={classes.postDescription}>
          <p>{post.issue}</p>
          <p>{post.cause}</p>
        </div>
        <div className={classes.postCode}>
          <p><code>{post.code}</code></p>
        </div>
        <div className={classes.postRankings}>
          <p>upvotes: {post.upvotes}</p>
          <p>downvotes: {post.downvotes}</p>
        </div>
        <ReplyContainer post={post}/>
      </Container>
    </Container>
);
}

