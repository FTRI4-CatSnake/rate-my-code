import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import PostView from './components/PostView.jsx';

import LogInContainer from './containers/LogInContainer.jsx';
export default function App(props) {
  return (
    <div id='app'>
      <Switch>
        <Route path="/" exact>
          <LogInContainer />
        </Route>
        <Route path="/home">
          <MainContainer />
        </Route>
        {/* //delete this route once postview works by clicking on a post */}
        <Route path="/home/postview"> 
          <PostView />
        </Route>
      </Switch>
    </div>
  );
}
