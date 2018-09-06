var dash_button = require('node-dash-button'),
    _ = require('underscore');

module.exports = function(RED) {
    function node (config) {
        
        RED.nodes.createNode(this, config);
        var node = this;
        
        var mac = config.mac || '';
        // if there are mutliple addresses we split the chain
        mac = mac.split(',');
        
        var interface = config.interface || null;
        console.log(mac);

        var dash = dash_button(mac, interface); 
        var found = function (dash_id) {
            console.log('Button Pressed: ' + dash_id);
            var msg = {"mac": dash_id};
            node.send(msg);
        };
        
        dash.on("detected", _.debounce(found, 5000, true));
    };
 
    RED.nodes.registerType("ButtonPressed",node);
}