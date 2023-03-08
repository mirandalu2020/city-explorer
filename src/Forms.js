import React from 'react';
import './App.css'; 
import {Form, Button} from 'react-bootstrap';


class Forms extends React.Component{



  render() {

    return(
      <>      
        <Form className="city-form" onSubmit={this.props.getDataOnSubmit}>
        <Form.Group  controlId="cityInput">
          <Form.Label>What city interests you?</Form.Label>
          <Form.Control type="text" placeholder="e.g. Seattle" onChange={this.props.handleCityInput}/>
        </Form.Group>
        <Button type="submit">Explore!</Button>
        </Form>
      </>

    )
}
}

export default Forms;