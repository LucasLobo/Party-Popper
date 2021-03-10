import React, { useRef, useEffect } from "react";
import { IField } from "../../../hooks/useBoard";
import "./Board.css";

import Field from "./field/Field";

interface BoardProps {
  fields: IField[];
}

const Board: React.VFC<BoardProps> = ({ fields }) => {
  const startRef = useRef<HTMLDivElement>(null);

  const executeScroll = () => {
    if (startRef !== null && startRef.current !== null)
      startRef.current.scrollIntoView();
  };

  useEffect(executeScroll, []);

  return (
    <div className="board">
      {fields
        .slice(0)
        .reverse()
        .map((field: IField) => {
          return (
            <div
              ref={field.position === 0 ? startRef : undefined}
              key={field.position}
            >
              <Field field={field} />
            </div>
          );
        })}
    </div>
  );
};

export default Board;
