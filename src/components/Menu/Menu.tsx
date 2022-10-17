import React, { ChangeEvent, ReactElement, useState } from "react";
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
}: {
  color: string;
  setColor: (color: string) => void;
  thickness: number;
  setThickness: (thickness: number) => void;
  setAction: (action: number) => void;
  image?: string;
  setImage: (image?: string) => void;
  canvasContext: CanvasRenderingContext2D | undefined | null;
  angle: number;
  setAngle: (angle: number) => void;
  fillColor: string;
  setFillColor: (fillColor: string) => void;
  fill: boolean;
  setFill: (fill: boolean) => void;
  setShape: (shape?: number) => void;
}): ReactElement => {
  const thicknessChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setThickness(+event.target.value);
  };
  const colorChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setColor(event.target.value);
  };
  const fillColorChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFillColor(event.target.value);
  };
  const actionChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    setAction(parseInt(event.target.value));
  };
  const imageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const fr = new FileReader();
      fr.onloadend = () => {
        setImage(`${fr.result}`);
      };
      fr.readAsDataURL(event.target.files[0]);
    }
  };

  const angleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAngle(+event.target.value);
  };

  const fillCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setFill(event.target.checked);
  };

  const insertCircle = () => {
    setShape(Shape.CIRCLE);
    // canvasContext?.resetTransform();
    // if (!canvasContext) return;
    // canvasContext.beginPath();
    // canvasContext.strokeStyle = color;
    // canvasContext.lineWidth = thickness;
    // canvasContext.fillStyle = !fill ? "#00000000" : fillColor;
    // canvasContext.arc(50, 50, 35, 0, 2 * Math.PI, true);
    // canvasContext.fill();
    // canvasContext.stroke();
  };

  const insertSquare = () => {
    setShape(Shape.SQUARE);
    // canvasContext?.resetTransform();
    // if (!canvasContext) return;
    // canvasContext.beginPath();
    // canvasContext.strokeStyle = color;
    // canvasContext.lineWidth = thickness;
    // canvasContext.fillStyle = !fill ? "#00000000" : fillColor;
    // canvasContext.rect(200, 200, 100, 100);
    // canvasContext.fill();
    // canvasContext.stroke();
  };

  const rotateSquare = () => {
    setShape(Shape.STAR);
    // canvasContext?.resetTransform();
    // if (!canvasContext) return;
    // canvasContext.translate(250, 250);
    // canvasContext.rotate((angle * Math.PI) / 180);
    // canvasContext.translate(-250, -250);
    // canvasContext.beginPath();
    // canvasContext.strokeStyle = color;
    // canvasContext.lineWidth = thickness;
    // canvasContext.fillStyle = !fill ? "#00000000" : fillColor;
    // canvasContext.rect(200, 200, 100, 100);
    // canvasContext.fill();
    // canvasContext.stroke();
  };

  const removeImage = (): void => {
    setImage(undefined);
  };

  const clearCanvas = (): void => {
    canvasContext?.clearRect(
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
        <button className={styles.btn__shape} onClick={rotateSquare}>
          <i className="fa-regular fa-star"></i>
        </button>
        <button className={styles.btn__shape}>
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
