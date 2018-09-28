import React, { Component } from 'react';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleChange.bind(this);
    this.onEnterPressed.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    const { user } = this.state;
    event.preventDefault();
    this.props.userLogin({ user });
  }

  render() {
    return (
      <div>
        Login
        <input type={text} value={name} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </div>
    );
  }
}

export default LogIn;
