/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from './config/constants/routes.json';
import App from './Containers/App';
import Home from './Containers/Home';
import UserDashboard from './Components/user-dashboard/UserDashboard.js';
// import VideoPreview from "./Components/video/Video";

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route key={routes.USER_DASHBOARD}  path={routes.USER_DASHBOARD} component={UserDashboard} />
        <Route key={routes.LOGIN} path={routes.LOGIN} component={Home}/>
        {/*<Route key={routes.VIDEO_PREVIEW} path={routes.VIDEO_PREVIEW} component={VideoPreview} />*/}
      </Switch>
    </App>
  );
}
