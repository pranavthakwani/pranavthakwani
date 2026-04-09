import { Metadata } from 'next';

import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { isAdminAuthenticated } from '@/lib/auth';
import { summarizeAnalytics } from '@/lib/analytics-store';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Portfolio Analytics',
  description: 'Protected analytics dashboard for portfolio monitoring and interaction insights.',
};

export default async function AdminPage() {
  if (!isAdminAuthenticated()) {
    return <AdminLogin />;
  }

  const analytics = await summarizeAnalytics();
  return <AdminDashboard initialData={analytics} />;
}
