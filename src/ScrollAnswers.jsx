import React from "react";
import "./ScrollAnswers.css";
import { ScrollAnswerItem } from "./ScrollAnswerItem";

export const ScrollAnswers = ({ answer, results }) => {
  return (
    <div className="answers__container">
      <div className="answers__titles__container">
        <div className="answer__title_container">
          <span>Character</span>
          <div className="lines"></div>
        </div>

        <div className="answer__title_container">
          <span>Hair</span>
          <div className="lines"></div>
        </div>

        <div className="answer__title_container">
          <span>Gender</span>
          <div className="lines"></div>
        </div>

        <div className="answer__title_container">
          <span>Nation</span>
          <div className="lines"></div>
        </div>

        <div className="answer__title_container">
          <span>Fighting</span>
          <div className="lines"></div>
        </div>

        <div className="answer__title_container">
          <span>Book</span>
          <div className="lines"></div>
        </div>
        <div className="answer__title_container">
          <span>Age</span>
          <div className="lines"></div>
        </div>
        <div className="answer__title_container">
          <span>Position</span>
          <div className="lines"></div>
        </div>
      </div>
      <div className="answers__body__container">
        {results && results.length > 0
          ? results.map((res, index) => (
              <ScrollAnswerItem answer={answer} key={index} res={res} />
            ))
          : null}
      </div>
    </div>
  );
};
