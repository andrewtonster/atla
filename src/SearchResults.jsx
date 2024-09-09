import React from "react";
import "./SearchResults.css";
import { SearchItem } from "./SearchItem";
export const SearchResults = ({ results }) => {
  return (
    <div className="results__list">
      {results.map((result, id) => {
        return <SearchItem result={result} key={id}></SearchItem>;
      })}
    </div>
  );
};
