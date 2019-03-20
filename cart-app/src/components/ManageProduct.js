import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class ManageProduct extends Component {
  state = {
    products: [],
    id: "",
    hidden: false
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios.get("http://localhost:2000/Product").then(res => {
      this.setState({ products: res.data });
    });
  };

  onAddInput = () => {
    const name = this.name.value;
    const desc = this.desc.value;
    const price = parseInt(this.price.value);
    const src = this.pict.value;

    this.onAdd(name, desc, price, src);
  };

  onAdd = (name, desc, price, src) => {
    axios
      .post("http://localhost:2000/Product", {
        name,
        desc,
        price,
        src
      })
      .then(res => {
        this.getProduct();
      });
  };

  onEdit = id => {
    this.setState({
      id: id
    });
  };

  onSaveChange = id => {
    const name = this.nameChange.value || this.state.products[id - 1].nama;
    const desc = this.descChange.value || this.state.products[id - 1].desc;
    const price = this.priceChange.value || this.state.products[id - 1].price;
    const src = this.pictChange.value || this.state.products[id - 1].src;

    axios
      .put(`http://localhost:2000/Product/${id}`, {
        name,
        desc,
        price,
        src
      })
      .then(res => {
        this.getProduct();
      });
  };

  onDelete = id => {
    axios.delete(`http://localhost:2000/Product/${id}`).then(res => {
      this.getProduct();
    });
  };

  renderList = () => {
    return this.state.products.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.desc}</td>
          <td>Rp. {item.price.toLocaleString()}</td>
          <td>
            <img className="list" src={item.src} alt={item.desc} />
          </td>
          <td>
            <button
              className="btn btn-primary mr-2"
              data-toggle="modal"
              data-target="#editProduct"
              onClick={() => {
                this.onEdit(item.id);
              }}
            >
              Edit
            </button>
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

  render() {
    // const { user } = this.props;
    console.log(this.props.username);

    // if (this.props.username !== "") {
    return (
      <div className="container">
        <div className="modal fade" id="editProduct">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ProductLabel">
                  Edit Product
                </h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    NAME :
                    <input
                      ref={input => (this.nameChange = input)}
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    DESC :
                    <textarea
                      ref={input => (this.descChange = input)}
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    PRICE :
                    <input
                      ref={input => (this.priceChange = input)}
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    PICTURE :
                    <input
                      ref={input => (this.pictChange = input)}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    this.onSaveChange(this.state.id);
                  }}
                  data-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <h1 className="display-4 text-center">Manage Product</h1>
        <table className="table table-hover mb-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">DESC</th>
              <th scope="col">PRICE</th>
              <th scope="col">PICTURE</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
        <h1 className="display-4 text-center">Input Product</h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">DESC</th>
              <th scope="col">PRICE</th>
              <th scope="col">PICTURE</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col">
                <input
                  ref={input => (this.name = input)}
                  className="form-control"
                  type="text"
                />
              </th>
              <th scope="col">
                <input
                  ref={input => (this.desc = input)}
                  className="form-control"
                  type="text"
                />
              </th>
              <th scope="col">
                <input
                  ref={input => (this.price = input)}
                  className="form-control"
                  type="text"
                />
              </th>
              <th scope="col">
                <input
                  ref={input => (this.pict = input)}
                  className="form-control"
                  type="text"
                />
              </th>
              <th scope="col">
                <button
                  className="btn btn-outline-warning"
                  onClick={this.onAddInput}
                >
                  Add
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
    // } else {
    //   return <Redirect to="/" />;
    // }
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username
  };
};

export default connect(mapStateToProps)(ManageProduct);
