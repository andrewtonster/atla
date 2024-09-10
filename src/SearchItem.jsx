import React from "react";
import "./SearchItem.css";
export const SearchItem = ({ result, setSelectedResult, onClick }) => {
  return (
    <div className="search__item__container" onClick={onClick}>
      <div className="search__img__container">
        <img className="search__img" src={result.character_img} />
      </div>
      <div className="search__item">{result.name}</div>
    </div>
  );
};
