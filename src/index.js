import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import AnimalForm from "./components/AnimalForm";

function App() {
  return (
    <div className="app">
      <h1>ZooTracks</h1>
      <AnimalForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
