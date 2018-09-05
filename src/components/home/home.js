import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plate: ''
    };
  }

  render() {
    return (
      <div className="Home">
        <a href="/create">Create Ticket</a>
        <br />
        <a href="/scan">Scan Ticket</a>
      </div>
    );
  }
}

export default Home;
