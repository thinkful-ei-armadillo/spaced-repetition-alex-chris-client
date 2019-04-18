import React, { Component } from 'react';
import Config from '../../config'; 
import TokenService from '../../services/token-service'
import LanguageContext from '../../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import WordsList from '../../components/WordsList/WordsList';
import './DashboardRoute.css';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

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
      this.context.setLanguage(resJson); 
      this.setState({
        loading: null
      })
    })
    .catch(err => { 
      if (err.error && err.error === 'Unauthorized request'){
        this.props.logOut(); 
      }
      else{
        this.setState({
          error: err.error
        })
      }
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorPage error={this.state.error}/>
    }
    if (this.state.loading){
      return(
        <LoadingPage/>
      )
    }
    /* once other languages are added add the url to the DB and load from there */
    const total_score = this.context.language.total_score;

    return (
      <section className="dashboard-container container fade-in">
        <header className="dashboard-header">
          <img className="dashboard-flag" src="https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg" alt=""/>
          <h2 className="dashboard-language-title">{this.context.language.name}</h2>
        </header>
        <div className="dashboard-flex">
          <div className="dashboard-stats">
            <p>Total correct answers: <span>{total_score ? total_score.toLocaleString() : 0}</span></p>
            <Link to='/learn' className="blue-button dashboard-practice-button">
              Start practicing
            </Link>
          </div>
          <WordsList/>
        </div>
      </section>
    );
  }
}

export default DashboardRoute
