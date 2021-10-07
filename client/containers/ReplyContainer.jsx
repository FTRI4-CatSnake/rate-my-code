import { ClassNames } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import Reply from '../components/Reply.jsx';
import classes from './LogInContainer.module.css';

export default function ReplyContainer({post}) {
  //create hook to set replies
  const [replies, setReplies] = useState([]);

  //create a function that will fetch replies for given post
  function getReplies() {
    fetch(`/api/getreplies/${post._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReplies(data);
      })
      .catch((err) => console.log(err));
  }

  //call the function to get the replies
  useEffect(() => {
    getReplies();
  }, []);
  
  //**** TEMPORARY DUMMY DATA ****/
  // const replies = [
  //   {content: 'This is reply 1', code: 'amCoding = true;', upvotes: 10, downvotes: 50, date: '10/5/2021'},
  //   {content: 'This is reply 2', code: 'amDoneCoding = true;', upvotes: 10, downvotes: 50, date: '10/5/2021'},
  // ];
  
  // use the map method to create Reply components and save into into an array
  const repliesComponents = replies.map((reply, i) => {
    return <Reply key={i} reply={reply} />;
  });
  return (
    <div className={classes.replies}>
      Replies:
      {repliesComponents}
    </div>
  );
}