import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
// core components
import ContentNavbar from "components/Navbars/ContentNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

import routes from 'routes'

const Content = () => {

  return (
    <>
      <ContentNavbar />
      <div className="wrapper index-page">

        {/* <PageHeader /> */}
        <div className="main">
          <Container className="align-items-center" style={{zIndex: 1000}}>
            <Suspense fallback={<div>Loading</div>}>
              <Switch>
              { routes.map((view, i) => (
                <Route
                  key={i}
                  path={view.route}
                  render={(props) => <view.component {...props} />}
                />
              ))}
              </Switch>
            </Suspense>
          </Container>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default React.memo(Content)
