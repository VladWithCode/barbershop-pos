export function getClassName(...classList: (string | boolean | undefined)[]) {
	return classList.filter(Boolean).join(' ');
}

export function numberToPrice(n: number | string) {
	if (Number.isNaN(Number(n))) return '$0.00';

	return n.toLocaleString('es-MX', {
		style: 'currency',
		currency: 'MXN',
	});
}

const formatter = Intl.DateTimeFormat('es-MX', {
	year: 'numeric',
	day: 'numeric',
	month: 'long',
});

export function dateToLongDate(d: Date) {
	return formatter.format(d);
}
