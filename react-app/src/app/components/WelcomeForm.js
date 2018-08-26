/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WelcomeForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'name': '',
      'selectedTest': '',
      'submitButtonDisabled': 'disabled',
      'defaultValue': 'default'
    };
    
    this.nameInputChange = this.nameInputChange.bind(this);
    this.selectTestChange = this.selectTestChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  
  componentWillMount() {
    if (this.props.name && this.props.selectedTest) {
      const { name, selectedTest } = this.props;
      this.setState({ 
        name,
        selectedTest,
        defaultValue: selectedTest,
        submitButtonDisabled: false
      });
    }
  }
  
  componentDidUpdate() {
    const {
      name,
      selectedTest,
      submitButtonDisabled
    } = this.state;
    
    if (name && selectedTest && submitButtonDisabled) {
      this.setState({ 'submitButtonDisabled': false });
    } else if ((!name || !selectedTest) && !submitButtonDisabled) {
      this.setState({ 'submitButtonDisabled': 'disabled' });
    }
  }
  
  nameInputChange(event) {
    this.setState({ name: event.target.value });
  }
  
  selectTestChange(event) {
    this.setState({ selectedTest: event.target.value });
  }
  
  submitForm(e) {
    e.preventDefault();
    
    const {
      name,
      selectedTest
    } = this.state;
    
    this.props.chooseTest(name, selectedTest);
  }
  
  render() {
    let counter = 0;
    const options = this.props.testNames.map(function(test) {
      counter += 1;
      return <option key={'test' + counter} value={test}>{test}</option>;
    });
    
    return (
      <form onSubmit={this.submitForm}>
        <p>Ievadi vārdu:</p>
        <input 
          type="text" 
          name="name" 
          value={this.state.name} 
          placeholder="Vārds" 
          className="textInput" 
          onChange={this.nameInputChange} 
        /><br />
        <p>Izvēlies testu:</p>
        <select name="test" defaultValue={this.state.defaultValue} onChange={this.selectTestChange} >
          <option value="default" disabled hidden>Spied un izvēlies ...</option>
          {options}
        </select><br />
        <input 
          type="submit"
          disabled={this.state.submitButtonDisabled}
          value="Sākt Testu"
          className="submitInput"
        />
      </form>
    );
  }
}

WelcomeForm.propTypes = {
  testNames: PropTypes.array.isRequired,
  chooseTest: PropTypes.func.isRequired,
  name: PropTypes.string,
  selectedTest: PropTypes.string
};

WelcomeForm.defaultProps = {
  name: '',
  selectedTest: ''
};

export default WelcomeForm;