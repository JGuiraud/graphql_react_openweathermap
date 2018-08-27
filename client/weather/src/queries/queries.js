import {
   gql
} from 'apollo-boost';

const getWeatherQuery = gql `
   query($cityName: String!) {
      city(cityName: $cityName) {
         name
         main {
            temp
            pressure
            humidity
            temp_min
            temp_max
         }
         weather {
            id
            main
            description
            icon
          }
         wind {
            speed
            deg
         }
      }
   }
`
export {
   getWeatherQuery
}

// const getWeather = gql `
//    query($cityName: String!) {
//       city(cityName: $cityName) {
//          name
//          main {
//             temp
//             pressure
//             humidity
//             temp_min
//             temp_max
//          }
//          wind {
//             speed
//             deg
//          }
//          sys  {
//             message
//             sunrise
//             sunset
//             country
//             id
//          }
//          weather {
//             id
//             main
//             description
//             icon
//          }
//          coord {
//             lon
//             lat
//          }
//       }
//    }
// `