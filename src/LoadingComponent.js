import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export default class LoadingComponent extends Component {
  render() {
    return <div>
      <br/>
      <Spinner style={{ width: '3rem', height: '3rem', color: '#F5C09A' }} />
    </div>;
  }
}