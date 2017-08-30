var dash_button = require('node-dash-button'),
    _ = require('underscore');

module.exports = function(RED) {
    function node (config) {
        
        RED.nodes.createNode(this, config);
        var node = this;
        
        var mac = config.mac || '';
        var protocol = config.protocol || 'arp';
        var timeout = config.timeout || 60000;
        
        console.log(mac + ":" + timeout + ":" + protocol);

        var dash = dash_button(mac,'',timeout,protocol); 
        var found = function () {
            console.log('Button Pressed: ' + mac + ":" + timeout + ":" + protocol);
            var msg = {};
            node.send(msg);
        };
        
        dash.on("detected", _.debounce(found, 5000, true));
    };
 
    RED.nodes.registerType("ButtonPressed",node);
}