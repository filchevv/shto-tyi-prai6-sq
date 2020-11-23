import React, {useState} from 'react';
import styles from './Login.css';
import {loginAction} from '../../actions/authentication';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Alert, Col} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import routes from '../../config/constants/routes.json';

export default function Login({location}) {
  const {isAuthenticated, loginError} = useSelector(state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    loginError: state.authentication.loginError,
  }));
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    username: 'admin@brainmap.com',
    password: 'password',
  })

  function handleChange({target: {name, value}}) {
    setFields({
      ...fields,
      [name]: value,
    });
  }

  function handleSubmit() {
    dispatch(loginAction(fields.username, fields.password));
  }

  if (isAuthenticated) {
    const {from} = location || {from: {pathname: routes.USER_DASHBOARD}};
    return <Redirect to={from}/>;
  }

  return (
    <div className={styles.container} data-tid="container">
      <div className="login">
        <AvForm onSubmit={handleSubmit} action="/dsa">
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
            value={fields.username || ''}
            placeholder="Your username"
            required
            errorMessage="Username cannot be empty!"
            autoFocus
            onChange={handleChange}
          />
          <AvField
            name="password"
            type="password"
            value={fields.password || ''}
            label="Password"
            placeholder="Your password"
            required
            errorMessage="Password cannot be empty!"
            onChange={handleChange}
          />
          <Button type="submit" className={styles.btn}>Login</Button>
        </AvForm>
      </div>
    </div>
  );
}
