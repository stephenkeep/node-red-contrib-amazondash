var dash_button = require('node-dash-button'),
    _ = require('underscore');

module.exports = function(RED) {
    function node (config) {
        
        RED.nodes.createNode(this, config);
        var node = this;
        
        var mac = config.mac || '';
        
        console.log(mac);

        var dash = dash_button(mac); 
        var found = function () {
            console.log('Button Pressed: ' + mac);
            var msg = {};
            node.send(msg);
        };
        
        dash.on("detected", _.debounce(found, 5000, true));
    };
 
    RED.nodes.registerType("ButtonPressed",node);
}