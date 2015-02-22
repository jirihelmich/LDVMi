define(function (require) {
    var React = require('react');
    var Bootstrap = require('react-bootstrap');
    var _ = require('lodash');

    var ListGroup = Bootstrap.ListGroup;
    var ListGroupItem = Bootstrap.ListGroupItem;

    return React.createClass({

        toggle: function (id, isActive) {
            this.props.onChange(id, isActive);
        },

        render: function () {
            return (
                <ListGroup>
                    <ListGroupItem active>{this.props.label}</ListGroupItem>
                    {_.map(this.props.items, this.renderItem)}
                </ListGroup>
            );
        },

        renderItem: function (item, key) {
            var style = { backgroundColor: item.color, width: '30px', height: '15px', display: 'inline-block' };
            return (
                <ListGroupItem key={key}>
                    <label>
                        <input type="checkbox" checked={item.isActive} onChange={this.toggle.bind(this, key, !item.isActive)}/> {' '}
                        <span style={style}></span> {' '}
                        {item.label}
                    </label>
                </ListGroupItem>
            );
        }
    })
});