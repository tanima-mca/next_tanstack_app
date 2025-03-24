import React, { ReactNode } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";


interface props {
  children: ReactNode;
}
const Wrapper: React.FC<props> = ({ children }) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
};

export default Wrapper;
