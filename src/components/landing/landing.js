import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import flySorterLogo from '../../../assets/flysorter-logo.png';
import './landing.scss';

import AuthForm from '../auth-form/auth-form';
import * as routes from '../../routes';

// actions
import * as authActions from '../../action/auth';
import * as dataActions from '../../action/data';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    // setup store with needed DB data
    this.props.pGetUsers();
    this.props.pGetSubAssy();
    this.props.pGetParts();
  }
  handleLogin = (user) => {
    return this.props.pDoLogin(user)
        .then(() => {
          this.props.history.push(routes.DASHBOARD);
        })
        .catch(console.error);
  };

  handleSignup = (user) => {
    return this.props.pDoSignUp(user)
      .then((response) => {
        console.log(response);
        this.props.history.push(routes.DASHBOARD);
        return response;
      })
      .catch(console.error);
  };

  render() {
    const rootJSX = <div className='centered'>
      <img src={flySorterLogo} className='logo'/>
      <Link to='/signup' className='centered button'>Create an account</Link>
      <br/>
      <Link to='/login' className='centered button'>Login</Link>
    </div>;

    const signUpJSX = <div className='centered'>
      <img src={flySorterLogo} className='logo'/>
      <AuthForm type='signup' onComplete={this.handleSignup}/>
      <p className='base'>Already have an account?</p>
      <Link to='/login'>Login to FlySorter</Link>
    </div>;

    const loginJSX = <div className='centered'>
      <img src={flySorterLogo} className='logo'/>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p className='base'>No account?</p>
      <Link to='/signup'>Create an account</Link>
    </div>;

    const { location } = this.props;

    return (
        <nav>
          { location.pathname === routes.SIGNUP_FRONTEND ? signUpJSX : undefined }
          { location.pathname === routes.LOGIN ? loginJSX : undefined }
        </nav>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  users: state.users,
  subAssy: state.subAssy,
  parts: state.parts,
});

const mapDispatchToProps = dispatch => ({
  pDoSignUp: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
  pGetUsers: users => dispatch(dataActions.getUsers(users)),
  pGetSubAssy: subAssy => dispatch(dataActions.getSubAssy(subAssy)),
  pGetParts: parts => dispatch(dataActions.getParts(parts)),
});

Landing.propTypes = {
  location: PropTypes.object,
  pDoSignUp: PropTypes.func,
  pDoLogin: PropTypes.func,
  pGetUsers: PropTypes.func,
  pGetSubAssy: PropTypes.func,
  pGetParts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
