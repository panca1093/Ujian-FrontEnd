import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

class ProductItem extends Component {
  onCartClick = Id => {
    Axios.get("http://localhost:2000/product", {
      params: {
        id: Id
      }
    }).then(res1 => {
      console.log(res1);
      Axios.get(`http://localhost:2000/cart`, {
        params: {
          username: this.props.username,
          productId: Id
        }
      }).then(res => {
        console.log(res.data);

        if (res.data.length !== 0) {
          const qtyNew = res.data[0].qty + parseInt(this.qty.value);
          Axios.put(`http://localhost:2000/cart/${res.data[0].id}`, {
            username: this.props.username,
            name: res1.data[0].name,
            desc: res1.data[0].desc,
            price: res1.data[0].price,
            src: res1.data[0].src,
            qty: qtyNew,
            productId: res1.data[0].id
          });
        } else {
          Axios.post("http://localhost:2000/cart", {
            username: this.props.username,
            name: res1.data[0].name,
            desc: res1.data[0].desc,
            price: res1.data[0].price,
            src: res1.data[0].src,
            qty: parseInt(this.qty.value),
            productId: res1.data[0].id
          }).then(res => {
            console.log(`Add To Cart Berhasil`);
          });
        }
      });
    });
  };

  render() {
    const { item } = this.props;
    return (
      <div className="card col-3 m-3" style={{ width: "18rem" }} key={item.id}>
        <img src={item.src} className="card-img-top" alt={item.nama} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.desc}</p>
          <p className="card-text">Rp. {item.price.toLocaleString()}</p>
          <input
            className="form-control"
            type="number"
            ref={input => {
              this.qty = input;
            }}
            defaultValue={1}
          />
          <Link to={"/detailproduct/" + item.id}>
            <button className="btn btn-secondary btn-block btn-sm my-2">
              Detail
            </button>
          </Link>
          <button
            className="btn btn-primary btn-block btn-sm my-2"
            onClick={() => {
              this.onCartClick(item.id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { username: state.auth.username };
};

export default connect(mapStateToProps)(ProductItem);
