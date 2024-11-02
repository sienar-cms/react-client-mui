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
			'@lockoutReasons': resolve(__dirname, './src/lockout-reasons'),
			'@users': resolve(__dirname, './src/users'),
		}
	},
	server: {
		proxy: {
			'/api': 'http://localhost:5000'
		}
	}
});
