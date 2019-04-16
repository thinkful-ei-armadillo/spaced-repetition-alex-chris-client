import React, { Component } from 'react'

const LanguageContext = React.createContext({
  language: '',
  words: [],
  setLanguage: () => {}
})

export default LanguageContext;

export class LanguageProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      language: '',
      words: [],
    }
  }

  setLanguage = (data) =>{
    this.setState({
      language: data.language,
      words: data.words
    })
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      setLanguage: this.setLanguage,
    }
    return(
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}