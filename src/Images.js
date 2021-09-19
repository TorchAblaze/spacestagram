import React from 'react';
import Button from './Button';

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: [],
    }
  }

  makeApiCall = () => {
    fetch(`https://images-api.nasa.gov/search?q=planets%20exploration&media_type=image&year_start=2000`)
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          isLoaded: true,
          images: [...jsonifiedResponse.collection.items.slice(0,9), ...jsonifiedResponse.collection.items.slice(43, 53)]
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
    
    if(error) {
      return <>Error: {error.message}</>
    } else if (!isLoaded) {
      return <>Loading...</>
    } else {
      return (
        <>
          {images.map((image, index) =>
            <figure className="images container">
              <img src={image.links[0].href} alt={image.data[0].title} key={index} title={image.data[0].title}/>
              <Button/>
              <p><strong>Date:</strong> {image.data[0].date_created.slice(0,10)}</p>
              <p><strong>Title:</strong> {image.data[0].title}</p>
              <figcaption><strong>Description:</strong> {image.data[0].description}</figcaption>
            </figure>
          )}
        </>
      )
    }
  }

}

export default Images;