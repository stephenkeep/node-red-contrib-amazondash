var dash_button = require('node-dash-button');

module.exports = function(RED) {
    function node (config) {
        
        RED.nodes.createNode(this, config);
        var node = this;
        
        var mac = config.mac || '';
        var iface = config.iface || null;
        var debounce = config.debounce || null;
        var protocol = config.protocol || null;

        node.log("Listening to " + mac + " dash button" + (iface ? ' on ' + iface + ' interface' : ''));

        var dash = dash_button(mac, iface, debounce, protocol);

        node.on("close", function () {
           if (typeof(dash) !== "undefined" && dash) {
               dash.emit('close');
           }
        });

        dash.on("detected", function (dash_id) {
            console.log('Dash button Pressed: ' + dash_id);
            var msg = {};
            node.send(msg);
        });
    };
 
    RED.nodes.registerType("ButtonPressed", node);
}