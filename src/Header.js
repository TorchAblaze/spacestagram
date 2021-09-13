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
          images: jsonifiedResponse[0]
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
    const { error, isLoaded, images } = this.state;
    if (error) {
      return <>Error: {error.message}</>;
    } else if (!isLoaded) {
      return <>Loading...</>
    } else {
      return (
        <div className="header">
          <img id="header-image" src={`https://epic.gsfc.nasa.gov/archive/natural/${((images.date).slice(0,10)).replaceAll('-','/')}/png/${images.image}.png`} alt={`Earth: ${images.caption}`} />
          <div className="header-text">
            <h1>Spacestagram</h1>
            <p><em>Exploring interest in outter regions</em></p>
          </div>
        </div>
      )
    }
  }
}

export default Header;