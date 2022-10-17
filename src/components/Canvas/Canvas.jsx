import React, { useState } from "react";
import { Action, Shape } from "../../models/Action";
import styles from "./Canvas.module.css";

const Canvas = ({
  action,
  image,
  thickness,
  color,
  canvasRef,
  canvasContext,
  shape,
  setShape,
  fill,
  fillColor,
  angle,
}) => {
  const [drawing, setDrawing] = useState(false);
  const points = {
    xOrigin: 0,
    yOrigin: 0,
    xEnd: 0,
    yEnd: 0,
  };

  const onDown = (event) => {
    if (!canvasContext) return;
    points.xOrigin = event.clientX;
    points.yOrigin = event.clientY;
    canvasContext.resetTransform();
    canvasContext.beginPath();
    canvasContext.strokeStyle = color;
    canvasContext.lineWidth = thickness;
    if (shape) {
      canvasContext.fillStyle = !fill ? "#00000000" : fillColor;
    } else {
      setDrawing(true);
      canvasContext.lineCap = "round";
      canvasContext.moveTo(event.clientX, event.clientY);
    }
  };

  const onMove = (event) => {
    if (drawing && canvasContext && !shape) {
      switch (action) {
        case Action.DRAW:
          canvasContext.globalCompositeOperation = "source-over";
          canvasContext.lineTo(event.clientX, event.clientY);
          canvasContext.stroke();
          break;
        case Action.ERASE:
          canvasContext.globalCompositeOperation = "destination-out";
          canvasContext.lineTo(event.clientX, event.clientY);
          canvasContext.stroke();
          break;
      }
    }
  };

  const onUp = (event) => {
    if (!canvasContext) return;
    if (shape) {
      points.xEnd = event.clientX;
      points.yEnd = event.clientY;
      canvasContext.globalCompositeOperation = "source-over";
      switch (shape) {
        case Shape.CIRCLE:
          canvasContext.arc(
            points.xOrigin,
            points.yOrigin,
            getLength(points.xOrigin, points.yOrigin, points.xEnd, points.yEnd),
            0,
            2 * Math.PI,
            true
          );
          canvasContext.fill();
          canvasContext.stroke();
          break;
        case Shape.SQUARE:
          canvasContext.translate(
            getTranslateX(points.xOrigin, points.xEnd),
            getTranslateY(points.yOrigin, points.yEnd)
          );
          canvasContext.rotate((angle * Math.PI) / 180);
          canvasContext.translate(
            -getTranslateX(points.xOrigin, points.xEnd),
            -getTranslateY(points.yOrigin, points.yEnd)
          );
          canvasContext.rect(
            points.xOrigin,
            points.yOrigin,
            getLength(points.xOrigin, points.yOrigin, points.xEnd, points.yEnd),
            getLength(points.xOrigin, points.yOrigin, points.xEnd, points.yEnd)
          );
          canvasContext.fill();
          canvasContext.stroke();
          break;
      }
    } else {
      canvasContext?.closePath();
    }
    setDrawing(false);
    setShape(undefined);
  };

  const getTranslateX = (xOrigin, xEnd) => {
    return xOrigin + xEnd / 2;
  };
  const getTranslateY = (yOrigin, yEnd) => {
    return yOrigin + yEnd / 2;
  };
  const getLength = (xOrigin, yOrigin, xEnd, yEnd) => {
    const d =
      Math.pow(Math.abs(xEnd - xOrigin), 2) +
      Math.pow(Math.abs(yEnd - yOrigin), 2);
    return Math.round(Math.sqrt(d));
  };

  return (
    <div className={styles.canvas__container}>
      <div className={styles.canvas__image}>
        {image && <img className={styles.image} src={image} alt="" />}
        <canvas
          id="canvas"
          className={styles.canvas__canvas}
          ref={canvasRef}
          width={document.body.offsetWidth}
          height={document.body.offsetHeight}
          onMouseDown={onDown}
          onMouseUp={onUp}
          onMouseMove={onMove}
          onMouseLeave={onUp}
        />
      </div>
    </div>
  );
};

export default Canvas;
