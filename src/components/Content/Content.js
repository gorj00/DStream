import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

import VideoGallery from "views/streaming/VideoGallery"

const Content = () => {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  },[]);

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <PageHeader />
        <div className="main">
          <Container className="align-items-center">
            <Switch>
              <Route
                path="/video-gallery"
                render={(props) => <VideoGallery {...props} />}
              />
            </Switch>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default React.memo(Content)
