import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

async function enableMocking() {
    // if (!import.meta.env.DEV) {
    //     return
    // }

    const { worker } = await import('./mocks/browser')
    console.info('Запуск MSW...');
    await worker.start(
        {
            onUnhandledRequest: 'warn',
            serviceWorker: {
                url: '/mockServiceWorker.js',
            },
        }
    )

    console.info('MSW ready');
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
})