import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { a as LayoutDashboard, B as Briefcase, C as Code, b as Building, G as GraduationCap, c as Globe, d as SlidersVertical } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
function AdminLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-gray-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-gray-200 dark:border-zinc-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Admin Panel" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 p-4 space-y-2 overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dashboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/portfolio", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Portfolio" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/skills", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Skills" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/experience", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Experience" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/education", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Education" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/testimonials", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Testimonials" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/global-clients", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Global Clients" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/inbox", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "15,9 18,9 22,9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m22 9-8.9 5.5a2 2 0 0 1-2.2 0L2 9" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Inbox" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/settings", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 [&.active]:bg-gray-100 dark:[&.active]:bg-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersVertical, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Profile Settings" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-gray-200 dark:border-zinc-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-gray-500 dark:text-gray-400 hover:underline", children: "← Back to Site" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) })
  ] });
}
export {
  AdminLayout as component
};
