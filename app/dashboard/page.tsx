import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard';

export default async function DashboardPage() {
	const session = await getServerSession();

	if (!session) {
		redirect('/');
	}

	return <DashboardClient />;
}
