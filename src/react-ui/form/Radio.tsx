import { useId } from 'react';
import { FormControlLabel, Radio as MaterialRadio } from '@mui/material';

import type { FormInputProps } from './shared.ts';

export type RadioProps<T> = Pick<FormInputProps<T>, 'value'|'children'>;

export default function Radio<T>(props: RadioProps<T>) {
	const {
		value,
		children
	} = props;

	const inputId = useId();

	return (
		<FormControlLabel
			htmlFor={inputId}
			control={
				<MaterialRadio
					id={inputId}
					value={value}
				/>
			}
			label={children}
		/>
	);
}