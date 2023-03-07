import React from 'react';
import './App.css'; 
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

class Forms extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      cityName: '',
      cityLat: '',
      cityLong:'',
      map:'',
      error:false,
      errorMessage:'',
    }
  }

  getDataOnSubmit = async (e) =>{
    e.preventDefault();
    try{
      let token = process.env.REACT_APP_LOCATIONIQ_API_KEY[0]==='='?process.env.REACT_APP_LOCATIONIQ_API_KEY.slice(1,):process.env.REACT_APP_LOCATIONIQ_API_KEY;
      console.log(token)
    let data = await axios.get(`https://us1.locationiq.com/v1/search?key=${token}&q=${this.state.cityName}&format=json`);

    // console.log(data.data[0])
    console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY)
    
    this.setState({
      cityData: data.data[0],
      cityName: data.data[0].display_name,
      cityLat: data.data[0].lat,
      cityLong: data.data[0].lon,
      //map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${data.data[0].lat},${data.data[0].lon}&zoom=12`
    },
    this.renderMap
    )

    } catch(error) {
      console.log(`Error: ${error} Error Message: ${error.response.status}`);
    }
  }
  
  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1),
    });
  }

  handleSubmitButton = (event) => {
    event.preventDefault();
  }

  renderMap = () => {
    if (this.state.cityData.length !==0) {
      let token = process.env.REACT_APP_LOCATIONIQ_API_KEY[0]==='='?process.env.REACT_APP_LOCATIONIQ_API_KEY.slice(1,):process.env.REACT_APP_LOCATIONIQ_API_KEY;
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${token}&center=${this.state.cityLat},${this.state.cityLong}&zoom=12`
    this.setState({
      map:mapURL
    })
    };
  

  }

  render() {
    //  if (this.state.cityData.length !== 0) {
    //   console.log(this.state)
    //  }
    
    return(
      <>      
        <Form className="city-form" onSubmit={this.getDataOnSubmit}>
        <Form.Group  controlId="cityInput">
          <Form.Label>What city interests you?</Form.Label>
          <Form.Control type="text" placeholder="e.g. Seattle" onChange={this.handleCityInput}/>
        </Form.Group>
        <Button type="submit">Explore!</Button>
        </Form>
      <ul className="geo-info">
        <li>{this.state.cityData.display_name}</li>
        <li>{this.state.cityLat}</li>
        <li>{this.state.cityLong}</li>
      </ul>
      <img className="city-map" src={this.state.map} alt={this.state.cityData.display_name}/>     
      </>

    )
}
}

export default Forms;