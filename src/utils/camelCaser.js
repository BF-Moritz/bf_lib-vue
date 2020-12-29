export default function camelCaser(input) {
	return input.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
