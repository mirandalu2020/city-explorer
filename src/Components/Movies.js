import React from 'react';
import '../App.css'; 
import Movie from './Movie';

import Alert from 'react-bootstrap/Alert';

class Movies extends React.Component{
  render() {
    let listItems = [];
      if (this.props.movieData) {
        console.log(this.props.movieData)
      // console.log(this.props.weatherData.data[0].description)
      listItems = this.props.movieData.map((movie) => {
        return (
          <Movie
          image_url={movie.image_url}
          title={movie.date}
          overview={movie.overview}
          released_on={movie.released_on}
          popularity={movie.popularity}
          total_votes={movie.total_votes}
          average_votes={movie.average_votes}
          />
        )
      })
    }
      else{
        listItems.push(<Alert key='danger' variant='danger'>The city you are looking for is unavailable</Alert>)
        // console.log(listItems)
      }
    

    return (
      <>
      <h3>Movies About the City</h3>
      {listItems}
      </>

    )
  }


}

export default Movies