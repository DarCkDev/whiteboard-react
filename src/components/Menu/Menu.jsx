import React from "react";
import { Action, Shape } from "../../models/Action";
import styles from "./Menu.module.css";

const Menu = ({
  color,
  setColor,
  thickness,
  setThickness,
  setAction,
  image,
  setImage,
  canvasContext,
  angle,
  setAngle,
  fillColor,
  setFillColor,
  fill,
  setFill,
  setShape,
}) => {
  const thicknessChange = (event) => {
    setThickness(+event.target.value);
  };
  const colorChange = (event) => {
    setColor(event.target.value);
  };
  const fillColorChange = (event) => {
    setFillColor(event.target.value);
  };
  const actionChange = (event) => {
    setAction(parseInt(event.target.value));
    setShape(undefined);
  };
  const imageChange = (event) => {
    if (event.target.files) {
      const fr = new FileReader();
      fr.onloadend = () => {
        setImage(`${fr.result}`);
      };
      fr.readAsDataURL(event.target.files[0]);
    }
  };

  const angleChange = (event) => {
    setAngle(+event.target.value);
  };

  const fillCheck = (event) => {
    setFill(event.target.checked);
  };

  const insertCircle = () => {
    setShape(Shape.CIRCLE);
  };

  const insertSquare = () => {
    setShape(Shape.SQUARE);
  };

  const insertStar = () => {
    setShape(Shape.STAR);
  };

  const insertLine = () => {
    setShape(Shape.LINE);
  };

  const removeImage = () => {
    setImage(undefined);
  };

  const clearCanvas = () => {
    canvasContext.clearRect(
      0,
      0,
      document.body.offsetWidth,
      document.body.offsetHeight
    );
  };

  return (
    <div className={styles.menu__container}>
      <p>Acción</p>
      <div className={styles.action__container}>
        <div className={styles.btn__action}>
          <label htmlFor="action-draw">
            <i className="fa-solid fa-pen"></i>
          </label>
          <input
            id="action-draw"
            name="action"
            type="radio"
            value={Action.DRAW}
            onChange={actionChange}
          />
        </div>
        <div className={styles.btn__action}>
          <label htmlFor="action-erase">
            <i className="fa-solid fa-eraser"></i>
          </label>
          <input
            id="action-erase"
            name="action"
            type="radio"
            value={Action.ERASE}
            onChange={actionChange}
          />
        </div>
      </div>
      <hr style={{ width: "100%" }} />
      <p>Línea</p>
      <input
        className={styles.menu__thickness}
        type="number"
        min="1"
        max="50"
        value={thickness}
        onChange={thicknessChange}
      />
      <input
        className={styles.menu__color}
        type="color"
        value={color}
        onChange={colorChange}
      />
      <button onClick={clearCanvas}>Clear</button>
      <hr style={{ width: "100%" }} />
      <p>Relleno</p>
      <div className={styles.fill__container}>
        <input type="checkbox" checked={fill} onChange={fillCheck} />
        <input
          className={styles.menu__color}
          type="color"
          value={fillColor}
          onChange={fillColorChange}
          disabled={!fill}
        />
      </div>
      <hr style={{ width: "100%" }} />
      <p>Imagen</p>
      <label htmlFor="image">
        <i className="fa-solid fa-image"></i>
      </label>
      <input
        className={styles.menu__image}
        id="image"
        type="file"
        accept="image/*"
        onChange={imageChange}
      />
      {image && (
        <button className={styles.btn__removeimage} onClick={removeImage}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
      <hr style={{ width: "100%" }} />
      <div className={styles.shapes__container}>
        <button className={styles.btn__shape} onClick={insertCircle}>
          <i className="fa-regular fa-circle"></i>
        </button>
        <button className={styles.btn__shape} onClick={insertSquare}>
          <i className="fa-regular fa-square"></i>
        </button>
        <button className={styles.btn__shape} onClick={insertStar}>
          <i className="fa-regular fa-star"></i>
        </button>
        <button className={styles.btn__shape} onClick={insertLine}>
          <i className="fa-solid fa-slash"></i>
        </button>
      </div>
      <input
        type="number"
        min={0}
        max={360}
        value={angle}
        onChange={angleChange}
      />
    </div>
  );
};

export default Menu;
