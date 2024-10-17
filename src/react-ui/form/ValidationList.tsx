import { useContext } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Done, Error, Feedback } from '@mui/icons-material';
import { formValidationContext } from '@/react-utils';

import type { ValidationResult } from '@/react-utils';

export type ValidationListProps = {
	validations: ValidationResult[]
	hideNonErrors?: boolean
	hideIfAllValid?: boolean
	allValidMessage?: string
}

export default function ValidationList(props: ValidationListProps) {
	const {
		validations,
		hideNonErrors = false,
		hideIfAllValid = false,
		allValidMessage = 'All requirements met'
	} = props;

	const context = useContext(formValidationContext);

	let filtered = validations;

	if (hideNonErrors) {
		filtered = validations.filter(v => !v.valid);
	}

	if (hideIfAllValid) {
		if (validations.every(v => v.valid)) {
			filtered = context.hasInteracted
				?  [{ valid: true, message: allValidMessage }]
				: [];
		} else {
			filtered = validations;
		}
	}

	return filtered.length > 0 && (
		<List dense>
			{filtered.map(e => {
				const validationColor = e.valid === true
					? 'success.main'
					: e.valid === false ? 'error.main' : 'inherit';

				const validationIcon = e.valid === true
					? <Done/>
					: e.valid === false ? <Error/> : <Feedback/>

				return (
					<ListItem
						key={e.message}
						sx={{color: validationColor}}
					>
						<ListItemIcon
							sx={{ color: 'inherit' }}
						>
							{validationIcon}
						</ListItemIcon>
						<ListItemText
							primary={e.message}
							sx={{ color: 'inherit' }}
						/>
					</ListItem>
				)
			})}
		</List>
	) || null;
}