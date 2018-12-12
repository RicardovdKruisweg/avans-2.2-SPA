import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as Navlink,
  Container
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

export class AppNavbar extends Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar vertical color="dark" dark expand="sm">
          <Container>
          <NavbarBrand href="/"><NavLink to="/">Home</NavLink></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Navlink><NavLink to="/profile">Profile</NavLink></Navlink>
              </NavItem>
              <NavItem>
                <Navlink><NavLink to="/login">Logout</NavLink></Navlink>
              </NavItem>
            </Nav>
          </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
