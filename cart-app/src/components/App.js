import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import cookies from "universal-cookie";
import { connect } from "react-redux";
import { keepLogin } from "../actions";

import Header from "./Header.js";
import Home from "./Home";
import Login from "./Login.js";
import Register from "./Register.js";
import ManageProduct from "./ManageProduct";
import DetailProduct from "./DetailProduct";
import Cart from "./Cart";

const cookie = new cookies();

class App extends Component {
  componentDidMount() {
    var userCookie = cookie.get("masih_login");
    if (userCookie !== undefined) {
      this.props.keepLogin(userCookie);
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/manageproduct" component={ManageProduct} />
          <Route path="/detailproduct/:product_id" component={DetailProduct} />
          <Route path="/cart" component={Cart} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { username: state.auth.username };
};

export default connect(
  mapStateToProps,
  { keepLogin }
)(App);
