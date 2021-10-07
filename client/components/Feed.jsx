import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import FeedCodeBlock from './FeedCodeBlock.jsx';

export default function Feed(props) {
  // React hooks for state - store the data from the database
  const [codeBlocks, setCodeBlocks] = useState([{       topic: 'javascript',       date: '8/10/2021',       upvotes: 5,       downvotes: 20,       title: 'This is a sample postMessage',       issue: 'This is the issue',       tried: 'this is what I tried',        cause: 'I am not sure',       code: '<code>',       replies: [{content:'This is reply 1', code: 'sample reply 1 code', upvotes:10 , downvotes: 5, date: '8/15/2020',}, {content: 'This is reply 2', code: 'this is sample 2 reply code', upvotes: 1, downvotes: 2, date: '8/20/2021',}]       }]);
  const [post, setPost] = useState();
  // const [posts, setPosts] = useState([]); //this was taken from CreatePost - same purpose as codeBlocks/setCodeBlocks


  // update state that we fetch

  function getFeed() {
    fetch(`/api/gettopic/${props.topic}`) //removed /topic
      .then((res) => res.json())
      .then((data) => {
        setCodeBlocks(data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getFeed();
  },[props.topic]);
  
  // create codeblock components and save them in an array called 'codeBlockEl'
  const codeBlockEl = codeBlocks.map(post => {
    return (
      <FeedCodeBlock 
        key={post._id} 
        post={post}
        clickHandler = {props.clickHandler}
      />
    );
  });

  // returns code block cards
  return (
    <div id='feed'>
      <h1>Welcome to Rate-My-Code</h1>
      {codeBlockEl}
    </div>
  );
}
