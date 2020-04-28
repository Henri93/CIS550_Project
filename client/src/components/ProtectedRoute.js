import React, { useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import { SessionContext } from "./session";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const session = useContext(SessionContext);
  
  console.log(session)
  return (
    <Route {...rest} render={
      props => {
        console.log("Protected Route " + JSON.stringify(session.user))
        if (session.user !== undefined) {
          return <Component loggedInUser={session.user} {...rest} {...props} />
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