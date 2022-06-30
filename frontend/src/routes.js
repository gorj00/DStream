import React from 'react'

const VideoGallery = React.lazy(() => import('./views/streaming/VideoGallery/VideoGallery'));
const Wallet = React.lazy(() => import('./views/wallet/Wallet'));
const SignIn = React.lazy(() => import('./views/IndexSections/SignIn'));
const Crowdfunding = React.lazy(() => import('./views/crowdfunding/Crowdfunding'));

const routes = [
  {
    route: '/video-gallery',
    component: VideoGallery,
  },
  {
    route: '/wallet',
    component: Wallet,
  },
  {
    route: '/new-content',
    component: Crowdfunding,
  },
  // { 
  //   route: '/',
  //   component: SignIn,
  // }
]

export default routes
