import React, { useState } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { users } from "./data";
import "./Searchbar.css";

/* This component fetches the data and passes the value back to the Parent App for other areas to use */
export const SearchBar = ({ setOpen, setResults }) => {
  const [input, setInput] = useState("");

  // we are returning the whole user object and storing in list of results
  const fetchData = (value) => {
    const results = users.filter((user) => {
      return (
        value && user && user.name && user.name.toLowerCase().includes(value)
      );
    });
    setResults(results);
  };

  const handleChange = (value) => {
    setOpen(true);
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="searchbar__container">
      <input
        placeholder="Type to search.."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
      <MdOutlineArrowCircleRight id="search__icon" />
    </div>
  );
};
