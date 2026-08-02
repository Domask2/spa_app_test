export async function requestBuilder(url: string, options: RequestInit = {}): Promise<Response> {
	const baseUrl = import.meta.env.VITE_API_URL || '';
	const fullUrl = `${baseUrl}${url}`;
	const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};
	const config = {method: 'GET', ...options, headers};
	const response = await fetch(fullUrl, config);
	if (!response.ok) {
		// глобальная обработка ошибок (опционально)
	}
	return response;
}