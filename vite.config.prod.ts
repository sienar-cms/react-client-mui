import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { alias } from './vite.config.shared';
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
				'sienar-react-client-mui': './src/index.ts'
			},
			formats: [ 'es' ]
		},
		rollupOptions: { external }
	},
	plugins: [
		react(),
		dts({
			rollupTypes: true,
			tsconfigPath: './tsconfig.app.json'
		})
	],
	resolve: { alias }
});