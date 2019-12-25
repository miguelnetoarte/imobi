import formatValue from './formatValue';

const insurenceCalc = function(debitBalance:number, estateValue:number, mipTaxesRate:number, dfiTaxesRate:number){
    let mip:number = formatValue(debitBalance * mipTaxesRate, 2);
    let dfi:number = formatValue(estateValue * dfiTaxesRate, 2);

    return {
        insurenceValue: formatValue(mip + dfi, 2),
        mip,
        dfi
    }
}

export = insurenceCalc;