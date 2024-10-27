import menuSetup from './menus';
import partialSetup from './partials';
import storeSetup from './stores';
import urlSetup from './urls';
import viewSetup from './views';

export default function () {
	// URL setup must come first because menu setup depends on certain URLs existing
	urlSetup();

	// Everything else can proceed in any order
	menuSetup();
	partialSetup();
	storeSetup();
	viewSetup();
}