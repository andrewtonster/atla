import React from "react";
import "./SearchResults.css";
import { SearchItem } from "./SearchItem";
export const SearchResults = ({ results, setSelectedResult, onClick }) => {
  return (
    <div className="results__list">
      {results.map((result, id) => {
        return (
          <SearchItem
            result={result}
            key={id}
            onClick={() => onClick(result)}
          ></SearchItem>
        );
      })}
    </div>
  );
};
