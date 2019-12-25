const formatValue = (num, places) => {
	let result = num.toString().split('.');
	return !!result[1] ? Number(`${result[0]}.${result[1].substring(0, places)}`) : num;
}

module.exports = formatValue;