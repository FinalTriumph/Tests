/* global fetch*/
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from '../components/Answer';
import ProgressBar from '../components/ProgressBar';
import '../../css/Question.css';

class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'activeQuestionIndex': 0,
    };
    
    this.chooseAnswer = this.chooseAnswer.bind(this);
  }
  
  chooseAnswer(answer) {
    this.props.changeOverlayDisplayStyle('block');
    let formData = new FormData();
    formData.append('checkAnswer', answer);
    formData.append('test', this.props.test);
    formData.append('activeQuestionIndex', this.state.activeQuestionIndex);
    fetch(window.location.protocol + '//' + window.location.hostname + '/php/request.php', {
        method: 'POST',
        body: formData
      })
      .then((response)=>response.json())
      .then((responseJson)=>
      {
        const { answerCorrect } = responseJson;
        let lastQuestion = true;
        const nextIndex = this.state.activeQuestionIndex + 1;
        if (this.props.questions[nextIndex]) {
          lastQuestion = false;
          this.setState({ activeQuestionIndex: nextIndex });
        }
        this.props.updateAnswersStatus(answerCorrect, lastQuestion);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
    let counter = 0;
    const { chooseAnswer } = this;
    const answers = this.props.questions[this.state.activeQuestionIndex].answers.map(function(answer) {
      counter += 1;
      return <Answer key={'answer' + counter} answer={answer} chooseAnswer={chooseAnswer} />;
    });
    
    return (
      <div className="container">
        <h3>{this.props.questions[this.state.activeQuestionIndex].question}</h3>
        <hr className="questionSep"/>
          {answers}
        <ProgressBar 
          questionsCount={this.props.questions.length}
          answeredQuestions={this.props.answeredQuestions}
        />
      </div>
    );
  }
}

QuestionContainer.propTypes = {
  questions: PropTypes.array.isRequired,
  test: PropTypes.string.isRequired,
  updateAnswersStatus: PropTypes.func.isRequired,
  answeredQuestions: PropTypes.number.isRequired,
  changeOverlayDisplayStyle: PropTypes.func.isRequired
};

export default QuestionContainer;