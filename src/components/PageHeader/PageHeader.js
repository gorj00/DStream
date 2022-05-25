import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useAuth } from '../../hooks/useAuth'

export default function PageHeader() {
  const { login } = useAuth();

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
            <Col md="7">
              <Button
                className="nav-link d-none d-lg-block"
                color="primary" size="lg"
                onClick={login}
              >
                <i className="tim-icons icon-spaceship" /> Log In with Metamask
              </Button>
            </Col>
            {/* <Col md="5">
              <Button
                className="nav-link d-none d-lg-block"
                color="default" size="lg"
              >
                <i className="tim-icons icon-cloud-download-93" /> Log In
              </Button>
            </Col> */}
            
          </Row>
        </div>
      </Container>
    </div>
  );
}
