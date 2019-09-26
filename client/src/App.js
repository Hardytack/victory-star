import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hello: 'Hello',
      img: '',
      name: 'hardy',
      img2: 'uploads/spearow.png'
    }
  }

  componentWillMount() {
    fetch('/cards/ufi124')
    .then((res) => res.json())
    .then((data) => {
        this.setState({
            img: data.imagePath,
            name: data.name,
        })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.img} className="App-logo" alt="logo" />
          <img src={this.state.img2} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload this page.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn {this.state.name}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
