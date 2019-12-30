const sumInstallmentDue = function (firstInstallmentDue: any, currentDeadline: number) {
    if (firstInstallmentDue instanceof Date && currentDeadline === 1) {
        return firstInstallmentDue;
    } else if (firstInstallmentDue instanceof Date && currentDeadline > 1) {
        let result = new Date(firstInstallmentDue.toDateString());
        result.setMonth(result.getMonth() + (currentDeadline - 1));
        result.setDate(result.getDate());
        return result
    } else {
        let result = new Date();
        result.setMonth(result.getMonth() + currentDeadline);
        result.setDate(result.getDate());
        return result;
    }
}
export = sumInstallmentDue;