const sac = require('./sac');
const validator = require('./validator');
const tables = require('./tables');

const calculator = function(options) {
    validator(options);
    let result = null;
    switch (options.table.toLocaleUpperCase()) {
        case tables.SAC:
            result = sac(options);
            break;
        case tables.PRICE:
            result = tables.PRICE;
            break;
        default: null;
    }

    return result;
}

module.exports = calculator;