import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/dashboard',
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@account': resolve(__dirname, './src/account'),
			'@identity': resolve(__dirname, './src/identity'),
		}
	},
	server: {
		proxy: {
			'/api': 'http://localhost:5000'
		}
	}
});
