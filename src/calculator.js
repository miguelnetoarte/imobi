const sac = require('./sac');
const validator = require('./validator');

const calculator = function(options) {
    validator(options);

    return options;
}

module.exports = calculator;