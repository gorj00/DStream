import React from 'react'
import movies, { posters } from './data-mock'
import './gallery.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { SingleVideoPoster } from 'components/Streaming'
import { Row, Col } from 'reactstrap'

const VideoGallery = () => {
  console.log(movies)
  return (
    <Row>
        {movies.slice(0,30).map((movie, i) => (
          <Col md="3" sm="6" xs="12">
            <SingleVideoPoster 
              key={i}
              posterUrl={posters[i].poster}
              views={movie.imdbVotes}
            />
          </Col>
        ))}
    </Row>
  )
}

export default React.memo(VideoGallery)
