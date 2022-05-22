import React from 'react'
import {
  Button,
  Row,
  Col,
} from 'reactstrap'
const SignIn = () => {
  return (
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
  )
}
 export default SignIn
