import React from "react";
import "./SearchItem.css";
export const SearchItem = ({ result }) => {
  return (
    <div
      onClick={(e) => {
        console.log(result.name);
      }}
      className="search__item"
    >
      {result.name}
    </div>
  );
};
