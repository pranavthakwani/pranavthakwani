import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Portfolio Analytics',
  description: 'Private analytics dashboard for portfolio monitoring',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
