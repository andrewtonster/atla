import { useState, useRef, useEffect } from "react";
import "./App.css";
import { SearchBar } from "./components/searchBar/SearchBar";
import { SearchResults } from "./components/searchResults/SearchResults";
import { ScrollAnswers } from "./components/scrollAnswers/ScrollAnswers";
import { users } from "./data";
import ConfettiExplosion from "react-confetti-explosion";
import { Information } from "./components/information/Information";
import CryptoJS from "crypto-js";

function App() {
  const randomGenerator = () => {
    return Math.floor(Math.random() * 78);
  };

  const secretKey = "secret"; // Replace with a secure key

  function encryptObject(obj) {
    const jsonString = JSON.stringify(obj);
    const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
    return encrypted;
  }

  function decryptObject(encryptedString) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedString, secretKey);
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const obj = JSON.parse(decryptedString);
    return obj;
  }

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

    if (selectedState === null) {
      const answer = users[randomGenerator()];
      const encAnswer = encryptObject(answer);
      localStorage.setItem("answer", JSON.stringify(encAnswer));
      return answer;
    }
    // console.log("hello");
    // console.log("dnsjkadsa", selectedState);
    // console.log(decryptObject(JSON.parse(selectedState)));
    return decryptObject(JSON.parse(selectedState));
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
  useEffect(() => {
    localStorage.setItem("win", JSON.stringify(win));
  }, [win]);

  // useEffect(() => {
  //   localStorage.setItem("numWins", JSON.stringify(numWins));
  // }, [numWins]);

  useEffect(() => {
    const encAnswer = encryptObject(answer);
    localStorage.setItem("answer", JSON.stringify(encAnswer));
  }, [answer]);

  useEffect(() => {
    localStorage.setItem("attempts", JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem("selectedResult", JSON.stringify(selectedResult));
  }, [selectedResult]);

  useEffect(() => {
    localStorage.setItem("characterList", JSON.stringify(characterList));
  }, [characterList]);

  const resetGame = () => {
    setWin(false);
    setAttempts(0);
    setAnswer(users[randomGenerator()]);
    setSelectedResult([]);
    setCharacterList(users);

    localStorage.setItem("characterList", JSON.stringify(data));
    localStorage.setItem("selectedResult", JSON.stringify([]));
  };

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
        localStorage.setItem("numWins", JSON.stringify(prevWins + 1));
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
          <h1 className="title">Avatardle</h1>

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
                <h3 className="victory__header">You are the wordle Avatar</h3>
                <span>
                  The correct answer is: <strong>{answer.name}</strong>
                </span>
                <article className={`character__box box`}>
                  <img src={answer.character_img} alt="Character" />
                </article>

                <span className="victory__atempts">
                  Number of Attempts: <strong>{attempts}</strong>
                </span>

                <div className="victory__time">
                  <button className="play__again" onClick={resetGame}>
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
