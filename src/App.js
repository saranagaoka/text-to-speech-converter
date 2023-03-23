import React, { useEffect, useState } from "react";
import EasySpeech from "easy-speech";
import "./App.css";

function App() {
  const [text, setText] = useState("Click here to edit the text");
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    EasySpeech.detect();
    EasySpeech.init()
      .then(() => {
        console.log(EasySpeech.status().voices);
        setVoices(
          EasySpeech.status().voices.filter((v) => v.lang.includes("en-"))
        );
      })
      .catch((e) => console.error("no speech synthesis:", e.message));
  }, []);

  const handleOnClick = (v) => {
    EasySpeech.speak({
      text: text,
      voice: v,
      rate: 0.9,
    });
  };

  return (
    <div
      style={{
        background: "#eee",
        width: "100%",
        height: "100%",
        padding: "32px",
        boxSizing: "border-box",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px",
          background: "#fff",
          boxSizing: "border-box",
          borderRadius: "16px",
          boxShadow: "0 4px 10px #00000033",
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: 0, fontSize: "24px" }}>
          Sample text to speech converter
        </h1>
        <input
          className="textAreaStyle"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{
            background: "#fff",
            padding: "8px 16px",
            borderRadius: "30px",
            border: "1px solid #2a3",
            fontSize: "16px",
          }}
        />
        <br />

        {voices.map((voice) => (
          <button
            className="buttonStyle"
            onClick={() => {
              handleOnClick(voice);
            }}
            style={{
              border: "none",
              background: "rgb(55 129 30)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "30px",
              fontWeight: 800,
              boxShadow: "0 4px 10px #00000033",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            Listen {voice.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
