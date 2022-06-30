import React, { useEffect } from 'react'
// import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useTheGraph } from "hooks/useTheGraph"

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Content from "components/Content"

const App = () => {
  const { useQuery, GET_USERS, GET_USER } = useTheGraph()
  const {  data: users } = useQuery(GET_USERS)
  // const {  data: user } = useQuery(GET_USER, { 
  //   variables: { id: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"}
  // })

  // useEffect(() => {
  //     users && user && console.log(users, user)
  // }, [users, user])

  return (
      <BrowserRouter>
        <Switch>
          <Route path="/components" render={(props) => <Index {...props} />} />
          <Route
            path="/landing-page"
            render={(props) => <LandingPage {...props} />}
          />
          <Route
            path="/register-page"
            render={(props) => <RegisterPage {...props} />}
          />
          <Route
            path="/profile-page"
            render={(props) => <ProfilePage {...props} />}
          />
          <Route
            path="/"
            render={(props) => <Content {...props} />}
          />
          <Redirect from="/" to="/components" />
        </Switch>
      </BrowserRouter>
  )
}

export default App
