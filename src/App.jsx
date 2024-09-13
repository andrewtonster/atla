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

import { Information } from "./Information";

function App() {
  localStorage.clear();

  const randomGenerator = () => {
    function hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash);
    }

    // Create a seeded random number generator based on the date or a fixed seed
    function seededRandom(seed) {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }

    // Use UTC date for consistency across time zones
    const todayUTC = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD" format (global date)

    // Hash the UTC date
    const seed = hashString(todayUTC);

    // Generate a "random" number based on the seed (consistent across all users)
    const consistentRandomNumber = Math.floor(
      seededRandom(seed) * users.length
    );

    // Example usage: select a user based on consistent random index
    return consistentRandomNumber;
  };
  const [characterList, setCharacterList] = useState(() => {
    const savedState = localStorage.getItem("characterList");

    return savedState === null ? users : JSON.parse(savedState);
  });
  const [showApparition, setShowApparition] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [results, setResults] = useState(users);
  const [selectedResult, setSelectedResult] = useState(() => {
    const savedState = localStorage.getItem("selectedResult");
    return savedState === null ? [] : JSON.parse(savedState);
  });
  const [open, setOpen] = useState();

  const [attempts, setAttempts] = useState(() => {
    const savedState = localStorage.getItem("attempts");
    return savedState === null ? 0 : JSON.parse(savedState);
  });

  const [answer, setAnswer] = useState(() => {
    const selectedState = localStorage.getItem("answer");
    return selectedState === null
      ? users[randomGenerator()]
      : JSON.parse(selectedState);
  });

  const [win, setWin] = useState(false);

  console.log(answer);
  // localStorage.removeItem("numWins");
  // set num wins to 0 if null otherwise we grab our value
  const [numWins, setNumWins] = useState(() => {
    const savedState = localStorage.getItem("numWins");
    return savedState === null ? 0 : JSON.parse(savedState);
  });

  const [isOpen, setIsOpen] = useState(false);

  const closeInfo = () => {
    setIsOpen(false);
  };

  const openInfo = () => {
    console.log("opeaning info");
    setIsOpen(true);
  };

  useEffect(() => {
    localStorage.setItem("numWins", JSON.stringify(numWins));
  }, [numWins]);

  useEffect(() => {
    localStorage.setItem("answer", JSON.stringify(answer));
  }, [answer]);

  useEffect(() => {
    localStorage.setItem("attempts", JSON.stringify(attempts));
  }, [attempts]);

  const summary = useRef();
  const hint = useRef();

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
      if (
        remainingHours === 0 &&
        remainingMinutes === 0 &&
        remainingSeconds === 0
      ) {
        setAttempts(0);
        setAnswer(users[randomGenerator()]);
        setSelectedResult([]);
        setItem("selectedResult", JSON.stringify([]));
      }
      // console.log(remainingHours, remainingMinutes, remainingSeconds);
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
    setCharacterList((prevList) => {
      const newList = prevList.filter((user) => {
        return user !== result;
      });

      localStorage.setItem("characterList", JSON.stringify(newList));

      return newList;
    });

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

  const openApparition = () => {
    setShowDescription(false);
    setShowApparition((prev) => {
      return !prev;
    });
  };

  const openDescription = () => {
    setShowApparition(false);
    setShowDescription((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <div>{win && <Confetti />}</div>

      <div className={!isOpen ? "background" : "background shadow"}></div>
      <section className="hero">
        <div className="content">
          <div className="title">Avatardle</div>
          <div className="content__nav">
            <div className="content__nav__itm">
              <div className="trophie__container">
                <div className="overlay__num">{numWins}</div>
                <div className="img__container">
                  <i className="ri-trophy-fill trophie"></i>
                </div>
              </div>
            </div>
            <Information
              onClick={openInfo}
              onClose={closeInfo}
              isOpen={isOpen}
              time={time}
            />
          </div>
          <div className="content__header__border">
            <div className="content__header">
              <h1>Guess Today's Avatar Character</h1>

              <p>Begin typing for results.</p>

              <div className="hints__container">
                {attempts >= 5 ? (
                  <div
                    onClick={openApparition}
                    className="hint__apparition blue"
                  >
                    <i class="ri-tv-line"></i>
                  </div>
                ) : (
                  <div className="hint__apparition">
                    <p>
                      <i class="ri-tv-line"></i>
                    </p>
                    <div>
                      First Episode Clue in <strong>{5 - attempts}</strong>
                    </div>
                  </div>
                )}

                {attempts >= 7 ? (
                  <div
                    onClick={openDescription}
                    className="hint__description blue"
                  >
                    <i class="ri-file-paper-2-line"></i>
                  </div>
                ) : (
                  <div className="hint__description">
                    <p>
                      <i class="ri-file-paper-2-line"></i>
                    </p>
                    <div>
                      Description Clue in <strong>{7 - attempts}</strong>
                    </div>
                  </div>
                )}
              </div>

              {attempts >= 5 && showApparition && (
                <div ref={hint} className="hint__appear">
                  This is the Apparition hint
                </div>
              )}

              {attempts >= 7 && showDescription && (
                <div ref={hint} className="hint__appear">
                  This is the Description hint
                </div>
              )}

              <p className="notice">
                Characters only up to date with first Avatar TV series
              </p>
            </div>
          </div>
          <div>
            <SearchBar
              characterList={characterList}
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
