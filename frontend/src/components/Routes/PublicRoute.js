import React from 'react';
//import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...props }) => {
  return <Component {...props} />;
};

export default PublicRoute;