import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Header } from "./Header";
import "./App.css";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";

function App() {
  /* passing down a function setResults allow us to 
  update results in search */
  const [results, setResults] = useState([]);
  return (
    <section className="hero">
      <div className="content">
        <div className="content__header">
          <h1>ATLADLE</h1>
          <p>Guess today's Avatar Character</p>
          <p>Guess character to gain clues on every try</p>
          <a href="#"> Start Now</a>
        </div>
        <div>
          <SearchBar setResults={setResults} />
          <SearchResults results={results} />
        </div>
      </div>
    </section>
  );
}

export default App;
