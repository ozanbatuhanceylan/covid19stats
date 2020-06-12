import React from 'react';

class CountryDetail extends React.Component {
    render() {
        return (
           <div>
              <h1>Country Detail</h1>
               <p>Country Code: {this.props.match.params.countryCode}</p>
           </div>
        );
     }
}

export default CountryDetail;