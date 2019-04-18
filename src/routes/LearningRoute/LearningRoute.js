import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import Config from '../../config'
import QuestionContext from '../../contexts/QuestionContext';
import QuestionPage from '../../components/QuestionPage/QuestionPage';
import AnswerPage from '../../components/AnswerPage/AnswerPage';
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = QuestionContext;

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
      this.context.setCurrentWord(
        resJson.nextWord,
        resJson.totalScore,
        resJson.wordCorrectCount,
        resJson.wordIncorrectCount
      );
    })
    .catch(err => {
      console.log(err); 
    })
  }

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
    if (this.context.loading) {
      return <section></section>; //replace with loading screen
    }
    if (this.context.isCorrect !== null) {
      return(
        <AnswerPage/>
      )
    }
    return (
      <QuestionPage/>
    );
  }
}

export default LearningRoute
