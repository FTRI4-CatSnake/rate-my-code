import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import FeedCodeBlock from './FeedCodeBlock.jsx';
import ReplyContainer from '../containers/ReplyContainer.jsx';

export default function PostView({post}) {
  // React hooks for state - store the data from the database
  const [codeBlocks, setCodeBlocks] = useState([]);
  
  // create codeblock components and save them in an array
  const codeBlockEl = codeBlocks.map((code, i) => {
    return <FeedCodeBlock key={i} info={code} />;
  });

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
      <ReplyContainer post={post}/>
    </div>
  );
}
