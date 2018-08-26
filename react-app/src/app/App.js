/* global fetch*/
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "(?:React|Container)" }] */

import React, { Component } from 'react';
import '../css/App.css';
import WelcomeContainer from './containers/WelcomeContainer';
import QuestionContainer from './containers/QuestionContainer';
import ResultContainer from './containers/ResultContainer';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'activeContainer': 'Welcome',
      'testNames': [],
      'name': '',
      'selectedTest': '',
      'questions': [],
      'answeredQuestions': 0,
      'correctAnswers': 0,
      'overlayDisplayStyle': 'block'
    };
    
    this.chooseTest = this.chooseTest.bind(this);
    this.updateAnswersStatus = this.updateAnswersStatus.bind(this);
    this.returnToStart = this.returnToStart.bind(this);
    this.changeOverlayDisplayStyle = this.changeOverlayDisplayStyle.bind(this);
  }
  
  componentWillMount() {
    fetch(window.location.protocol + '//' + window.location.hostname + '/php/request.php')
      .then((response)=>response.json())
      .then((responseJson)=>
      {
        this.setState({ testNames: responseJson, overlayDisplayStyle: 'none' });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  
  chooseTest(name, selectedTest) {
    this.changeOverlayDisplayStyle('block');
    let formData = new FormData();
    formData.append('getTest', selectedTest);
    fetch(window.location.protocol + '//' + window.location.hostname + '/php/request.php', {
        method: 'POST',
        body: formData
      })
      .then((response)=>response.json())
      .then((responseJson)=>
      {
        const { questions } = responseJson;
        this.setState({ 
          name, 
          selectedTest,
          questions,
          activeContainer: 'Question',
          overlayDisplayStyle: 'none'
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  updateAnswersStatus(answerCorrect, lastQuestion) {
    const activeContainer = lastQuestion ? 'Result' : 'Question';
    const answeredQuestions = this.state.answeredQuestions + 1;
    const correctAnswers = answerCorrect ? this.state.correctAnswers + 1 : this.state.correctAnswers;
    
    this.setState({
      activeContainer,
      answeredQuestions,
      correctAnswers,
      overlayDisplayStyle: 'none'
    });
  }
  
  returnToStart() {
    this.setState({
      activeContainer: 'Welcome',
      questions: [],
      answeredQuestions: 0,
      correctAnswers: 0
    });
  }
  
  changeOverlayDisplayStyle(overlayDisplayStyle) {
    this.setState({ overlayDisplayStyle });
  }
  
  
  render() {
    let container;
    switch(this.state.activeContainer) {
      case 'Question':
        container = <QuestionContainer 
                      questions={this.state.questions} 
                      test={this.state.selectedTest} 
                      updateAnswersStatus={this.updateAnswersStatus}
                      answeredQuestions={this.state.answeredQuestions}
                      changeOverlayDisplayStyle={this.changeOverlayDisplayStyle}
                    />;
        break;
      case 'Result':
        container = <ResultContainer 
                      name={this.state.name}
                      test={this.state.selectedTest}
                      questionsCount={this.state.questions.length}
                      correctCount={this.state.correctAnswers}
                      returnToStart={this.returnToStart}
                    />;
        break;
      default:
        container = <WelcomeContainer
                      testNames={this.state.testNames}
                      name={this.state.name}
                      selectedTest={this.state.selectedTest}
                      chooseTest={this.chooseTest}
                    />;
    }
    
    return (
      <div className="App">
        <div className="overlay" style={{ display: this.state.overlayDisplayStyle }}></div>
        { container }
      </div>
    );
  }
}

export default App;