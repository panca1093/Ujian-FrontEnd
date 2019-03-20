import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { onLogoutUser } from "../actions";

class Header extends React.Component {
  state = {
    isOpen: false
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { user } = this.props;

    if (user.username === "") {
      return (
        <Navbar className="navbar bg-light mb-3" expand="md">
          <div className="container">
            <NavbarBrand href="/">TATOYAKI</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Product</NavLink>
                </NavItem>
                <Button color="primary">
                  <Link className="text-white" to="/login">
                    Sign In
                  </Link>
                </Button>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      );
    } else {
      return (
        <Navbar className="navbar bg-light mb-3" expand="md">
          <div className="container">
            <NavbarBrand href="/">TATOYAKI</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Product</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <span className="fas fa-user-secret fa-2x" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="text-capitalize">
                      Halo <br />
                      <strong> {user.username} </strong>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <NavLink className="text-dark" href="/manageproduct">
                        Manage Product
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink className="text-dark" href="/cart">
                        Cart
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        this.props.onLogoutUser();
                      }}
                    >
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      );
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  { onLogoutUser }
)(Header);
