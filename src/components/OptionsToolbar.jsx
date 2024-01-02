import React from "react";
import SaveOptions from "./SaveOptions";
import MusicOptions from "./MusicOptions";
import Search from "./Search";

const OptionsToolbar = () => {
  return (
    <div className="h-full flex justify-around items-center">
      <div className="h-12 flex justify-start items-center min-w-[31%]">
        <SaveOptions />
      </div>
      <div className="h-12 flex justify-around items-center min-w-[31%]">
        <MusicOptions />
      </div>
      <div className="h-12 flex justify-end items-center min-w-[31%]">
        <Search />
      </div>
    </div>
  );
};

export default OptionsToolbar;