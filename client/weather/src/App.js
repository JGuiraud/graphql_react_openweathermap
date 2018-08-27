import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.scss';

//component
import Search from './components/search';
import Weather from './components/weather';

//setting up apollo client
const client = new ApolloClient({
   uri: "http://localhost:5000/graphql"
});

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         city: "",
         cityName: ""
      };
   }

   onChange = (e) => {
      this.setState({ city: e.target.value });
   }

   submitForm = (e) => {
      e.preventDefault();
      this.setState({ cityName: this.state.city });
   }

   render() {
      return (
         <ApolloProvider client={client}>
            <div className="container">
               <Weather cityName={this.state.cityName} />
               <div className="App">
                  <Search
                     onChange={this.onChange}
                     getState={this.getState}
                     submitForm={this.submitForm}
                  />
               </div>
            </div>
         </ApolloProvider>
      );
   }
}

export default App;
