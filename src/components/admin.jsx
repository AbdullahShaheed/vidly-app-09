import React from "react";
import { Route } from "react-router-dom";
import SideBar from "./sideBar";
import Dashboard from "./dashboard";
import Users from "./users";

const Admin = () => {
  return (
    <>
      <div className="row">
        <div className="col-2" style={{ background: "black" }}>
          <SideBar />
        </div>
        <div className="col">
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route path="/admin/users" component={Users} />
        </div>
      </div>
    </>
  );
};

export default Admin;
