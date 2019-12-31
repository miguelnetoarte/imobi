const calcInstallmentsTotal = function (installmentsTotal: number, installmentValue: number) {
    return installmentsTotal + installmentValue;
}

const calcAmortizationTotal = function (amortizationTotal: number, amortizationResult: number) {
    return amortizationTotal + amortizationResult;
}

const calcInterestRateTotal = function (interestRateTotal: number, interestRate: number) {
    return  interestRateTotal + interestRate;
}

const calcDaysTotal = function (firstInstallmentDue: Date, currentDeadline: number) {
    let diffDays = 0;
    if (currentDeadline <= 12 && currentDeadline > 0) {
        let date1 = firstInstallmentDue ? new Date(firstInstallmentDue.toDateString()) : new Date();
        let date2 = firstInstallmentDue ? new Date(firstInstallmentDue.toDateString()) : new Date();
        date2.setMonth(date1.getMonth() + currentDeadline);
        date2.setDate(date2.getDate());
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays <= 366) {
            diffDays -= 1; 
        }
    }
    return diffDays;
}

const hasIofTotalPrecision = function (iofTotal: number, totalCumulative: number) {
    let resultTotal = parseFloat(Number(iofTotal).toFixed(6));
    let resultcumulative = parseFloat(Number(totalCumulative).toFixed(6));
    return resultTotal != resultcumulative;
}

const util = {
    calcInstallmentsTotal,
    calcAmortizationTotal,
    calcInterestRateTotal,
    calcDaysTotal,
    hasIofTotalPrecision
}

export = util;