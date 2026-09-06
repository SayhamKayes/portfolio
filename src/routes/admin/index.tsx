import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { LayoutDashboard, Users, Briefcase, Code, MessageSquare, Globe, Settings, LogOut } from 'lucide-react';
import { getDashboardStats } from '../../server/admin';
import { logout } from '../../server/auth';
import { useEffect } from 'react';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
  loader: async () => await getDashboardStats(),
});

function AdminDashboard() {
  const stats = Route.useLoaderData();
  const router = useRouter();

  // Real-time updates via polling (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      (window as any).__IS_AUTO_UPDATE__ = true;
      router.invalidate().finally(() => {
        (window as any).__IS_AUTO_UPDATE__ = false;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: '/login' });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
            <p className="text-2xl font-bold">{stats.totalProjects}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
            <Code size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Skills</p>
            <p className="text-2xl font-bold">{stats.totalSkills}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Profile Views</p>
            <p className="text-2xl font-bold">{stats.profileViews}</p>
          </div>
        </div>

        <Link to="/admin/inbox" className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center gap-4 hover:border-blue-500 transition-colors cursor-pointer group">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Messages / Inbox</p>
            <p className="text-2xl font-bold">
              {stats.totalMessages} 
              {stats.unreadMessages > 0 && (
                <span className="text-sm text-red-500 ml-2">({stats.unreadMessages} new)</span>
              )}
            </p>
          </div>
        </Link>
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Global Clients</p>
            <p className="text-2xl font-bold">{stats.totalGlobalClients}</p>
          </div>
        </div>

        <Link to="/admin/settings" className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center gap-4 hover:border-blue-500 transition-colors cursor-pointer group">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
            <Settings size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Administration</p>
            <p className="text-xl font-bold">Profile Settings</p>
          </div>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 mt-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Welcome to Admin Panel</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is your central hub for managing your portfolio content. Use the sidebar to navigate to different sections.
          </p>
        </div>
        <button 
          onClick={handleLogout} 
          className="mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
