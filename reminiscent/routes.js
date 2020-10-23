
    module.exports = function(app) {
      let { fakedOut } = require('./prompts/promptBuilder.js')
      let endpoint = {"endpoint":"/insights","operation":"get","quantity":"110","responseObject":true};
      let responseTemplate = {"id":"number","score":"word"}
      app.get('/insights', (req, res) => {
      let response = fakedOut(endpoint.quantity, responseTemplate);
      res.json(JSON.stringify(response));
      });
    };
  