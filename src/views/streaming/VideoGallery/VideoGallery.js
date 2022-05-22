import React from 'react'
import {  tmdb } from './data-mock'
import './gallery.css'
import classnames from "classnames"
// import 'bootstrap/dist/css/bootstrap.min.css'
import { SingleVideoPoster } from 'components/Streaming'
import { Row, Col, Container, Button,   TabContent,
  TabPane,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink, 
  Badge,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap'
import SquaresBackground from '../../../components/Backgrounds/SquaresBackground'


const VideoGallery = () => {
  const [iconTabs, setIconsTabs] = React.useState(1);
  const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Western'];
  return (
    <>
      <div className='main'>
        <SquaresBackground />
        <Container
          className='align-items-center container-margin'
          style={{zIndex: 1000}}
        >
          <Row>
            <Col md='3'>

              <Card className="menu-card">
                <CardHeader>
                  <Nav className="nav-tabs-info" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: iconTabs === 1,
                        })}
                        onClick={(e) => setIconsTabs(1)}
                        href="#pablo"
                      >
                        {/* <i className="tim-icons icon-spaceship" /> */}
                        Movies
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: iconTabs === 2,
                        })}
                        onClick={(e) => setIconsTabs(2)}
                        href="#pablo"
                      >
                        {/* <i className="tim-icons icon-settings-gear-63" /> */}
                        TV Shows
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                    <TabPane tabId="link1">
                      { genres.map((genre, i) => (
                        <div key={i}>
                          <Button className="btn-link" color="info" disabled={false}>
                            {genre}
                          </Button>
                          {(i === 1 || i === 5 || i === 6) && (
                            <Badge className="badge-default">New</Badge>
                          )}
                        </div>
                      ))}
                    </TabPane>
                    <TabPane tabId="link2">
                      <p>
                        Completely synergize resource taxing relationships via
                        premier niche markets. Professionally cultivate one-to-one
                        customer service with robust ideas. <br />
                        <br />
                        Dynamically innovate resource-leveling customer service
                        for state of the art customer service.
                      </p>
                    </TabPane>
                    <TabPane tabId="link3">
                      <p>
                        Efficiently unleash cross-media information without
                        cross-media value. Quickly maximize timely deliverables
                        for real-time schemas. <br />
                        <br />
                        Dramatically maintain clicks-and-mortar solutions without
                        functional solutions.
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
                          
            </Col>
            <Col md='9'>
              <Row className="content-search">
                <Col>
                  <InputGroup>
                    <Input placeholder="Search" type="text" />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="tim-icons icon-zoom-split" style={{color: '#5fa6ff'}} />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                {tmdb.slice(0, 30).map((movie, i) => (
                  <Col md='3' sm='6' xs='12' className="pr-1 pb-2">
                    <SingleVideoPoster
                      key={i}
                      posterUrl={movie.poster_path}
                      // views={movie.imdbVotes}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default React.memo(VideoGallery)
