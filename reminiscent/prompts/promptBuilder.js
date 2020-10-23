let fs = require('fs');
let inquirer = require('inquirer');
let faker = require('faker');
const endpointPrompt = require('./endpointPrompt.js');
const propertyPrompt = require('./propertyPrompt.js');

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
    let updated = {}
    for(let key in userResponseObject){
      let fakerProp = userResponseObject[key];
      if(fakerProp == 'word'){
        updated[key] = faker.random.word();  
      }
      else if(fakerProp == 'number'){
      updated[key] = faker.random.number();
      }
      else if(fakerProp == 'boolean'){
        updated[key] = faker.random.boolean();
      }
    }
    updatedArr.push(updated);
  }
  console.log(updatedArr);
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
      res.json(JSON.stringify(response));
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