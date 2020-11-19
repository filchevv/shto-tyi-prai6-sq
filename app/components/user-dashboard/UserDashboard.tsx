import React from 'react';
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import {getVideosList, startRecording, stopRecording, selectVideo} from "./reducer/user-dashboard";
import {connect} from "react-redux";
import {RootState} from "../../store";
import routes from "../../config/constants/routes.json";
import {IVideo} from "../../shared/model/video.model";
import {Button} from "reactstrap";


export interface IUserDashboard extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export interface IUserDashboard {
  videos: []
  loading: false
  idToken: null
  isRecording: false
  selectedVideoId: null
}

export class UserDashboard extends React.Component<IUserDashboard> {

  constructor(props: any) {
    super(props);
  }

  startVideoRecording = () => {
    startRecording(this.props.idToken)
  };

  stopVideoRecording = () => {
    stopRecording(this.props.idToken)
  };

  selectVideo = (selectedVideoId: any) => {
    selectVideo(selectedVideoId)
  };

  componentDidMount() {
    if (this.props.videos.length == 0 && !this.props.loading)
      this.props.getVideosList(this.props.idToken)
  }


  render = () => {
    const {idToken, loading, isRecording, selectedVideoId, videos} = this.props

    if (selectedVideoId != null) {
      const {from} = location as any || {from: {pathname: routes.VIDEO_PREVIEW}};
      return <Redirect to={from}/>;
    }

    if (idToken == null) {
      const {from} = location as any || {from: {pathname: routes.HOME}};
      return <Redirect to={from}/>;
    }

    return ([
      isRecording ? <button key={"spvr"} onClick={this.stopVideoRecording}>Stop Recording</button> :
        <button key={"stvr"} onClick={this.startVideoRecording}>Start Recording</button>,
      videos && videos.length > 0 ? (
        <div className="container">
          <div style={{minHeight: "800px"}}>
            {videos.map((video: IVideo) => (
              <>
                <Button
                  onClick={this.selectVideo(video.id)} color="info" size="sm">
                  {video.videoPath}
                  Todo: introduce video name
                </Button>
                <br />
              </>
            ))}
          </div>
        </div>
      ) : (
        !loading && <div key={"nv"} className="alert alert-warning">No Articles found</div>
      )
    ]);
  }
}


const mapStateToProps = ({userDashboard, authentication}: IUserDashboard) => ({
  videos: userDashboard.videos,
  loading: userDashboard.loading,
  isRecording: userDashboard.isRecording,
  idToken: authentication.idToken,
  selectedVideoId: userDashboard.selectedVideoId,
});

const mapDispatchToProps = {
  getVideosList,
  startRecording,
  stopRecording,
  selectVideo
};

type StateProps = ReturnType<typeof mapStateToProps>;
type  DispatchProps = typeof mapDispatchToProps;

export default connect<RootState, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(UserDashboard);
