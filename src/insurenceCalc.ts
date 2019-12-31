const insurenceCalc = function (debitBalance: number, estateValue: number, mipTaxRate: number, dfiTaxRate: number) {
    let mip: number = debitBalance * mipTaxRate;
    let dfi: number = estateValue * dfiTaxRate;
    return {
        insurenceValue: mip + dfi,
        mip,
        dfi
    }
}

export = insurenceCalc;