define(function (require) {
    var React = require('react');
    require('async!http://maps.google.com/maps/api/js?sensor=false');

    return React.createClass({

        getDefaultProps: function () {
            return {
                initialZoom: 4,
                mapCenterLat: 25.774252,
                mapCenterLng: -80.190262
            };
        },

        componentDidMount: function () {
            var mapOptions = {
                center: this.mapCenterLatLng(),
                zoom: this.props.initialZoom,
                panControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT
                },
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                }
            };
            var map = new google.maps.Map(this.getDOMNode().firstChild, mapOptions);
            var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});


            this.setState({
                map: map,
                polygons: this._mapAddPolygons(map, this.props.areas || [])
            });
        },

        componentWillReceiveProps: function (nextProps) {
            this._mapRemovePolygons(this.state.polygons);
            this.setState({
                polygons: this._mapAddPolygons(this.state.map, nextProps.areas || [])
            })
        },

        _mapAddPolygons: function (map, areas) {
            map = map || this.state.map;

            return areas.map(function (area) {
                var polygon = new google.maps.Polygon({
                    paths: area.coords.map(function (coord) {
                        return new google.maps.LatLng(coord.lat, coord.lng)
                    }),
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });

                polygon.setMap(map);
                return polygon;
            });
        },

        _mapRemovePolygons: function (polygons) {
            polygons.forEach(function (polygon) {
                polygon.setMap(null);
            });
        },

        mapCenterLatLng: function () {
            var props = this.props;
            return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
        },

        render: function () {
            var style = {
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: '50px', // navbar
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 0
            };
            return (
                <div style={style}>
                    <div style={{width: '100%', height: '100%'}} />
                </div>
            );
        }
    });
});