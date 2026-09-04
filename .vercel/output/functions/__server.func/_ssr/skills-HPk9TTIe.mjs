import { r as reactExports, j as jsxRuntimeExports, R as React } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { h as Route$6, i as deleteSkill, j as restoreSkill, k as permanentlyDeleteSkill, m as editSkill, n as addSkill } from "./router-BWXE6ZyD.mjs";
import "../_libs/seroval.mjs";
import { w as Plus, y as Pen, T as Trash2, R as RefreshCw, z as Trash, X } from "../_libs/lucide-react.mjs";
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
import "./server-BfymR8CN.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const SKILL_CATEGORIES = ["Frontend", "Backend", "Database", "Data & AI", "Tools & DevOps", "Soft Skills", "Other"];
function SkillsPage() {
  const {
    active,
    deleted
  } = Route$6.useLoaderData();
  const router = useRouter();
  const [activeTab, setActiveTab] = reactExports.useState("active");
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    category: SKILL_CATEGORIES[0],
    level: 50,
    icon: ""
  });
  const handleDelete = async (id) => {
    if (confirm("Move to Recycle Bin?")) {
      await deleteSkill({
        data: {
          id
        }
      });
      router.invalidate();
    }
  };
  const handleRestore = async (id) => {
    await restoreSkill({
      data: {
        id
      }
    });
    router.invalidate();
  };
  const handlePermanentDelete = async (id) => {
    if (confirm("Permanently delete this skill?")) {
      await permanentlyDeleteSkill({
        data: {
          id
        }
      });
      router.invalidate();
    }
  };
  const openEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      category: item.category || SKILL_CATEGORIES[0],
      level: item.level || 50,
      icon: item.icon || ""
    });
    setIsModalOpen(true);
  };
  const openAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: SKILL_CATEGORIES[0],
      level: 50,
      icon: ""
    });
    setIsModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (editingId) {
      await editSkill({
        data: {
          id: editingId,
          ...formData,
          level: Number(formData.level)
        }
      });
    } else {
      await addSkill({
        data: {
          ...formData,
          level: Number(formData.level)
        }
      });
    }
    setIsSubmitting(false);
    setIsModalOpen(false);
    router.invalidate();
  };
  const items = activeTab === "active" ? active : deleted;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Manage Skills" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openAdd, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add New" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 border-b border-gray-200 dark:border-zinc-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("active"), className: `pb-2 px-1 border-b-2 font-medium transition-colors ${activeTab === "active" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: [
        "Active Skills (",
        active.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("deleted"), className: `pb-2 px-1 border-b-2 font-medium transition-colors ${activeTab === "deleted" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: [
        "Recycle Bin (",
        deleted.length,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Skill Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Proficiency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "p-8 text-center text-gray-500", children: activeTab === "active" ? "No active skills found." : "Recycle bin is empty." }) }) : activeTab === "active" ? SKILL_CATEGORIES.map((category) => {
        const categoryItems = items.filter((item) => (item.category || "Other") === category);
        if (categoryItems.length === 0) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-gray-100/50 dark:bg-zinc-800/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "p-3 font-bold text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-800", children: category }) }),
          categoryItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5 max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-600 h-2.5 rounded-full", style: {
                width: `${item.level}%`
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500 mt-1", children: [
                item.level,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(item), className: "p-2 text-gray-500 hover:text-blue-600 transition-colors", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 18 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(item.id), className: "p-2 text-gray-500 hover:text-red-600 transition-colors", title: "Move to Recycle Bin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 }) })
            ] }) })
          ] }, item.id))
        ] }, category);
      }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 font-medium", children: [
          item.name,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-xs rounded text-gray-500", children: item.category || "Other" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5 max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-600 h-2.5 rounded-full", style: {
            width: `${item.level}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500 mt-1", children: [
            item.level,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleRestore(item.id), className: "p-2 text-gray-500 hover:text-green-600 transition-colors", title: "Restore", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handlePermanentDelete(item.id), className: "p-2 text-gray-500 hover:text-red-600 transition-colors", title: "Permanently Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { size: 18 }) })
        ] }) })
      ] }, item.id)) })
    ] }) }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-zinc-900 rounded-xl max-w-sm w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-zinc-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-4 border-b border-gray-200 dark:border-zinc-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: editingId ? "Edit Skill" : "Add New Skill" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsModalOpen(false), className: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.name, onChange: (e) => setFormData({
            ...formData,
            name: e.target.value
          }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: formData.category, onChange: (e) => setFormData({
            ...formData,
            category: e.target.value
          }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent", children: SKILL_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium mb-1", children: [
            "Proficiency Level (",
            formData.level,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "0", max: "100", value: formData.level, onChange: (e) => setFormData({
            ...formData,
            level: parseInt(e.target.value)
          }), className: "w-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Icon SVG (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.icon, onChange: (e) => setFormData({
            ...formData,
            icon: e.target.value
          }), placeholder: "<svg>...</svg>", className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent font-mono text-xs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50", children: isSubmitting ? "Saving..." : "Save Skill" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SkillsPage as component
};
