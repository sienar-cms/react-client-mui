import { Outlet } from 'react-router-dom';

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard layout</h1>
			<Outlet/>
		</div>
	);
}