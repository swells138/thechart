import React from "react";
import BigGraph from "../../components/BigGraph";
import Navbar from "../../components/Navbar";

const page = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center">
        <BigGraph></BigGraph>
      </div>
    </>
  );
};

export default page;
