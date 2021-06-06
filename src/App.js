// import userEvent from '@testing-library/user-event';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      imageDog: '',
      loading: true,
    }

    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  fetchDog = () => {
    this.setState({ loading: true, },
      () => {
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data =>{
          this.setState({
            imageDog: data.message,
            loading: false,
          })
        } )
      },
      )
    
  }
  render() {
    const { imageDog, loading } = this.state;
    const loadingMessage = <span>Loading...</span>
    return (
      <div className="App">
        <h1>Doguinhos</h1>
        <div className="image-dog">
          { loading ? loadingMessage : <img src={ imageDog } alt="dog" /> }
        </div>
        <div className="button">
          <button type="button" onClick={() => { this.fetchDog() }}>Novo doguinho</button>
        </div>
      </div>
    );
  }
}

export default App;
