export function convertTimestampToString(timestamp) {
	const ts = new Date(timestamp);
	const date = `${('00' + ts.getDate()).slice(-2)}.${('00' + (+ts.getMonth() + 1)).slice(-2)}.${(
		'0000' + ts.getFullYear()
	).slice(-4)}`;
	const time = `${('00' + ts.getHours()).slice(-2)}:${('00' + ts.getMinutes()).slice(-2)}:${(
		'00' + ts.getSeconds()
	).slice(-2)}`;
	return `${date} - ${time}`;
}
