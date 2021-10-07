import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import FeedCodeBlock from './FeedCodeBlock.jsx';

export default function Feed(props) {
  // React hooks for state - store the data from the database
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [post, setPost] = useState();
  // const [posts, setPosts] = useState([]); //this was taken from CreatePost - same purpose as codeBlocks/setCodeBlocks


  // update state that we fetch

  function getFeed() {
    console.log(`/api/gettopic/${props.topic}`);
    fetch(`/api/gettopic/${props.topic}`) //removed /topic
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
