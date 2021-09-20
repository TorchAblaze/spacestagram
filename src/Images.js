import React from 'react';
import Button from './Button';

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      keywords: "",
      images: [],
    }
  }

  makeApiCall = () => {
    fetch(`https://images-api.nasa.gov/search?q=apollo&media_type=image`)
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          isLoaded: true,
          images: [...jsonifiedResponse.collection.items]
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

  handleInputChange = (e) => {
    this.setState({
      keywords: e.target.value
    })
  }

  handleSearchQuery = (e) => {
    e.preventDefault();
    fetch(`https://images-api.nasa.gov/search?q=${this.state.keywords}&media_type=image&page=1`)
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          isLoaded: true,
          images: [...jsonifiedResponse.collection.items],
          keywords: ""
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        })
      })
  }

  render() {
    const { error, isLoaded, images, keywords } = this.state;
    
    if(error) {
      return <>Error: {error.message}</>
    } else if (!isLoaded) {
      return <>Loading...</>
    } else {
      return (
        <>
        <form onSubmit={this.handleSearchQuery} className="container">
          <label htmlFor="imageSearch">Enter a keyword(s) to search NASA's photo library</label>
          <input type="text" id="imageSearch" name="imageSearch" value={keywords} onChange={this.handleInputChange} placeholder="Ex. Apollo 11, Mars, Astronaut" />
          <button id="submit">Search</button>
        </form>
          {images.map((image, index) => {
            const { title, date_created, description } = image.data[0]
            const { href } = image.links[0]

            let imageDescription;
            let imageTitle;
            let imageDate;
            if (description) {
              imageDescription = <figcaption><strong>Description:</strong> {description}</figcaption>
            }

            if (title) {
              imageTitle = <p><strong>Title:</strong> {title}</p>
            }

            if (date_created) {
              imageDate = <p><strong>Date:</strong> {date_created.slice(0,10)}</p>
            }

            return (
              <figure className="images container" key={`${index}: ${title}`}>
                <img src={href} alt={title} title={title}/>
                <Button/>
                {imageDate}
                {imageTitle}
                {imageDescription}
              </figure>
            )}
          )}
        </>
      )
    }
  }

}

export default Images;