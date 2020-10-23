const introPrompt = [
  {
    type: 'input',
    name: 'endpoint',
    message: "Name the endpoint you'd like to create",
    default: function () {
      return '/';
    },
  },
  {
    type: 'input',
    name: 'operation',
    message: "What crud operation do you want to run",
    default: function () {
      return 'get';
    },
  },
  {
    type: 'confirm',
    name: 'responseObject',
    message: 'Is this the correct endpoint and method (just hit enter for YES)?',
    default: true,
  },
];

module.exports = introPrompt;