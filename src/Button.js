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
      buttonText = "💜 Unlike"
      buttonClass = "liked"
    }

    return (
      <button onClick={this.isLiked} className={buttonClass}>{buttonText}</button>
    )
  }
}

export default Button;