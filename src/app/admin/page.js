import AdminView from '@/components/AdminView';

export const metadata = { title: 'Admin dashboard', robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminView />;
}
