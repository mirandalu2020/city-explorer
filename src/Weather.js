import React from 'react';
import './App.css'; 
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component{

  render() {
    let listItems = []
    if (this.props.weatherData) {
          // console.log(this.props.weatherData.data[0].date)
    // console.log(this.props.weatherData.data[0].description)
     for (let i of this.props.weatherData) {
       listItems.push(
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{i.date}</Card.Title>
          <Card.Text>
          {i.description}
          </Card.Text>
        </Card.Body>
      </Card>
    )}
  }
    else{
      listItems.push(<Alert key='danger' variant='danger'>The city you are looking for is unavailable</Alert>)
      // console.log(listItems)
    }

    return (
      <>
      <h3>Forecast</h3>
      {listItems}
      </>
    )
  }


};

export default Weather;
