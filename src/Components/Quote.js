
import React, { useEffect } from 'react'
import axios from 'axios';




const Quote = () => {


async function fetchQuotes() {
  try {
    const res = await axios.get("https://type.fit/api/quotes");
    const allQuotes = res.data;
    const quotes = [];
    console.log(quotes,"quotes")

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * allQuotes.length);
      quotes.push(allQuotes[randomIndex]);
      allQuotes.splice(randomIndex, 1);
    }
    return quotes

}catch(e){
  console.log(e.message);
}
}

useEffect(() =>{
  fetchQuotes()
},[])

  return (
    <div>
    <h1>Typing Game</h1>
    <p className="quote"></p>
    <input type="text" className="input"/>
    <p className="error-message"></p>
    <p>Time Taken: </p>
    <p className="quote-time"></p>
    <p>Average Time Taken: </p>
    <p className="quote-time-average"></p>
  </div>
  )
}

export default Quote;