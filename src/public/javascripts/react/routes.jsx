define(function (require) {
    var Router = require('react-router');
    var Application = require('jsx!Application');
    var Home = require('jsx!routes/Home');
    var Visualization = require('jsx!routes/Visualization');
    var Visualisations = require('jsx!routes/Visualizations');
    var Visualizers = require('jsx!routes/Visualizers');
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
            <NotFoundRoute handler={NotFound}/>
        </Route>
    );
});