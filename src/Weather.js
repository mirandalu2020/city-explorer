import React from 'react';
import './App.css'; 

class Weather extends React.Component{



  render() {
    let listItems = []
    try {
    // console.log(this.props.weatherData.data[0].date)
    // console.log(this.props.weatherData.data[0].description)
  let idx = 0;
     for (let i of this.props.weatherData.data) {
       listItems.push(
       <ul>
       <li key={idx.toString()+'date'}>{i.date}</li>
       <li key={idx.toString()+'description'}>{i.description}</li>
       </ul>)
       idx +=1;
     }

  //   const listItems = this.props.weatherData.data.map((item,idx) =>
  //   <>
  //   <li key={idx}>{item.date}</li>
  //   <li key={idx}>{item.description}</li>
  //   </>
  // );
  // console.log('listItems: '+ listItems)

    } catch (error) {
      listItems.push(<p>The city you are looking for is unavailable</p>)
      // console.log(listItems)
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
