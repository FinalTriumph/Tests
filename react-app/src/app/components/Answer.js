/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from 'react';
import PropTypes from 'prop-types';

const Answer = (props) => {
  return (
    <button onClick={() => props.chooseAnswer(props.answer)}>
      {props.answer}
    </button>
  );
};

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  chooseAnswer: PropTypes.func.isRequired,
};

export default Answer;