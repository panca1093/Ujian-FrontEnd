import React, { Component } from "react";
import axios from "axios";

class DetailProduct extends Component {
  state = {
    product: {}
  };

  componentDidMount() {
    const idproduct = parseInt(this.props.match.params.product_id);
    axios.get(`http://localhost:2000/product/${idproduct}`).then(res => {
      this.setState({ product: res.data });
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div className="card container" key={product.id}>
        <div className="card-header">{product.nama}</div>
        <div className="card-body row">
          <div className="col-4">
            <img src={product.src} alt={product.nama} width="250" />
          </div>
          <div className="col-8">
            <h3 className="card-title">Product: {product.nama}</h3>
            <p className="card-text">Description: {product.desc}</p>
            <p className="card-text">Price: Rp.{product.price}</p>
            <a href="/" className="btn btn-block btn-primary">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailProduct;
