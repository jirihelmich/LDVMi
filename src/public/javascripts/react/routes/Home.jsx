define(function (require) {
    var React = require('react');
    var Router = require('react-router');
    var Bootstrap = require('react-bootstrap');
    var api = require('api');

    var Jumbotron = Bootstrap.Jumbotron;
    var Grid = Bootstrap.Grid;
    var Input = Bootstrap.Input;

    return React.createClass({

        mixins: [Router.Navigation],

        visualize: function () {
            var endpointUri = this.refs.input.getValue();

            api.addDataSource(endpointUri)
                .then(function (response) {
                    var dataSourceId = response.entity.id;
                    return api.add(dataSourceId, dataSourceId, '(React) Visualization ' + endpointUri);
                })
                .then(function (response) {
                    var visualisationId = response.entity.id;
                    this.transitionTo('visualisation', {id: visualisationId});
                }.bind(this))
        },

        render: function () {
            return (
                <Grid>
                    <Jumbotron>
                        <h1>Payola LDVM visualizations</h1>
                        <p>
                            This application is a part of the Payola platform. Its goal is to provide visualizations of Linked Data datasets using principles of Linked Data Visualization Model (LDVM). You can use it with your own SPARQL Endpoint.
                        </p>

                        <Input type="text" placeholder="Enter SPARQL endpoint URL" ref="input" />
                        <Input type="submit" bsStyle="primary" value="Visualize" onClick={this.visualize} />
                    </Jumbotron>
                </Grid>
            )
        }
    });
});