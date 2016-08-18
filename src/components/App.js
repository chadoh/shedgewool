import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Container from './Container';
import '../styles/App.css';
import logo from '../images/sheep.svg';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet title="Shedgewool"/>
        <div className="App-header">
          <Container>
            <h1 className="App-title">Shedgewool</h1>
            <img className="App-logo" src={logo} alt="" />
          </Container>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
