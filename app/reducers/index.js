import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
// eslint-disable-next-line import/no-cycle
import authenticationReducer from './authentication';
import userDashboard from './user-dashboard';
// import video from './components/video/reducer/video';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducer,
    userDashboard: userDashboard,
    // videoPreview: video,
  });
}
