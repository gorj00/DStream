import React from 'react'

const SingleVideoPoster = ({
  posterUrl, showInfo, title, backdropUrl, description, episodesCount=null, seriesOrder=null
}) => {
  return (
    <>
      <div className="thumbnail pr-1 pb-2">
          <img 
            src={`https://image.tmdb.org/t/p/w500${posterUrl}`} 
            alt="" width="270" 
            onClick={() => showInfo(
              `https://image.tmdb.org/t/p/w500${backdropUrl}`,
              { title, description }
            )}
          />
      </div>
    </>
  )
}

export default React.memo(SingleVideoPoster)
