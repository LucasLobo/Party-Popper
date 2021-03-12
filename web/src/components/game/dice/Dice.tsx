import React, { useState } from "react";

import "./Dice.css";

import Button from "../../button/Button";

interface DiceProps {
  resultCallback: (diceFace: string) => void;
  closeCallback: () => void;
}

function getRandomInt(min: number, max: number) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

const faces = [
  "show-one",
  "show-two",
  "show-three",
  "show-four",
  "show-five",
  "show-six",
];

const getRandomFace = (oldDiceFace: string) => {
  const options = faces.filter((item) => item !== oldDiceFace);

  const randInt = getRandomInt(0, 4);
  return options[randInt];
};

const Dice: React.VFC<DiceProps> = ({ resultCallback, closeCallback }) => {
  const [diceFace, setDiceFace] = useState<string>(getRandomFace(""));

  let rotations = 8;
  let newDiceFace = "";
  const rotateDice = () => {
    if (rotations > 0) {
      rotations -= 1;
      newDiceFace = getRandomFace(newDiceFace);
      setDiceFace(newDiceFace);
      setTimeout(rotateDice, 700);
    } else {
      resultCallback(newDiceFace);
    }
  };

  return (
    <div className="dice-container">
      <div className="scene">
        <div className={`cube ${diceFace}`}>
          <div className="cube__face cube__face--five">5</div>
          <div className="cube__face cube__face--six">6</div>
          <div className="cube__face cube__face--two">2</div>
          <div className="cube__face cube__face--one">1</div>
          <div className="cube__face cube__face--three">3</div>
          <div className="cube__face cube__face--four">4</div>
        </div>
      </div>
      <div className="dice-buttons">
        <Button label="Rotate" color="green" onClick={rotateDice} />
        <Button label="Close" color="red" onClick={closeCallback} />
      </div>
    </div>
  );
};

export default Dice;
