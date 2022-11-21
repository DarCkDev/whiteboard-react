import uniqid from "uniqid";
import { Action } from "../models/Action";

export const loadAllCanvas = (setCanvasSet) => {
  const idb = window.indexedDB.open("db_canvas", 1);
  idb.onsuccess = () => {
    const results = [];
    const transaction = idb.result.transaction(["canvas"], "readonly");
    const request = transaction.objectStore("canvas").openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        const canvas = cursor.value;
        results.push(canvas);
        cursor.continue();
      } else {
        setCanvasSet(results);
        //setLoading(false);
      }
    };
  };
  idb.onupgradeneeded = () => {
    idb.result.createObjectStore("canvas", { keyPath: "id" });
  };
};

export const loadCanvas = (item, canvasRef, action) => {
  const image = new Image();
  image.src = item.canvas;
  image.onload = function () {
    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, document.body.offsetWidth, document.body.offsetHeight);
    canvasRef.current.getContext("2d").drawImage(image, 0, 0);
    if (action == Action.ERASE) {
      canvasRef.current.getContext("2d").globalCompositeOperation =
        "destination-out";
    }
  };
};

export const deleteCanvas = (item, setCanvasSet) => {
  const idb = window.indexedDB.open("db_canvas", 1);
  idb.onsuccess = () => {
    const transaction = idb.result.transaction(["canvas"], "readwrite");
    const confirm = window.confirm("Seguro que desea eliminar?.", item.id);
    if (confirm) {
      transaction.objectStore("canvas").delete(item.id);
      transaction.oncomplete = () => {
        setCanvasSet((old) => {
          const filtered = old.filter((c) => c.id != item.id);
          return filtered;
        });
      };
    }
  };
};

export const saveCanvas = (canvasRef, setCanvasSet, canvasSet) => {
  const idb = window.indexedDB.open("db_canvas", 1);
  idb.onerror = () => {
    alert("Error en Base de datos.");
  };
  idb.onsuccess = () => {
    const canvasObject = {
      id: uniqid(),
      canvas: canvasRef.current.toDataURL("image/png"),
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
    idb.result.createObjectStore("canvas", { keyPath: "id" });
  };
};
