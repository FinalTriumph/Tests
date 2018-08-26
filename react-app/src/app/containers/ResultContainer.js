/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Result.css';

const ResultContainer = (props) => {
  return (
    <div className="container">
      <h2><strong>{props.name}</strong> aizpildīja testu <strong>{props.test}</strong></h2>
      <h3>Pareizi atbildēti <strong>{props.correctCount}</strong> no <strong>{props.questionsCount}</strong> jautājumiem</h3>
      <hr className="resultSep"/>
      <button className="toStart" onClick={props.returnToStart}>Uz sākumu</button>
    </div>
  );
};

ResultContainer.propTypes = {
  name: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
  questionsCount: PropTypes.number.isRequired,
  correctCount: PropTypes.number.isRequired,
  returnToStart: PropTypes.func.isRequired
};

export default ResultContainer;