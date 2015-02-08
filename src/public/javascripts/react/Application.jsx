define(function (require) {
    var React = require('react');
    var Router = require('react-router');
    var Bootstrap = require('react-bootstrap');

    var RouteHandler = Router.RouteHandler;
    var Link = Router.Link;
    var Navbar = Bootstrap.Navbar;
    var Nav = Bootstrap.Nav;
    var NavItem = Bootstrap.NavItem;

    return React.createClass({

        render: function () {
            return <div>
                    <Navbar inverse fluid fixedTop brand={this.renderBrand()}>
                        <Nav>
                            <li><Link to="visualizations">Visualizations</Link></li>
                            <li><Link to="visualizers">Visualizers</Link></li>
                        </Nav>
                    </Navbar>
                    <br /><br />
                    <RouteHandler/>
                </div>
        },

        renderBrand: function () {
            return <Link to="home">Payola visualizations</Link>;
        }
    });
});