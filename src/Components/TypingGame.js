import React, { useState, useEffect } from "react";

function TypingGame() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [quoteStartTime, setQuoteStartTime] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch("https://type.fit/api/quotes");
        const data = await res.json();
        const allQuotes = data;
        const quotes = [];

        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * allQuotes.length);
          quotes.push(allQuotes[randomIndex]);
          allQuotes.splice(randomIndex, 1);
        }

        setQuotes(quotes);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching the quotes. Please try again later.");
      }
    }
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0 ) {
      
      if (currentQuoteIndex === quotes.length  ) {
        endGame();
      }
      else{
        console.log(currentQuoteIndex,quotes.length,"hi")
        displayQuote(quotes[currentQuoteIndex].text);
        setStartTime(new Date());
        setQuoteStartTime(new Date());
      }
    }
    else{
      console.log("hi")
    }
  }, [quotes, currentQuoteIndex]);

  function displayQuote(quote) {
    document.getElementById("quote").innerText = quote;
  }

  function displayQuoteTime(timeTaken) {
    document.getElementById("quote-time").innerText = timeTaken;
  }

  function displayQuoteTimeAverage(averageTime) {
    document.getElementById("quote-time-average").innerHTML = averageTime;
  }

  function displayErrorMessage(message) {
    setErrorMessage(message);
  }

  function endGame() {
    const endTime = new Date();
    const totalTime = (endTime - startTime) / 1000;
    const averageTime = Math.floor(totalTime / quotes.length);
    localStorage.setItem("score", totalTime + ":" + score);
    alert(`Total Time : ${totalTime} seconds Score :${score} points. Game Over`);
    displayQuoteTimeAverage(averageTime);
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleEnterPress(event) {
    if (event.key === "Enter") {
      if (inputValue === quotes[currentQuoteIndex].text) {
        setScore(score + 1);
        const quoteEndTime = new Date();
        const timeTaken = (quoteEndTime - quoteStartTime) / 1000;
        displayQuoteTime(timeTaken);
        setInputValue('');
        setCurrentQuoteIndex(currentQuoteIndex + 1);
        setQuoteStartTime(new Date());
        setErrorMessage('');
      } else {
        setCurrentQuoteIndex(currentQuoteIndex + 1);
        displayErrorMessage('Wrong Quote Entered');
        alert("Wrong Score 0");

        if (currentQuoteIndex === quotes.length - 1) {
          endGame();
        } else {
          displayQuote(quotes[currentQuoteIndex].text);
        }
      }
    }
  }

  return (
    <div>
      <h1>Typing Game</h1>
      {quotes.length > 0 && (
        <>
          <p id="quote"></p>
          <input type="text" id="input" value={inputValue} onChange={handleInputChange} onKeyPress={handleEnterPress} />
          <p id ="error-message">{errorMessage}</p>
          <p>Time Taken: </p>
          <p id ="quote-time"></p>
          <p>Average Time Taken: </p>
          <p id ="quote-time-average"></p>
        </>
      )}
    </div>
  );
}

export default TypingGame
