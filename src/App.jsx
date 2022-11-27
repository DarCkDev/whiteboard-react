import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import CanvasBar from "./components/CanvasBar/CanvasBar";
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
  const socket = useRef(null);
  const params = new URLSearchParams(window.location.search);

  const room = params.get("room");
  const username = params.get("username");

  const getData = async () => {
    const res = await fetch(`http://localhost:3003/canvas/${room}`);
    if (res.status === 200) {
      const canvasDB = await res.json();
      console.log("RESPONSE", canvasDB);
      const image = new Image();
      image.onload = function () {
        canvasRef.current.getContext("2d").drawImage(image, 0, 0);
      };
      image.src = canvasDB.content;
    }
  };

  setTimeout(() => {
    const content = canvasRef.current.toDataURL();
    fetch("http://localhost:3003/save", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room, content }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, 30000);

  useEffect(() => {
    setContext(canvasRef.current.getContext("2d"));
    const user = { room, username };
    getData();
    socket.current = io(`http://localhost:3003`, {
      transports: ["websocket"],
    });
    if (socket.current) {
      console.log("emiting");
      socket.current.emit("access", user);
    } else {
      console.log("null");
    }
  }, []);

  return (
    <div className="App">
      <CanvasBar canvasRef={canvasRef} action={action} />
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
        user={username}
        socket={socket}
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
