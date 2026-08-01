import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles/globals.css'
import { setMswReady } from './store/mswStore'

async function enableMocking() {
	// if (!import.meta.env.DEV) {
 	//     return
 	// }

	try {
		const {worker} = await import('./mocks/browser');
		await worker.start({
			onUnhandledRequest: 'warn',
			serviceWorker: {
				url: '/mockServiceWorker.js',
			},
		});
		console.info('MSW ready');
	} catch (error) {
		console.error('Ошибка запуска MSW:', error);
	}
}

enableMocking().then(() => setMswReady(true))

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
)