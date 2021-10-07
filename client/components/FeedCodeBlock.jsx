import React from 'react';
import { Link } from 'react-router-dom';
import classes from './FeedCodeBlock.module.css';

export default function FeedCodeBlock(props) {
  return (
    <section>
      <Link to={{
        pathname: '/home/postview/',
        state: {
          post: props.post,
        }  
      }}
      onClick={() => props.clickHandler(props.post)}
      >
        <div className={classes.codeBlock}>
          <div>
            <h2>{props.post.title}</h2>
            <code>{props.post.code}</code>
          </div>
        </div>
      </Link>
    </section>
  );
}