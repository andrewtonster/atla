import React from "react";
import styles from "./SearchItem.module.css";

export const SearchItem = ({ result, setSelectedResult, onClick }) => {
  return (
    <section className={styles.search__item__container} onClick={onClick}>
      <div className={styles.search__img__container}>
        <img
          className={styles.search__img}
          src={result.character_img}
          loading="lazy"
          alt={`${result.name} picture`}
          style={{ backgroundColor: "#f0f0f0" }}
        />
      </div>
      <div className="search__item">{result.name}</div>
    </section>
  );
};
