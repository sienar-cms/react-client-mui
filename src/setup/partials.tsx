import { DRAWER_FOOTER_PARTIAL, provide } from '@/react-utils';
import DrawerFooter from '@/partials/DrawerFooter';

export default function() {
	provide(DRAWER_FOOTER_PARTIAL, <DrawerFooter/>, false);
}