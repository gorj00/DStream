import React from 'react'

const SingleVideoPoster = ({
  posterUrl, title, type, hearts, episodesCount=null, seriesOrder=null
}) => {
  return (
    <>
      <div className="thumbnail">
          <a href="#"> <img src={`https://image.tmdb.org/t/p/w500/${posterUrl}`} alt="" width="270" /></a>
      </div>
    </>
  )
}

export default React.memo(SingleVideoPoster)
