let fs = require('fs');
let inquirer = require('inquirer');
let faker = require('faker');
const endpointPrompt = require('./endpointPrompt.js');
const propertyPrompt = require('./propertyPrompt.js');
const fakerTypes = require('../constants');

let endpoint;
let userResponseObject = {};

function buildPrompt(promptArray, respondWith) {
  inquirer.prompt(promptArray).then((answers) => respondWith(answers));
}

function buildEndpoint(){
  buildPrompt(endpointPrompt, (response) => {
    endpoint = response;
    response.responseObject ? buildResponseObject() : buildEndpoint();
  })
}

function buildResponseObject() {
  buildPrompt(propertyPrompt, (response) => {
    userResponseObject[response.name] = response.type;
    response.anotherObjectProperty ? buildResponseObject() : buildRoutes(endpoint, userResponseObject);
  })
}

function fakedOut(quantity, userResponseObject) {
  let updatedArr = []
  for(let i = 0; i <= quantity; i++){
    // create the number of response object user wants
    let updated = {}
    for(let key in userResponseObject){
      let fakerProp = userResponseObject[key];
      updated[key] = fakerTypes[fakerProp](); // execute faker method here to ensure different values
    }
    updatedArr.push(updated);
  }
  return updatedArr;
}
function buildRoutes(endpoint, userResponseObject) {
  console.log(endpoint, userResponseObject)
  fs.writeFile('./reminiscent/routes.js', `
    module.exports = function(app) {
      let { fakedOut } = require('./prompts/promptBuilder.js')
      let endpoint = ${JSON.stringify(endpoint)};
      let responseTemplate = ${JSON.stringify(userResponseObject)}
      app.${endpoint.operation}('${endpoint.endpoint}', (req, res) => {
      let response = fakedOut(endpoint.quantity, responseTemplate);
      console.log(response);
      res.json(response);
      });
    };
  `, 'utf-8', e => console.error(e));  
}

module.exports = {
  buildPrompt,
  buildResponseObject,
  buildEndpoint,
  fakedOut,
}