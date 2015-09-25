import React from 'react';
import MatchStore from '../stores/match-store';

export default class extends React.Component {
  constructor() {
    super();
    this.state = MatchStore.getInitialState();
  }

  componentDidMount() {
    MatchStore.listen((newState) => {
      this.setState(newState);
    });
  }

  render() {
    return (
      <ul>{this.state.matches.map(match => {
        return (
          <li>
            {match.homeParticipant} -&nbsp;
            {match.awayParticipant}
          </li>
        );
      })}</ul>
    );
  }
}
