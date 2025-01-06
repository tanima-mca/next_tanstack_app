import React, { ReactNode } from "react";
import ResponsiveAppBar from "../header/header";

interface props {
  children: ReactNode;
}
const Wrapper: React.FC<props> = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar />
      {children}
    </div>
  );
};

export default Wrapper;
