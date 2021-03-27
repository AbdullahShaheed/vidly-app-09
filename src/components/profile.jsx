import React from "react";

const Profile = ({ user }) => {
  return (
    <>
      <h2>Profile:</h2>
      <h4>Name: {user.name}</h4>
      <h4>Level: {user.isAdmin ? "Admin" : "Ordinary"}</h4>
      <h4>Email address: {user.email}</h4>
    </>
  );
};

export default Profile;
