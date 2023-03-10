import React from 'react';
import '../App.css'; 
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';


class GeoInfo extends React.Component{

  render() {

    return(
      <>
      <ListGroup className="geo-info">
        <ListGroup.Item>{this.props.cityData.display_name}</ListGroup.Item>
        <ListGroup.Item>{this.props.cityData.lat}</ListGroup.Item>
        <ListGroup.Item>{this.props.cityData.lon}</ListGroup.Item>
      </ListGroup>
      <Figure>
          <Figure.Image
            alt={this.props.cityData.display_name}
            src={this.props.mapURL} />
          <Figure.Caption>
            Map of {this.props.cityData.display_name}
          </Figure.Caption>
        </Figure>
        </>
    )
  }

}

export default GeoInfo;

