const forms = require('fh-mbaas-api').forms;
const events = require('events');
const formsListener = new events.EventEmitter();

module.exports = function(RED) {
  function formsSubmissionComplete(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    forms.registerListener(formsListener, function(err) {
      console.error('error registering listener', err);
    });
    formsListener.on('submissionComplete', function(data) {
      const id = data.submissionId;
      const timestamp = data.submissionCompletedTimestamp;
      const submission = data.submission;
      node.send({
        payload: {
          id: id,
          timestamp: timestamp,
          submission: submission
        }
      });
    });
  }
  RED.nodes.registerType('fh-forms-submission-complete', formsSubmissionComplete);
};
