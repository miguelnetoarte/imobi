import insurenceCalc from './insurenceCalc';
import tables from './tables';
import sumInstallmentDue from './sumInstallmentDue';
import iofCalc from './iof';
import {
    calcInstallmentsTotal,
    calcAmortizationTotal,
    calcInterestRateTotal,
    calcDaysTotal,
    hasIofTotalPrecision
} from './util';

const calcInterestRate = function (financedValue: number, monthTaxesRate: number) {
    return financedValue * monthTaxesRate;
}

const calcAmortization = function (installmentValue: number, interestRate: number) {
    return installmentValue - interestRate;
}

const calcDebitBalance = function (debitBalance: number, amortization: number) {
    return parseFloat(debitBalance.toFixed(4)) - parseFloat(amortization.toFixed(4));
}

const hasGracePeriod = function (gracePeriod: number, deadline: number) {
    return gracePeriod > 0 && gracePeriod < deadline;
}

const price = function (options: any) {
    const {
        financedAmount,
        expenses,
        deadline,
        annualInterestRate,
        administrationTaxesRate,
        insurence,
        gracePeriod,
        firstInstallmentDue,
        iof
    } = options;

    let iofBoo = 0;
    let data: any = {
        summary: {
            iofTotal: 0
        }
    };
    let iofTotalCumulative = 0;
    let iofTotal = 0;
    let newDeadLine = hasGracePeriod(gracePeriod, deadline) ? deadline - gracePeriod : deadline;

    do {
        let installments = {};
        let amortization = 0;
        let installmentsTotal = 0;
        let amortizationTotal = 0;
        let interestRateTotal = 0;
        let financedValue = financedAmount + expenses + iofTotalCumulative;
        let monthTaxesRate = (annualInterestRate / 12) / 100;
        let installmentValue = financedValue * (Math.pow(1 + monthTaxesRate, newDeadLine) * monthTaxesRate) / (Math.pow(1 + monthTaxesRate, newDeadLine) - 1)
        let debitBalance = financedValue;
        let daysTotal = 0;
        let cumulativeDaysForIofTotal = 0;
        let insurenceTotal = {
            total: 0,
            mipTotal: 0,
            dfiTotal: 0
        };

        for (let index = 1; index <= deadline; index++) {
            let interestRate = calcInterestRate(debitBalance, monthTaxesRate);

            if (hasGracePeriod(gracePeriod, deadline) && index > gracePeriod) {
                amortization = calcAmortization(installmentValue, interestRate);
            } else if (gracePeriod === 0) {
                amortization = calcAmortization(installmentValue, interestRate);
            }

            debitBalance = calcDebitBalance(debitBalance, amortization);
            let insurenceResult = insurenceCalc(debitBalance + amortization, insurence.estateValue, insurence.mipTaxRate, insurence.dfiTaxRate);

            installmentsTotal = calcInstallmentsTotal(installmentsTotal, hasGracePeriod(gracePeriod, deadline) && index <= gracePeriod ? interestRate : installmentValue);
            amortizationTotal = calcAmortizationTotal(amortizationTotal, amortization);
            interestRateTotal = calcInterestRateTotal(interestRateTotal, interestRate);

            daysTotal = calcDaysTotal(firstInstallmentDue, index);
            let iofValue = iofCalc(amortization, daysTotal, iof);
            if (iofBoo > 0 && index === 1) iofTotal = 0;
            iofTotal = iofTotal + iofValue;
            if (daysTotal > 0) cumulativeDaysForIofTotal = daysTotal;

            insurenceTotal.total = insurenceTotal.total + insurenceResult.insurenceValue;
            insurenceTotal.mipTotal = insurenceTotal.mipTotal + insurenceResult.mip;
            insurenceTotal.dfiTotal = insurenceTotal.dfiTotal + insurenceResult.dfi;

            installments = {
                ...installments,
                [index]: {
                    installment: index,
                    amortization: amortization,
                    interestRate: interestRate,
                    administrationTaxesRate: administrationTaxesRate,
                    insurence: insurenceResult,
                    installmentValue: (hasGracePeriod(gracePeriod, deadline) && index <= gracePeriod ? interestRate : installmentValue) + insurenceResult.insurenceValue,
                    installmentDue: sumInstallmentDue(firstInstallmentDue, index),
                    cumulativeDaysForIof: daysTotal,
                    iofValue: iofValue,
                    debitBalance: debitBalance
                }
            }

            data = {
                ...data,
                installments,
                summary: {
                    ...data.summary,
                    requestedValue: financedAmount,
                    financedValue: financedAmount + expenses + iofTotal,
                    amortizationTotal,
                    interestRateTotal,
                    installmentsTotal,
                    cumulativeDaysForIof: cumulativeDaysForIofTotal,
                    iofTotal,
                    expenses,
                    insurenceTotal

                },
                parameters: {
                    ...options
                }
            }
        }
        iofTotalCumulative = data.summary.iofTotal;
        iofBoo++;
    } while (iof && hasIofTotalPrecision(iofTotal, iofTotalCumulative) || iofBoo <= 2);
    return data;
}

export = price;