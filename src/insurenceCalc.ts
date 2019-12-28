const insurenceCalc = function(debitBalance:number, estateValue:number, mipTaxesRate:number, dfiTaxesRate:number){
    let mip:number = debitBalance * mipTaxesRate;
    let dfi:number = estateValue * dfiTaxesRate;

    return {
        insurenceValue: mip + dfi,
        mip,
        dfi
    }
}

export = insurenceCalc;