import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as routes from '../../routes';
import * as authActions from '../../actions/auth-actions';
import * as profileActions from '../../actions/profile';

import autoBind from '../../utils';
import AuthForm from '../auth-form/auth-form';


class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, AuthLanding);
  }

  handleLogin(user) {
    return this.props.pDoLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
        this.props.pFetchProfile();
        // TODO: this may be troublesome
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.pDoSignup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  render() {
    const rootJSX = <div>
      <h2> WELCOME TO OUR APP! </h2>
      <Link to='/signup'> Sign up</Link>
      <Link to='/login'> Login</Link>
    </div>;

    const signUpJSX = 
      <div>
        <h2>Signup</h2>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
        <AuthForm onComplete={this.handleSignup} type="Signup"/>
      </div>;


    const loginJSX = 
      <div>
        <h2>Login</h2>
        <p>Need an account?</p>
        <Link to="/signup">Signup</Link>
        <AuthForm onComplete={this.handleLogin} type="Login"/>
      </div>;

    const { location } = this.props;

    return (
      <div className='landing'>
        {location.pathname === routes.ROOT_ROUTE ? rootJSX : undefined }
        {location.pathname === routes.SIGNUP_ROUTE ? signUpJSX : undefined }
        {location.pathname === routes.LOGIN_ROUTE ? loginJSX : undefined }
      </div>
    );
  }
}

AuthLanding.propTypes = {
  pDoLogin: PropTypes.func,
  pDoSignup: PropTypes.func,
  pFetchProfile: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  pDoSignup: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
  pFetchProfile: () => dispatch(profileActions.fetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
