import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import Config from '../../config'

class LearningRoute extends Component {

  state = {
    word: '',
    nextWord: '', 
    totalScore: null,
    correctCount: null,
    incorrectCount: null,
    answer: null,
    isCorrect: null,
    guess:''
  }

  componentDidMount() {
    fetch(`${Config.API_ENDPOINT}/language/head`,
      {
        headers: {
          'Authorization': `bearer ${TokenService.getAuthToken()}`
        }
      }
    )
    .then (res => { 
      return (!res.ok) ? res.json().then(e =>Promise.reject(e)) 
      : res.json(); 
    })
    .then(resJson => {
      this.setState({
        word: resJson.nextWord,
        totalScore: resJson.totalScore,
        correctCount: resJson.wordCorrectCount,
        incorrectCount: resJson.wordIncorrectCount
      })
    })
    .catch(err => {
      console.log(err); 
    })
  }

  postGuess = (e) =>{
    e.preventDefault();
    const guess = e.target["learn-guess-input"].value; 
    fetch(`${Config.API_ENDPOINT}/language/guess`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({guess})
    })
    .then(res => {
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()
    })
    .then(resJson =>{
      this.setState({
        nextWord: resJson.nextWord,
        totalScore: resJson.totalScore,
        correctCount: resJson.wordCorrectCount,
        incorrectCount: resJson.wordIncorrectCount,
        answer: resJson.answer,
        isCorrect: resJson.isCorrect,
        guess
      })
    }) 
  }

  nextWord = (e) => {
    e.preventDefault();
    this.setState({
      word: this.state.nextWord,
      nextWord: '', 
      answer: null,
      isCorrect: null,
      guess:''
    });
  }

  render() {
    if (this.state.isCorrect !== null) {
      return(
        <section>
          <div className="DisplayScore">
            <p>Your total score is: {this.state.totalScore}</p>
          </div>
          <h2>{this.state.isCorrect ? "You were correct! :D" : "Good try, but not quite right :("}</h2>
          <div className="DisplayFeedback">
            <p >The correct translation for {this.state.word} was {this.state.answer} and you chose {this.state.guess}!</p>
          </div>
          <button onClick={this.nextWord}>Try another word!</button>
        </section>
      )
    }
    return (
      <section>
        <h2>Translate the word:</h2>
        <span>{this.state.word}</span>
        <p className="DisplayScore">Your total score is: {this.state.totalScore}</p>
        <form onSubmit={this.postGuess}>
          <label htmlFor="learn-guess-input">
            What's the translation for this word?
          </label>
          <input type="text" id="learn-guess-input" autoComplete="off" required/>
          <button type="submit">Submit your answer</button>
        </form>
        <p>You have answered this word correctly {this.state.correctCount} times.</p>
        <p>You have answered this word incorrectly {this.state.incorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute
