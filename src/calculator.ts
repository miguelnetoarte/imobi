import sac from './sac';
import validator from './validator';
import tables from './tables';

const calculator = function (options: any) {
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

export = calculator;