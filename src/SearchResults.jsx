import React from "react";
import "./SearchResults.css";
import { SearchItem } from "./SearchItem";
export const SearchResults = ({
  open,
  setOpen,
  results,
  setSelectedResult,
  onClick,
}) => {
  // sets menuRef to false

  let menuRef = React.useRef();

  React.useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      {open && (
        <div ref={menuRef} className="results__list">
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
      )}
    </>
  );
};
