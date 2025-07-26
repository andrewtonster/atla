import React from "react";
import styles from "./Information.module.css";
export const Information = ({ time, onClick, isOpen, onClose }) => {
  return (
    <>
      <div className={styles.content__nav__itm}>
        <button onClick={onClick}>
          <i className="question ri-question-line"></i>
        </button>
      </div>

      {isOpen && (
        <div className={styles.information__container}>
          <h1>
            How to Play
            <span className={styles.close} onClick={onClose}>
              <b>x</b>
            </span>
          </h1>
          <br />
          <p>
            To play this game, simply type a character from the searchbar. The
            character you click will match attributes similar to that of the
            answer.
          </p>
          <br />
          <h2>Play the Avatar Wordle Infinately!</h2>

          <br />
          <p>
            <mark className={styles.green}>Green</mark> represents that the
            character you chose <i>matches</i> in that catagory
          </p>
          <p>
            <mark className={styles.red}>Red</mark> represents that the
            character you chose <i>does not match</i>
            in that catagory
          </p>
          <br />
          <h2>Catagories</h2>
          <br />
          <h3>Character</h3>
          <p>Character cataory displays image of chosen character</p>
          <br />
          <h3>Hair</h3>
          <p>Hair cataory represnt matches in hair color</p>
          <br />
          <h3>Gender</h3>
          <p>Gender cataory represnt matches in gender</p>
          <br />
          <h3>Nation</h3>
          <p>
            Nation cataory represent if the character originate come from same
            nation
          </p>
          <br />
          <h3>Fighting</h3>
          <p>Fighting cataory represent their most used fighting style</p>
          <br />

          <h3>Book</h3>
          <p>
            Book describes the book the character was first seen, and also gives
            the book title
          </p>
          <br />
          <h3>Bending</h3>
          <p>
            Bending catagory represents if the character has bending
            capabilities
          </p>
          <br />
          <h3>Position</h3>
          <p>
            position represents if they have similar political position or if
            they are affiliated with the same group
          </p>
          <br />
          <h2>Hint</h2>
          <br />

          <h3>Description</h3>
          <p>
            Click scroll for hint. This hint gives a description about the
            character
          </p>
          <br />

          <h2>Contact</h2>
          <br />
          <p>andrewtonster@gmail.com</p>
          <br />
          <p>
            Notice: Please note that all the characters and attributes are typed
            by hand. If there are any issues or any update request please
            contact me. Thank you for visiting!
          </p>
          <br />
        </div>
      )}
    </>
  );
};
