import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { X as Route, Y as deleteEducation, Z as restoreEducation, _ as permanentlyDeleteEducation, $ as editEducation, a0 as addEducation } from "./router-Dk3yfq2s.mjs";
import "../_libs/seroval.mjs";
import { x as Plus, z as Pen, T as Trash2, R as RefreshCw, E as Trash, X } from "../_libs/lucide-react.mjs";
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
import "./server-CqYADRQX.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function EducationPage() {
  const {
    active,
    deleted
  } = Route.useLoaderData();
  const router = useRouter();
  const [activeTab, setActiveTab] = reactExports.useState("active");
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    degree: "",
    institution: "",
    duration: "",
    description: ""
  });
  const handleDelete = async (id) => {
    if (confirm("Move to Recycle Bin?")) {
      await deleteEducation({
        data: {
          id
        }
      });
      router.invalidate();
    }
  };
  const handleRestore = async (id) => {
    await restoreEducation({
      data: {
        id
      }
    });
    router.invalidate();
  };
  const handlePermanentDelete = async (id) => {
    if (confirm("Permanently delete this education?")) {
      await permanentlyDeleteEducation({
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
      degree: item.degree,
      institution: item.institution,
      duration: item.duration,
      description: item.description || ""
    });
    setIsModalOpen(true);
  };
  const openAdd = () => {
    setEditingId(null);
    setFormData({
      degree: "",
      institution: "",
      duration: "",
      description: ""
    });
    setIsModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (editingId) {
      await editEducation({
        data: {
          id: editingId,
          ...formData
        }
      });
    } else {
      await addEducation({
        data: formData
      });
    }
    setIsSubmitting(false);
    setIsModalOpen(false);
    router.invalidate();
  };
  const items = activeTab === "active" ? active : deleted;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Manage Education" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openAdd, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add New" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 border-b border-gray-200 dark:border-zinc-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("active"), className: `pb-2 px-1 border-b-2 font-medium transition-colors ${activeTab === "active" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: [
        "Active Education (",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Degree & Institution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "p-8 text-center text-gray-500", children: activeTab === "active" ? "No active education found." : "Recycle bin is empty." }) }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: item.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: item.institution }),
          item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 line-clamp-1", children: item.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-sm", children: item.duration }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end gap-2", children: activeTab === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(item), className: "p-2 text-gray-500 hover:text-blue-600 transition-colors", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(item.id), className: "p-2 text-gray-500 hover:text-red-600 transition-colors", title: "Move to Recycle Bin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleRestore(item.id), className: "p-2 text-gray-500 hover:text-green-600 transition-colors", title: "Restore", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handlePermanentDelete(item.id), className: "p-2 text-gray-500 hover:text-red-600 transition-colors", title: "Permanently Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { size: 18 }) })
        ] }) }) })
      ] }, item.id)) })
    ] }) }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-zinc-900 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-zinc-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-4 border-b border-gray-200 dark:border-zinc-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: editingId ? "Edit Education" : "Add New Education" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsModalOpen(false), className: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Degree" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.degree, onChange: (e) => setFormData({
            ...formData,
            degree: e.target.value
          }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Institution" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.institution, onChange: (e) => setFormData({
            ...formData,
            institution: e.target.value
          }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.duration, onChange: (e) => setFormData({
            ...formData,
            duration: e.target.value
          }), placeholder: "e.g. 2018 - 2022", className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Description (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: formData.description, onChange: (e) => setFormData({
            ...formData,
            description: e.target.value
          }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[100px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50", children: isSubmitting ? "Saving..." : "Save Education" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  EducationPage as component
};
