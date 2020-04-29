import React, { useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import cookie from 'react-cookies'

const ProtectedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={
      props => {
        let loggedInUser = cookie.load('user')
        console.log("Protected Route " + JSON.stringify(loggedInUser))
        if (loggedInUser !== undefined) {
          return <Component loggedInUser={loggedInUser} {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;