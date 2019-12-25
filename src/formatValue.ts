const formatValue = (num:any, places:number) => {
	let result = num.toString().split('.');
	return !!result[1] ? Number(`${result[0]}.${result[1].substring(0, places)}`) : num;
}

export = formatValue;