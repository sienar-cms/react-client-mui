import { useRef } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Paper } from '@mui/material';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@/react-utils';

import type { ReactNode } from 'react';
import type { SxProps } from '@mui/material';
import type { EntityBase } from '@/react-utils';
import type { FormInputProps } from './shared.ts';

export type CheckboxGroupProps<T extends EntityBase> = Omit<FormInputProps<string[]>, 'value'|'children'> & {
	options: T[],
	labelRenderer?: (option: T) => ReactNode,
	label?: ReactNode,
	maxHeight?: number
};

export default function CheckboxGroup<T extends EntityBase>(props: CheckboxGroupProps<T>) {
	const {
		options,
		labelRenderer,
		name,
		displayName,
		label,
		maxHeight,
		hideNonErrors,
		hideValidationIfValid,
		allValidMessage,
		validators = [],
		onChange
	} = props;

	const currentSelected = useRef<string[]>([]);
	const [ rerender ] = useRerender();

	const [ validations, interact ] = useFormFieldValidation(name, displayName, currentSelected, validators);

	const handleChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const checked = target.checked;

		if (checked && currentSelected.current.includes(target.value) ||
			!checked && !currentSelected.current.includes(target.value)) return;

		let index = currentSelected.current.findIndex(c => c === target.value);
		let changed = false;
		if (checked && index === -1) {
			currentSelected.current.push(target.value);
			changed = true;
		} else if (!checked && index > -1) {
			currentSelected.current.splice(index, 1);
			changed = true;
		}

		if (changed) {
			interact();
			await onChange?.(currentSelected.current);
			rerender();
		}
	}

	const paperSx: SxProps = {
		maxHeight,
		overflow: maxHeight === undefined ? undefined : 'auto',
		flexDirection: 'row',
		my: 1
	};

	return (
		<Box>
			<FormControl
				component='fieldset'
				error={validations.filter(v => !v.valid).length > 0}
			>
				<FormLabel component='legend'>{label ?? displayName}</FormLabel>

				<Paper
					component={FormGroup}
					sx={paperSx}
					elevation={0}
				>
					{options.map(o => (
						<FormControlLabel
							key={o.id}
							htmlFor={o.id}
							control={
								<Checkbox
									id={o.id}
									name={name}
									checked={currentSelected.current.includes(o.id)}
									value={o.id}
									// @ts-ignore
									onChange={handleChange}
								/>
							}
							label={labelRenderer?.(o) ?? o.toString()}
							sx={{width: '100%'}}
						/>
					))}
				</Paper>

				<ValidationList
					validations={validations}
					hideNonErrors={hideNonErrors}
					hideIfAllValid={hideValidationIfValid}
					allValidMessage={allValidMessage}
				/>
			</FormControl>
		</Box>
	);
}