var CounterActions = Reflux.createActions(['increment']);

var CounterStore = Reflux.createStore({
    listenables: [CounterActions],

    init: function() {
        this.state = {counter: 0}
    },

    getInitialState: function() {
        return this.state
    },

    onIncrement: function() {
        this.state.counter = this.state.counter + 1;
        this.trigger(this.state);
    }
});

var Counter = React.createClass({
    componentDidMount: function() {
        CounterStore.listen(this.storeDidUpdate);
    },

    getInitialState: function() {
        return CounterStore.getInitialState();
    },

    increment: function() {
        CounterActions.increment();
    },

    storeDidUpdate: function(newState) {
        this.setState(newState);
    },

    render: function() {
        return (
            <div>
                <button onClick={this.increment}>increment</button>
                <p>{this.state.counter}</p>
            </div>
        )
    }
});

var Wrapper = React.createClass({
    render: function() {
        return (
            <div>
                <Counter />
            </div>
        )
    }
});

React.render(<Wrapper name="World" />, document.getElementById('main'));