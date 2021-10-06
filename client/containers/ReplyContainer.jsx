import React, { useState } from 'react';
import Reply from '../components/Reply.jsx';

export default function ReplyContainer({post}) {
  const replies = post.replies;
  console.log(replies);
  //create React hook to set replies value
  //const [replies, setReplies] = useState([]);
  
  // fetch replies for specific post and save to replies array
  // fetch('/api/getreplies')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setReplies(data.replies);
  //   })
  //   .catch((err) => console.log(err));

  // use the map method to create Reply components and save into into an array
  const repliesComponents = replies.map((reply, i) => {
    return <Reply key={i} reply={reply} />;
  });
  console.log(repliesComponents);
  return (
    <div>
      Replies:
      {repliesComponents}
    </div>
  );
}