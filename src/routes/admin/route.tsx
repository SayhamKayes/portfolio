import { createFileRoute, Outlet, Link, redirect, useRouter } from '@tanstack/react-router';
import { LayoutDashboard, Settings, Briefcase, Code, GraduationCap, Building, Globe, Sliders, LogOut, Menu, X } from 'lucide-react';
import { getSessionUser, logout } from '../../server/auth';
import { useState } from 'react';

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const user = await getSessionUser();
    if (!user) {
      throw redirect({ to: '/login' });
    }
  },
  head: () => ({
    meta: [
      { title: "Sayham Kayes | Admin Panel" }
    ]
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: '/login' });
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={closeSidebar} className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            to="/admin"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/portfolio"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <Briefcase size={20} />
            <span>Portfolio</span>
          </Link>
          <Link
            to="/admin/skills"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <Code size={20} />
            <span>Skills</span>
          </Link>
          <Link
            to="/admin/experience"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <Building size={20} />
            <span>Experience</span>
          </Link>
          <Link
            to="/admin/education"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <GraduationCap size={20} />
            <span>Education</span>
          </Link>
          <Link
            to="/admin/testimonials"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Testimonials</span>
          </Link>
          <Link
            to="/admin/global-clients"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <Globe size={20} />
            <span>Global Clients</span>
          </Link>
          <Link
            to="/admin/inbox"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path><polyline points="15,9 18,9 22,9"></polyline><path d="m22 9-8.9 5.5a2 2 0 0 1-2.2 0L2 9"></path></svg>
            <span>Inbox</span>
          </Link>
          <Link
            to="/admin/settings"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800"
          >
            <Sliders size={20} />
            <span>Profile Settings</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800 flex flex-col space-y-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          <Link
            to="/"
            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            &larr; Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col h-screen">
        <header className="md:hidden bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 p-4 flex items-center shrink-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold ml-4">Admin Panel</h1>
        </header>
        <div className="p-4 md:p-8 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
