import React, { useEffect, useState } from "react";
import EasySpeech from "easy-speech";
import "./App.css";

function App() {
  const [text, setText] = useState("Click here to edit the text");
  const [voices, setVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function iOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  useEffect(() => {
    EasySpeech.detect();
    EasySpeech.init()
      .then(() => {
        setIsLoading(false);
        const voicesList = EasySpeech.status().voices;
        if (iOS()) {
          setVoices(
            voicesList.filter(
              (v) =>
                v.lang.includes("en-") &&
                !v.voiceURI.includes("com.apple.eloquence.") &&
                (v.name.includes("Karen") || v.name.includes("Samantha"))
            )
          );
        } else {
          setVoices(voicesList.filter((v) => v.lang.includes("en-")));
        }
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
        {isLoading ? (
          <p>Loading voices ...</p>
        ) : voices.length === 0 ? (
          <p>no voices detected</p>
        ) : (
          voices.map((voice) => (
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
                marginTop: "16px",
              }}
            >
              Listen {voice.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
