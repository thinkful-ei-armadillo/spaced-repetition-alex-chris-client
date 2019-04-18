import React, { Component } from 'react'
import QuestionContext from '../../contexts/QuestionContext';

class AnswerPage extends Component {
  static contextType = QuestionContext;

  nextWord = (e) => {
    e.preventDefault();
    this.context.goToNextWord(
      this.context.nextWord, //word
      '', //nextWord
      null, //answer
      null, //isCorrect
      '' //guess
    );
  }

  render() {
    return(
      <section className="answer-container container">
        <div className="DisplayScore">
          <p>Your total score is: {this.context.totalScore}</p>
        </div>
        <h2>{this.context.isCorrect ? "You were correct! :D" : "Good try, but not quite right :("}</h2>
        <div className="DisplayFeedback">
          <p >The correct translation for {this.context.word} was {this.context.answer} and you chose {this.context.guess}!</p>
        </div>
        <button onClick={this.nextWord}>Try another word!</button>
      </section>
    );
  }
}

export default AnswerPage