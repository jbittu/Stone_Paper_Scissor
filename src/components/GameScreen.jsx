import React, { useState, useEffect } from "react";
import "./GameScreen.css";
import rock from "../assets/icons/stone.png";
import paper from "../assets/icons/paper.png";
import scissors from "../assets/icons/scissor.png";
import player1Icon from "../assets/icons/player1.png";
import player2Icon from "../assets/icons/player2.png";
import computerIcon from "../assets/icons/computer.png";
import unknownIcon from "../assets/icons/unknown.png";

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
  const [showRules, setShowRules] = useState(false);

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
      if (winner === "draw") {
        setResult("It's a draw!");
        alert("It's a draw!");
      } else {
        const winnerText = winner === "player1" ? "You" : "Computer";
        setResult(`${winnerText} win!`);
        alert(`${winnerText} win!`);
      }
    } else {
      if (turn === 1) {
        setPlayer1Choice(choice);
        setTurn(2);
      } else {
        const p1 = player1Choice;
        const p2 = choice;
        setPlayer2Choice(choice);
        const winner = getWinner(p1, p2);
        updateScore(winner);
        if (winner === "draw") {
          setResult("It's a draw!");
          alert("It's a draw!");
        } else {
          const winnerText = winner === "player1" ? "Player 1" : "Player 2";
          setResult(`${winnerText} wins!`);
          alert(`${winnerText} wins!`);
        }
        setTurn(1);
      }
    }
  };

  const updateScore = (winner) => {
    if (winner === "player1") {
      setScores((prev) => ({ ...prev, player1: prev.player1 + 1 }));
    } else if (winner === "player2") {
      setScores((prev) => ({ ...prev, player2: prev.player2 + 1 }));
    }
  };

  const resetRound = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult("");
  };

  return (
    <div className="game-container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Mode: {mode === "single" ? "Single Player" : "Multiplayer"}</h2>

      <div className="scoreboard">
        <div>
          <img src={player1Icon} alt="Player 1" className="player-img" />
          <h3 className="score">Score: {scores.player1}</h3>
          <div className="choice-icon">
            {mode === "multi" && (!player1Choice || !player2Choice) ? (
              <img src={unknownIcon} alt="unknown" className="choice-img" />
            ) : (
              player1Choice && (
                <img
                  src={icons[player1Choice]}
                  alt={player1Choice}
                  className="choice-img"
                />
              )
            )}
          </div>
        </div>

        <div>
          <img
            src={mode === "single" ? computerIcon : player2Icon}
            alt="Player 2"
            className="player-img"
          />
          <h3 className="score">Score: {scores.player2}</h3>
          <div className="choice-icon">
            {mode === "multi" && (!player1Choice || !player2Choice) ? (
              <img src={unknownIcon} alt="unknown" className="choice-img" />
            ) : (
              player2Choice && (
                <img
                  src={icons[player2Choice]}
                  alt={player2Choice}
                  className="choice-img"
                />
              )
            )}
          </div>
        </div>
      </div>

      <p className="result">
        {result ||
          (mode === "multi"
            ? turn === 1
              ? "Player 1's turn"
              : "Player 2's turn"
            : "Choose your move")}
      </p>

      <div className="choices-container">
        {choices.map((choice) => (
          <button
            key={choice}
            className="choice-button"
            onClick={() => handleChoice(choice)}
            disabled={mode === "multi" && turn === 2 && player1Choice === null}
          >
            <img src={icons[choice]} alt={choice} className="choice-img" />
          </button>
        ))}
      </div>

      {player1Choice && player2Choice && (
        <div className="next-round">
          <button onClick={resetRound}>Play Again</button>
        </div>
      )}

      <button className="rules-button" onClick={() => setShowRules(!showRules)}>
        {showRules ? "Hide Rules" : "Show Rules"}
      </button>

      {showRules && (
        <div className="rules-popup">
          <div className="rules-content">
            <h3>Game Rules</h3>
            <ul>
              <li>Rock beats Scissors</li>
              <li>Paper beats Rock</li>
              <li>Scissors beats Paper</li>
              <li>Same choice is a draw</li>
            </ul>
            <button
              className="close-button"
              onClick={() => setShowRules(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
