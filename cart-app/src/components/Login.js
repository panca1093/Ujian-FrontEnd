import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { onLoginClick } from "../actions";
import { onSetTimeOut } from "../actions";

class Login extends Component {
  onSubmit = () => {
    const user = this.username.value;
    const pass = this.password.value;

    this.props.onLoginClick(user, pass);
  };

  onSubmitError = () => {
    if (this.props.error !== "") {
      setTimeout(this.props.onSetTimeOut, 3000);

      return <div className="alert alert-danger my-2">{this.props.error}</div>;
    } else if (this.props.success !== "") {
      setTimeout(this.props.onSetTimeOut, 3000);
      return (
        <div className="alert alert-success my-2">{this.props.success}</div>
      );
    }
  };
  render() {
    if (this.props.username === "") {
      return (
        <div className="container card text-center card-form col-3">
          <h1 className="display-4 my-1">Login</h1>
          <hr />
          <div className="card-body">
            <form>
              <div className="form-group">
                <input
                  ref={input => {
                    this.username = input;
                  }}
                  type="text"
                  className="form-control form-control-md"
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <input
                  ref={input => {
                    this.password = input;
                  }}
                  type="password"
                  className="form-control form-control-md"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input
                  onClick={this.onSubmit}
                  type="button"
                  className="btn btn-outline-primary btn-block"
                  value="Sign In"
                />
              </div>
            </form>
            {this.onSubmitError()}
            <p className="lead">
              Don't have account ? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    success: state.auth.success,
    username: state.auth.username
  };
};

export default connect(
  mapStateToProps,
  { onLoginClick, onSetTimeOut }
)(Login);
