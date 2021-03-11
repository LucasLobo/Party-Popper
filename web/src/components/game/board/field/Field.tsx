import React from "react";
import "./Field.css";

import Players from "./players/Players";
import { IField } from "../../../../hooks/useBoard";

interface FieldProps {
  field: IField;
}

const Field: React.VFC<FieldProps> = ({ field }) => {
  const classes = `field ${field.color}`;

  return (
    <div className="field-container">
      {field.players ? <Players players={field.players} /> : <span />}
      <div className={classes}>
        <span className="field-name">{field.category}</span>
      </div>
    </div>
  );
};

export default Field;
