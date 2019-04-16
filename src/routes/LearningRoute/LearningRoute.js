import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import Config from '../../config'

class LearningRoute extends Component {

  state = {
    word: '',
    totalScore: null,
    correctCount: null,
    incorrectCount: null 
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

  render() {
    return (
      <section>
        <h2>Translate the word:</h2>
        <span>{this.state.word}</span>
        <p>Your total score is: {this.state.totalScore}</p>
        <form>
          <label htmlFor="learn-guess-input">
            What's the translation for this word?
          </label>
          <input type="text" id="learn-guess-input" required/>
          <button type="submit">Submit your answer</button>
        </form>
        <p>You have answered this word correctly {this.state.correctCount} times.</p>
        <p>You have answered this word incorrectly {this.state.incorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute
