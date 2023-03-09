import React from 'react';
import './App.css'; 
import Forms from './Forms'
import Weather from './Weather'
import Movie from './Movie'
import axios from 'axios';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      cityName: '',
      cityLat: '',
      cityLong:'',
      mapURL:'',
      error:false,
      errorMessage:'',
      weatherData:{},
      movieData:{},
    }
  }

  getDataOnSubmit = async (e) =>{
    e.preventDefault();
    try{
      let token = process.env.REACT_APP_LOCATIONIQ_API_KEY
    let data = await axios.get(`https://us1.locationiq.com/v1/search?key=${token}&q=${this.state.cityName}&format=json`);
    // console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY)
    this.setState({
      cityData: data.data[0],
      cityLat: data.data[0].lat,
      cityLong: data.data[0].lon,
      // searchQuery:`lat=${data.data[0].lat}&lon=${data.data[0].lon}`,
      mapURL: `https://maps.locationiq.com/v3/staticmap?key=${token}&center=${data.data[0].lat},${data.data[0].lon}&zoom=12`,
      error:false,
     }, this.getCityWeatherURL
    )}

    catch(error) {
      this.setState({
        error:true,
        errorMessage: `Error: ${error} Error Message: ${error.response.status}`
      })
      console.log(`Error: ${error} Error Message: ${error.response.status}`);
    }
  }

  getCityWeatherURL = async ()=> {
    this.getCityMovieURL();
    let cityWeatherData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${this.state.cityLat}&lon=${this.state.cityLong}`)
    console.log(cityWeatherData.data)
    this.setState({
      weatherData: cityWeatherData.data,
    })
  }

  getCityMovieURL = async () => {
    let cityMovieData = await axios.get(`${process.env.REACT_APP_SERVER}/movie?city=${this.state.cityName}`)
    console.log(cityMovieData.data)
    this.setState({
      movieData:cityMovieData,
    })
  }
 

  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1),
    });
  };

  render() {
    return (
      <>
      
    <Forms 
    getDataOnSubmit={this.getDataOnSubmit}
    handleCityInput={this.handleCityInput}
    cityData={this.state.cityData}
    mapURL={this.state.mapURL} />

    {this.weatherComponent !=={}
    &&
          <><Weather
            cityName={this.state.cityData.display_name}
            weatherData={this.state.weatherData}
            error={this.state.error}
            errorMessage={this.state.errorMessage} /><ul className="geo-info">
              <li>{this.state.cityData.display_name}</li>
              <li>{this.state.cityData.lat}</li>
              <li>{this.state.cityData.lon}</li>
            </ul><img className="city-map" src={this.state.mapURL} alt={this.state.cityData.display_name} /><Movie
              movieData={this.state.movieData}
              error={this.state.error}
              errorMessage={this.state.errorMessage} /></>

  }

    </>)
  }
  }

export default App;
