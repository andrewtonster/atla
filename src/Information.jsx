import React from "react";
import "./Information.css";
export const Information = ({ time, onClick, isOpen, onClose }) => {
  return (
    <>
      <div className="content__nav__itm">
        <button onClick={onClick}>
          <i className="question ri-question-line"></i>
        </button>
      </div>

      {isOpen && (
        <div className="information__container">
          <i class="close ri-close-circle-fill" onClick={onClose}></i>
          <div className="information__img"></div>
          <h1 className="information__header x-large"> How to Play</h1>
          <br />
          <p>
            To play this game, simply type a character from the searchbar. The
            character you click will match attributes similar to that of the
            answer.
          </p>
          <br />
          <div className="larger center">
            New Character Releases to play every 24 hrs.
          </div>

          <div className="center">Time until next character:</div>
          <div className="victory__time center ">{`${time.hours} : ${time.minutes} : ${time.seconds} `}</div>
          <br />
          <p>
            <span className="green">Green</span> represents that the character
            you chose <i>matches</i> in that catagory
          </p>
          <p>
            <span className="red">Red</span> represents that the character you
            chose <i>does not match</i>
            in that catagory
          </p>
          <br />
          <h1 className="x-large">Catagories</h1>
          <br />
          <h3 className="larger">Character</h3>
          <p>Character cataory displays image of chosen character</p>
          <br />
          <h3 className="larger">Hair</h3>
          <p>Hair cataory represnt matches in hair color</p>
          <br />
          <h3 className="larger">Gender</h3>
          <p>Gender cataory represnt matches in gender</p>
          <br />
          <h3 className="larger">Nation</h3>
          <p>
            Nation cataory represent if the character originate come from same
            nation
          </p>
          <br />
          <h3 className="larger">Fighting</h3>
          <p>
            Fighting catagory represents if the characters use similar weapons
            or abilities
          </p>
          <br />
          <h3 className="larger">Bending</h3>
          <p>
            Bending catagory represents if the character has bending
            capabilities
          </p>
          <br />
          <h3 className="larger">Age</h3>
          <p>Age represents whether they are in the same age catagory</p>
          <br />
          <h3 className="larger">Position</h3>
          <p>
            position represents if they have similar political position or if
            they are affiliated with the same group
          </p>
          <br />
        </div>
      )}
    </>
  );
};
