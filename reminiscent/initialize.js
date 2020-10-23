let inquirer = require('inquirer');
let fs = require('fs');
var chalkPipe = require('chalk-pipe');
const introPrompt = require('./prompts/introPrompt.js');
const propertyPrompt = require('./prompts/propertyPrompt.js')

let finalObject = {};

function buildPrompt(promptArray, respondWith) {
  inquirer.prompt(promptArray).then((response) => respondWith(response));
}

function intro(){
  buildPrompt(introPrompt, (response) => {
    finalObject = response;
    response.responseObject ? buildResponseObject() : buildRoutes(finalObject);
  })
}

function buildResponseObject() {
 buildPrompt(propertyPrompt, (response) => {
   console.log(response);
   finalObject[response.name] = response.type;
   response.anotherObjectProperty ? buildResponseObject() : buildRoutes(finalObject);
 })
}

function buildRoutes(response) {
  console.log(response)
  fs.writeFile('./reminiscent/routes.js', `
    const faker = require('faker');

    module.exports = function(app) {
      app.get('/${response.endpoint}', (req, res) => {
      res.json(${JSON.stringify(response)});
      });
    };
  `, 'utf-8', e => console.error(e));  
}

// buildResponseObject();
intro();