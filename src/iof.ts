const iofCalc = function (amortization: number, daysTotal: number, iof: any) {
    const iofRate = daysTotal * iof.ratePerDay + iof.additionalFee;
    return iofRate / 100 * amortization;
}
export = iofCalc;