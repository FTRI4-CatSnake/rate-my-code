import React, { useRef } from 'react';
import FeedCodeBlock from './FeedCodeBlock.jsx';
import ReplyContainer from '../containers/ReplyContainer.jsx';
import Button from '@mui/material/Button';

import classes from '../containers/LogInContainer.module.css';

export default function PostView({post, uid}) {
  const replyInputRef = useRef();

  function submitReply() {

    const enteredReply = replyInputRef.current.value;
    const bodyObj = {post_id: post._id, user_id: uid, comment: enteredReply};
    fetch('/api/createcomment',{
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(bodyObj),
    })
      .then((res) => res.json())
      .catch((err) => console.log('GET REQUEST ERROR: ', err));
  }

  //return the PostView with comments below
  return (
    <div>
      <div id='post'>
        <p>{post.title}</p>
        <p>{post.topic}</p>
        <p>{post.issue}</p>
        <p>{post.cause}</p>
        <p>{post.code}</p>
        <p>{post.date}</p>
      </div>
      <div id='post-rankings'>
        <p>{post.upvotes}</p>
        <p>{post.downvotes}</p>
      </div>
      <div id='create-reply'>
        <form>
          <label htmlFor="reply">New Reply</label>
          <input
            type="text"
            required
            id="reply"
            ref={replyInputRef}
          ></input>
          <div className={classes.buttonContainer}>
            <Button variant="outlined" onClick={submitReply}>
              Submit
            </Button>
          </div>
        </form>
      </div>
      <ReplyContainer post={post}/>
    </div>
  );
}
