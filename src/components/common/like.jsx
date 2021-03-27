import React from "react";

const Like = ({ liked, onToggleLike }) => {
  let classes = "clickable fa fa-heart";
  classes += !liked ? "-o" : "";

  return <i className={classes} onClick={onToggleLike} />;
};

export default Like;
