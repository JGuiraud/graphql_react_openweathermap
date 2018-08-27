import React, { Component } from 'react';

class Search extends Component {

   render() {
      return (
         <form className="search-component" onSubmit={this.props.submitForm}>
            <input onChange={this.props.onChange} type="text" />
            <button className="button"> Quel temps fait-il ?</button>
         </form>
      )
   }
}

export default Search;