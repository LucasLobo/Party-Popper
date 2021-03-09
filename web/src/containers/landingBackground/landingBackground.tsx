import * as React from "react";

const LandingBackground: React.FC<{ children: React.ReactNode[] }> = (children) => {
  return <div className="background-gradient">{children}</div>;
};

export default LandingBackground;
