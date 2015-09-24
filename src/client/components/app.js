import React from 'react';
import {Link, RouteHandler} from 'react-router';

require("babel/polyfill");

export default class App extends React.Component {

  render() {
    return (
      <div className="Framework">
        <div className="ContentWrap">
          <RouteHandler />
        </div>
      </div>
    )
  }

}
