import { createContext, useRef } from 'react';
import { FormControl, FormGroup, FormLabel, Paper } from '@mui/material';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@/react-utils';

import type { ReactNode } from 'react';
import type { SxProps } from '@mui/material';
import type { FormInputProps } from './shared.ts';

export const checkboxGroupContext = createContext<CheckboxGroupContext>({
	selected: [],
	name: '',
	handleChange: () => {}
});

export type CheckboxGroupProps = Omit<FormInputProps<string[]>, 'value'> & {
	label?: ReactNode,
	maxHeight?: number
};

export default function CheckboxGroup(props: CheckboxGroupProps) {
	const {
		name,
		displayName,
		children,
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
		<checkboxGroupContext.Provider value={{
			selected: currentSelected.current,
			name,
			handleChange
		}}>
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
					{children}
				</Paper>

				<ValidationList
					validations={validations}
					hideNonErrors={hideNonErrors}
					hideIfAllValid={hideValidationIfValid}
					allValidMessage={allValidMessage}
				/>
			</FormControl>
		</checkboxGroupContext.Provider>
	);
}

export type CheckboxGroupContext = {
	selected: string[],
	name: string,
	handleChange: (e: Event) => any
}