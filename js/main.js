async function getConvertedValue(conversion, amount) {
	const apiKey = '85f509d411c3ff2bc182';
	const api = `https://free.currencyconverterapi.com/api/v6/convert?q=${conversion}&compact=y&apiKey=${apiKey}`;
	const json = await fetch(api);
	const result = await json.json();
	console.log(result[conversion].val);
	console.log(amount);
	return amount * result[conversion].val;
}

function formatCurrency(type, value) {
	const formatter = new Intl.NumberFormat(type, {
		currency: type,
		style: 'currency',
	});
	return formatter.format(value);
}

async function convertCurrency() {
	const fromCurrency = document.getElementById('from-currency').value;
	const toCurrency = document.getElementById('to-currency').value;
	const amount = document.getElementsByTagName('input')[0].value;
	const convertedValue = await getConvertedValue(`${fromCurrency}_${toCurrency}`, amount);
	document.getElementById('result').innerHTML = formatCurrency(toCurrency, convertedValue);
}