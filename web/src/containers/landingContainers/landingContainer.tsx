import * as React from "react";

const LandingContainer: React.FC<{ children: React.ReactNode[] }> = (children) => {
  return (
    <div className="child-center-landing">
      <div className="flex-center-landing">
        <div className="flex-center-start-landing">{children}</div>
      </div>
    </div>
  );
};

export default LandingContainer;
