import React from 'react';
import './App.css'; 
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component{
  render() {
    let listItems = [];
    try{
      if (this.props.movieData) {
        console.log(this.props.movieData)
      // console.log(this.props.weatherData.data[0].description)
      
       for (let i of this.props.movieData) {
        let moviePoster = `https://image.tmdb.org/t/p/original${i.image_url}`
         listItems.push(
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={moviePoster} />
          <Card.Body>
            <Card.Title>{i.date}</Card.Title>
            <Card.Text>{i.released_on}</Card.Text>
            <Card.Text>{i.overview}</Card.Text>
            <Card.Text>This movie has a popularity index of {i.popularity}, according to a total of {i.total_votes} votes, with an average votes of {i.average_votes}</Card.Text>
          </Card.Body>
        </Card>
      )}
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

export default Movie