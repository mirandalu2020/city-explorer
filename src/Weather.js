import React from 'react';
import './App.css'; 

class Weather extends React.Component{



  render() {
    let listItems
    try {
    console.log(this.props.weatherData.data[0].date)
    console.log(this.props.weatherData.data[0].description)
    listItems = this.props.weatherData.data.forEach(element => 
       <><li>element.date</li><li>element.description</li></>
     )
      console.log(listItems)
    } catch (error) {
      listItems = undefined;
      console.log(listItems)
    }


    

    return (
      <ul>{listItems}</ul>
    )
  }


};

export default Weather;
