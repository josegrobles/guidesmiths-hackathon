import React, { Component } from 'react';

class LogInLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    this.props.userLogin(name);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Login
        <input value={this.state.name} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LogInLayout;
