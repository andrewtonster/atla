import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Header } from "./Header";
import "./App.css";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { ScrollAnswers } from "./ScrollAnswers";
import { users } from "./data";
function App() {
  /* passing down a function setResults allow us to 
  update results in search results is like a list of matching names*/
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);
  const [answer, setAnswer] = useState(
    users[Math.floor(Math.random() * users.length)]
  );

  const handleItemClick = (result) => {
    // setSelectedResult(result);
    setSelectedResult((prevResults) => [result, ...prevResults]);
  };

  return (
    <>
      <div class="background"></div>
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
            <SearchResults results={results} onClick={handleItemClick} />
          </div>
          <div>
            <ScrollAnswers answer={answer} results={selectedResult} />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
