import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FeedCodeBlock.module.css';

export default function FeedCodeBlock(props) {
  function handleClick() {
    props.onChange(props.post);
  }
  return (
    <section>
      <Link to={{
        pathname: '/home/postview/',
        state: {
          post: props.post,
        }
      }}>
        <div className={classes.codeBlock}>
          <div>
            <h2>{props.title}</h2>
            <code>{props.code}</code>
          </div>
        </div>
      </Link>
    </section>
  );
}