import React, { Component } from 'react';
import LanguageContext from '../../contexts/LanguageContext';

class WordsList extends Component {
  static contextType = LanguageContext; 

  renderWords = () => {
    const words = this.context.words;
    return words.map((word, i) => {
      return(
        <li key={i} className={"dashboard-wordslist-word" + ((word.correct_count > 0) ? " word-completed" : "")}> 
          <h4>{word.original}</h4>
          <span>correct answer count: {word.correct_count}</span>
          <span>incorrect answer count: {word.incorrect_count}</span>
        </li>
      )
    })
  }

  render() {
    return (
      <div className="dashboard-wordslist-container">
        <h3 className="dashboard-wordslist-title">Words to practice</h3>
        <ul className="dashboard-wordslist">
          {this.renderWords()}
        </ul>
      </div>
    );
  }
}

export default WordsList;
