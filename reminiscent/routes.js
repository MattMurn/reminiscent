
    module.exports = function(app) {
      let { fakedOut } = require('./prompts/promptBuilder.js')
      let endpoint = {"endpoint":"insights","operation":"get","quantity":"11","responseObject":true};
      let responseTemplate = {"id":"number","dis_score":"number","is_true":"boolean"}
      app.get('/insights', (req, res) => {
      let response = fakedOut(endpoint.quantity, responseTemplate);
      console.log(response);
      res.json(response);
      });
    };
  