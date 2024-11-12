import { Link as MaterialLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { inject } from '@/react-utils';
import type { LinkProps as MaterialLinkProps } from '@mui/material';
import type { InjectionKey } from '@/react-utils';

export type LinkProps = Omit<MaterialLinkProps<typeof RouterLink>, 'to'> & {
	to: string|InjectionKey<string>
}

export default function Link(props: LinkProps) {
	const { to } = props;
	const href = typeof to === 'string'
		? to
		: inject(to);

	return (
		<MaterialLink
			component={RouterLink}
			{...props}
			to={href}
		/>
	);
}