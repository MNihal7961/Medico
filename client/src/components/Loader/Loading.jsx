import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <HashLoader color="#0067ff"/>
    </div>
  );
};

export default Loading;
