import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils/index';

const defaultState = { 
  name: '', 
  breed: '', 
  age: '', 
  location: '', 
  details: '', 
  error: null, 
};

export default class DogForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: check here if not working
    this.state = props.dog ? props.dog : defaultState;
    autoBind.call(this, DogForm);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.dog !== this.props.dog) {
      this.setState(this.props.dog);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);
    if (result instanceof Promise) {
      result
        .then(() => {
          this.setState(defaultState);
        })
        .catch((error) => {
          console.error('DOG FORM ERROR: ', error);
          this.setState({ error });
        });
    }
  }

  handleChange(event) {
    // event.preventDefault();
    // this.setState({ 
    //   name: event.target.value,
    // });
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form 
        onSubmit={this.handleSubmit}
        className="dog-form"
      >
        <input 
          name="DogName"
          type="text"
          placeholder="Dogs Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input 
          name="Breed"
          type="text"
          placeholder="Breed"
          value={this.state.breed}
          onChange={this.handleChange}
        />
        <input 
          name="Age"
          type="text"
          placeholder="Age"
          value={this.state.age}
          onChange={this.handleChange}
        />
        <input 
          name="Location"
          type="text"
          placeholder="Location"
          value={this.state.location}
          onChange={this.handleChange}
        />
        <input 
          name="Details"
          type="text"
          placeholder="Details"
          value={this.state.details}
          onChange={this.handleChange}
        />
        <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
}

DogForm.propTypes = {
  onComplete: PropTypes.func,
  dog: PropTypes.object,
  buttonText: PropTypes.string,
};
