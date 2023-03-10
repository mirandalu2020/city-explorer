import React from 'react';
import '../App.css'; 
import Movie from './Movie';

import Alert from 'react-bootstrap/Alert';

class Movies extends React.Component{
  render() {
    let listItems = [];
    try{
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
      //  for (let i of this.props.movieData) {
      //   let moviePoster = `https://image.tmdb.org/t/p/original${i.image_url}`
      //    listItems.push(
      //     <Card style={{ width: '18rem' }}>
      //       <Card.Img variant="top" src={moviePoster} />
      //     <Card.Body>
      //       <Card.Title>{i.date}</Card.Title>
      //       <Card.Text>{i.released_on}</Card.Text>
      //       <Card.Text>{i.overview}</Card.Text>
      //       <Card.Text>This movie has a popularity index of {i.popularity}, according to a total of {i.total_votes} votes, with an average votes of {i.average_votes}</Card.Text>
      //     </Card.Body>
      //   </Card>
      // )}
    }
      else{
        listItems.push(<Alert key='danger' variant='danger'>The city you are looking for is unavailable</Alert>)
        // console.log(listItems)
      }
    }   catch(error) {
      
    }
    

    return (
      <>
      <p>the movie page is linked</p>
      {listItems}
      </>

    )
  }


}

export default Movies