import React, {useState, useEffect} from 'react';
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import {getVideoData} from "./reducer/video";
import {connect} from "react-redux";
import {configuredStore, RootState} from "../../store";
import routes from "../../config/constants/routes.json";


export interface IVideo extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export interface IVideo {
  idToken: null;
  videoData: null;
  loading: false;
  selectedVideoId: null;
}

export class Video extends React.Component<IVideo> {

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.getVideoData(this.props.idToken, this.props.selectedVideoId)

  }


  render = () => {
    const {idToken, videoData, loading} = this.props

    // if (idToken == null) {
    //   const {from} = location as any || {from: {pathname: routes.HOME}};
    //   return <Redirect to={from}/>;
    // }

    return ([
      <div className="container">
        <div style={{minHeight: "800px"}}>
        </div>
      </div>
    ])
  }
}


const mapStateToProps = ({userDashboard, videoPreview, authentication}: IVideo) => ({
  videoData: videoPreview.videoData,
  loading: videoPreview.loading,
  idToken: authentication.idToken,
  selectedVideoId: userDashboard.selectedVideoId,
});

const mapDispatchToProps = {
  getVideoData,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type  DispatchProps = typeof mapDispatchToProps;

export default connect<RootState, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Video);
