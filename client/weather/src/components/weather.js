import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getWeatherQuery } from '../queries/queries'

class Loading extends Component {
   render() {
      return (
         <div>Chargement</div>
      )
   }
}

class Waiting extends Component {
   render() {
      return (
         <p>Entrez le nom d'une ville</p>
      )
   }
}

class Weather extends Component {
   getDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const today = new Date();
      return today.toLocaleDateString("fr-FR", options);
   }

   displayWeather() {
      const data = this.props.data
      if (data.loading) {
         return (<Loading />)
      } else if (data.error) {
         return (<Waiting />)
      } else {
         return (
            <div className="weather-result">
               {console.log(data.city.weather[0].icon)}
               <div className="top">
                  <div className="top-left">
                     <h1>{data.city.name}</h1>
                     <h3>{this.getDate()}</h3>
                     <h3>{data.city.weather[0].description}</h3>
                  </div>
                  <div className="top-right">
                     <p>{`Humidité : ${data.city.main.humidity}%`}</p>
                     <p>{`Pression : ${data.city.main.pressure}`}</p>
                     <p>{`Vent : ${data.city.wind.speed} km/h`}</p>
                  </div>
               </div>
               <div className="content">
                  <div className="left">
                     <p>{`${(data.city.main.temp).toFixed(1)}°C`}</p>
                  </div>
               </div>
               {console.log(data.city)}
            </div>
         )
      }
   }

   render() {
      return (
         <div className="weather">
            {this.displayWeather()}
         </div>
      )
   }
}

const options = (props) => ({ variables: { cityName: props.cityName } });
export default graphql(getWeatherQuery, { options })(Weather);