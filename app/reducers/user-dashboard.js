import {
  TYPE_DASHBOARD_LOADING,
  TYPE_GET_VIDEOS_ERROR,
  TYPE_GET_VIDEOS_SUCCESS,
  TYPE_START_VIDEO_RECORDING_SUCCESS,
  TYPE_START_VIDEO_RECORDING_ERROR,
  TYPE_STOP_VIDEO_RECORDING_SUCCESS,
  TYPE_STOP_VIDEO_RECORDING_ERROR,
  TYPE_SELECT_VIDEO_PREVIEW
} from '../actions/user-dashboard.js';

const initialState = {
  selectedVideoId: null,
  videos: [],
  loading: false,
  isRecording: false,
  errorMessage: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_DASHBOARD_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TYPE_GET_VIDEOS_ERROR:
    case TYPE_START_VIDEO_RECORDING_ERROR:
    case TYPE_STOP_VIDEO_RECORDING_ERROR:
      return {
        ...initialState,
        errorMessage: action.payload,
        loading: false,
      };
    case TYPE_GET_VIDEOS_SUCCESS:
      return {
        ...state,
        isRecording: true,
        loading: false,
        videos: action.payload
      };
    case TYPE_START_VIDEO_RECORDING_SUCCESS:
      return {
        ...state,
        isRecording: true,
        loading: false
      };
    case TYPE_STOP_VIDEO_RECORDING_SUCCESS:
      return {
        ...state,
        isRecording: false,
        loading: false
      };
    case TYPE_SELECT_VIDEO_PREVIEW:
      return {
        ...state,
        selectedVideoId: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
