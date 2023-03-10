import React from 'react';
import '../App.css'; 
import WeatherDay from './WeatherDay';
import Alert from 'react-bootstrap/Alert';

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
      {listItems}
      </>
    )
  }


};

export default Weather;