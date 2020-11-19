import axios from 'axios';

import {REQUEST, SUCCESS, FAILURE} from '../../../utils/action-type.util';

export const ACTION_TYPES = {
  LIST_VIDEO: 'userDashboard/LIST_VIDEO',
};

const initialState = {
  idToken: null as unknown as string,
  videoData: null,
  loading: false,
};

export type VideoState = Readonly<typeof initialState>;

// Reducer
export default (state: VideoState = initialState, action: any): VideoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LIST_VIDEO):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.LIST_VIDEO):
      return {
        ...initialState,
      };
    case SUCCESS(ACTION_TYPES.LIST_VIDEO):
      return {
        ...state,
        videoData: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export const getVideoData = (accessToken: any) => (dispatch: any) => {
  const data = {
    accessToken: accessToken
  };
  console.log(data)
  axios.post(
    `http://localhost:9000/api/videos/get-user-videos`,
    data
  ).then(res => {
    console.log(res)
    dispatch({
      type: SUCCESS(ACTION_TYPES.LIST_VIDEO),
      payload: res.data
    })
  })
};
