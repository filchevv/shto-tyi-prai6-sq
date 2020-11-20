import {useSelector} from "react-redux";
import styles from "../Login.css";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {Alert, Button, Col} from "reactstrap";
import React from "react";


export default function UserDashboard({location}) {
  const {isAuthenticated, loginError} = useSelector(state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    loginError: state.authentication.loginError,
  }));

  return (
    <div className={styles.container} data-tid="container">
TriHard Ma Bish
    </div>
  );
}
