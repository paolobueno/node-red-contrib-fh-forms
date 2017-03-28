const forms = require('fh-mbaas-api').forms;

module.exports = function(RED) {
  function formsSubmissionComplete(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      forms.getForms({}, function(err, data) {
        msg.payload = Object.assign(msg.payload, data);
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType('fh-forms-list', formsSubmissionComplete);
};
