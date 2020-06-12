import React from 'react';
import GeneralInfo from '../../components/GeneralInfo/generalInfo'

class Home extends React.Component {

   constructor(props) {
      super(props)

      this.state = {}
   }

   componentDidMount() {
      fetch("https://coronavirus-map.p.rapidapi.com/v1/summary/latest", {
         "method": "GET",
         "headers": {
            "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
            "x-rapidapi-key": "ad55aff761msha31dd47ef2b0829p1e8311jsnac302b57d671"
         }
      })
         .then(response => response.json())
         .then((result) => {
            console.log("aaaaaa")
            let countryList = [];
            for (let country in result.data.regions) {
               countryList.push(result.data.regions[country])
            }
            this.setState({ data: countryList })
            console.log('state', this.state)
         })
         .catch(err => {
            console.log(err);
         });
   }
   render() {
      return (
         <GeneralInfo countryList={this.state.data} />
      )
   }
}

export default Home;