const graphql = require('graphql');
// const WeatherForecastType require('.weatherForecastType.js');
const axios = require('axios');
const dotenv = require('dotenv').config()


const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLInt,
   GraphQLSchema,
   GraphQLID,
   GraphQLFloat,
   GraphQLNonNull,
   GraphQLList
} = graphql;

/// Types
const CoordType = new GraphQLObjectType({
   name: "coord",
   fields: {
      lon: { type: GraphQLFloat },
      lat: { type: GraphQLFloat }
   }
})

const WeatherListType = new GraphQLObjectType({
   name: "weather",
   fields: {
      id: { type: GraphQLID },
      main: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: { type: GraphQLString }
   }
})


const MainType = new GraphQLObjectType({
   name: "main",
   fields: {
      temp: { type: GraphQLFloat },
      pressure: { type: GraphQLFloat },
      humidity: { type: GraphQLFloat },
      temp_min: { type: GraphQLFloat },
      temp_max: { type: GraphQLFloat }
   }
})

const WindType = new GraphQLObjectType({
   name: "wind",
   fields: {
      speed: { type: GraphQLFloat },
      deg: { type: GraphQLFloat }
   }
})

const SysType = new GraphQLObjectType({
   name: "sys",
   fields: {
      type: { type: GraphQLFloat },
      id: { type: GraphQLID },
      message: { type: GraphQLFloat },
      country: { type: GraphQLString },
      sunrise: { type: GraphQLFloat },
      sunset: { type: GraphQLFloat }
   }
})

// is at the end of the Type as it called all previous types in its fields:{...} section. Otherwise if was first should have written fields: () => ({...})
const WeatherForecastType = new GraphQLObjectType({
   name: "WeatherForecast",
   fields: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      coord: { type: CoordType },
      weather: { type: new GraphQLList(WeatherListType) },
      main: { type: MainType },
      wind: { type: WindType },
      sys: { type: SysType }
   }
})

/// Query
const RootQuery = new GraphQLObjectType({
   name: "RootQuery",
   fields: {
      city: {
         type: WeatherForecastType,
         args: {
            cityName: {
               type: new GraphQLNonNull(GraphQLString)
            }
         },
         resolve(parentValue, args) {
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.cityName}&lang=fr&units=metric&${process.env.API_KEY}`)
               .then(resp => resp.data);
            // https://api.openweathermap.org/data/2.5/weather?q=Toulouse&lang=fr&units=metric&appid=ad61d0669bccfd5f5fc7c1dcde7ca151
         }
      }
   }
});

/// Export Query
module.exports = new GraphQLSchema({
   query: RootQuery
});