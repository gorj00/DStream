import React from "react";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function PageHeader() {
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">DStream</h1>
          <h3 className="d-none d-sm-block">
            Master thesis Dapp prototype of decentralized video straming and content production service
          </h3>
          <Row className="justify-content-md-center">
            <Col md="5">
              <Button
                className="nav-link d-none d-lg-block"
                color="primary" size="lg"
              >
                <i className="tim-icons icon-spaceship" /> Sign Up
              </Button>
            </Col>
            <Col md="5">
              <Button
                className="nav-link d-none d-lg-block"
                color="default" size="lg"
              >
                <i className="tim-icons icon-cloud-download-93" /> Log In
              </Button>
            </Col>
            
          </Row>
        </div>
      </Container>
    </div>
  );
}
