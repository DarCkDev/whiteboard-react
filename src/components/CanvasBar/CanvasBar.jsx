import React from "react";
//import { useState } from "react";
import styles from "./CanvasBar.module.css";
//import Item from "./Item/Item";
import { useEffect } from "react";
//import { loadAllCanvas, saveCanvas } from "../../services/dbStorage";

export default function CanvasBar({ users }) {
  //const [canvasSet, setCanvasSet] = useState([]);

  /*const onSaveCanvas = () => {
    saveCanvas(canvasRef, setCanvasSet, canvasSet);
  };*/

  useEffect(() => {
    //loadAllCanvas(setCanvasSet);
  }, [users]);

  return (
    <div className={styles.canvasbar}>
      <h3 className={styles.canvasbar__title}>Canvas</h3>
      {/*<button className={styles.canvasbar__save} onClick={onSaveCanvas}>
        Guardar
      </button>
      {canvasSet.map((c) => (
        <Item
          key={c.id}
          item={c}
          canvasRef={canvasRef}
          setCanvasSet={setCanvasSet}
          action={action}
        />
      ))}*/}
      <ul style={{ listStyleType: "none" }}>
        {users.map((u) => (
          <li key={u.id}>{u.username}</li>
        ))}
      </ul>
    </div>
  );
}
