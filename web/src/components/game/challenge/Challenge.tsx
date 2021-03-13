import React from "react";
import Header from "../../header/Header";
import Button from "../../button/Button";

import "./Challenge.css";

interface ChallengeProps {
  title: string;
  color: string;
  description: string;
  outcome: string;
  onClose: () => void;
}

const Challenge: React.VFC<ChallengeProps> = ({
  title,
  description,
  onClose,
  outcome,
  color,
}) => {
  const delayedClose = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div className="challenge">
      <Header className="challenge-header" color={color} title={title} />
      <div className="challenge-body">
        <p className="challenge-description">{description}</p>
        <p className="challenge-outcome">{outcome}</p>
        <Button
          className="challenge-button"
          color="green"
          label="next"
          onClick={delayedClose}
        />
      </div>
    </div>
  );
};

export default Challenge;
