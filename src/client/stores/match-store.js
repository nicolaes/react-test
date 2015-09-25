import Reflux from 'reflux';
import Firebase from 'firebase';

export default Reflux.createStore({
  init() {
    this.state = {
      matches: []
    };

    //this.privateMatches = [];

    this.firebaseRef = new Firebase("https://radiant-fire-6888.firebaseio.com/matches");
    this.firebaseRef.on("child_added", (dataSnapshot) => {
      console.log("child_added", dataSnapshot.val());


      //this.state.matches.push(dataSnapshot.val());
      //this.setState();


    });


  },

  getInitialState() {
    return this.state;
  }
});
