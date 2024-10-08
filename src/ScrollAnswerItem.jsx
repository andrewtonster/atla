import React from "react";
import "./ScrollAnswerItem.css";
import { users } from "./data";

export const ScrollAnswerItem = ({ answer, res }) => {
  const hair = answer.hair == res.hair;
  const gender = answer.gender == res.gender;
  const nation = answer.nation == res.nation;
  const fighting = answer.fighting == res.fighting;
  const bending = answer.bending == res.bending;
  const age = answer.age == res.age;
  const position = answer.position == res.position;
  const book = answer.book == res.book;

  const getColor = (value) => {
    return value ? "match-true" : "match-false";
  };

  return (
    <>
      <div className="scroll__item__container">
        <div className="box__row">
          <div className={`character__box box`}>
            <img src={res.character_img} alt="Character" />
          </div>
          <div className={`hair__box box ${getColor(hair)}`}>
            <span>{res.hair}</span>
          </div>
          <div className={`gender__box box ${getColor(gender)}`}>
            <span>{res.gender}</span>
          </div>
          <div className={`nation__box box ${getColor(nation)}`}>
            <span>{res.nation}</span>
          </div>
          <div className={`fighting__box box ${getColor(fighting)}`}>
            <span>{res.fighting}</span>
          </div>
          <div className={`book__box box ${getColor(book)}`}>
            <span className="box__text">{res.book}</span>
          </div>
          <div className={`age__box box ${getColor(age)}`}>
            <span>{res.age}</span>
          </div>
          <div className={`position__box box ${getColor(position)}`}>
            <span>{res.position}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollAnswerItem;
