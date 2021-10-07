import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FeedCodeBlock.module.css';

export default function FeedCodeBlock(props) {
  return (
    <section>
      {/* update the link to /postview/${props.info.id} to get the post id from props and redirect there */}
      <Link to={`/home/postview/${props.key}`}>
        <div className={classes.codeBlock}>
          <div>
            {props.Linkpost} 
            <h2>{props.title}</h2>
            <code>{props.code}</code>
          </div>
        </div>
      </Link>
    </section>
  );
}