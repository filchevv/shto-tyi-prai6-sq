import axios from "axios";

export const TYPE_DASHBOARD_LOADING = 'dashboard.loading';
export const TYPE_GET_VIDEOS_ERROR = 'dashboard.get.videos.error';
export const TYPE_GET_VIDEOS_SUCCESS = 'dashboard.get.videos.success';
export const TYPE_START_VIDEO_RECORDING_SUCCESS = 'dashboard.start.video.recording.success';
export const TYPE_START_VIDEO_RECORDING_ERROR = 'dashboard.start.video.recording.error';
export const TYPE_STOP_VIDEO_RECORDING_SUCCESS = 'dashboard.stop.video.recording.success';
export const TYPE_STOP_VIDEO_RECORDING_ERROR = 'dashboard.stop.video.recording.error';
export const TYPE_SELECT_VIDEO_PREVIEW = 'dashboard.select.video.preview';

export const loadingAction = isLoading => ({
  type: TYPE_DASHBOARD_LOADING,
  payload: isLoading,
});

export const getVideos = (accessToken) => async (dispatch) => {

  try {
    const {data} = await axios.post('http://localhost:9000/api/videos/get-user-videos', {
      accessToken: accessToken
    });

    dispatch({
      type: TYPE_GET_VIDEOS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: TYPE_GET_VIDEOS_ERROR,
      payload: e.message || e,
    })
  }
};

export const startRecording = (accessToken) => async (dispatch) => {

  try {
    await axios.post('http://localhost:9000/api/videos/start-recording', {
      accessToken: accessToken
    });

    dispatch({
      type: TYPE_START_VIDEO_RECORDING_SUCCESS
    });
  } catch (e) {
    dispatch({
      type: TYPE_START_VIDEO_RECORDING_ERROR,
      payload: e.message || e,
    })
  }
};

export const stopRecording = (accessToken) => async (dispatch) => {

  try {
    await axios.post('http://localhost:9000/api/videos/stop-recording', {
      accessToken: accessToken
    });

    dispatch({
      type: TYPE_STOP_VIDEO_RECORDING_SUCCESS
    });
  } catch (e) {
    dispatch({
      type: TYPE_STOP_VIDEO_RECORDING_ERROR,
      payload: e.message || e,
    })
  }
};


export const selectVideo = (selectedVideoId) => (dispatch) => {
  dispatch({
    type: TYPE_SELECT_VIDEO_PREVIEW,
    payload: selectedVideoId
  })
};
