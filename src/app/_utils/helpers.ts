export function getClassName(...classList: (string | boolean | undefined)[]) {
	return classList.filter(Boolean).join(' ');
}

export function numberToPrice(n: number) {
	return n.toLocaleString('es-MX', {
		style: 'currency',
		currency: 'MXN',
	});
}
