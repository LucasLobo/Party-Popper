import React from "react";
import "./Person.css";

const getIconPath: (name: string) => string = (name) => {
  return `/svg/avatars/${name}.svg`;
};

interface PersonProp {
  name: string;
  avatar: string;
}

const Person: React.VFC<PersonProp> = ({ name, avatar }) => {
  return (
    <div className="person-container">
      <div className="person-name">{name}</div>
      <div className="person-avatar">
        <img src={getIconPath(avatar)} className="avatar" alt="avatar" />
      </div>
    </div>
  );
};

export default Person;
