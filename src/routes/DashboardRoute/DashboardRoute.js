import React, { Component } from 'react';
import Config from '../../config'; 
import TokenService from '../../services/token-service'
import LanguageContext from '../../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import IdleService from '../../services/idle-service'

class DashboardRoute extends Component {

  static contextType = LanguageContext; 

  state = {
    error: null,
    loading: true
  }

  componentDidMount(){
    fetch(`${Config.API_ENDPOINT}/language`,
      {
        headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        }
      }
    )
    .then (res => {
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json();  
    })
    .then(resJson => {
      console.log(resJson); 
      this.context.setLanguage(resJson); 
      this.setState({
        loading: null
      })
    })
    .catch(err => { 
      if (err.error && err.error === 'Unauthorized request'){
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        //Avoids conflicts with clearing user context; 
        window.location.replace('/login'); 
      }
      else{
        this.setState({
          error: err.error
        })
      }
    });
  }

  renderWords = () => {
    const words = this.context.words;
    return words.map(word => {
      return(
        <li> 
          <h4>{word.original}</h4>
          <span>correct answer count: {word.correct_count}</span>
          <span>incorrect answer count: {word.incorrect_count}</span>
        </li>
      )
    })
  }

  render() {
    if (this.state.loading){
      return(
        <p>Loading...</p>
      )
    }
    return (
      <section>
        <h2>{this.context.language.name}</h2>
        <p>Total correct answers: {this.context.language.total_score}</p>
        <Link to='/learn'>
          Start practicing
        </Link>
        <h3>Words to practice</h3>
        <ul>
          {this.renderWords()}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute
