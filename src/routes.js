import React from 'react'

const VideoGallery = React.lazy(() => import('./views/streaming/VideoGallery/VideoGallery'));


const routes = [
  {
    route: '/video-gallery',
    component: VideoGallery,
  }
]

export default routes
