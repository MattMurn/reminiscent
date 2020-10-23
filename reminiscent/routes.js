
    const faker = require('faker');

    module.exports = function(app) {
      app.get('/insights', (req, res) => {
      res.json({"endpoint":"insights","operation":"get","responseObject":true,"id":"number","discipline_score":"number"});
      });
    };
  