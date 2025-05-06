
import React, { useState } from "react";
import "./GameScreen.css";
import rock from "../assets/icons/stone.png";
import paper from "../assets/icons/paper.png";
import scissors from "../assets/icons/scissor.png";

const choices = ["rock", "paper", "scissors"];
const icons = {
  rock: rock,
  paper: paper,
  scissors: scissors,
};

const GameScreen = ({ mode, onBack }) => {
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [turn, setTurn] = useState(1); 
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [result, setResult] = useState("");

  const getWinner = (p1, p2) => {
    if (p1 === p2) return "draw";
    if (
      (p1 === "rock" && p2 === "scissors") ||
      (p1 === "paper" && p2 === "rock") ||
      (p1 === "scissors" && p2 === "paper")
    ) {
      return "player1";
    }
    return "player2";
  };

  const handleChoice = (choice) => {
    if (mode === "single") {
      const compChoice = choices[Math.floor(Math.random() * 3)];
      setPlayer1Choice(choice);
      setPlayer2Choice(compChoice);
      const winner = getWinner(choice, compChoice);
      updateScore(winner);
      setResult(
        winner === "draw"
          ? "It's a draw!"
          : `${winner === "player1" ? "You" : "Computer"} win!`
      );
    } else {
      if (turn === 1) {
        setPlayer1Choice(choice);
        setTurn(2);
      } else {
        setPlayer2Choice(choice);
        const winner = getWinner(player1Choice, choice);
        updateScore(winner);
        setResult(
          winner === "draw"
            ? "It's a draw!"
            : `${winner === "player1" ? "Player 1" : "Player 2"} wins!`
        );
        setTurn(1);
      }
    }
  };

  const updateScore = (winner) => {
    if (winner === "player1")
      setScores((prev) => ({ ...prev, player1: prev.player1 + 1 }));
    else if (winner === "player2")
      setScores((prev) => ({ ...prev, player2: prev.player2 + 1 }));
  };

  const resetRound = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult("");
  };

  return (
    <div className="fade-in">
      <button onClick={onBack} style={{ marginBottom: "1rem" }}>
        ← Back
      </button>
      <h2 style={{ marginBottom: "1rem" }}>
        Mode: {mode === "single" ? "Single Player" : "Multiplayer"}
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h3>
            {mode === "single" ? "You" : "Player 1"}: {scores.player1}
          </h3>
          <div className="choice-icon">
            {player1Choice ? (
              <img
                src={icons[player1Choice]}
                alt={player1Choice}
                className="choice-img"
              />
            ) : (
              "❓"
            )}
          </div>
        </div>
        <div>
          <h3>
            {mode === "single" ? "Computer" : "Player 2"}: {scores.player2}
          </h3>
          <div className="choice-icon">
            {player2Choice ? (
              <img
                src={icons[player2Choice]}
                alt={player2Choice}
                className="choice-img"
              />
            ) : (
              "❓"
            )}
          </div>
        </div>
      </div>

      <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
        {result ||
          (mode === "multi" && turn === 2
            ? "Player 2’s turn"
            : "Choose your move")}
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            disabled={mode === "multi" && turn === 2 && !player1Choice}
          >
            <img src={icons[choice]} alt={choice} className="choice-img" />
          </button>
        ))}
      </div>

      {player1Choice && player2Choice && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={resetRound}>Next Round</button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
