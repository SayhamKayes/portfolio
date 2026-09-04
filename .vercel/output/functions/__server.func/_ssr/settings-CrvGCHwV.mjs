import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { q as Route$5, s as getSiteSettingBackups, t as getLoginSettings, u as updateSiteSetting, w as createSiteSettingBackup, x as deleteSiteSettingBackup, b as logout, y as updateLoginSettings } from "./router-Dk3yfq2s.mjs";
import { u as uploadImage } from "./upload-BMTObbLK.mjs";
import "../_libs/seroval.mjs";
import { H as Save, I as Palette, J as Type, N as House, U as User, h as Mail, L as Lock, O as RotateCcw, F as Upload, V as History, T as Trash2, e as LogOut } from "../_libs/lucide-react.mjs";
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
const TYPOGRAPHY_KEYS = [{
  key: "globalFont",
  label: "Global Font Family (Default)"
}, {
  key: "headingFont",
  label: "Heading Font Family"
}, {
  key: "pFont",
  label: "Paragraph Font Family"
}];
const FONTS = [{
  value: "",
  label: "Default (Inter)"
}, {
  value: "Roboto",
  label: "Roboto"
}, {
  value: "Outfit",
  label: "Outfit"
}, {
  value: "Poppins",
  label: "Poppins"
}, {
  value: "Playfair Display",
  label: "Playfair Display"
}, {
  value: "Fira Code",
  label: "Fira Code (Monospace)"
}];
function SettingsPage() {
  const {
    settings,
    skills
  } = Route$5.useLoaderData();
  const [activeTab, setActiveTab] = reactExports.useState("color_mode");
  const [formData, setFormData] = reactExports.useState(() => {
    const initialState = {};
    settings.forEach((s) => {
      initialState[s.key] = s.value;
    });
    return initialState;
  });
  const [heroImageFile, setHeroImageFile] = reactExports.useState(null);
  const [aboutImageFile, setAboutImageFile] = reactExports.useState(null);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const handleSpecialityToggle = (skillName) => {
    const currentStr = formData["heroSpecialities"] || "";
    const current = currentStr.split(",").map((s) => s.trim()).filter(Boolean);
    if (current.includes(skillName)) {
      handleChange("heroSpecialities", current.filter((s) => s !== skillName).join(", "));
    } else {
      if (current.length >= 5) {
        alert("Maximum 5 skills allowed!");
        return;
      }
      handleChange("heroSpecialities", [...current, skillName].join(", "));
    }
  };
  const handleResetTypography = () => {
    if (confirm("Are you sure you want to reset all typography to default?")) {
      const newForm = {
        ...formData
      };
      TYPOGRAPHY_KEYS.forEach((t) => {
        newForm[t.key] = "";
      });
      setFormData(newForm);
    }
  };
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1200;
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const dataToSave = {
        ...formData
      };
      if (heroImageFile) {
        const base64Data = await toBase64(heroImageFile);
        const res = await uploadImage({
          data: {
            filename: heroImageFile.name,
            contentType: heroImageFile.type,
            base64Data
          }
        });
        if (res) dataToSave.heroImage = res;
      }
      if (aboutImageFile) {
        const base64Data = await toBase64(aboutImageFile);
        const res = await uploadImage({
          data: {
            filename: aboutImageFile.name,
            contentType: aboutImageFile.type,
            base64Data
          }
        });
        if (res) dataToSave.aboutProfilePic = res;
      }
      const promises = Object.entries(dataToSave).map(([key, value]) => {
        return updateSiteSetting({
          data: {
            key,
            value
          }
        });
      });
      await Promise.all(promises);
      setFormData(dataToSave);
      setHeroImageFile(null);
      setAboutImageFile(null);
      alert("Settings saved successfully!");
    } catch (e) {
      alert("Failed to save settings");
    }
    setIsSaving(false);
  };
  const [backups, setBackups] = reactExports.useState([]);
  const router = useRouter();
  reactExports.useEffect(() => {
    getSiteSettingBackups().then(setBackups);
  }, []);
  const handleCreateHeroBackup = async () => {
    const heroData = {
      heroName: formData["heroName"] || "",
      heroDesignation: formData["heroDesignation"] || "",
      heroDescription: formData["heroDescription"] || "",
      heroImage: formData["heroImage"] || ""
    };
    await createSiteSettingBackup({
      data: {
        key: "hero_backup",
        value: JSON.stringify(heroData)
      }
    });
    getSiteSettingBackups().then(setBackups);
    alert("Backup created successfully!");
  };
  const handleRestoreHeroBackup = async (backupValue) => {
    if (confirm("Are you sure you want to restore this backup? Unsaved changes will be lost.")) {
      try {
        const parsed = JSON.parse(backupValue);
        setFormData((prev) => ({
          ...prev,
          ...parsed
        }));
        alert("Backup loaded into form. Click Save All Settings to apply.");
      } catch (e) {
        alert("Failed to parse backup data.");
      }
    }
  };
  const handleDeleteBackup = async (id) => {
    if (confirm("Delete this backup permanently?")) {
      await deleteSiteSettingBackup({
        data: {
          id
        }
      });
      getSiteSettingBackups().then(setBackups);
    }
  };
  const handleCreateAboutBackup = async () => {
    const aboutData = {
      aboutProfilePic: formData["aboutProfilePic"] || "",
      aboutDescription: formData["aboutDescription"] || "",
      aboutExpYears: formData["aboutExpYears"] || "",
      aboutProjects: formData["aboutProjects"] || "",
      aboutClients: formData["aboutClients"] || "",
      aboutCountries: formData["aboutCountries"] || "",
      aboutCard1Title: formData["aboutCard1Title"] || "",
      aboutCard1Desc: formData["aboutCard1Desc"] || "",
      aboutCard2Title: formData["aboutCard2Title"] || "",
      aboutCard2Desc: formData["aboutCard2Desc"] || "",
      aboutCard3Title: formData["aboutCard3Title"] || "",
      aboutCard3Desc: formData["aboutCard3Desc"] || "",
      aboutCard4Title: formData["aboutCard4Title"] || "",
      aboutCard4Desc: formData["aboutCard4Desc"] || ""
    };
    await createSiteSettingBackup({
      data: {
        key: "about_backup",
        value: JSON.stringify(aboutData)
      }
    });
    getSiteSettingBackups().then(setBackups);
    alert("Backup created successfully!");
  };
  const handleRestoreAboutBackup = async (backupValue) => {
    if (confirm("Are you sure you want to restore this backup? Unsaved changes will be lost.")) {
      try {
        const parsed = JSON.parse(backupValue);
        setFormData((prev) => ({
          ...prev,
          ...parsed
        }));
        alert("Backup loaded into form. Click Save All Settings to apply.");
      } catch (e) {
        alert("Failed to parse backup data.");
      }
    }
  };
  const tabs = [{
    id: "color_mode",
    label: "Color Mode",
    icon: Palette
  }, {
    id: "appearance",
    label: "Appearance",
    icon: Palette
  }, {
    id: "typography",
    label: "Typography",
    icon: Type
  }, {
    id: "hero",
    label: "Hero Section",
    icon: House
  }, {
    id: "about",
    label: "About & Stats",
    icon: User
  }, {
    id: "contact",
    label: "Contact & Social",
    icon: Mail
  }, {
    id: "login",
    label: "Login Settings",
    icon: Lock
  }];
  const [loginData, setLoginData] = reactExports.useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    emailVerification: false,
    phoneVerification: false,
    appVerification: false
  });
  reactExports.useEffect(() => {
    getLoginSettings().then((res) => {
      if (res) {
        setLoginData({
          ...loginData,
          username: res.username || "",
          email: res.email || "",
          phone: res.phone || "",
          emailVerification: res.emailVerification,
          phoneVerification: res.phoneVerification,
          appVerification: res.appVerification
        });
      }
    });
  }, []);
  const handleSaveLoginSettings = async () => {
    try {
      await updateLoginSettings({
        data: loginData
      });
      alert("Login settings saved successfully");
      setLoginData((prev) => ({
        ...prev,
        password: ""
      }));
    } catch (e) {
      alert("Failed to save login settings");
    }
  };
  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      await logout();
      router.navigate({
        to: "/login"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Site Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: isSaving, className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 18 }),
        isSaving ? "Saving..." : "Save All Settings"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row min-h-[600px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 p-4 space-y-2 bg-gray-50 dark:bg-zinc-900/50", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab(tab.id), className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { size: 18 }),
        tab.label
      ] }, tab.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 overflow-y-auto", children: [
        activeTab === "color_mode" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Color Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Choose a global color theme for your portfolio." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleChange("themeMode", ""), className: "flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 16 }),
              " Reset to Default"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [{
            value: "",
            label: "Dark (Default)"
          }, {
            value: "light",
            label: "Light"
          }, {
            value: "red-glass",
            label: "Reddish Glass"
          }, {
            value: "blue-glass",
            label: "Bluish Glass"
          }, {
            value: "green-glass",
            label: "Greenish Glass"
          }].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleChange("themeMode", mode.value), className: `p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${(formData["themeMode"] || "") === mode.value ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 ring-2 ring-blue-600/20" : "border-gray-200 dark:border-zinc-800 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: mode.label }) }, mode.value)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-4", children: "Selecting a mode will automatically adjust the base colors and glass effects across the entire site." })
        ] }),
        activeTab === "typography" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Typography" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Choose font families for different text elements." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleResetTypography, className: "flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 16 }),
              " Reset Fonts"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: TYPOGRAPHY_KEYS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: formData[item.key] || "", onChange: (e) => handleChange(item.key, e.target.value), className: "w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent", children: FONTS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.value, children: f.label }, f.value)) })
          ] }, item.key)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Selecting a font will automatically apply it via Google Fonts. Elements without a specific font will fall back to the Global Font." })
        ] }),
        activeTab === "hero" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Hero Section" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Main banner information." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleCreateHeroBackup, className: "flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
                " Create Backup"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                if (confirm("Reset Hero Section to defaults?")) {
                  setFormData((prev) => ({
                    ...prev,
                    heroName: "",
                    heroDesignation: "",
                    heroDescription: "",
                    heroImage: "",
                    heroSpecialities: ""
                  }));
                }
              }, className: "flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 16 }),
                " Reset"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData["heroName"] || "", onChange: (e) => handleChange("heroName", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Designation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData["heroDesignation"] || "", onChange: (e) => handleChange("heroDesignation", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: formData["heroDescription"] || "", onChange: (e) => handleChange("heroDescription", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[100px]" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Hero Image" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
                  (heroImageFile || formData["heroImage"]) && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImageFile ? URL.createObjectURL(heroImageFile) : formData["heroImage"], className: "w-16 h-16 rounded object-cover border border-gray-200 dark:border-zinc-700", alt: "Hero preview" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => setHeroImageFile(e.target.files?.[0] || null), className: "hidden", id: "hero-upload" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "hero-upload", className: "flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium w-fit", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
                      " ",
                      heroImageFile ? "Change File" : "Upload Image"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: heroImageFile ? heroImageFile.name : formData["heroImage"] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 18 }),
                " Backup History"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: backups.filter((b) => b.key === "hero_backup").length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "No backups available." }) : backups.filter((b) => b.key === "hero_backup").map((backup) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-gray-200 dark:border-zinc-800 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm", children: [
                    "Backup - ",
                    new Date(backup.createdAt).toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 truncate max-w-[200px]", children: JSON.parse(backup.value).heroName || "No Name" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleRestoreHeroBackup(backup.value), className: "px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded text-xs font-medium transition-colors", children: "Restore" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteBackup(backup.id), className: "p-1 text-gray-500 hover:text-red-600 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
                ] })
              ] }, backup.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2 pt-5", children: "Specialities (Max 5)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-3", children: "Select up to 5 active skills to float around your hero image." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: skills.map((skill) => {
                  const isSelected = (formData["heroSpecialities"] || "").split(",").map((s) => s.trim()).includes(skill.name);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleSpecialityToggle(skill.name), className: `px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isSelected ? "bg-cyan text-black shadow-md" : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"}`, children: skill.name }, skill.id);
                }) })
              ] })
            ] })
          ] })
        ] }),
        activeTab === "about" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "About & Stats" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Information about you and your track record." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleCreateAboutBackup, className: "flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
                " Create Backup"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                if (confirm("Reset About Section to defaults?")) {
                  setFormData((prev) => ({
                    ...prev,
                    aboutProfilePic: "",
                    aboutDescription: "",
                    aboutExpYears: "3",
                    aboutProjects: "80",
                    aboutClients: "20",
                    aboutCountries: "15",
                    aboutCard1Title: "Full Stack Development",
                    aboutCard1Desc: "End-to-end web products with React.js and Django - premium UI meets resilient APIs.",
                    aboutCard2Title: "Python Engineering",
                    aboutCard2Desc: "Clean, efficient Python - from automation scripts to scalable backend services.",
                    aboutCard3Title: "AI / ML Exploration",
                    aboutCard3Desc: "Training models with TensorFlow, PyTorch and Scikit-Learn for real-world problems.",
                    aboutCard4Title: "Computer Science Student",
                    aboutCard4Desc: "Pursuing BSc in CSE at Daffodil International University - currently fourth year."
                  }));
                }
              }, className: "flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 16 }),
                " Reset"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Profile Picture" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
                  (aboutImageFile || formData["aboutProfilePic"]) && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aboutImageFile ? URL.createObjectURL(aboutImageFile) : formData["aboutProfilePic"], className: "w-16 h-16 rounded-full object-cover border border-gray-200 dark:border-zinc-700", alt: "Profile preview" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => setAboutImageFile(e.target.files?.[0] || null), className: "hidden", id: "about-upload" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "about-upload", className: "flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium w-fit", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
                      " ",
                      aboutImageFile ? "Change File" : "Upload Image"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: aboutImageFile ? aboutImageFile.name : formData["aboutProfilePic"] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Profile Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: formData["aboutDescription"] || "I'm a Full Stack Developer based in Dhaka, Bangladesh, with 3+ years of freelance and remote experience and a strong foundation in Python (Django) and React.js. I've delivered 80+ web projects to 20+ international clients on Fiverr.\n\nAs a Level 2 Seller on Fiverr (top 20%), I've maintained a 4.9/5.0 satisfaction rating across 75+ completed projects, serving clients from the USA, Canada, and across the EU.\n\nCurrently pursuing my BSc in Computer Science & Engineering at Daffodil International University while working as a Web Developer at Dynamite IT Solution.", onChange: (e) => handleChange("aboutDescription", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[150px]" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold pt-4 border-t border-gray-200 dark:border-zinc-800", children: "Key Statistics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Years of Experience" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "e.g. 3", value: formData["aboutExpYears"] || "3", onChange: (e) => handleChange("aboutExpYears", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Projects Delivered" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "e.g. 80", value: formData["aboutProjects"] || "80", onChange: (e) => handleChange("aboutProjects", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Happy Clients" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "e.g. 20", value: formData["aboutClients"] || "20", onChange: (e) => handleChange("aboutClients", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Countries Served (Number)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "e.g. 15", value: formData["aboutCountries"] || "15", onChange: (e) => handleChange("aboutCountries", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 18 }),
                " Backup History"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: backups.filter((b) => b.key === "about_backup").length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "No backups available." }) : backups.filter((b) => b.key === "about_backup").map((backup) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-gray-200 dark:border-zinc-800 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm", children: [
                  "Backup - ",
                  new Date(backup.createdAt).toLocaleString()
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleRestoreAboutBackup(backup.value), className: "px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded text-xs font-medium transition-colors", children: "Restore" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteBackup(backup.id), className: "p-1 text-gray-500 hover:text-red-600 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
                ] })
              ] }, backup.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold pt-4 border-t border-gray-200 dark:border-zinc-800", children: "Special Cards (e.g. Education, Domains)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "The 4 cards shown underneath your profile description." }),
              [1, 2, 3, 4].map((num) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold mb-3", children: [
                  "Card ",
                  num
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium mb-1", children: "Title" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData[`aboutCard${num}Title`] || "", onChange: (e) => handleChange(`aboutCard${num}Title`, e.target.value), className: "w-full p-2 text-sm rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium mb-1", children: "Description" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: formData[`aboutCard${num}Desc`] || "", onChange: (e) => handleChange(`aboutCard${num}Desc`, e.target.value), className: "w-full p-2 text-sm rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
                  ] })
                ] })
              ] }, num))
            ] })
          ] })
        ] }),
        activeTab === "contact" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Contact & Social" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Your contact info and social links." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Email Address Display" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. sayham@example.com", value: formData["contactEmailDisplay"] || "", onChange: (e) => handleChange("contactEmailDisplay", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: formData["contactEmail"] || "", onChange: (e) => handleChange("contactEmail", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Phone Number Display" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. +880 1...", value: formData["contactPhoneDisplay"] || "", onChange: (e) => handleChange("contactPhoneDisplay", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Phone Number (URL/Action)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. tel:+8801...", value: formData["contactPhone"] || "", onChange: (e) => handleChange("contactPhone", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Location Text Display" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. Dhaka, Bangladesh", value: formData["contactLocation"] || "", onChange: (e) => handleChange("contactLocation", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Location Maps URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", placeholder: "e.g. https://maps.google.com/...", value: formData["contactLocationUrl"] || "", onChange: (e) => handleChange("contactLocationUrl", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "LinkedIn Display" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. sayhamkayes", value: formData["contactLinkedinDisplay"] || "", onChange: (e) => handleChange("contactLinkedinDisplay", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "LinkedIn URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. https://linkedin.com/in/username", value: formData["contactLinkedin"] || "", onChange: (e) => handleChange("contactLinkedin", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "GitHub Display" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. sayhamkayes", value: formData["contactGithubDisplay"] || "", onChange: (e) => handleChange("contactGithubDisplay", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "GitHub URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. https://github.com/username", value: formData["contactGithub"] || "", onChange: (e) => handleChange("contactGithub", e.target.value), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" })
              ] })
            ] })
          ] })
        ] }),
        activeTab === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Login Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Configure your admin credentials and multifactor authentication." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
              " Logout"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Credentials" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Username" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: loginData.username, onChange: (e) => setLoginData({
                  ...loginData,
                  username: e.target.value
                }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "New Password (leave blank to keep current)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: loginData.password, onChange: (e) => setLoginData({
                  ...loginData,
                  password: e.target.value
                }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950", placeholder: "••••••••" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Recovery & Verification Contacts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Email Address (for reset/verify)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: loginData.email, onChange: (e) => setLoginData({
                  ...loginData,
                  email: e.target.value
                }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Phone Number (for SMS verify)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", value: loginData.phone, onChange: (e) => setLoginData({
                  ...loginData,
                  phone: e.target.value
                }), className: "w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Two-Factor Authentication (2FA)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Enable one or more verification methods for logging in." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: loginData.emailVerification, onChange: (e) => setLoginData({
                  ...loginData,
                  emailVerification: e.target.checked
                }), className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Email Verification" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: loginData.phoneVerification, onChange: (e) => setLoginData({
                  ...loginData,
                  phoneVerification: e.target.checked
                }), className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Phone (SMS) Verification" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: loginData.appVerification, onChange: (e) => setLoginData({
                  ...loginData,
                  appVerification: e.target.checked
                }), className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Authenticator App" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSaveLoginSettings, className: "w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors", children: "Save Login Settings" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  SettingsPage as component
};
