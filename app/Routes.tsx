/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from './config/constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import UserDashboard from "./components/user-dashboard/UserDashboard";
import VideoPreview from "./components/video/Video";

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route key={routes.USER_DASHBOARD}  path={routes.USER_DASHBOARD} component={UserDashboard} />
        <Route key={routes.HOME} path={routes.HOME} component={HomePage} />
        <Route key={routes.VIDEO_PREVIEW} path={routes.VIDEO_PREVIEW} component={VideoPreview} />
      </Switch>
    </App>
  );
}
