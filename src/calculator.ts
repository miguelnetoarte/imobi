import sac from './sac';
import validator from './validator';
import tables from './tables';
import price from './price';

const calculator = function (options: any) {
    const paramiters = validator(options);
    let result = null;
    switch (paramiters.table.toLocaleUpperCase()) {
        case tables.SAC:
            result = sac(paramiters);
            break;
        case tables.PRICE:
            result = price(paramiters);
            break;
        default: null;
    }

    return result;
}

export = calculator;