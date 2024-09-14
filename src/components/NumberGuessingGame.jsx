import React, { useState } from 'react';

const NumberGuessingGame = ({ highScore, onGameOver }) => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; // Generates a number between 1 and 100
  }

  const handleSubmitGuess = (e) => {
    e.preventDefault();

    const userGuess = parseInt(guess, 10);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setFeedback('Please enter a number between 1 and 100.');
      return;
    }

    if (userGuess === targetNumber) {
      setFeedback('Congratulations! You guessed the number!');
      setScore((prevScore) => prevScore + 1); // Increment score
      onGameOver(score + 1); // Send new score to parent
      resetGame();
    } else if (userGuess < targetNumber) {
      setFeedback('Too low! Try again.');
    } else {
      setFeedback('Too high! Try again.');
    }
  };

  const resetGame = () => {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setFeedback('');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Number Guessing Game</h2>
      <p className="mb-4">Guess a number between 1 and 100</p>
      <form onSubmit={handleSubmitGuess}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          min="1"
          max="100"
          className="border p-2 rounded w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Guess
        </button>
      </form>
      {feedback && <p className="mt-4">{feedback}</p>}
      <p className="mt-4">High Score: {highScore}</p>
      <p className="mt-2">Current Score: {score}</p>
      <p className="mt-2">Score will update after every correct guess</p>
    </div>
  );
};

export default NumberGuessingGame;
