import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { b as logout } from "./router-FAyYDvWX.mjs";
import "../_libs/seroval.mjs";
import { X, a as LayoutDashboard, B as Briefcase, C as Code, b as Building, G as GraduationCap, c as Globe, d as SlidersVertical, e as LogOut, M as Menu } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-CCVmfZ8C.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function AdminLayout() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = reactExports.useState(false);
  const handleLogout = async () => {
    await logout();
    router.navigate({
      to: "/login"
    });
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 overflow-hidden", children: [
    isSidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 z-40 md:hidden", onClick: closeSidebar }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: closeSidebar, className: "md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 p-4 space-y-2 overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dashboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/portfolio", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Portfolio" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/skills", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Skills" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/experience", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Experience" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/education", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Education" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/testimonials", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Testimonials" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/global-clients", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Global Clients" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/inbox", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "15,9 18,9 22,9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m22 9-8.9 5.5a2 2 0 0 1-2.2 0L2 9" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Inbox" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/settings", onClick: closeSidebar, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersVertical, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Profile Settings" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-gray-200 dark:border-zinc-800 flex flex-col space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "flex w-full items-center gap-3 px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logout" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:underline", children: "← Back to Site" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-auto flex flex-col h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "md:hidden bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 p-4 flex items-center shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsSidebarOpen(true), className: "p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold ml-4", children: "Admin Panel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 md:p-8 flex-1 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
