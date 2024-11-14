import { useContext, useId } from 'react';
import { FormControlLabel, Radio as MaterialRadio } from '@mui/material';
import { radioGroupContext } from './RadioGroup.tsx';

import type { FormInputProps } from './shared.ts';
import type { RadioGroupContext } from './RadioGroup.tsx';

export type RadioProps<T> = Pick<FormInputProps<T>, 'value'|'children'>;

export default function Radio<T>(props: RadioProps<T>) {
	const {
		value,
		children
	} = props;

	const inputId = useId();
	const context: RadioGroupContext<T> = useContext(radioGroupContext);

	return (
		<FormControlLabel
			htmlFor={inputId}
			control={
				<MaterialRadio
					id={inputId}
					value={value}
					name={context.name}
					checked={context.selected === value}
				/>
			}
			label={children}
		/>
	);
}