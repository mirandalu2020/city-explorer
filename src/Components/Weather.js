import React from 'react';
import '../App.css'; 
import WeatherDay from './WeatherDay';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component{

  render() {
    let listItems = []
    try{
    if (this.props.weatherData) {
      console.log(this.props.weatherData)
    // console.log(this.props.weatherData.data[0].description)
    listItems = this.props.weatherData.map((weather) => {
      return (
        <WeatherDay 
          date={weather.date}
          description={weather.description}
        />
      )
    }
    
    )
    //  for (let i of this.props.weatherData) {
    //    listItems.push(
    //     <Card style={{ width: '18rem' }}>
    //     <Card.Body>
    //       <Card.Title>{i.date}</Card.Title>
    //       <Card.Text>
    //       {i.description}
    //       </Card.Text>
    //     </Card.Body>
    //   </Card>
    // )}
  }
  
    else{
      listItems.push(
      <Alert key='danger' variant='danger'>The city you are looking for is unavailable</Alert>
      )

    }
  }   catch(error) {
    
  }

    return (
      <>
      <h3>Forecast</h3>
      {/* <WeatherDay
              cityName={this.props.cityData.display_name}
              weatherData={this.props.weatherData}
              error={this.props.error}
              errorMessage={this.props.errorMessage} /> */}
      </>
    )
  }


};

export default Weather;
