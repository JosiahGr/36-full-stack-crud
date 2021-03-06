import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import autoBind from './../../utils';

const emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'username is required',

  email: '',
  emailDirty: false,
  emailError: 'email is required',

  password: '',
  passwordDirty: false,
  passwordError: 'password is required',
};
const MIN_NAME_LENGTH = 6;
const MIN_PASSWORD_SIZE = 6;

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, AuthForm);
  }

  handleValidation(name, value) {
    if (this.props.type === 'login') {
      return null;
    }
    switch (name) {
      case 'username':
        if (value.length < MIN_NAME_LENGTH) {
          return `Your name must be at least ${MIN_NAME_LENGTH} characters long`;
        }
        return null;

      case 'email':
        if (!validator.isEmail(value)) {
          return 'You must provide a valid email';
        }
        return null;

      case 'password':
        if (value.length < MIN_PASSWORD_SIZE) {
          return `Your password must be at least ${MIN_PASSWORD_SIZE} characters long`;
        }
        return null;

      default:
        return null;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ 
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { usernameError, emailError, passwordError } = this.state;
    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    } else {
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
      });
    }
  }

  render() {
    let { type } = this.props;

    type = type === 'login' ? type : 'signup';
    // TODO: check here if not working
    const signupJSX =
      <div>
        { this.state.emailDirty ? <p>{ this.state.emailError }</p> : undefined }
      <input
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
        />
      </div>;

    const signupRenderedJSX = (type !== 'login') ? signupJSX : undefined;

    return (
      <form className='auth-form' noValidate onSubmit={this.handleSubmit} >
        
        { this.state.usernameDirty ? <p>{ this.state.usernameError }</p> : undefined }
        <input
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
          />

        {signupRenderedJSX}

        { this.state.passwordDirty ? <p>{ this.state.passwordError }</p> : undefined }
        <input
          className= { this.state.passwordDirty ? 'input-error' : '' }
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          />

        <button type='submit'> {type} </button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
