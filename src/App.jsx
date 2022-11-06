import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import Menu from "./components/Menu/Menu";
import { Action } from "./models/Action";

function App() {
  const [color, setColor] = useState("#900000");
  const [thickness, setThickness] = useState(5);
  const [action, setAction] = useState(Action.DRAW);
  const [image, setImage] = useState(undefined);
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [context, setContext] = useState();
  const [angle, setAngle] = useState(0);
  const [fillColor, setFillColor] = useState("#000000");
  const [fill, setFill] = useState(false);
  const [shape, setShape] = useState();
  const [textSize, setTextSize] = useState(16);
  const [text, setText] = useState();

  useEffect(() => {
    setContext(canvasRef.current.getContext("2d"));
  }, []);

  return (
    <div className="App">
      <Canvas
        action={action}
        image={image}
        thickness={thickness}
        color={color}
        canvasRef={canvasRef}
        canvasContext={context}
        canvasContainerRef={canvasContainerRef}
        shape={shape}
        setShape={setShape}
        fill={fill}
        fillColor={fillColor}
        angle={angle}
        textSize={textSize}
        text={text}
      />
      <Menu
        color={color}
        setColor={setColor}
        thickness={thickness}
        setThickness={setThickness}
        setAction={setAction}
        image={image}
        setImage={setImage}
        canvasContext={context}
        angle={angle}
        setAngle={setAngle}
        fillColor={fillColor}
        setFillColor={setFillColor}
        fill={fill}
        setFill={setFill}
        setShape={setShape}
        textSize={textSize}
        setTextSize={setTextSize}
        text={text}
        setText={setText}
        canvasContainerRef={canvasContainerRef}
      />
    </div>
  );
}

export default App;
