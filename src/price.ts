import insurenceCalc from './insurenceCalc';
import tables from './tables';
import sumInstallmentDue from './sumInstallmentDue';

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
        annualTaxRate,
        admTaxesRate,
        insurence,
        gracePeriod,
        firstInstallmentDue
    } = options;
    /**
     * todo: carencia em desenvolvimento
     */
    let newDeadLine = hasGracePeriod(gracePeriod, deadline) ? deadline - gracePeriod : deadline;
    let installments = {};
    let financedValue = financedAmount + expenses;
    let amortization = 0;
    let installmentsTotal = 0;
    let amortizationTotal = 0;
    let interestRateTotal = 0;
    let monthTaxesRate = (annualTaxRate / 12) / 100;
    let installmentValue = financedValue * (Math.pow(1 + monthTaxesRate, newDeadLine) * monthTaxesRate) / (Math.pow(1 + monthTaxesRate, newDeadLine) - 1)
    let debitBalance = financedValue;
    let summary = {};

    for (let index = 1; index <= deadline; index++) {
        let interestRate = calcInterestRate(debitBalance, monthTaxesRate);

        if (hasGracePeriod(gracePeriod, deadline) && index > gracePeriod) {
            amortization = calcAmortization(installmentValue, interestRate);
        } else if (gracePeriod === 0) {
            amortization = calcAmortization(installmentValue, interestRate);
        }

        debitBalance = calcDebitBalance(debitBalance, amortization);
        let insurenceResult = insurenceCalc(debitBalance + amortization, insurence.estateValue, insurence.mipTaxesRate, insurence.dfiTaxesRate);

        installmentsTotal = installmentsTotal + (hasGracePeriod(gracePeriod, deadline) && index <= gracePeriod ? interestRate : installmentValue);
        amortizationTotal = amortizationTotal + amortization;
        interestRateTotal = interestRateTotal + interestRate;

        installments = {
            ...installments,
            [index]: {
                installment: index,
                amortization: amortization,
                interestRate: interestRate,
                admTaxesRate: admTaxesRate,
                insurence: insurenceResult,
                installmentValue: (hasGracePeriod(gracePeriod, deadline) && index <= gracePeriod ? interestRate : installmentValue) + insurenceResult.insurenceValue,
                installmentDue: sumInstallmentDue(firstInstallmentDue, index),
                debitBalance: debitBalance
            }
        }

        summary = {
            installments,
            deadline,
            installmentsTotal,
            amortizationTotal,
            financedValue,
            interestRateTotal,
            table: tables.PRICE,
            annualTaxRate,
            admTaxesRate,
            gracePeriod,
        }
    }
    return summary;
}

export = price;