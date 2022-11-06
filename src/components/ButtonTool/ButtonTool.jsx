import React from "react";
import styles from "./ButtonTool.module.css";

export default function ButtonTool({ insert, shape }) {
  return (
    <button className={styles.btn__shape} onClick={insert}>
      <i className={`${shape}`}></i>
    </button>
  );
}
