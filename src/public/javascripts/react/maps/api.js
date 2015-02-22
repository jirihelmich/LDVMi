define(function (require) {
    var rest = require('rest');
    var mime = require('rest/interceptor/mime');
    var _ = require('lodash');
    var when = require('when');

    // To automatically parse JSON
    var client = rest.wrap(mime, {mime: 'application/json'});

    return {
        getFilters: function (id) {
            return client('/api/map/polygon-entities-properties/' + id)

                .then(function (response) {
                    return client({
                        path: '/api/datacube/values/' + id,
                        entity: {
                            uris: response.entity.map(function (item) {
                                return item.uri;
                            })}
                    });
                })

                .then(function (response) {
                    var filters = _.mapValues(response.entity, function (filter) {
                        return _.map(filter, function (item) {
                            return {label: item['label']['variants']['']}
                        });
                    });

                    return filters;
                })
        },

        getAreas: function (id, filters) {
            var self = this;

            return client({
                path: '/api/map/polygon-entities/' + id,
                entity: { filters: filters }
            })
                .then(function (response) {
                    return when.all(_.map(response.entity, function (area) {
                        return when().then(function () {
                            return {
                                title: area.title.variants.sl,
                                groupPropertyValue: area.groupPropertyValue,
                                coords: self._parseMultipolygonDef(area.wkt)
                            }
                        });
                    }));
                })
        },

        _parseMultipolygonDef: function (multipolygon) {
            return _.map(multipolygon.replace('MULTIPOLYGON(((', '').replace(')))').split(', '), function (coords) {
                coords = coords.split(' ').map(parseFloat);
                return { lat: coords[1], lng: coords[0] }
            });
        }
    }
});