define(function (require) {
    var React = require('react');
    var Router = require('react-router');
    var RouteHandler = Router.RouteHandler;

    return React.createClass({
        render: function () {
            return <RouteHandler/>
        }
    });
});