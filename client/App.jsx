import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import PostView from './components/PostView.jsx';

import LogInContainer from './containers/LogInContainer.jsx';
import SignupModal from './components/SignupModal.jsx';
export default function App(props) {
  const [creatingAccount, setCreatingAccount] = useState(false);
  let signupDisplay = '';

  if (creatingAccount === true) {
    signupDisplay = <signupModal />;
  }

  return (
    <div id='app'>
      <Switch>
        <Route path="/" exact>
          <LogInContainer />
          {signupDisplay}
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
