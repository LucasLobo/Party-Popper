import * as React from "react";
import "./landingContainer.css";

type Props = {
  children?: React.ReactNode;
};

const LandingContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="child-center-landing">
      <div className="flex-center-landing">
        <div className="flex-center-start-landing">{children}</div>
      </div>
    </div>
  );
};

export default LandingContainer;
