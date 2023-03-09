import React from 'react';
import './App.css'; 

class Movie extends React.Component{
  render() {
    console.log(this.props.movieData)

    return (
      <p>the movie page is linked</p>
    )
  }


}

export default Movie