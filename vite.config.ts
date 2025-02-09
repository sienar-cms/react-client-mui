import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const external = [
	'react',
	'react/jsx-runtime',
	'react-dom',
	'react-router',
	'react-router-dom',
	/@emotion\/react/,
	/@emotion\/styled/,
	/@mui\/icons-material/,
	/@mui\/material/,
	/@mui\/x-data-grid/,
	/@mui\/x-date-pickers/,
	/@sienar\/react-utils/,
	/@sienar\/react-ui-mui/,
	'dayjs',
	'notistack'
];

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: {
				'index': './src/index.ts'
			},
			formats: [ 'es' ]
		},
		rollupOptions: { external }
	},
	esbuild: {
		minifyIdentifiers: false
	},
	plugins: [
		react(),
		dts({
			rollupTypes: true,
			tsconfigPath: './tsconfig.app.json'
		})
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@identity': resolve(__dirname, './src/identity'),
		}
	}
});