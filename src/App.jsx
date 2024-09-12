import { useState, useRef, useEffect } from "react";
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
  // in order to save our chosen answers
  // initially set the selected results to the array of characters, if not then none
  // on every selected character, so when selected results changes, we set the
  // local storage to the same array
  // then every 24 hours we want to remove the saved values from the selecterd reuslts

  /* passing down a function setResults allow us to 
  update results in search results is like a list of matching names*/
  const [results, setResults] = useState(users);
  const [selectedResult, setSelectedResult] = useState(() => {
    const savedState = localStorage.getItem("selectedResult");
    return savedState === null ? [] : JSON.parse(savedState);
  });
  const [open, setOpen] = useState();
  const [attempts, setAttempts] = useState(0);

  const [answer, setAnswer] = useState(() => {
    const selectedState = localStorage.getItem("answer");
    return selectedState === null
      ? users[Math.floor(Math.random() * users.length)]
      : JSON.parse(selectedState);
  });

  const [win, setWin] = useState(false);

  // localStorage.removeItem("numWins");
  // set num wins to 0 if null otherwise we grab our value
  const [numWins, setNumWins] = useState(() => {
    const savedState = localStorage.getItem("numWins");
    return savedState === null ? 0 : JSON.parse(savedState);
  });

  useEffect(() => {
    localStorage.setItem("numWins", JSON.stringify(numWins));
  }, [numWins]);

  useEffect(() => {
    localStorage.setItem("answer", JSON.stringify(answer));
  }, [answer]);

  const summary = useRef();

  const [time, setTime] = useState(new Date());

  // Everytime we render this component however we want to get the number of wins

  // Every time the number of wins for the user changes, then we want to set the number of wins

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // End of the day

      // Calculate remaining time in milliseconds
      const remainingTime = endOfDay - now;

      // Convert remaining time from milliseconds to hours, minutes, and seconds
      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      const remainingMinutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setTime({
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      });
    };

    calculateRemainingTime(); // Initial calculation

    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleItemClick = (result) => {
    setOpen(false);
    // set add our selected results to previous results
    setSelectedResult((prevResults) => {
      localStorage.setItem(
        "selectedResult",
        JSON.stringify([result, ...prevResults])
      );
      return [result, ...prevResults];
    });

    setAttempts((prevAttempts) => {
      return prevAttempts + 1;
    });

    const scrollToElement = () => {
      summary.current.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    if (result.name == answer.name) {
      setWin(true);
      scrollToElement();
      setNumWins((prevWins) => {
        return prevWins + 1;
      });
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
              <div>I have {numWins}</div>

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

          {
            <div className="victory__results__border">
              <div ref={summary} className="victory__results">
                <h1 className="victory__congrats"> Congrats! </h1>
                <span className="victory__header">
                  You are the wordle Avatar
                </span>
                <span className="victory__atempts">
                  Number of Attempts: <strong>{attempts}</strong>
                </span>
                <span className="victory__date">Next Character in: </span>
                <div className="victory__time">{`${time.hours} : ${time.minutes} : ${time.seconds} `}</div>
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}

export default App;
