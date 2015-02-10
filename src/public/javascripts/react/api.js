define(function (require) {
    var rest = require('rest');
    var mime = require('rest/interceptor/mime');

    // To automatically parse JSON
    var client = rest.wrap(mime);

    return {
        addDataSource: function (endpointUri) {
            return client({
                path: '/api/visualization/add-datasource',
                params: { endpointUri: endpointUri }
            })
        },

        add: function (dataDataSource, dsdDataSource, name) {
            return client({
                path: '/api/visualization/add',
                params: {
                    dataDataSource: dataDataSource,
                    dsdDataSource: dsdDataSource,
                    name: name
                }
            })
        },

        visualization: function (id) {
            return client('/api/visualization/' + id);
        }
    }
});