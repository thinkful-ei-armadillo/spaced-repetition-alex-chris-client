import React, { Component } from 'react';
import './LoadingPage.css';

let _timeoutId;


class LoadingPage extends Component {
  state = {
    timein: null,
  }

  componentDidMount() {
    _timeoutId = setTimeout(() => this.setState({ timein: true }), 1000);
  }

  componentWillUnmount() {
    clearTimeout(_timeoutId);
  }

  render() {
    if (this.state.timein) {
      return (
        <div className="loading-page">
          <div className="loading-animated-dark"/>
          <div className="loading-animated-light"/>
        </div>
      )
    }
    return null;
  }
}

export default LoadingPage
