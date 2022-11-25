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
  const [users, setUsers] = useState([]);
  const socket = useRef(null);
  const params = new URLSearchParams(window.location.search);

  // const newSocket = io(`http://${window.location.hostname}:3003`, {
  //   transports: ["websocket"],
  // });
  const room = params.get("room");
  const username = params.get("username");

  /*if (socket) {
    console.log("OK");
    socket.on("access", (data) => {
      console.log(data);
    });
  } else {
    setSocket(
      io(`http://${window.location.hostname}:3003`, {
        transports: ["websocket"],
      })
    );
  }*/

  useEffect(() => {
    setContext(canvasRef.current.getContext("2d"));
    socket.current = io(`http://${window.location.hostname}:3003`, {
      transports: ["websocket"],
    });
    /*if (socket.current) {
      const user = { room, username };
      socket.current.emit("access", user);
      socket.current.on("users", (args) => {
        console.log(args);
      });
    }*/
    const user = { room, username };
    socket.current.emit("access", user);
    socket.current.on("userconnected", (args) => {
      setUsers(args.users);
    });
    socket.current.on("userdisconect", (args) => {
      setUsers(args.users);
    });
    return () => {
      socket.current.off("userconnected"), socket.current.off("userdisconect");
    };
  }, []);

  return (
    <div className="App">
      <CanvasBar canvasRef={canvasRef} action={action} users={users} />
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
