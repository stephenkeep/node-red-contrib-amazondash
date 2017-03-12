var dash_button = require('node-dash-button');

module.exports = function(RED) {
    function node (config) {
        
        RED.nodes.createNode(this, config);
        var node = this;
        
        var mac = config.mac || '';
        
        console.log(mac);

        var dash = dash_button(mac);

        dash.on("detected", function () {
            console.log('Button Pressed: ' + mac);
            var msg = {};
            node.send(msg);
        });
    };
 
    RED.nodes.registerType("ButtonPressed", node);
}