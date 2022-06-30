import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  Progress,
} from "reactstrap"
import { tmdb } from '../streaming/VideoGallery/data-mock'
import SquaresBackground from '../../components/Backgrounds/SquaresBackground'


const Crowdfunding = () => {

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className='main'>
      <SquaresBackground />
      <Container
        className='align-items-center container-margin'
        style={{zIndex: 1000}}
      >
        <Row>
          { tmdb.slice(11, 22).map((movie, i) => {
          const perc = getRandomInt(10, 100);
          const goalExact = getRandomInt(500000, 300000)
          const goalRounded = Math.round(goalExact/100000)*100000
          const goalString = goalRounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          const goalSoFar = Math.round(goalRounded * (perc / 100))
          const goalSoFarString = goalSoFar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          const contributorsCount = getRandomInt(50, 500)
          return (
          <Col md="4">
            <Card className="card-coin card-plain">
              <hr className="line-info" />
              <CardHeader style={{margin: 0}}>
                <img
                  alt="..."
                  className="img-center img-fluid"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="" width="270"
                />
              </CardHeader>
              <CardBody>
                <Row>
                    <Col className="text-center" md="12">
                      <h4 className="text-uppercase">{movie.title.toUpperCase()}</h4>
                      <span style={{fontSize: '200%', color: 'aliceblue'}}>
                          {' ' + goalString} DAI
                        </span>                      
                        <hr className="line-info" />
                    </Col>
                    <Col>
                      <div className="progress-container progress-info">
                        <span className="progress-badge">{goalSoFarString} DAI</span>

                        <Progress max="100" value={perc}>
                          <span className="progress-value">{perc} %</span>
                        </Progress>

                      </div>
                    </Col>
                </Row>
                <Row>
                  <ListGroup>
                    <ListGroupItem>Contributors count</ListGroupItem>
                    <ListGroupItem style={{fontSize: '150%'}}>
                      {contributorsCount}K
                    </ListGroupItem>
                    <hr className="line-info" style={{marginBottom: 0}} />
                  </ListGroup>
                </Row>
              </CardBody>
              <CardFooter className="text-center">
                <Button className="btn-simple" color="info">
                  More information
                </Button>
              </CardFooter>
            </Card>
          </Col>
          )}) }

        </Row>
      </Container>
    </div>
    
  )
}

export default React.memo(Crowdfunding)
