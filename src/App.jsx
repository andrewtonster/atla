import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Header } from "./Header";
import "./App.css";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { ScrollAnswers } from "./ScrollAnswers";
import { users } from "./data";
import Confetti from "react-confetti";
function App() {
  /* passing down a function setResults allow us to 
  update results in search results is like a list of matching names*/
  const [results, setResults] = useState(users);
  const [selectedResult, setSelectedResult] = useState([]);
  const [open, setOpen] = useState();
  const [attempts, setAttempts] = useState(0);
  const [answer, setAnswer] = useState(
    users[Math.floor(Math.random() * users.length)]
  );
  const [win, setWin] = useState(false);
  const summary = useRef();

  const handleItemClick = (result) => {
    setOpen(false);
    // set add our selected results to previous results
    setSelectedResult((prevResults) => [result, ...prevResults]);

    setAttempts((prevAttempts) => {
      return prevAttempts + 1;
    });

    const scrollToElement = () => {
      summary.current.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    if (result.name == answer.name) {
      setWin(true);
      scrollToElement();
    }
  };

  return (
    <>
      <div>{win && <Confetti />}</div>
      <div className="background"></div>
      <section className="hero">
        <div className="content">
          <div className="title">Avatardle</div>
          <div className="content__header__border">
            <div className="content__header">
              <h1>Guess Today's Avatar Character</h1>
              {/* <h1>ATLADLE</h1> */}

              <p>Begin typing for results.</p>
              <p className="notice">
                Characters only up to date with first Avatar TV series
              </p>
            </div>
          </div>
          <div>
            <SearchBar
              win={win}
              setOpen={setOpen}
              results={results}
              setResults={setResults}
            />
            <SearchResults
              setOpen={setOpen}
              open={open}
              results={results}
              onClick={handleItemClick}
            />
          </div>
          <div>
            <ScrollAnswers answer={answer} results={selectedResult} />
          </div>
          <div ref={summary} className="victory__results">
            <span className="victory__header">
              Congrats! You are the wordle Avatar
            </span>
            <span className="victory__atempts">
              Number of Attempts: {attempts}{" "}
            </span>
            <span className="victory__date">Next Character in </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
