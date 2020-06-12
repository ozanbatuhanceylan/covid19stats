import React from 'react';

class GeneralInfo extends React.Component {
   
    constructor(props){
        super(props)

        this.state = {};
    }
   render() {
       let renderObj = [];
       console.log(this.props);
       if(this.props.countryList){
        for(const [index, value] of this.props.countryList.entries()){
            renderObj.push(<p key={index}><strong>{value.name}</strong>: {value.active_cases}</p>)
         }
       }
      return (
         <div>
            {renderObj}
         </div>
      );
   }
}

export default GeneralInfo;