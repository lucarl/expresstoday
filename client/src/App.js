import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor() {
        super()
        this.state = {
            response1: null,
            response2: null
        }
    }

  componentDidMount() {
    this.callApiMeat()
    this.callApiVeg()
  }

  callApiMeat = () => {
    fetch('/getAPIMeat')
      .then(res => res.json())
      .then(meal => this.setState({
        response1: meal
      }))
  };

  callApiVeg = () => {
    fetch('/getAPIVeg')
      .then(res => res.json())
      .then(meal => this.setState({
        response2: meal
      }))
  };


render() {
    if (this.state.response === null) {
      return <div> sausage loading...</div>
    }
    console.log(this.state.response)

    return (

      <div className="App">
          <main className = "main">
                <h1>{this.state.response1}</h1>
                <h1>{this.state.response2}</h1>
          </main>  
      </div>
    );
  }
}

export default App;