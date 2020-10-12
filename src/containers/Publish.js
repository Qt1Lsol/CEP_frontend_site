import React from "react";
import { Redirect } from "react-router-dom";

const Publish = ({ token }) => {
  return token ? (
    <div>Publish Container</div>
  ) : (
    <Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
  );
};

export default Publish;
