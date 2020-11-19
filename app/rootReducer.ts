import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {History} from 'history';
// eslint-disable-next-line import/no-cycle
import authenticationReducers from './shared/reducer/authentication';
import userDashboard from './components/user-dashboard/reducer/user-dashboard';
import video from './components/video/reducer/video';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducers,
    userDashboard: userDashboard,
    videoPreview: video,
  });
}
