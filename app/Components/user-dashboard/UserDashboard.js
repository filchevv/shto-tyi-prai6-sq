import {useDispatch, useSelector} from "react-redux";
import styles from "../login/Login.css";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {Alert, Button, Col} from "reactstrap";
import React, {useEffect} from "react";
import {getVideos, startRecording, stopRecording, selectVideo} from '../../actions/user-dashboard';
import routes from "../../config/constants/routes.json";
import {Redirect} from "react-router-dom";

export default function UserDashboard({location}) {

  const {isAuthenticated, selectedVideoId, isRecording, idToken, loading, videos} = useSelector(state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    idToken: state.authentication.idToken,
    videos: state.userDashboard.videos,
    loading: state.userDashboard.loading,
    isRecording: state.userDashboard.isRecording,
    selectedVideoId: state.userDashboard.selectedVideoId,
  }));

  const dispatch = useDispatch();

  const getVideoList = () => {
    dispatch(getVideos());
  }

  const startVideoRecording = () => {
    dispatch(startRecording(idToken));
  };

  const stopVideoRecording = () => {
    dispatch(stopRecording(idToken));
  };

  if (!isAuthenticated) {
    const {loginFormPage} = location || {from: {pathname: routes.LOGIN}};
    return <Redirect to={loginFormPage}/>;
  }

  if (selectedVideoId) {
    const {videoPreviewPage} = location || {from: {pathname: routes.VIDEO_PREVIEW}};
    return <Redirect to={videoPreviewPage}/>;
  }


  const content = [
    isRecording ? <button key={"spvr"} onClick={stopVideoRecording}>Stop Recording</button> :
      <button key={"stvr"} onClick={startVideoRecording}>Start Recording</button>,
    videos && videos.length > 0 ? (
      <div className="container">
        <div style={{minHeight: "800px"}}>
          {videos.map((video) => (
            <>
              <Button
                onClick={selectVideo} color="info" size="sm">
                {video.videoPath}
                Todo: introduce video name
              </Button>
              <br/>
            </>
          ))}
        </div>
      </div>
    ) : (
      !loading && <div key={"nv"} className="alert alert-warning">No Articles found</div>
    )
  ];
  return (
    <div className={styles.container} data-tid="container">
      {content}
    </div>
  );
}
