import * as React from "react";
import "./circleAvatar.css";

const getIconPath: (name: string) => string = (name) => {
  return `/svg/avatars/${name}.svg`;
};

interface CircleAvatarProps {
  name: string;
  onReload?: () => void;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({ name, onReload }) => {
  return (
    <div className="avatar-container">
      <img src={getIconPath(name)} className="avatar" alt="avatar" />
      {onReload && (
        <button className="avatar-button" onClick={onReload} type="button">
          <img src="/svg/reload.svg" alt="avatar-reload" />
        </button>
      )}
    </div>
  );
};

export default CircleAvatar;
