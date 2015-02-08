require(['react'], function (React) {
    window.React = React;
    require(['react-router', 'jsx!routes'], function (Router, routes) {
        Router.run(routes, Router.HistoryLocation, function (Handler) {
            React.render(React.createElement(Handler), document.getElementById('approot'));
        });
    });

});