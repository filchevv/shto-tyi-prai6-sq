import axios from 'axios';

import {REQUEST, SUCCESS, FAILURE} from '../../../utils/action-type.util';
import {IVideo} from "../../../shared/model/video.model";

export const ACTION_TYPES = {
  LIST_VIDEOS: 'userDashboard/LIST_VIDEOS',
  LIST_GAMES: 'userDashboard/LIST_GAMES',
  START_RECORDING: 'userDashboard/START_RECORDING',
  STOP_RECORDING: 'userDashboard/STOP_RECORDING',
  SELECT_VIDEO: 'userDashboard/SELECT_VIDEO',
};

const initialState = {
  idToken: null as unknown as string,
  selectedVideoId: null as unknown as string,
  videos: [] as ReadonlyArray<IVideo>,
  loading: false,
  isRecording: false
};

export type UserDashboardState = Readonly<typeof initialState>;

// Reducer
export default (state: UserDashboardState = initialState, action: any): UserDashboardState => {
  console.log(action)
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LIST_VIDEOS):
    case REQUEST(ACTION_TYPES.LIST_GAMES):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.LIST_VIDEOS):
    case FAILURE(ACTION_TYPES.LIST_GAMES):
      return {
        ...initialState,
      };
    case SUCCESS(ACTION_TYPES.LIST_VIDEOS):
    case SUCCESS(ACTION_TYPES.LIST_GAMES):
      return {
        ...state,
        videos: action.payload,
        loading: false
      };
    case SUCCESS(ACTION_TYPES.START_RECORDING):
      return {
        ...state,
        videos: action.payload,
        loading: false,
        isRecording: true
      };
    case SUCCESS(ACTION_TYPES.STOP_RECORDING):
      return {
        ...state,
        videos: action.payload,
        loading: false,
        isRecording: false
      };
    case SUCCESS(ACTION_TYPES.SELECT_VIDEO):
      return {
        ...state,
        selectedVideoId: action.payload,
        loading: false,
        isRecording: false
      };

    default:
      return state;
  }
};

export const getVideosList = (accessToken: any) => (dispatch: any) => {
  const data = {
    accessToken: accessToken
  };
  dispatch({
    type: REQUEST(ACTION_TYPES.LIST_VIDEOS),
  })
  axios.post<IVideo>(
    `http://localhost:9000/api/videos/get-user-videos`,
    data
  ).then(res => {
    console.log(res)
    dispatch({
      type: SUCCESS(ACTION_TYPES.LIST_VIDEOS),
      payload: res.data
    })
  })
};

export const startRecording = (accessToken: any) => async (dispatch: any) => {
  const data = {
    accessToken: accessToken
  };

  axios.post(
    `http://localhost:9000/api/videos/start-recording`,
    data
  ).then(res => {
    dispatch({
      type: SUCCESS(ACTION_TYPES.START_RECORDING),
      payload: res.data
    })
  })
};

export const selectVideo = (selectedVideoId: any) => (dispatch: any) => {
  dispatch({
    type: SUCCESS(ACTION_TYPES.STOP_RECORDING),
    payload: selectedVideoId
  })
};

export const stopRecording = (accessToken: any) => async (dispatch: any) => {
  const data = {
    accessToken: accessToken
  };

  axios.post(
    `http://localhost:9000/api/videos/stop-recording`,
    data
  ).then(res => {
    dispatch({
      type: SUCCESS(ACTION_TYPES.STOP_RECORDING),
      payload: res.data
    })
  })
};

export const getGamesList = (accessToken: any) => async (dispatch: any) => {
  const data = {
    accessToken: accessToken
  };

  axios.post(
    'http://localhost:9000/api/user/ff/token',
    data,
    {headers: {'Content-Type': 'application/json'}}
  )
    .catch(function (error) {
      dispatch({
        type: FAILURE(ACTION_TYPES.LIST_GAMES),
        payload: error
      })
    })
    .then(res => {
      console.log(res)
      dispatch({
        type: SUCCESS(ACTION_TYPES.LIST_GAMES),
        payload: res.data
      })
    });
};
