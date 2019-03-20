import React, { Component } from "react";
import axios from "axios";
import cookies from "universal-cookie";

import CheckOut from "./CheckOut";

const cookie = new cookies();

export default class Cart extends Component {
  state = {
    carts: [],
    checkOut: false
  };

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    axios
      .get("http://localhost:2000/cart", {
        params: {
          username: cookie.get("masih_login")
        }
      })
      .then(res => {
        this.setState({ carts: res.data });
      });
  };

  renderList = () => {
    return this.state.carts.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.desc}</td>
          <td>Rp. {item.price.toLocaleString()}</td>
          <td>{item.qty}</td>
          <td>
            <img className="list" src={item.src} alt={item.desc} />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.onDelete(item.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  onDelete = id => {
    axios.delete(`http://localhost:2000/cart/${id}`).then(res => {
      this.getCart();
    });
  };

  onCheckOut = () => {
    if (this.state.checkOut) {
      return <CheckOut cart={this.state.carts} />;
    } else {
      return (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              this.onBtnCheckOut();
            }}
          >
            Checkout
          </button>
        </div>
      );
    }
  };

  onBtnCheckOut = () => {
    this.setState({ checkOut: !this.state.checkOut });
  };

  render() {
    if (this.state.carts.length === 0) {
      return (
        <div className="container text-center">
          <h1 className="display-4">Your Cart</h1>
          <div className="row d-block text-center">
            <p className="lead my-auto"> Your Cart Is Empty ! </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1 className="display-4 text-center">Manage Product</h1>
          <div className="row d-flex justify-content-center">
            <table className="table table-hover mb-5 text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">DESC</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">QTY</th>
                  <th scope="col">PICTURE</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>{this.renderList()}</tbody>
            </table>
          </div>
          {this.onCheckOut()}
        </div>
      );
    }
  }
}
