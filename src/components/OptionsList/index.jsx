import React from "react";
import styles from "./OptionsList.module.css";
import Icon from "../Icon";

function OptionList({ categorizedOptions, onSelect }) {
  return (
    <>
      {categorizedOptions.map((cat, idx) => (
        <div key={idx} className={styles.categoryBlock}>
          <div className={styles.categoryName}>{cat.name}</div>
          {cat.options.map((option) => (
            <div
              key={option.id}
              className={styles.option}
              onClick={() => onSelect(option)}>
              <span className={styles.optionTitle}>
              <Icon name={option.icon} className={styles.icon} />
              {option.name}
              </span>
              {option.options?.length ? <span className={styles.arrow}>›</span> : null}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default OptionList;
