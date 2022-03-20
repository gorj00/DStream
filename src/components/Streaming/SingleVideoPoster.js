import React from 'react'
import { Col } from 'reactstrap'

const SingleVideoPoster = ({
  posterUrl, title, type, views, hearts, episodesCount=null, seriesOrder=null
}) => {
  return (
    <>
      <div className="thumbnail">
          <a href="#"> <img src={posterUrl} alt="" width="270" /></a>

          <div class="thumbnail_overlay">
              <a class="fa fa-eye" href="#"> <span class="badge">{views}</span></a>
              {/* <a class="fa  fa-clock-o" href="#"> <span class="badge">01:27:34</span></a> */}
              <a class="fa fa-heart" href="#"> <span class="badge">{hearts}</span></a>
          </div>
      </div>
      <h5 className="fw-m">{title}</h5>
    </>
  )
}

export default React.memo(SingleVideoPoster)
