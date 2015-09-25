import React from 'react';
import MatchList from '../components/match-list';

export default class extends React.Component {
  render() {
    return (
      <div>
        <h1>Match page</h1>
        <MatchList />
      </div>
    );
  }
}
