import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { onRegistClick } from "../actions";
import { onSetTimeOut } from "../actions";

class Register extends Component {
  onSubmit = () => {
    const user = this.username.value;
    const mail = this.email.value;
    const pass = this.password.value;

    this.props.onRegistClick(user, mail, pass);
  };

  onSubmitError = () => {
    if (this.props.success !== "") {
      setTimeout(this.props.onSetTimeOut, 3000);
      return (
        <div className="alert alert-success my-2">
          {this.props.success}
          <Redirect to="/login" />
        </div>
      );
    } else if (this.props.error !== "") {
      setTimeout(this.props.onSetTimeOut, 3000);

      return <div className="alert alert-danger my-2">{this.props.error}</div>;
    }
  };
  render() {
    return (
      <div className="container card text-center card-form col-3">
        <h1 className="display-4 my-1">Register</h1>
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
                  this.email = input;
                }}
                type="email"
                className="form-control form-control-md"
                placeholder="email"
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
                value="Sign Up"
              />
            </div>
          </form>
          {this.onSubmitError()}
          <p className="lead">
            already have an account ? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { error: state.auth.error, success: state.auth.success };
};

export default connect(
  mapStateToProps,
  { onRegistClick, onSetTimeOut }
)(Register);
