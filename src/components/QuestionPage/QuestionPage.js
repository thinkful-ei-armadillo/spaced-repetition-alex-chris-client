import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import Config from '../../config';
import QuestionContext from '../../contexts/QuestionContext';
import { Input } from '../Form/Form';
import './QuestionPage.css';

class QuestionPage extends Component {
  static contextType = QuestionContext;

  postGuess = (e) =>{
    e.preventDefault();
    const guess = e.target["learn-guess-input"].value.trim(); 
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
      this.context.setNextWord(
        resJson.nextWord,
        resJson.totalScore,
        resJson.wordCorrectCount,
        resJson.wordIncorrectCount,
        resJson.answer,
        resJson.isCorrect,
        guess
      )
    }) 
  }

  render() {
    return (
      <section className="question-container fade-in">
        <div className="question-form-container">
          <h2 className="question-title">Translate the word:</h2>
          <span aria-live="polite" className="question-word">{this.context.word}</span>
          <form onSubmit={this.postGuess} className="question-form">
            <label htmlFor="learn-guess-input" className="question-form-label">
              What's the translation for this word?
            </label>
            <Input type="text" id="learn-guess-input" autoComplete="off" required className="question-input"/>
            <button type="submit" className="blue-button learning-route-button">Submit your answer</button>
          </form>
        </div>
        <footer className="question-footer">
          <div className="question-footer-subcontainer">
            <p className="question-total-score">Your total score is: {this.context.totalScore}</p>
            <p className="question-score">You have answered this word correctly {this.context.correctCount} times.</p>
            <p className="question-score">You have answered this word incorrectly {this.context.incorrectCount} times.</p>
          </div>
        </footer>
      </section>
    );
  }
}

export default QuestionPage
