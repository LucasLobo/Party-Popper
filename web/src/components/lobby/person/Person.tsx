import React from "react";
import CheckMark from "../../checkMark/checkMark";
import CrossMark from "../../crossMark/crossMark";
import "./Person.css";

const getIconPath: (name: string) => string = (name) => {
  return `/svg/avatars/${name}.svg`;
};

interface PersonProp {
  name: string;
  avatar: string;
  isReady: boolean;
}

const Person: React.VFC<PersonProp> = ({ name, avatar, isReady }) => {
  return (
    <div className="person-container">
      <div className="person-name">{name}</div>
      {isReady ? <CheckMark /> : <CrossMark />}
      <div className="person-avatar">
        <img src={getIconPath(avatar)} className="avatar" alt="avatar" />
      </div>
    </div>
  );
};

export default Person;
