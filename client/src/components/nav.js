import React from "react";
import { Dropdown } from "primereact/dropdown";
import logo from "../assets/rateitlogo.png";
import { Navbar, Nav } from "react-bootstrap";

export default class nav extends React.Component {
  professionItems = [
    { label: "Musician", value: "Musician" },
    { label: "Lecturer", value: "Lecturer" },
    { label: "Yoga teacher", value: "Yoga teacher" },
    { label: "Chef", value: "Chef" },
    { label: "Standup comedian", value: "Standup comedian" },
    { label: "Others", value: "Others" }
  ];
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="top"
      >
        <Navbar.Brand href="#home">
          <img className="logo" src={logo} alt="pic" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            {this.props.user ? (
              <Nav.Link href="#logout" className="text-danger">
                Logout
              </Nav.Link>
            ) : (
              ""
            )}

            <Dropdown
              required
              name="profession"
              options={this.professionItems}
              placeholder="Explore professionals"
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
