import React from 'react';
import styles from './Login.css';
import {login} from '../../shared/reducer/authentication';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {RootState} from '../../store';
import {connect} from 'react-redux';
import {Button, Alert, Col} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import routes from '../../config/constants/routes.json';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}


export interface ILoginProps {
  loginError: boolean;
  username: string;
  password: string;
}

export class Login extends React.Component<ILoginProps> {

  constructor(props: any) {
    super(props);
  }

  handleChange = (e: any) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  };
  // @ts-ignore
  handleSubmit = (e, _errors, {username, password}) => this.props.login(username, password);


  render = () => {
    const {location, isAuthenticated, loginError, username, password} = this.props;
    const {from} = location as any || {from: {pathname: routes.USER_DASHBOARD}};
    if (isAuthenticated) {
      return <Redirect to={from}/>;
    }
    return (
      <div className={styles.container} data-tid="container">
        <div className="login">
          <AvForm onSubmit={this.handleSubmit} action="/dsa">
            <Col md="12">
              {loginError ? (
                <Alert color="danger">
                  <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </Alert>
              ) : null}
            </Col>
            <AvField
              name="username"
              label="Username"
              value="admin@brainmap.com"
              // value = {username}
              placeholder="Your username"
              required
              errorMessage="Username cannot be empty!"
              autoFocus
            />
            <AvField
              name="password"
              type="password"
              value="password"
              // value={password}
              label="Password"
              placeholder="Your password"
              required
              errorMessage="Password cannot be empty!"
            />
            <Button type="submit" className={styles.btn}>Login</Button>
          </AvForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({authentication}: RootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  username: authentication.username,
  password: authentication.password,
  loginError: authentication.loginError,
  idToken: authentication.idToken,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapDispatchToProps = {login};

export default connect<RootState, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
