import React from "react";
import { useState } from "react";
import styles from "./CanvasBar.module.css";
import uniqid from "uniqid";

export default function CanvasBar({ canvasContainerRef }) {
  const [canvasSet, setCanvasSet] = useState([]);

  const onSaveCanvas = () => {
    const idb = window.indexedDB.open("db_canvas", 1);
    idb.onerror = () => {
      alert("Error en Base de datos.");
    };
    idb.onsuccess = () => {
      console.log(encodeURIComponent(canvasContainerRef.current));
      const canvasObject = {
        id: uniqid(),
        canvas: canvasContainerRef.current,
      };
      if (idb.result) {
        console.log("Success");
        const objectStore = idb.result
          .transaction(["canvas"], "readwrite")
          .objectStore("canvas");
        objectStore.add(canvasObject);

        setCanvasSet([...canvasSet, canvasObject]);
      }
    };
    idb.onupgradeneeded = () => {
      console.log("Upgrade");
      idb.result.createObjectStore("canvas", { keyPath: "id" });
    };
    /*const idb = window.indexedDB.open("db_canvas", 1, function (upgradeDB) {
      if (!upgradeDB.objectStoreNames.contains("canvas")) {
        upgradeDB.createObjectStore("canvas", { keyPath: "id" });
      }
    });
    const canvasObject = { id: uniqid(), canvas: canvasContainerRef };

    idb
      .then(function (db) {
        const tsc = db.transaction("store", "readwrite");
        const store = tsc.objectStore("store");
        store.add(canvasObject);
        return tsc.complete;
      })
      .then(function () {
        console.log("Added item to the store!");
        setCanvasSet([...canvasSet, canvasObject]);
      });*/
  };

  return (
    <div className={styles.canvasbar}>
      <h3 className={styles.canvasbar__title}>Canvas</h3>
      <button onClick={onSaveCanvas}>Guardar</button>
      {canvasSet.map((c) => (
        <li key={c.id}>{c.id}</li>
      ))}
    </div>
  );
}
