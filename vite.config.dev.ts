import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { alias } from './vite.config.shared.ts';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/dashboard',
	plugins: [ react() ],
	resolve: { alias },
	server: {
		proxy: {
			'/api': 'http://localhost:5000'
		}
	}
});
