define(function (require) {
    var React = require('react');
    var Bootstrap = require('react-bootstrap');
    var Button = Bootstrap.Button;

    return React.createClass({

        getInitialState: function () {
            return { counter: 0 }
        },

        click: function() {
            this.setState({
                counter: this.state.counter + 1
            })
        },

        render: function () {
            return <div>
                    <strong>Hello buddy, this is JSX!</strong>. The number of clicks is {this.state.counter}.
                    <Button onClick={this.click} bsStyle="primary">Click me</Button>
                </div>
        }
    });
});