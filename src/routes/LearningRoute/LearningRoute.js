import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import Config from '../../config'
import QuestionContext from '../../contexts/QuestionContext';
import QuestionPage from '../../components/QuestionPage/QuestionPage';
import AnswerPage from '../../components/AnswerPage/AnswerPage';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import './LearningRoute.css';

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
      if (err.error && err.error === 'Unauthorized request') {
        this.props.logOut();
        this.props.history.push('/login'); 
      }
      else{
      this.context.setError(err);
      }
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
      return <LoadingPage/>;
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
