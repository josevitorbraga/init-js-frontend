import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function AdminRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <Route
      {...rest}
      render={props =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}
