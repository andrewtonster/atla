import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { ScrollAnswers } from "./ScrollAnswers";
import { users } from "./data";
import Confetti from "react-confetti";
import ConfettiExplosion from "react-confetti-explosion";
import { Information } from "./Information";

console.log(users.length);
function App() {
  // // Randomly generate a number based on America Time to pick the answer

  // TODO: GETS RANDOM NUMBER BASED ON DAY
  const randomGenerator = () => {
    let referenceDate = new Date("2024-01-01");

    // Get today's date
    let today = new Date();

    // Calculate the difference in days between today and the reference date
    let differenceInTime = today - referenceDate;
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    // Get the number for today, cycling through 0 to 77
    let numberForToday = differenceInDays % 78;
    return numberForToday;
  };

  // TODO: SET STATE TO USERS LIST OTHERWISE GET IT FROM THE LOCAL STORAGE
  const [characterList, setCharacterList] = useState(() => {
    const savedState = localStorage.getItem("characterList");
    return savedState === null ? users : JSON.parse(savedState);
  });

  // TODO: SET STATE TO [] LIST OTHERWISE GET IT FROM THE LOCAL STORAGE
  const [selectedResult, setSelectedResult] = useState(() => {
    const savedState = localStorage.getItem("selectedResult");
    return savedState === null ? [] : JSON.parse(savedState);
  });

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

  const [numWins, setNumWins] = useState(() => {
    const savedState = localStorage.getItem("numWins");
    return savedState === null ? 0 : JSON.parse(savedState);
  });

  const [win, setWin] = useState(() => {
    const savedState = localStorage.getItem("win");
    return savedState === null ? false : JSON.parse(savedState);
  });

  const [showDescription, setShowDescription] = useState(false);
  const [results, setResults] = useState(users);

  // state to determine dropdown open/close
  const [open, setOpen] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const [time, setTime] = useState(new Date());

  const summary = useRef();
  const hint = useRef();

  const closeInfo = () => {
    setIsOpen(false);
  };

  const openInfo = () => {
    setIsOpen(true);
  };

  // effects to set local storage everytime state changes
  // useEffect(() => {
  //   localStorage.setItem("win", JSON.stringify(win));
  // }, [win]);

  useEffect(() => {
    localStorage.setItem("numWins", JSON.stringify(numWins));
  }, [numWins]);

  useEffect(() => {
    localStorage.setItem("answer", JSON.stringify(answer));
  }, [answer]);

  useEffect(() => {
    localStorage.setItem("attempts", JSON.stringify(attempts));
  }, [attempts]);

  // effect to update the time every second
  const getUTCMinus6Time = () => {
    const now = new Date();

    // Get the current UTC time
    const utcTime = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    // Subtract 6 hours from the UTC time to get UTC-6
    utcTime.setHours(utcTime.getHours() - 6);

    return utcTime;
  };

  const calculateRemainingTimeUTC6 = () => {
    const nowUTC6 = getUTCMinus6Time();

    // Get the current date in UTC-6 and the end of the day in UTC-6
    const endOfDayUTC6 = new Date(nowUTC6);
    endOfDayUTC6.setHours(23, 59, 59, 999); // End of day at 11:59:59 PM UTC-6

    const remainingTime = endOfDayUTC6 - nowUTC6;

    const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    const remainingMinutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Reset when it's a new day in UTC-6

    return {
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  };

  const resetGame = () => {
    setWin(false);
    setAttempts(0);
    setAnswer(users[randomGenerator()]);
    setSelectedResult([]);
    setCharacterList(users);
    localStorage.setItem("characterList", JSON.stringify(null));
    localStorage.setItem("selectedResult", JSON.stringify([]));
  };

  // TODO:
  // const checkForReset = () => {
  //   const now = getUTCMinus6Time();

  //   // set up an old date
  //   const lastCheck = localStorage.getItem("lastCheck");

  //   if (!lastCheck) {
  //     localStorage.setItem("lastCheck", now.toISOString());
  //     return;
  //   }

  //   const lastCheckDate = new Date(lastCheck);

  //   // If the current day is different from the last check day, reset the game
  //   if (now.getDate() !== lastCheckDate.getDate()) {
  //     resetGame();
  //   }

  //   // Update the last check time in localStorage
  //   localStorage.setItem("lastCheck", now.toISOString());
  // };

  // TODO: Checking for Reset EVER SECOND
  // useEffect(() => {
  //   checkForReset(); // Run on initial mount

  //   // Set an interval to keep checking for reset every second
  //   const interval = setInterval(() => {
  //     checkForReset();
  //   }, 1000); // Runs every second

  //   // Cleanup the interval on unmount
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    // if go on for first time, i want to set the date, calculate answer, user plays game done
    // if i go on the second time, on a new day, i want to compare the curr date to date stored in
    // local storage, and if the dates are different then i calculate the new answer for the wordle,
    // then i set the current date to local host

    const date = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });

    let currDate = date.split(",")[0];

    const lastCheck = JSON.parse(localStorage.getItem("lastCheck"));

    if (lastCheck === null) {
      localStorage.setItem("lastCheck", JSON.stringify(currDate));
    } else if (currDate !== lastCheck) {
      resetGame();
      localStorage.setItem("lastCheck", JSON.stringify(currDate));
    }

    const updateTimer = () => {
      const { hours, minutes, seconds } = calculateRemainingTimeUTC6();

      setTime({ hours, minutes, seconds });
      localStorage.setItem("time", JSON.stringify({ hours, minutes, seconds }));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // This handles the user submission, and checks if they have won

  // POST:
  const handleItemClick = (result) => {
    setOpen(false); // when answer click, close the dropdown

    // update to new character list on state and localstorage
    setCharacterList((prevList) => {
      const newList = prevList.filter((user) => {
        return user !== result;
      });

      localStorage.setItem("characterList", JSON.stringify(newList));

      return newList;
    });

    // set the selected user results on local storage and state
    setSelectedResult((prevResults) => {
      localStorage.setItem(
        "selectedResult",
        JSON.stringify([result, ...prevResults])
      );
      return [result, ...prevResults];
    });

    // update the attempts
    setAttempts((prevAttempts) => {
      return prevAttempts + 1;
    });

    // describing a function to scroll to victory
    const scrollToElement = () => {
      summary.current.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    console.log(result.name);
    console.log(answer.name);
    if (result.name == answer.name) {
      console.log("I am in an error");
      setWin(true);
      localStorage.setItem("win", JSON.stringify(true));
      setTimeout(() => {
        scrollToElement();
      }, 1500);
      setNumWins((prevWins) => {
        return prevWins + 1;
      });
    }
  };

  // onClick function to show information page
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
