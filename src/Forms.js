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
    }
  }


  getDataOnSubmit = async (e) =>{
    e.preventDefault();
    let data = await axios.get(`https://us1.locationiq.com/v1/search?key=pk.3d735c058e233b640e3fdfab002a20b9&q=${this.state.cityName}&format=json`);
    console.log(data.data[0])
    
    this.setState({
      cityData: data.data[0],
      cityName: data.data[0].display_name,
      cityLat: data.data[0].lat,
      cityLong: data.data[0].lon,
    })
    }

  
  
  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value
    });
  }
  handleSubmitButton = (event) => {
    event.preventDefault();
  }
  render() {
    if (this.state.cityData.length !== 0) {
      console.log(this.state);
    }
    return(
      <>      
      <Form  onSubmit={this.getDataOnSubmit} >
        <label>Choose a city
        <input type="text" onChange={this.handleCityInput} placeholder="e.g. Seattle"/></label>
        <Button type="submit">Explore!</Button>
        </Form>
      <ul>
        <li>{this.state.cityName}</li>
        <li>{this.state.cityLat}</li>
        <li>{this.state.cityLong}</li>
      </ul>        
      </>

    )
}
}

export default Forms;