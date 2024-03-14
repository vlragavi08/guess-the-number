import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NumberInput from './components/NumberInput';
import ResultMessage from './components/ResultMessage';
import Button from './components/Button';
import './App.css';

const App = () => {
  const [secretNumber, setSecretNumber] = useState(generateSecretNumber());
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const maxCount = 5;
  const [showRestartButton, setShowRestartButton] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (count === maxCount) {
      setMessage('You have reached the maximum number of guesses!');
      setShowRestartButton(true);
    }
  }, [count]);

  const remainingAttempts = maxCount - count;

  const handleGuess = (value) => {
    if (!value.trim()) {
      setMessage('Please enter a valid number.');
      return;
    }
    const guessNum = parseInt(value);
    setCount(count + 1);
    if (count < maxCount) {
      if (guessNum === secretNumber) {
        setMessage('Congratulations! You guessed it right!');
        setShowRestartButton(true);
        setHasWon(true);
        document.body.classList.add('win-background'); // Add class to body
      } else if (guessNum < secretNumber) {
        setMessage('You guessed too low. Try again!');
      } else {
        setMessage('You guessed too high. Try again!');
      }
    }
  };

  const resetGame = () => {
    setSecretNumber(generateSecretNumber());
    setMessage('');
    setCount(0);
    setShowRestartButton(false);
    setHasWon(false);
    document.body.classList.remove('win-background'); // Remove class from body
  };

  function generateSecretNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="card">
          <div className="content">
            <NumberInput onSubmit={handleGuess} />
            <ResultMessage message={message} />
            {showRestartButton && (
              <Button onClick={resetGame} text="Restart Game" />
            )}
          </div>
          <div className="attempts">
            <p>Remaining attempts: {remainingAttempts}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
