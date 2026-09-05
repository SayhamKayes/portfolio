import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { d as Route$7, e as deleteTestimonial, f as restoreTestimonial, p as permanentlyDeleteTestimonial, g as editTestimonial, h as addTestimonial } from "./router-FAyYDvWX.mjs";
import { u as uploadImage } from "./upload-qaokGsyK.mjs";
import "../_libs/seroval.mjs";
import { x as Plus, y as CircleUser, z as Pen, T as Trash2, R as RefreshCw, E as Trash, X, F as Upload } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
function TestimonialsPage() {
  const {
    active,
    deleted
  } = Route$7.useLoaderData();
  const router = useRouter();
  const [activeTab, setActiveTab] = reactExports.useState("active");
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    designation: "",
    content: "",
    avatarUrl: "",
    screenshotUrl: ""
  });
  const [uploadMode, setUploadMode] = reactExports.useState("manual");
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [screenshotFile, setScreenshotFile] = reactExports.useState(null);
  const handleDelete = async (id) => {
    if (confirm("Move to Recycle Bin?")) {
      await deleteTestimonial({
        data: {
          id
        }
      });
      router.invalidate();
    }
  };
  const handleRestore = async (id) => {
    await restoreTestimonial({
      data: {
        id
      }
    });
    router.invalidate();
  };
  const handlePermanentDelete = async (id) => {
    if (confirm("Permanently delete this testimonial?")) {
      await permanentlyDeleteTestimonial({
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
      designation: item.designation,
      content: item.content || "",
      avatarUrl: item.avatarUrl || "",
      screenshotUrl: item.screenshotUrl || ""
    });
    setUploadMode(item.screenshotUrl ? "screenshot" : "manual");
    setSelectedFile(null);
    setScreenshotFile(null);
    setIsModalOpen(true);
  };
  const openAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      designation: "",
      content: "",
      avatarUrl: "",
      screenshotUrl: ""
    });
    setUploadMode("manual");
    setSelectedFile(null);
    setScreenshotFile(null);
    setIsModalOpen(true);
  };
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let uploadedUrl = formData.avatarUrl;
    let uploadedScreenshot = formData.screenshotUrl;
    if (uploadMode === "manual" && selectedFile) {
      const base64Data = await toBase64(selectedFile);
      const res = await uploadImage({
        data: {
          filename: selectedFile.name,
          contentType: selectedFile.type,
          base64Data
        }
      });
      if (res) uploadedUrl = res;
    }
    if (uploadMode === "screenshot" && screenshotFile) {
      const base64Data = await toBase64(screenshotFile);
      const res = await uploadImage({
        data: {
          filename: screenshotFile.name,
          contentType: screenshotFile.type,
          base64Data
        }
      });
      if (res) uploadedScreenshot = res;
    }
    const finalData = {
      ...formData,
      avatarUrl: uploadMode === "manual" ? uploadedUrl : "",
      screenshotUrl: uploadMode === "screenshot" ? uploadedScreenshot : "",
      content: uploadMode === "manual" ? formData.content : ""
    };
    if (editingId) {
      await editTestimonial({
        data: {
          id: editingId,
          ...finalData
        }
      });
    } else {
      await addTestimonial({
        data: finalData
      });
    }
    setIsSubmitting(false);
    setIsModalOpen(false);
    router.invalidate();
  };
  const items = activeTab === "active" ? active : deleted;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Manage Testimonials" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openAdd, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add New" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 border-b border-gray-200 dark:border-zinc-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("active"), className: `pb-2 px-1 border-b-2 font-medium transition-colors ${activeTab === "active" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: [
        "Active Testimonials (",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400", children: "Feedback" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-gray-500 dark:text-gray-400 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "p-8 text-center text-gray-500", children: activeTab === "active" ? "No active testimonials found." : "Recycle bin is empty." }) }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 flex gap-3 items-center", children: [
          item.screenshotUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-10 bg-gray-100 dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.screenshotUrl, alt: "Screenshot", className: "w-full h-full object-cover" }) }) : item.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.avatarUrl, alt: "", className: "w-10 h-10 rounded-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: item.name || "N/A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: item.designation || "Screenshot Testimonial" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: item.screenshotUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400 italic", children: "Screenshot uploaded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm line-clamp-2 max-w-lg", children: item.content }) }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: editingId ? "Edit Testimonial" : "Add New Testimonial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsModalOpen(false), className: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4 bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setUploadMode("manual"), className: `flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${uploadMode === "manual" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Add Manually" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setUploadMode("screenshot"), className: `flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${uploadMode === "screenshot" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Upload Screenshot" })
        ] }),
        uploadMode === "manual" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Client Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.name, onChange: (e) => setFormData({
                ...formData,
                name: e.target.value
              }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Designation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.designation, onChange: (e) => setFormData({
                ...formData,
                designation: e.target.value
              }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Client Avatar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => setSelectedFile(e.target.files?.[0] || null), className: "hidden", id: "avatar-upload" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "avatar-upload", className: "flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
                " Choose File"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 truncate max-w-[200px]", children: selectedFile ? selectedFile.name : formData.avatarUrl ? "Existing image selected" : "No file chosen" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Feedback" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: formData.content, onChange: (e) => setFormData({
              ...formData,
              content: e.target.value
            }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[100px]" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium mb-1", children: [
                "Identifier (Name) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 font-normal", children: "(Optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData({
                ...formData,
                name: e.target.value
              }), placeholder: "e.g. John Doe Screenshot", className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium mb-1", children: [
                "Platform (Designation) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 font-normal", children: "(Optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.designation, onChange: (e) => setFormData({
                ...formData,
                designation: e.target.value
              }), placeholder: "e.g. Fiverr Review", className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Testimonial Screenshot Image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: !formData.screenshotUrl, type: "file", accept: "image/*", onChange: (e) => setScreenshotFile(e.target.files?.[0] || null), className: "hidden", id: "screenshot-upload" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "screenshot-upload", className: "flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
                " Choose File"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 truncate max-w-[200px]", children: screenshotFile ? screenshotFile.name : formData.screenshotUrl ? "Existing image selected" : "No file chosen" })
            ] }),
            formData.screenshotUrl && !screenshotFile && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: formData.screenshotUrl, alt: "Preview", className: "mt-4 max-w-[200px] rounded border border-gray-200 dark:border-zinc-700" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50", children: isSubmitting ? "Saving..." : "Save Testimonial" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  TestimonialsPage as component
};
