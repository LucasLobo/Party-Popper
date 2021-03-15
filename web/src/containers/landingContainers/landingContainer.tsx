import * as React from "react";
import "./landingContainer.css";

type Props = {
  children?: React.ReactNode;
};

const LandingContainer: React.FC<Props> = ({ children }) => {
  return <div className="landing-container">{children}</div>;
};

export default LandingContainer;
