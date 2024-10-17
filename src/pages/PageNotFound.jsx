import React from "react";
import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="noPosts">
      <h1>Page Not Found</h1>
      <h3>Go to the home page:</h3>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home Page
      </NavLink>
    </div>
  );
}

export default PageNotFound;
