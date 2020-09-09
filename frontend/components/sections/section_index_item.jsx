import React from 'react';
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';

class SectionIndexItem extends React.Component {
  constructor(props){
    super(props);

  };

  render(){
    return(
      <div>hi</div>
    )
  }
}

export default withRouter(SectionIndexItem);