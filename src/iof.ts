const iofCalc = function (amortization: number, daysTotal: number, iof: any) {
    let result = 0;
    if (iof) {
        const iofRate = daysTotal * iof.ratePerDay + iof.additionalFee;
        result = iofRate / 100 * amortization;
    }
    return result;
}
export = iofCalc;