// import userEvent from '@testing-library/user-event';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      imageDog: '',
      lastImageDog: '',
      loading: true,
      raca: '',
    }

    this.fetchDog = this.fetchDog.bind(this);
    this.extraiRaca = this.extraiRaca.bind(this);
    // this.loadedDog = this.loadedDog.bind(this);
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
          const racaAtual = this.extraiRaca(data.message)
          if (data.message.includes('terrier') === false) {
            this.setState(({imageDog}) => ({
              lastImageDog: imageDog,
              imageDog: data.message,
              loading: false,
              raca: racaAtual,
            }))
          } 
        } )
      },
    )
  }

  extraiRaca(value) {
    const splitUrl = value.split('/');
    const raca = splitUrl[4];
    return raca;
  }

  render() {
    const { imageDog, loading } = this.state;
    const loadingMessage = <span>Loading...</span>
    return (
      <div className="App">
        <h1>Doguinhos</h1>
        <div className="image-dog">
          { loading ? loadingMessage : <img src={imageDog} alt='dog' widt="200px" />}
        </div>
        <div className="button">
          <button type="button" onClick={() => { this.fetchDog() }}>Novo doguinho</button>
        </div>
      </div>
    );
  }
}

export default App;
