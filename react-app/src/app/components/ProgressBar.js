/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {
  return (
    <div className="progress">
      <div 
        className="progressBarInside"
        style={{width: (props.answeredQuestions*100)/props.questionsCount + "%"}}>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  questionsCount: PropTypes.number.isRequired,
  answeredQuestions: PropTypes.number.isRequired,
};

export default ProgressBar;