import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { l as login, v as verify2FA } from "./router-FAyYDvWX.mjs";
import "../_libs/seroval.mjs";
import { L as Lock, U as User, K as KeyRound, S as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [needs2FA, setNeeds2FA] = reactExports.useState(false);
  const [userId, setUserId] = reactExports.useState("");
  const [code, setCode] = reactExports.useState("");
  const [selectedMode, setSelectedMode] = reactExports.useState("app");
  const [availableModes, setAvailableModes] = reactExports.useState({});
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await login({
        data: {
          username,
          password
        }
      });
      if (res.error) {
        setError(res.error);
      } else if (res.requires2FA) {
        setNeeds2FA(true);
        setUserId(res.userId);
        setAvailableModes(res.modes);
        if (res.modes?.app) setSelectedMode("app");
        else if (res.modes?.email) setSelectedMode("email");
        else if (res.modes?.phone) setSelectedMode("phone");
      } else if (res.success) {
        router.navigate({
          to: "/admin"
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };
  const handle2FA = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await verify2FA({
        data: {
          userId,
          code,
          mode: selectedMode
        }
      });
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        router.navigate({
          to: "/admin"
        });
      }
    } catch (err) {
      setError("An error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 32 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Admin Login" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-2", children: "Sign in to manage your portfolio" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6", children: error }),
    !needs2FA ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none", placeholder: "Enter username", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-sm text-blue-600 dark:text-blue-400 hover:underline", children: "Forgot password?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none", placeholder: "••••••••", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 mt-2", children: isLoading ? "Signing in..." : "Sign In" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handle2FA, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Two-factor authentication is enabled. Please select your verification method and enter the code." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-orange-500 mt-2", children: "(Use code: 123456 for testing)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center mb-4", children: [
        availableModes.app && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelectedMode("app"), className: `px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedMode === "app" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"}`, children: "App" }),
        availableModes.email && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelectedMode("email"), className: `px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedMode === "email" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"}`, children: "Email" }),
        availableModes.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelectedMode("phone"), className: `px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedMode === "phone" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"}`, children: "Phone" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Verification Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: code, onChange: (e) => setCode(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none", placeholder: "Enter 6-digit code", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 mt-2", children: isLoading ? "Verifying..." : "Verify & Sign In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setNeeds2FA(false), className: "w-full py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: "Cancel" })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
