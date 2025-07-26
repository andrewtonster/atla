import React from "react";
import styles from "./ScrollAnswers.module.css";
import { ScrollAnswerItem } from "../scrollAnswerItem/ScrollAnswerItem";

export const ScrollAnswers = ({ answer, results }) => {
  return (
    <section className={styles.answers__container}>
      <div className={styles.answers__titles__container}>
        <article>
          <h3>
            <u>Character</u>
          </h3>
        </article>

        <article>
          <h3>
            <u>Hair</u>
          </h3>
        </article>

        <article>
          <h3>
            <u>Gender</u>
          </h3>
        </article>

        <article>
          <h3>
            <u>Nation</u>
          </h3>
        </article>

        <article>
          <h3>
            <u>Fighting</u>
          </h3>
        </article>

        <article>
          <h3>
            <u>Book</u>
          </h3>
        </article>
        <article>
          <h3>
            <u>Age</u>
          </h3>
        </article>
        <article>
          <h3>
            <u>Position</u>
          </h3>
        </article>
      </div>

      <div className={styles.answers__body__container}>
        {/* reuslts contains all the people we have chosen for the game */}
        {results && results.length > 0
          ? results.map((res, index) => (
              <ScrollAnswerItem
                answer={answer}
                key={index}
                res={res}
                isLatest={index === 0}
              />
            ))
          : null}
      </div>
    </section>
  );
};
