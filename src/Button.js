import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  isLiked = () => {
    this.setState({
      liked: !this.state.liked
    })
  }

  render() {
    const { liked } = this.state;
    let buttonText = "🤍 Like"
    let buttonClass = "unliked"
    
    if (liked) {
      buttonText = "💜 Liked"
      buttonClass = "liked"
    }

    return (
      <button onClick={this.isLiked} class={buttonClass}>{buttonText}</button>
    )
  }
}

export default Button;