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
import ConfettiExplosion from "react-confetti-explosion";
import { Information } from "./Information";

function App() {
  // localStorage.clear();

  const randomGenerator = () => {
    function hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32-bit integer
      }
      return Math.abs(hash);
    }

    // Create a seeded random number generator based on the date or a fixed seed
    function seededRandom(seed) {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }

    // Get current UTC time
    const currentUTC = new Date();
    // Adjust to UTC+6 by adding 6 hours (milliseconds in 6 hours)
    currentUTC.setHours(currentUTC.getUTCHours() + 6);

    // Get the date in "YYYY-MM-DD" format for UTC+6
    const todayUTC6 = currentUTC.toISOString().split("T")[0]; // "YYYY-MM-DD" format

    console.log("This is the UTC+6 date: ", todayUTC6);

    // Hash the UTC+6 date
    const seed = hashString(todayUTC6);
    console.log("This is the seed: ", seed);

    // Example array to simulate usage (replace with your actual 'users' array)
    const users = ["user1", "user2", "user3", "user4"];

    // Generate a "random" number based on the seed (consistent across all users)
    const consistentRandomNumber = Math.floor(
      seededRandom(seed) * users.length
    );

    // Example usage: select a user based on consistent random index
    console.log("Selected user index: ", consistentRandomNumber);
    console.log("Selected user: ", users[consistentRandomNumber]);

    return consistentRandomNumber;
  };

  const [characterList, setCharacterList] = useState(() => {
    const savedState = localStorage.getItem("characterList");

    return savedState === null ? users : JSON.parse(savedState);
  });
  // const [showApparition, setShowApparition] = useState(false);
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
  console.log(answer);
  const [win, setWin] = useState(() => {
    const savedState = localStorage.getItem("win");
    return savedState === null ? false : JSON.parse(savedState);
  });

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
    localStorage.setItem("win", JSON.stringify(true));
  }, [win]);

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

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const remainingTime = endOfDay - now;

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
      setTime({
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      });
    };

    calculateRemainingTime();

    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
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
      setTimeout(() => {
        scrollToElement();
      }, 1500);
      setNumWins((prevWins) => {
        return prevWins + 1;
      });
    }
  };

  const openDescription = () => {
    setShowDescription((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <div>
        {win && (
          <ConfettiExplosion
            className="explosion"
            force={0.6}
            duration={2500}
            particleCount={250}
            width={1000}
          />
        )}
      </div>

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
                {attempts >= 7 ? (
                  <div
                    onClick={openDescription}
                    className="hint__description blue"
                  >
                    <i className="ri-file-paper-2-line"></i>
                  </div>
                ) : (
                  <div className="hint__description">
                    <i className="ri-file-paper-2-line"></i>

                    <div>
                      Description Clue in <strong>{7 - attempts}</strong>
                    </div>
                  </div>
                )}
              </div>

              {attempts >= 7 && showDescription && (
                <div ref={hint} className="hint__appear">
                  {answer.hint}
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

          {win && (
            <div className="victory__results__border">
              <div ref={summary} className="victory__results">
                <h1 className="victory__congrats"> Congrats! </h1>
                <span className="victory__header">
                  You are the wordle Avatar
                </span>
                <span>
                  The correct answer is: <strong>{answer.name}</strong>
                </span>
                <div className={`character__box box`}>
                  <img src={answer.character_img} alt="Character" />
                </div>

                <span className="victory__atempts">
                  Number of Attempts: <strong>{attempts}</strong>
                </span>
                <span className="victory__date">Next Character in: </span>
                <div className="victory__time">{`${time.hours} : ${time.minutes} : ${time.seconds} `}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
