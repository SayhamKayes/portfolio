import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { z as Route$4, A as deletePortfolioItem, B as restorePortfolioItem, C as permanentlyDeletePortfolioItem, D as editPortfolioItem, E as addPortfolioItem } from "./router-Dk3yfq2s.mjs";
import { u as uploadImage } from "./upload-BMTObbLK.mjs";
import "../_libs/seroval.mjs";
import { x as Plus, z as Pen, T as Trash2, R as RefreshCw, E as Trash, X, F as Upload } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
const BASE_CATEGORIES = ["Full Stack", "AI / ML", "Mobile", "SaaS"];
function PortfolioPage() {
  const {
    active,
    deleted
  } = Route$4.useLoaderData();
  const router = useRouter();
  const [activeTab, setActiveTab] = reactExports.useState("active");
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [newCategory, setNewCategory] = reactExports.useState("");
  const [customCategories, setCustomCategories] = reactExports.useState([]);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    description: "",
    technologies: "",
    category: "",
    imageUrl: "",
    link: "",
    githubLink: ""
  });
  const handleDelete = async (id) => {
    if (confirm("Move to Recycle Bin?")) {
      await deletePortfolioItem({
        data: {
          id
        }
      });
      router.invalidate();
    }
  };
  const handleRestore = async (id) => {
    await restorePortfolioItem({
      data: {
        id
      }
    });
    router.invalidate();
  };
  const handlePermanentDelete = async (id) => {
    if (confirm("Permanently delete this project? This cannot be undone.")) {
      await permanentlyDeletePortfolioItem({
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
      title: item.title,
      description: item.description,
      technologies: item.technologies,
      category: item.category || "",
      imageUrl: item.imageUrl || "",
      link: item.link || "",
      githubLink: item.githubLink || ""
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };
  const openAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      technologies: "",
      category: "",
      imageUrl: "",
      link: "",
      githubLink: ""
    });
    setSelectedFile(null);
    setNewCategory("");
    setIsModalOpen(true);
  };
  const compressImage = (file, maxWidth = 1e3) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL(file.type, 0.8));
        };
        img.onerror = (e) => reject(e);
      };
      reader.onerror = (e) => reject(e);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let uploadedUrl = formData.imageUrl;
      if (selectedFile) {
        const base64Data = await compressImage(selectedFile);
        const res = await uploadImage({
          data: {
            filename: selectedFile.name,
            contentType: selectedFile.type,
            base64Data
          }
        });
        if (res) uploadedUrl = res;
      }
      const finalData = {
        ...formData,
        imageUrl: uploadedUrl
      };
      if (editingId) {
        await editPortfolioItem({
          data: {
            id: editingId,
            ...finalData
          }
        });
      } else {
        await addPortfolioItem({
          data: finalData
        });
      }
      setIsModalOpen(false);
      router.invalidate();
    } catch (error) {
      console.error("Failed to save portfolio item", error);
      alert("Failed to save. If you uploaded an image, it might still be too large.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const items = activeTab === "active" ? active : deleted;
  const allAvailableCategories = Array.from(/* @__PURE__ */ new Set([...BASE_CATEGORIES, ...active.flatMap((item) => item.category?.split(",") || []).map((c) => c.trim()), ...customCategories])).filter(Boolean);
  const selectedCategories = formData.category ? formData.category.split(",").map((c) => c.trim()).filter(Boolean) : [];
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setFormData({
        ...formData,
        category: selectedCategories.filter((c) => c !== cat).join(", ")
      });
    } else {
      setFormData({
        ...formData,
        category: [...selectedCategories, cat].join(", ")
      });
    }
  };
  const handleAddNewCategory = (e) => {
    e.preventDefault();
    const cat = newCategory.trim();
    if (cat && !allAvailableCategories.includes(cat)) {
      setCustomCategories([...customCategories, cat]);
      setFormData({
        ...formData,
        category: [...selectedCategories, cat].join(", ")
      });
      setNewCategory("");
    } else if (cat && allAvailableCategories.includes(cat) && !selectedCategories.includes(cat)) {
      setFormData({
        ...formData,
        category: [...selectedCategories, cat].join(", ")
      });
      setNewCategory("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Manage Portfolio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openAdd, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add New" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 border-b border-gray-200 dark:border-zinc-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("active"), className: `pb-2 px-1 border-b-2 font-medium transition-colors ${activeTab === "active" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: [
        "Active Projects (",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Technologies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-8 text-center text-gray-500", children: activeTab === "active" ? "No active portfolio items found." : "Recycle bin is empty." }) }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 flex gap-3 items-center", children: [
          item.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.imageUrl, alt: "", className: "w-12 h-12 rounded object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 line-clamp-1", children: item.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-sm rounded", children: item.category || "None" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          item.technologies.split(",").filter(Boolean).slice(0, 3).map((tech, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded", children: tech.trim() }, i)),
          item.technologies.split(",").filter(Boolean).length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-xs rounded", children: "+" })
        ] }) }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: editingId ? "Edit Project" : "Add New Project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsModalOpen(false), className: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.title, onChange: (e) => setFormData({
            ...formData,
            title: e.target.value
          }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: allAvailableCategories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toggleCategory(c), className: `px-3 py-1 text-sm rounded-full border transition-colors ${selectedCategories.includes(c) ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 dark:bg-zinc-800 border-transparent hover:border-blue-600"}`, children: c }, c)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: newCategory, onChange: (e) => setNewCategory(e.target.value), placeholder: "Add new category...", className: "flex-1 p-2 text-sm rounded border border-gray-300 dark:border-zinc-700 bg-transparent", onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddNewCategory(e);
              }
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleAddNewCategory, disabled: !newCategory.trim(), className: "px-3 py-2 bg-gray-200 dark:bg-zinc-700 rounded text-sm font-medium disabled:opacity-50", children: "Add" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: formData.description, onChange: (e) => setFormData({
            ...formData,
            description: e.target.value
          }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[100px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Technologies (comma separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.technologies, onChange: (e) => setFormData({
            ...formData,
            technologies: e.target.value
          }), placeholder: "React, TypeScript, Tailwind", className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => setSelectedFile(e.target.files?.[0] || null), className: "hidden", id: "image-upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "image-upload", className: "flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
              " Choose File"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 truncate max-w-[200px]", children: selectedFile ? selectedFile.name : formData.imageUrl ? "Existing image selected" : "No file chosen" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Project Link (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.link, onChange: (e) => setFormData({
            ...formData,
            link: e.target.value
          }), placeholder: "https://...", className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "GitHub Link (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.githubLink, onChange: (e) => setFormData({
            ...formData,
            githubLink: e.target.value
          }), placeholder: "https://github.com/...", className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50", children: isSubmitting ? "Saving..." : "Save Project" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PortfolioPage as component
};
