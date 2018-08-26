/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from 'react';
import PropTypes from 'prop-types';
import WelcomeForm from '../components/WelcomeForm';
import '../../css/Welcome.css';

const WelcomeContainer = (props) => {
  return (
    <div className="container">
      <h1>Testa Uzdevums</h1>
      <hr className="welcomeSep"/>
      <WelcomeForm 
        testNames={props.testNames} 
        chooseTest={props.chooseTest}
        name={props.name}
        selectedTest={props.selectedTest}
      />
    </div>
  );
};

WelcomeContainer.propTypes = {
  testNames: PropTypes.array.isRequired,
  chooseTest: PropTypes.func.isRequired,
  name: PropTypes.string,
  selectedTest: PropTypes.string
};

WelcomeContainer.defaultProps = {
  name: '',
  selectedTest: ''
};

export default WelcomeContainer;
