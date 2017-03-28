const forms = require('fh-mbaas-api').forms;
const events = require('events');
const formsListener = new events.EventEmitter();

const log = console.log.bind(console, 'forms-submission-complete');
const error = console.error.bind(console, 'forms-submission-complete');

module.exports = function(RED) {
  function formsSubmissionComplete(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    forms.registerListener(formsListener, function(err) {
      if(err) {
        error('registering listener', err);
      } else {
        log('registered successfully');
      }
    });
    formsListener.on('submissionComplete', function(data) {
      log('inside submission complete handler');
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
