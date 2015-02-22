define(function (require) {
    var Router = require('react-router');
    var DataCubeVisualizer = require('jsx!datacube/DataCubeVisualizer');

    var Route = Router.Route;
    var DefaultRoute = Router.DefaultRoute;
    var NotFoundRoute = Router.NotFoundRoute;

    return function (params) {
        return (
            <Route name={params.name} handler={DataCubeVisualizer} />
        );
    }
});