export function getClassName(...classList: (string | boolean | undefined)[]) {
	return classList.filter(Boolean).join(' ');
}
