import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { G as Route$3, H as markMessageRead, I as deleteMessage, J as replyToMessage } from "./router-BWXE6ZyD.mjs";
import "../_libs/seroval.mjs";
import { Y as Clock, T as Trash2, Z as Reply } from "../_libs/lucide-react.mjs";
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
function InboxPage() {
  const messages = Route$3.useLoaderData();
  const router = useRouter();
  const [activeMessage, setActiveMessage] = reactExports.useState(null);
  const [replyContent, setReplyContent] = reactExports.useState("");
  const [isReplying, setIsReplying] = reactExports.useState(false);
  const selectedMsg = messages.find((m) => m.id === activeMessage);
  const handleMarkRead = async (id, currentStatus) => {
    if (!currentStatus) {
      await markMessageRead({
        data: {
          id
        }
      });
      router.invalidate();
    }
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteMessage({
        data: {
          id
        }
      });
      if (activeMessage === id) setActiveMessage(null);
      router.invalidate();
    }
  };
  const handleReply = async (e) => {
    e.preventDefault();
    if (!activeMessage) return;
    setIsReplying(true);
    await replyToMessage({
      data: {
        id: activeMessage,
        replyContent
      }
    });
    setIsReplying(false);
    setReplyContent("");
    alert("Reply sent successfully!");
    router.invalidate();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[calc(100vh-4rem)] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-6", children: "Inbox" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 flex flex-col overflow-y-auto", children: messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-gray-500", children: "No messages yet." }) : messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => {
        setActiveMessage(msg.id);
        handleMarkRead(msg.id, msg.isRead);
      }, className: `p-4 border-b border-gray-200 dark:border-zinc-800 cursor-pointer transition-colors ${activeMessage === msg.id ? "bg-blue-50 dark:bg-zinc-800" : !msg.isRead ? "bg-gray-50 dark:bg-zinc-900/50 font-semibold" : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate pr-2", children: msg.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 whitespace-nowrap", children: new Date(msg.createdAt).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm truncate text-gray-600 dark:text-gray-400", children: msg.subject || "No Subject" })
      ] }, msg.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col bg-gray-50 dark:bg-zinc-950/50", children: selectedMsg ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: selectedMsg.subject || "No Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
              "From: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900 dark:text-white", children: selectedMsg.name }),
              " <",
              selectedMsg.email,
              ">"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
              " ",
              new Date(selectedMsg.createdAt).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(selectedMsg.id), className: "p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors", title: "Delete Message", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex-1 overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-zinc-800", children: selectedMsg.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { size: 18 }),
              " Reply"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReply, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: replyContent, onChange: (e) => setReplyContent(e.target.value), placeholder: `Type your reply to ${selectedMsg.name}...`, className: "w-full p-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 min-h-[150px]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "* Sending emails currently simulates a console log." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isReplying, className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50", children: isReplying ? "Sending..." : "Send Reply" })
              ] })
            ] })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center text-gray-500", children: "Select a message to read and reply." }) })
    ] })
  ] });
}
export {
  InboxPage as component
};
