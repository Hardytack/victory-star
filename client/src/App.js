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
          {this.state.name}
        </header>
      </div>
    );
  }
}

export default App;
