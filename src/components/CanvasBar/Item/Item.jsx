import React from "react";
import { deleteCanvas, loadCanvas } from "../../../services/dbStorage";
import styles from "./Item.module.css";

export default function Item({ item, canvasRef, setCanvasSet, action }) {
  const onLoadCanvas = () => {
    canvasRef.current.getContext("2d").globalCompositeOperation = "source-over";
    loadCanvas(item, canvasRef, action);
  };

  const onDeleteCanvas = () => {
    deleteCanvas(item, setCanvasSet);
  };

  return (
    <div className={styles.item__container}>
      <p className={styles.item__title} onClick={onLoadCanvas}>
        {item.id}
      </p>{" "}
      <button className={styles.item__remove} onClick={onDeleteCanvas}>
        x
      </button>
    </div>
  );
}
