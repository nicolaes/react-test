import React from 'react';
import ApiActions from '../actions/api-actions';
import ApiStore from '../stores/api-store';


export default class extends React.Component {
  constructor() {
    super();

  }

  addMatch() {
    const homeParticipantName = this.refs.homeParticipantName.getDOMNode().value;
    const awayParticipantName = this.refs.awayParticipantName.getDOMNode().value;
    ApiActions.addMatch(homeParticipantName,awayParticipantName);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="home name" ref="homeParticipantName"/>
        <input type="text" placeholder="away nam" ref="awayParticipantName"/>
        <input type="button" value="ad meci" onClick={this.addMatch.bind(this)}/>
      </form>
    );
  }



}
