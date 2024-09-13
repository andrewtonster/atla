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
  // We create menu ref to target the result list

  let menuRef = React.useRef();

  React.useEffect(() => {
    // every mouse down outside the target
    // use effect lifecycle, run code once, when dependecy array changes
    // call cleanup, destroy effect, and save value for next render
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

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
