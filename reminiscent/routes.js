
    module.exports = function(app) {
      let { fakedOut } = require('./prompts/promptBuilder.js')
      let endpoint = {"endpoint":"/insights","operation":"get","quantity":"1000","responseObject":true};
      let responseTemplate = {"id":"word","name":"number"}
      app.get('/insights', (req, res) => {
      let response = fakedOut(endpoint.quantity, responseTemplate);
      console.log(response);
      res.json(response);
      });
    };
  