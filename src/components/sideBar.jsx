import React from "react";
import { Nav } from "reactstrap";
import { NavLink } from "react-router-dom";

const SideBar = (props) => {
  return (
    <Nav vertical>
      <NavLink className="nav-link" to="/admin/users">
        Users
      </NavLink>
      <NavLink className="nav-link" to="/admin/dashboard">
        Dashboard
      </NavLink>
      <NavLink className="nav-link" to="#">
        Another Link
      </NavLink>
    </Nav>
  );
};

export default SideBar;
