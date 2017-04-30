import React from 'react';
import PropTypes from 'prop-types';
// {/* action="/authenticate" method="post" */}

// import '../styles/login.css';
const LoginComponent = ({ passwordToggle, showPassword, loginRequest }) => {
  let email;
  let password;
  return (
    <div className="container">
      <div className="wrapper">
        <form
          name="Login_Form"
          className="form-signin"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.value.trim() && !password.value.trim()) {
              return;
            }
            loginRequest({
              email: email.value,
              password: password.value,
            });
            email.value = '';
            password.value = '';
          }}
        >
          <h3 className="form-signin-heading">Sign In</h3>
          <hr className="colorgraph" />
          <br />
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Username"
            required
            autoFocus
            ref={(node) => {
              email = node;
            }}
          />
          <input
            type={passwordToggle ? 'text' : 'password'}
            className="form-control"
            name="password"
            placeholder="Password"
            required
            ref={(node) => {
              password = node;
            }}
          />
          <div className="checkbox">
            <label htmlFor="showPass">
              <input
                onClick={showPassword}
                type="checkbox"
                id="showPass"
              /> Show password
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Login</button>
        </form>
      </div>
    </div>
  );
};

LoginComponent.propTypes = {
  showPassword: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  // passwordToggle: PropTypes.bool.isRequired,
};

export default LoginComponent;
