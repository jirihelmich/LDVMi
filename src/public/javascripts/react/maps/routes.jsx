define(function (require) {
    var Router = require('react-router');
    var MapsVisualizer = require('jsx!maps/MapsVisualizer');

    var Route = Router.Route;
    var DefaultRoute = Router.DefaultRoute;
    var NotFoundRoute = Router.NotFoundRoute;

    return function (params) {
        return (
            <Route name={params.name} handler={MapsVisualizer} />
        );
    }
});