import React from 'react';
import styles from './Login.css';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {RootState} from '../../store';
import {connect} from 'react-redux';
import {Button, Alert, Col} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import routes from '../../config/constants/routes.json';
import {getGamesList, getVideosList} from "./reducer/user-dashboard";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";


export interface IUserDashboard extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export class UserDashboardOld extends React.Component<IUserDashboard> {

  constructor(props: any) {
    super(props);
    this.state = {
      photos: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  }

  getPhotos(page) {
    this.setState({loading: true});
    axios
      .get(
        `http://localhost:9010/api/videos/get-user-videos`
      )
      .then(res => {
        this.setState({photos: [...this.state.photos, ...res.data]});
        this.setState({loading: false});
      });
  }

  componentDidMount() {
    this.getPhotos(this.state.page);
  }

  render = () => {

    return (
      <div>
        <InfiniteScroll
          dataLength={10} //This is important field to render the next data
          next={this.state.photos}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={this.refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          {this.state.photos}
        </InfiniteScroll>
      </div>
    );
  }
}



const mapStateToProps = ({authentication}: RootState) => ({
  isAuthenticated: authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapDispatchToProps = {getGamesList, getVideosList};

export default connect<RootState, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboardOld);
