import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      image: []
    }
  }

  makeApiCall = () => {
    fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          isLoaded: true,
          headerImage: jsonifiedResponse[0]
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        })
      })
  }

  componentDidMount() {
    this.makeApiCall()
  }

  render() {
    const { error, isLoaded, headerImage } = this.state;

    if (error) {
      return <>Error: {error.message}</>;
    } else if (!isLoaded) {
      return <>Spacestagram: </>
    } else {
      return (
        <header>
          <img id="header-image" src={`https://epic.gsfc.nasa.gov/archive/natural/${((headerImage.date).slice(0,10)).replaceAll('-','/')}/png/${headerImage.image}.png`} alt={`Earth: ${headerImage.caption}`} />
          <div className="header-text">
            <h1>Spacestagram</h1>
            <p><em>Exploring interest in outer regions</em></p>
          </div>
        </header>
      )
    }
  }
}

export default Header;