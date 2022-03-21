import React from 'react'

const VideoGallery = React.lazy(() => import('./views/streaming/VideoGallery/VideoGallery'));
const Wallet = React.lazy(() => import('./views/wallet/Wallet'));

const routes = [
  {
    route: '/video-gallery',
    component: VideoGallery,
  },
  {
    route: '/wallet',
    component: Wallet,
  }
]

export default routes
