import React from 'react'

const VideoGallery = React.lazy(() => import('./views/streaming/VideoGallery/VideoGallery'));
const Wallet = React.lazy(() => import('./views/wallet/Wallet'));
const SignIn = React.lazy(() => import('./views/IndexSections/SignIn'));

const routes = [
  {
    route: '/video-gallery',
    component: VideoGallery,
  },
  {
    route: '/wallet',
    component: Wallet,
  },
  // { 
  //   route: '/',
  //   component: SignIn,
  // }
]

export default routes
