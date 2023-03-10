import React from 'react';
import './App.css'; 
import Forms from './Forms'
import Weather from './Components/Weather'
import Movies from './Components/Movies'
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
      isWeatherLoaded:false,
      isMovieLoaded:false,
      weatherData:{},
      movieData:{},
      error:false,
      errorMessage:'',
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
      isWeatherLoaded: true,
    })
  }

  getCityMovieURL = async () => {
    let cityMovieData = await axios.get(`${process.env.REACT_APP_SERVER}/movie?city=${this.state.cityName}`)
    console.log(cityMovieData.data)
    this.setState({
      movieData:cityMovieData.data,
      isMovieLoaded:true,
    })
    console.log(this.state.movieData)
  }
 

  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1),
    });
  };

  render() {
    const isWeatherLoaded = this.state.isWeatherLoaded;
    console.log(isWeatherLoaded)
    return (
      <>
        <Forms
          getDataOnSubmit={this.getDataOnSubmit}
          handleCityInput={this.handleCityInput}
          cityData={this.state.cityData}
          mapURL={this.state.mapURL} />

        {isWeatherLoaded &&
          <>
            <Weather
              cityName={this.state.cityData.display_name}
              weatherData={this.state.weatherData}
              error={this.state.error}
              errorMessage={this.state.errorMessage} />
              
              </>}
              
              <ul className="geo-info">
              <li>{this.state.cityData.display_name}</li>
              <li>{this.state.cityData.lat}</li>
              <li>{this.state.cityData.lon}</li>
            </ul>
            <img className="city-map" src={this.state.mapURL} alt={this.state.cityData.display_name} />

          
          
          
          <Movies
          movieData={this.state.movieData}
          error={this.state.error}
          errorMessage={this.state.errorMessage} />
          </>
  )}
        }


export default App;
