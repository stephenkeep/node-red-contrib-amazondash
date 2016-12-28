var dash_button = require('node-dash-button'),
    _ = require('underscore');

module.exports = function(RED) {
    function node (config) {

        RED.nodes.createNode(this, config);
        var node = this;

        var mac = config.mac || '';
        var iface = config.iface || undefined;

        node.log('Watching for button with mac address: ' + mac);

        var dash = dash_button(mac, iface, 5000, 'all');
        var found = function () {
            node.log('Dash button pressed: ' + mac);
            var msg = {
                mac: config.mac,
                name: config.name
            };
            node.send(msg);
        };

        dash.on("detected", _.debounce(found, 5000, true));
    };

    RED.nodes.registerType("ButtonPressed",node);
}
