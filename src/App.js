import React from 'react';
import './App.css'; 
import Forms from './Forms'
import Weather from './Components/Weather'
import Movies from './Components/Movies'
import GeoInfo  from './Components/GeoInfo';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      cityName: '',
      cityLat: '',
      cityLong:'',
      mapURL:'',
      isGeoLoaded:false,
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
      isGeoLoaded:true,
      mapURL: `https://maps.locationiq.com/v3/staticmap?key=${token}&center=${data.data[0].lat},${data.data[0].lon}&zoom=12`,
      error:false,
      }, this.getAllData
    )}
    catch(error) {
      this.setState({
        error:true,
        errorMessage: `${error.response.status}`
      })
      console.log(`Error: ${error} Error Message: ${error.response.status}`);
    }
  }

  getAllData = () => {
    this.getCityMovieData();
    this.getCityWeatherData();
  }

  getCityWeatherData = async ()=> {
    let cityWeatherData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${this.state.cityLat}&lon=${this.state.cityLong}`)
    console.log(cityWeatherData.data)
    this.setState({
      weatherData: cityWeatherData.data,
      isWeatherLoaded: true,
    })
  }

  getCityMovieData = async () => {
    let cityMovieData = await axios.get(`${process.env.REACT_APP_SERVER}/movie?city=${this.state.cityName}`)
    console.log(cityMovieData.data)
    this.setState({
      movieData:cityMovieData.data,
      isMovieLoaded:true,
    })
    //console.log(this.state.movieData)
  }
 
  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1),
    });
  };

  render() {
    // const isWeatherLoaded = this.state.isWeatherLoaded;
    console.log(this.state.isWeatherLoaded)
    
    return (
      <>
        <Forms
          getDataOnSubmit={this.getDataOnSubmit}
          handleCityInput={this.handleCityInput}
          cityData={this.state.cityData}
          mapURL={this.state.mapURL} />

      {this.state.error === true &&
          <>
          <Alert key='danger' variant='danger'>
            {`${this.state.errorMessage} - your city isn't explorable`}
          </Alert>
          <img class="error" src={`https://http.cat/${this.state.errorMessage}`} alt={`Error with status code ${this.state.errorMessage}`} />
          </>
        }
          {this.state.isGeoLoaded &&
           <Row className="geo-info-container"> <GeoInfo 
              cityData = {this.state.cityData}
              mapURL = {this.state.mapURL}
            /></Row>}

        {this.state.isWeatherLoaded &&
            <Row><Weather
              cityName={this.state.cityData.display_name}
              weatherData={this.state.weatherData}
              error={this.state.error}
              errorMessage={this.state.errorMessage} /></Row>
              }


          {this.state.isMovieLoaded &&
          <Row>
            <Col xs={12} md={8}></Col>
            <Movies
          movieData={this.state.movieData}
          error={this.state.error}
          errorMessage={this.state.errorMessage} />
          </Row>
          }
          </>
  )}
        }


export default App;
