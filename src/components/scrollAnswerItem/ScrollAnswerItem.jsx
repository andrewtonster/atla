import React, { useState, useEffect } from "react";
import styles from "./ScrollAnswerItem.module.css";
import { users } from "../../data";

export const ScrollAnswerItem = ({ answer, res, isLatest }) => {
  console.log(isLatest);
  // boolean to see if user got respective catagory correct

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

  // LIST OF ALL CARD VALUES and if correct or not

  const cards = [
    { value: res.hair, className: getColor(hair) },
    { value: res.gender, className: getColor(gender) },
    { value: res.nation, className: getColor(nation) },
    { value: res.fighting, className: getColor(fighting) },
    { value: res.book, className: getColor(book) },
    { value: res.age, className: getColor(age) },
    { value: res.position, className: getColor(position) },
  ];

  // state to determine how many are currently visible
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0); // set the amount of cards visible
    const timeouts = cards.map(
      (_, i) => setTimeout(() => setVisibleCount((c) => c + 1), i * 500) // schedule different timeouts at once
    );
    return () => timeouts.forEach(clearTimeout);
  }, [res]);

  return (
    <>
      <section className={styles.scroll__item__container}>
        <article className={styles.box}>
          <img
            src={res.character_img}
            alt={`${res.name} Character's image`}
            loading="lazy"
            style={{ backgroundColor: "#f0f0f0" }}
          />
        </article>

        {isLatest ? (
          cards.slice(0, visibleCount).map((card, idx) => (
            <div key={idx} className={styles.flip__wrapper}>
              <article className={card.className}>
                <span>{card.value}</span>
              </article>
            </div>
          ))
        ) : (
          <>
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
          </>
        )}
      </section>
    </>
  );
};

export default ScrollAnswerItem;
