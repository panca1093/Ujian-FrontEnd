import React, { Component } from "react";

class CheckOut extends Component {
  renderCheckOut = () => {
    return this.props.cart.map(item => {
      var jumlah = item.qty * item.price;
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.price.toLocaleString()}</td>
          <td>{item.qty}</td>
          <td>Rp. {jumlah.toLocaleString()}</td>
        </tr>
      );
    });
  };

  totalCheckOut = () => {
    const reducer = (a, b) => {
      return a + b;
    };
    var jumlah = this.props.cart.map(item => {
      var jml = item.qty * item.price;
      return jml;
    });
    var total = jumlah.reduce(reducer);
    return (
      <tr>
        <td colSpan="4" className="text-center">
          Total Cart
        </td>
        <td className="text-center">Rp. {total.toLocaleString()}</td>
      </tr>
    );
  };

  render() {
    return (
      <div>
        <h1 className="display-4 text-center">Checkout</h1>
        <div className="row d-flex justify-content-center">
          <table className="table table-hover mb-5 text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">JUMLAH</th>
              </tr>
            </thead>
            <tbody>{this.renderCheckOut()}</tbody>
            <tfoot>{this.totalCheckOut()}</tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default CheckOut;
