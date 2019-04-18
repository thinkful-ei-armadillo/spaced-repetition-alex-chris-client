import React, { Component } from 'react';

const QuestionContext = React.createContext({
  loading: true,
  word: '',
  nextWord: '', 
  totalScore: null,
  correctCount: null,
  incorrectCount: null,
  answer: null,
  isCorrect: null,
  guess:''
})

export default QuestionContext

export class QuestionProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      word: '',
      nextWord: '', 
      totalScore: null,
      correctCount: null,
      incorrectCount: null,
      answer: null,
      isCorrect: null,
      guess:''
    }
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setCurrentWord = (word, totalScore, correctCount, incorrectCount) => {
    this.setState({
      word,
      totalScore,
      correctCount,
      incorrectCount,
      loading: null
    });
  }

  setNextWord = (nextWord, totalScore, correctCount, incorrectCount, answer, isCorrect, guess) => {
    this.setState({
      nextWord,
      totalScore,
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      answer,
      isCorrect,
      guess
    });
  }

  goToNextWord = () => {
    this.setState({
      word: this.state.nextWord,
      nextWord: '', 
      answer: null,
      isCorrect: null,
      guess:''
    });
  }

  render() {
    const value = {
      ...this.state,
      setError: this.setError,
      clearError: this.clearError,
      setCurrentWord: this.setCurrentWord,
      setNextWord: this.setNextWord,
      goToNextWord: this.goToNextWord
    };
    return (
      <QuestionContext.Provider value={value}>
        {this.props.children}
      </QuestionContext.Provider>
    )
  }
}
