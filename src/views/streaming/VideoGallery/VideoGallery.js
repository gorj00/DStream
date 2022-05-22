import React from 'react'
import movies, {  tmdb } from './data-mock'
import './gallery.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { SingleVideoPoster } from 'components/Streaming'
import { Row, Col, Container } from 'reactstrap'
import SquaresBackground from '../../../components/Backgrounds/SquaresBackground'


const VideoGallery = () => {
  return (
    <>
      <div className='main'>
        <SquaresBackground />
        <Container
          className='align-items-center container-margin'
          style={{zIndex: 1000}}
        >
          <Row>
            {tmdb.slice(0, 30).map((movie, i) => (
              <Col md='3' sm='6' xs='12'>
                <SingleVideoPoster
                  key={i}
                  posterUrl={movie.poster_path}
                  // views={movie.imdbVotes}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default React.memo(VideoGallery)
