
const fakerTypes = require('../constants');

const propertyPrompt = [
  {
    type: 'input',
    name: 'name',
    message: "Name a response property",
    default: function () {
      return 'id';
    },
  },
  {
    type: 'list',
    name: 'type',
    message: 'response property type',
    choices: Object.keys(fakerTypes),
    filter: function (val) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: 'anotherObjectProperty',
    message: 'Would you like to add another object property (just hit enter for YES)?',
    default: true,
  },
]

module.exports = propertyPrompt;