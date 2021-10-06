import React, { useState } from 'react';
import Reply from '../components/Reply.jsx';

export default function ReplyContainer() {
  //create React hook to set replies value
  const [replies, setReplies] = useState([]);
  
  // fetch replies for specific post and save to replies array
  fetch('/api/getpost')
    .then((res) => res.json())
    .then((data) => {
      setReplies(data.replies);
    })
    .catch((err) => console.log(err));

  // use the map method to create Reply components and save into into an array
  const repliesComponents = replies.map((reply, i) => {
    return <Reply key={i} reply={reply} />;
  });

  return (
    <div>
      {repliesComponents}
    </div>
  );
}