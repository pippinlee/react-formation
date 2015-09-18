var contextConfig = require('./contextConfig');

var FormMixin = {
  contextTypes: contextConfig.validations
};

// Add each method defined in the context to the mixin
contextConfig.methods.forEach(method => {
  FormMixin[method] = function () {
    return this.context[contextConfig.name][method].apply(null, arguments);
  };
});

module.exports = FormMixin;
