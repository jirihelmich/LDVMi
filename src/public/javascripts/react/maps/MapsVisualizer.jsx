define(function (require) {
    var React = require('react');
    var Router = require('react-router');
    var Bootstrap = require('react-bootstrap');
    var _ = require('lodash');

    var GoogleMap = require('jsx!maps/partials/GoogleMap');
    var FilterBox = require('jsx!maps/partials/FilterBox');
    var api = require('maps/api');

    var Grid = Bootstrap.Grid;
    var Col = Bootstrap.Col;
    var Button = Bootstrap.Button;
    var ProgressBar = Bootstrap.ProgressBar;

    return React.createClass({
        mixins: [Router.State],

        getInitialState: function () {
            return {
                filters: [],
                areas: [],
                loading: false
            }
        },

        componentDidMount: function () {
            this.setState({ loading: true });
            api.getFilters(this.getParams().id)
                .then(function (filters) {
                    this.setState({
                        filters: this._resetFilters(filters),
                        loading: false
                    })
                }.bind(this));
        },

        toggleFilter: function (uri, id, isActive) {
            var filters = this.state.filters;
            filters[uri][id].isActive = isActive;
            this.setState({filters: filters});
        },

        refresh: function () {
            this.setState({loading: true});
            api.getAreas(this.getParams().id, this.state.filters)
                .then(function (areas) {
                    this.setState({
                        areas: areas,
                        loading: false
                    })
                }.bind(this));
        },

        render: function () {
            var loading = this.state.loading;

            return <div>
                <Grid fluid={true}>
                    <Col md={3}>
                        <div style={{position: 'relative', zIndex: 1}}>
                            <br />
                            <ProgressBar active={loading} label={loading ? 'Loading...' : ''} now={100} bsStyle={loading ? 'warning' : 'default'} />
                            {_.map(this.state.filters, function (items, uri) {
                                return <FilterBox items={items} label={uri} key={uri}
                                    onChange={this.toggleFilter.bind(this, uri)}/>
                            }.bind(this))}

                            <Button bsStyle="primary" bsSize="large" block onClick={this.refresh}>Refresh</Button>
                        </div>
                    </Col>
                </Grid>
                <GoogleMap areas={this.state.areas} />
            </div>
        },

        _resetFilters: function (filters) {
            var random = function () {
                return Math.floor(Math.random() * 255);
            };
            _.forEach(filters, function (filter) {
                _.forEach(filter, function (item) {
                    item.isActive = false;
                    item.color = 'rgba(' + random() + ', ' + random() + ', ' + random() + ', 0.7)';
                });
            });

            return filters;
        }
    });
});