import Reflux from 'reflux';
import ApiActions from '../actions/api-actions';


export default Reflux.createStore({

  listenables: [ApiActions],

  init() {
    this.state = {};
    this.state.matches = [];
  },

  onAddMatch(home, away) {
    console.log("top kek", a,b);
  }

});
