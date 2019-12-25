const sac = require('./sac');
const validator = require('./validator');
const tables = require('./tables');

const calculator = function(options) {
    const paramiters = validator(options);
    let result = null;
    switch (paramiters.table.toLocaleUpperCase()) {
        case tables.SAC:
            result = sac(paramiters);
            break;
        case tables.PRICE:
            result = tables.PRICE;
            break;
        default: null;
    }

    return result;
}

module.exports = calculator;