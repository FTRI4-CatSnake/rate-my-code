import React, { useState, useLocation } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import 'react-pro-sidebar/dist/css/styles.css';

import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';

import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import classes from './MainContainer.module.css';
import ThemedFeed from '../components/ThemedFeed.jsx';
import CreatePost from '../components/CreatePost.jsx';
import PostView from '../components/PostView.jsx';
import './custom.scss';

const drawerWidth = 200;


export default function MainContainer() {

  const [topic, setTopic] = useState('all');
  const [selectedPost, setSelectedPost] = useState({});

  function handlePostClick(clickedPost) {
    setSelectedPost(clickedPost);
  }
 
  return (
    <Container className={classes.mainContainer}>
      <div className={classes.flexContainer}>
        <div className={classes.leftonethird}>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            {/* <List> */}
            <List>
              <ListItem button key={'all'} onClick={() => setTopic('all')}>All Posts</ListItem>
              <ListItem button key={'javascript'} onClick={() => setTopic('javascript')}>JavaScript</ListItem>
              <ListItem button key={'python'} onClick={() => setTopic('python')}>Python</ListItem>
              <ListItem button key={'c#'} onClick={() => setTopic('c#')}>C#</ListItem>
              <ListItem button key={'c++'} onClick={() => setTopic('c++')}>C++</ListItem>
              <ListItem button key={'java'}onClick={() => setTopic('java')}>Java</ListItem>
              <ListItem button key={'php'} onClick={() => setTopic('php')}>PHP</ListItem>
            </List>
            {/* </List> */}
            <Divider />
          </Drawer>
        </div>
        <div className={classes.righttwothirds}>
          <Switch>
            <Route path="/home" exact>
              <ThemedFeed clickHandler={handlePostClick} topic={topic} />
            </Route>
            <Route path="/home/createpost">
              <CreatePost />
            </Route>
            <Route path="/home/postview">
              <PostView post={selectedPost} />
            </Route>
          </Switch>
        </div>
      </div>

      {/* This makes the createPost button */}
      <div>
        <Link to="/home/createpost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Link>
      </div>
    </Container>
  );
}

// //@import '~react-pro-sidebar/dist/scss/styles.scss'; for styles.scss
