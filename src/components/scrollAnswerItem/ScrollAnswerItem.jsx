import React from "react";
import styles from "./ScrollANswerItem.module.css";
import { users } from "../../data";

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
    return value ? styles["match-true"] : styles["match-false"];
  };

  return (
    <>
      <section className={styles.scroll__item__container}>
        <article className={styles.box}>
          <img
            src={res.character_img}
            alt={`${res.character_img} Character's image`}
            loading="lazy"
          />
        </article>
        <article className={getColor(hair)}>
          <span>{res.hair}</span>
        </article>
        <article className={getColor(gender)}>
          <span>{res.gender}</span>
        </article>
        <article className={getColor(nation)}>
          <span>{res.nation}</span>
        </article>
        <article className={getColor(fighting)}>
          <span>{res.fighting}</span>
        </article>
        <article className={getColor(book)}>
          <span className="box__text">{res.book}</span>
        </article>
        <article className={getColor(age)}>
          <span>{res.age}</span>
        </article>
        <article className={`position__box  ${getColor(position)}`}>
          <span>{res.position}</span>
        </article>
      </section>
    </>
  );
};

export default ScrollAnswerItem;
