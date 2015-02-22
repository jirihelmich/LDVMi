define(function (require) {
    var Router = require('react-router');
    var MapRoutes = require('jsx!maps/routes');
    var DataCubeRoutes = require('jsx!datacube/routes');

    var Application = require('jsx!Application');
    var Home = require('jsx!routes/Home');
    var Visualization = require('jsx!routes/Visualization');
    var Visualisations = require('jsx!routes/Visualizations');
    var Visualizers = require('jsx!routes/Visualizers');
    var Visualize = require('jsx!routes/Visualize');
    var NotFound = require('jsx!routes/NotFound');

    var Route = Router.Route;
    var DefaultRoute = Router.DefaultRoute;
    var NotFoundRoute = Router.NotFoundRoute;

    return (
        <Route name="home" handler={Application} path="/react">
            <DefaultRoute handler={Home} />
            <Route name="visualizations" handler={Visualisations} />
            <Route name="visualisation" path="visualisation/:id" handler={Visualization} />
            <Route name="visualizers" handler={Visualizers} />
            <Route name="visualize" path="visualize/:id" handler={Visualize}>
                {MapRoutes({name: "maps"})}
                {DataCubeRoutes({name: "datacube"})}
            </Route>
            <NotFoundRoute handler={NotFound}/>
        </Route>
    );
});