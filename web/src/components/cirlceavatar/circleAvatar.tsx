import * as React from "react";
import "./cirlceAvatar.css";

const CircleAvatar: React.FC<{ url?: string }> = ({ url }) => {
  return <img src={url} className="avatar" alt="avatar" />;
};

export default CircleAvatar;
