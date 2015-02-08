require(['react', 'jsx!Test'], function (React, Test) {
    React.render(
        React.createElement(Test),
        document.getElementById('approot')
    );
});