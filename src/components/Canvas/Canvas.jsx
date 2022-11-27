import React, { useState } from "react";
import { Action, Shape } from "../../models/Action";
import styles from "./Canvas.module.css";

import {
  drawCircle,
  drawSquare,
  drawLine,
  drawText,
} from "../../services/draw";
import { useEffect } from "react";

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
  textSize,
  text,
  user,
  socket,
}) => {
  const [drawing, setDrawing] = useState(false);
  const points = {
    xOrigin: 0,
    yOrigin: 0,
    xEnd: 0,
    yEnd: 0,
  };

  const onDown = (event) => {
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
          break;
        case Action.ERASE:
          canvasContext.globalCompositeOperation = "destination-out";
          break;
      }
      canvasContext.lineTo(event.clientX, event.clientY);
      canvasContext.stroke();
      if (socket.current) {
        const url = canvasRef.current.toDataURL();
        socket.current.emit("todraw", { user, data: url });
      }
    }
  };

  const onUp = (event) => {
    if (shape) {
      points.xEnd = event.clientX;
      points.yEnd = event.clientY;
      canvasContext.globalCompositeOperation = "source-over";
      switch (shape) {
        case Shape.CIRCLE:
          drawCircle(
            canvasContext,
            points.xOrigin,
            points.xEnd,
            points.yOrigin,
            points.yEnd
          );
          break;
        case Shape.SQUARE:
          drawSquare(
            canvasContext,
            points.xOrigin,
            points.xEnd,
            points.yOrigin,
            points.yEnd,
            angle
          );
          break;
        case Shape.LINE:
          drawLine(
            canvasContext,
            points.xOrigin,
            points.xEnd,
            points.yOrigin,
            points.yEnd
          );
          break;
        case Shape.TEXT:
          console.log(text);
          drawText(
            canvasContext,
            points.xOrigin,
            points.yOrigin,
            text,
            textSize,
            fill
          );
      }
    } else {
      canvasContext.closePath();
    }
    if (socket.current) {
      const url = canvasRef.current.toDataURL();
      socket.current.emit("todraw", { user, data: url });
    }
    setDrawing(false);
    setShape(undefined);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("todraw", (args) => {
        canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
        const image = new Image();
        image.onload = function () {
          canvasContext.drawImage(image, 0, 0);
        };
        image.src = args.data;
        console.log("CANVAS", args.data);
      });
    }
    return () => {
      socket.current.off("todraw");
    };
  }, [socket.current]);
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
        />
      </div>
    </div>
  );
};

export default Canvas;
