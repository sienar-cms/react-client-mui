import { useId, useRef } from 'react';
import { Button, IconButton, ExtendButtonBase } from '@mui/material';
import { HttpMethod, sendRequest } from '@/react-utils';

import type { FormEvent, PropsWithChildren, ReactNode } from 'react';
import type { ButtonPropsColorOverrides, ButtonTypeMap, IconButtonTypeMap, SxProps, Theme } from '@mui/material';
import type { ExtensibleColor } from '@/react-ui/theme';

export type ActionButtonProps = PropsWithChildren & {
	onSuccess?: (successful: boolean) => any
	action: string
	method: HttpMethod
	label?: string
	icon?: ReactNode
	variant?: 'outlined'|'contained'|'text',
	sx?: SxProps<Theme>
	color?: ExtensibleColor<ButtonPropsColorOverrides>
}

export default function ActionButton(props: ActionButtonProps) {
	const {
		children,
		onSuccess,
		action,
		method,
		label,
		icon,
		sx,
		color
	} = props;

	const {
		variant = label ? 'contained' : 'text'
	} = props;

	const formId = useId();
	const formRef = useRef<HTMLFormElement>(null);

	const AButton: ExtendButtonBase<ButtonTypeMap&IconButtonTypeMap> = label ? Button : IconButton;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = await sendRequest<boolean>({
			url: action,
			method,
			body: new FormData(formRef.current!)
		});

		if (!result) return;
		onSuccess?.(result);
	}

	return (
		<AButton
			type='submit'
			color={color}
			form={formId}
			variant={variant}
			sx={sx}
		>
			{label || icon}
			<form
				id={formId}
				ref={formRef}
				style={{display:'none'}}
				onSubmit={handleSubmit}
			>
				{children}
			</form>
		</AButton>
	);
}