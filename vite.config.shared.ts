import type { AliasOptions } from 'vite';
import { resolve } from 'path';

export const alias: AliasOptions = {
	'@': resolve(__dirname, './src'),
	'@identity': resolve(__dirname, './src/identity'),
};