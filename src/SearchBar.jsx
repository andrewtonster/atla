import React, { useState, useEffect } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { users } from "./data";
import "./Searchbar.css";

/* This component fetches the data and passes the value back to the Parent App for other areas to use */
export const SearchBar = ({
  win,
  results,
  setOpen,
  setResults,
  characterList,
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
  }, []);

  const fetchData = (value) => {
    const output = characterList.filter((user) => {
      return (
        value &&
        user &&
        user.name &&
        user.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setResults(output);
  };

  const handleChange = (value) => {
    setOpen(true);
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="searchbar__border">
      <div className="searchbar__container">
        {win ? (
          <input
            readOnly
            placeholder="Type to search.."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          ></input>
        ) : (
          <div>
            <input
              placeholder="Type to search.."
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
};
