import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CCVmfZ8C.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/styles-jg6Ad8JY.css";
const iconUrl = "/assets/icon-Bj5kvrya.png";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$d = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sayham Kayes — Full Stack & AI/ML Developer" },
      {
        name: "description",
        content: "Personal portfolio of Sayham Kayes — Full Stack Developer, and AI/ML enthusiast crafting premium digital experiences."
      },
      { name: "author", content: "Sayham Kayes" },
      { property: "og:title", content: "Sayham Kayes — Full Stack & AI/ML Developer" },
      {
        property: "og:description",
        content: "Premium portfolio showcasing full stack, Python, and AI/ML projects."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "icon", href: iconUrl, type: "image/png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function BackToTopButton() {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const ariaLabel = reactExports.useMemo(() => "Back to top", []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "aria-label": ariaLabel,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      className: [
        "fixed bottom-6 right-6 z-[90] inline-flex h-11 w-11 items-center justify-center rounded-full",
        "bg-primary text-primary-foreground shadow-glow/30",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(20,184,166,0.35)]",
        isVisible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
      ].join(" "),
      title: "Back to top",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "h-5 w-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 19V5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12l7-7 7 7" })
          ]
        }
      )
    }
  );
}
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackToTopButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$d.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$c = () => import("./login-Daw9B5Ra.mjs");
const Route$c = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./forgot-password-C3-1aMXc.mjs");
const Route$b = createFileRoute("/forgot-password")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getSessionUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("d2674cc1e673445d163a9608cc5da1fe99c09ebbb6deab822fd424d2b2ef2974"));
const login = createServerFn({
  method: "POST"
}).validator((data) => data).handler(createSsrRpc("b9add455e4a20c5a8ce7d0fa177795c1edc5cadeccb49800474436b88cd2a97c"));
const verify2FA = createServerFn({
  method: "POST"
}).validator((data) => data).handler(createSsrRpc("49b03826e96c35b93ae704a9cc2cae2b178112efba2928d19765558d7d385db8"));
const logout = createServerFn({
  method: "POST"
}).handler(createSsrRpc("58d482668ee4f1bd4655ddc09985d343aa3f4b6ab65073bd9357cdaf12c68656"));
const getLoginSettings = createServerFn({
  method: "GET"
}).handler(createSsrRpc("d6a8d0368fedb2e01db496de441e3fc760e79096836ed5877fe54e945dfabab2"));
const updateLoginSettings = createServerFn({
  method: "POST"
}).validator((data) => data).handler(createSsrRpc("00f7ed99f01d1759506aebe6c816df0ad5acccbdb530d79761ddc67c8b05a43c"));
const requestPasswordReset = createServerFn({
  method: "POST"
}).validator((data) => data).handler(createSsrRpc("ce778562da6cf91ff4333f2ad0999439d68aa7d525cae5f62a04debc856461f3"));
const resetPassword = createServerFn({
  method: "POST"
}).validator((data) => data).handler(createSsrRpc("88ac53f4e4b012227c507f1d46a64097fc5cc4405fcab604a8fb2e78dbe93037"));
const $$splitComponentImporter$a = () => import("./route-DRJeW_2U.mjs");
const Route$a = createFileRoute("/admin")({
  beforeLoad: async () => {
    const user = await getSessionUser();
    if (!user) {
      throw redirect({
        to: "/login"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const getSiteSettings = createServerFn({
  method: "GET"
}).handler(createSsrRpc("549c4bb353b5b66b8188dab04dadb26a316e0d6145079218f2ca9fa4d5a4bc6b"));
const updateSiteSetting = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("78b40f753a9accf507568304c6bd9af3db1846d794f72a41394b6ce5f9ab46ee"));
const getSiteSettingBackups = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ef2fd8e472ebd08444d99d463f2599b814aeacad57fe0aa4d11b098d1fa69bbf"));
const createSiteSettingBackup = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("c80f1b2d6791c1d80b457d48ee38d546e514a48f5e06931957e4d50c6831a7e1"));
const deleteSiteSettingBackup = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("0a6a8dbc02bf46bfe87e3fdf06d4b0a134afecbb1f851ff16b1714d0fe6f6006"));
const getPortfolioItems = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3f7ecafd9dcf67e659c689c0ba0749a380a119be88040563d4abf98bb717d9d4"));
const getDeletedPortfolioItems = createServerFn({
  method: "GET"
}).handler(createSsrRpc("66cc47a1edb47c813b8703817b9a37ec9c4335a876f0aa6ef7934d82b71a7009"));
const addPortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("9291a397fff13402aa32a8a0135d54c778512220661ee053fa0128bce0379a40"));
const editPortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("a8a81ba6cbf2645f174b81c0e1ac4e7982457f8cbf2b2861ddd1377631dbf72e"));
const deletePortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("fe49afd477bab343de452dec5b8a0ca6f55312fdd473bbe5f7e1246b40928fbc"));
const restorePortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("7c03329a8c16727df0c810a781a13c5da8db1a89b3ec4523825f0e81ae73755f"));
const permanentlyDeletePortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("9a0e3e2cee23d8c4d871b0d176403fc8bf740d046e4b99b99490c3e001dc97f1"));
const getSkills = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ead1ef68e17e861fcbdab5c54ea15f6c19a66a9d565057f1a5dd7f7597bb2168"));
const getDeletedSkills = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a20d9ca9c6ed3baabf19ce59c9a2b479f6e6358ee8eb94cd67eb993098f25dcf"));
const addSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("177b0aec6f2af67aace3a94bb862eecff750cc505cb24fa43a28d155c43131af"));
const editSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("31106f7674e70b2d4d4195cf025dc6f7eef1c2bdff36e1d10f0fbd785def8c14"));
const deleteSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("48ba9b7752a964cf0b328038db34b1b9abbcba7692bdcbab8a2efbf34bdf5bab"));
const restoreSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("9216aa38ef6ddac9b367c73d7efe8c5f66e4c1e0601804c7c436ef82603665ca"));
const permanentlyDeleteSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("9ee668f85c2c98599d5cb25574b506cd2f8dcee254b6ed628f83dfca9ec526e3"));
const getTestimonials = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f07a1fc2babd2d4fd842a940ee58484c1114f4f2e3872e9b7a88372d8408db70"));
const getDeletedTestimonials = createServerFn({
  method: "GET"
}).handler(createSsrRpc("cd9c8bf4e859de27f55f2bab3cdae3a6c6e9c16207684acb112593f437410371"));
const addTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("05d30ce6f7301c0698d671bc5732ee0c9109eb238e13856539b69304ab445210"));
const editTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("fe79ca91cee0a002485516401e906d14ca2ffb1c4b15b5b9de5a7b9452326f67"));
const deleteTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("a8057bb7b89d73ae4cea6356ef1eed23f2849a1b1764c72653ab6ebabf87d69d"));
const restoreTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("d12b8466d64606d6d7ababbe3637abb936287b9eaaeb9a9f3adc5101e687874f"));
const permanentlyDeleteTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("5ef1270f0f862d599c48b48d766601f51b5dee55eecf6eadad8febbb5116d667"));
const getGlobalClients = createServerFn({
  method: "GET"
}).handler(createSsrRpc("421e4c8d2fba1e8809281497c2a546893046a64d13c0de2acc3dc6147408ff2e"));
const getDeletedGlobalClients = createServerFn({
  method: "GET"
}).handler(createSsrRpc("0117f0ff75c1cf5f6f65865ac3788138ea319143d58cbb90021cfde23b5562dc"));
const addGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("1fc56b447b553c352c49592e95dbaa6a38d0173de5e434eb1c15b670d603d16a"));
const editGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("71f8aaaf3175d6c794cd445bfaa04d99fedbf18de9be5fcb250d4d922cf93130"));
const deleteGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("b1f031865733451aaa15f2cd1d04bcd3b5b188c1ed87eb6306f570f558ba32ba"));
const restoreGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("bf530785a4fa1413e9ae3af22b5f35ce538a65b424d617b0bbf1e7ee5d75a15d"));
const permanentlyDeleteGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("763b73e3bd2fcb40192a9b8595cf071ad0c42467851bfaee75b24ebe0f178c16"));
const getExperiences = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c12833a4731b96c255bcb3125210d6bbb006f0660409782ff124bf559ab2e066"));
const getDeletedExperiences = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c2a1679b1cdf796a4994dab62848514b7cc9b8ae9d973e08665b2b583859f5a4"));
const addExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("db71a5c85dec4cecf4ccf4fe2692ce41c2e5523a0295e6f558385cff5df31a42"));
const editExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("b6ec90da5778d57689e8e624c5052c1fc25a1f1852ca5a2f86dbc90bfb5678d7"));
const deleteExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("282782d9e9335762449c367b5592aeb72658bd6129992f89354c43aba45e86df"));
const restoreExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("31a782b6f4b73456daece91f535e35289543bf463b3ec7c7dc9c74a110a5b506"));
const permanentlyDeleteExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("66504ba07cf249dd262bd1f2a332ec07183bd28e209aec33de285270abc136db"));
const getEducations = createServerFn({
  method: "GET"
}).handler(createSsrRpc("806baba8dddeefd7415da83c6930e2ae14d5e971e18bd6bbe0c5cedab26e955e"));
const getDeletedEducations = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e640641a475eb37026415599a2a14877f7b868391a517c76a49e2ee55aa7d95c"));
const addEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("94d80a4c619704a7a10fdc150c5fe5c2351ef6059b1eeaf31cef1c2227bb4cf7"));
const editEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("6666143a6965f29e53fab0e198383ccafb060272660fe9687f9b8527d25dd74f"));
const deleteEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("0899fb17bec75ab215460ea3b4a46d8642c33f89bc1ea5683518f5c852fa617f"));
const restoreEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("0dfbda04c2a44b95702ae2d131e7745b1a8bebad9630f450ca95f0fb6461d033"));
const permanentlyDeleteEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("0d8decb971d082ecac11514431aa15f3c8cc19666c23882dffb708f591939ab3"));
createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("d2ff18a0c4e059bfc52b9b188677cf6e4a466cb639f23ea29f092ae4a7a41141"));
const getMessages = createServerFn({
  method: "GET"
}).handler(createSsrRpc("1408a66fe37b609abed664cc4ba7dcd08854f74efa5d74e54c7e07a3720ee513"));
const markMessageRead = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("66bd5e15db7082ae3ca46be1fd3c24487e5a0c31e5c0a507252af46a400f7b10"));
const replyToMessage = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("8f5eda357cd21fd7fc5d09989480b9ea04a7a6407af925f6a1cb3cd9fd016e3e"));
const deleteMessage = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("896d45017c57c3d6f5b378c07bb0b022061dff88011c46a70cbcdc4c9c41da90"));
const getDashboardStats = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7d29a34d9490fc489083a2204d4438b7d84d0e8e6aaa085d37a25d11cc3a9b28"));
const $$splitComponentImporter$9 = () => import("./index-DvBo9NDu.mjs");
const Route$9 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Sayham Kayes — Full Stack & AI/ML Developer"
    }, {
      name: "description",
      content: "Premium portfolio of Sayham Kayes — Full Stack, Python, and AI/ML developer crafting award-winning digital experiences."
    }, {
      property: "og:title",
      content: "Sayham Kayes — Full Stack & AI/ML Developer"
    }, {
      property: "og:description",
      content: "Premium portfolio showcasing full stack, Python, and AI/ML projects."
    }]
  }),
  loader: async () => {
    const [portfolioItems, skills, settings, testimonials, experiences, educations, globalClients] = await Promise.all([getPortfolioItems(), getSkills(), getSiteSettings(), getTestimonials(), getExperiences(), getEducations(), getGlobalClients()]);
    return {
      portfolioItems,
      skills,
      settings,
      testimonials,
      experiences,
      educations,
      globalClients
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./index-CCD0vtCv.mjs");
const Route$8 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  loader: async () => await getDashboardStats()
});
const $$splitComponentImporter$7 = () => import("./testimonials-K_c0ExJr.mjs");
const Route$7 = createFileRoute("/admin/testimonials")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  loader: async () => {
    try {
      const [active, deleted] = await Promise.all([getTestimonials(), getDeletedTestimonials()]);
      return {
        active,
        deleted
      };
    } catch (e) {
      console.error("Loader error:", e);
      throw e;
    }
  }
});
const $$splitComponentImporter$6 = () => import("./skills-IWAtaI_X.mjs");
const Route$6 = createFileRoute("/admin/skills")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  loader: async () => {
    try {
      const [active, deleted] = await Promise.all([getSkills(), getDeletedSkills()]);
      return {
        active,
        deleted
      };
    } catch (e) {
      console.error("Loader error:", e);
      throw e;
    }
  }
});
const $$splitComponentImporter$5 = () => import("./settings-DZo0cUEj.mjs");
const Route$5 = createFileRoute("/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  loader: async () => {
    const [settings, skills] = await Promise.all([getSiteSettings(), getSkills()]);
    return {
      settings,
      skills
    };
  }
});
const $$splitComponentImporter$4 = () => import("./portfolio-DrfToIID.mjs");
const Route$4 = createFileRoute("/admin/portfolio")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  loader: async () => {
    try {
      const [active, deleted] = await Promise.all([getPortfolioItems(), getDeletedPortfolioItems()]);
      return {
        active,
        deleted
      };
    } catch (e) {
      console.error("Loader error:", e);
      throw e;
    }
  }
});
const $$splitComponentImporter$3 = () => import("./inbox-uYuMvmPy.mjs");
const Route$3 = createFileRoute("/admin/inbox")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  loader: async () => {
    try {
      return await getMessages();
    } catch (e) {
      console.error(e);
      return [];
    }
  }
});
const $$splitComponentImporter$2 = () => import("./global-clients-DYq55VFU.mjs");
const Route$2 = createFileRoute("/admin/global-clients")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  loader: async () => {
    const [active, deleted] = await Promise.all([getGlobalClients(), getDeletedGlobalClients()]);
    return {
      active,
      deleted
    };
  }
});
const $$splitComponentImporter$1 = () => import("./experience-Bv9bEk1m.mjs");
const Route$1 = createFileRoute("/admin/experience")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  loader: async () => {
    try {
      const [active, deleted] = await Promise.all([getExperiences(), getDeletedExperiences()]);
      return {
        active,
        deleted
      };
    } catch (e) {
      console.error("Loader error:", e);
      throw e;
    }
  }
});
const $$splitComponentImporter = () => import("./education-DLI1WB5e.mjs");
const Route = createFileRoute("/admin/education")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async () => {
    try {
      const [active, deleted] = await Promise.all([getEducations(), getDeletedEducations()]);
      return {
        active,
        deleted
      };
    } catch (e) {
      console.error("Loader error:", e);
      throw e;
    }
  }
});
const LoginRoute = Route$c.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$d
});
const ForgotPasswordRoute = Route$b.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$d
});
const AdminRouteRoute = Route$a.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$d
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const AdminIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRouteRoute
});
const AdminTestimonialsRoute = Route$7.update({
  id: "/testimonials",
  path: "/testimonials",
  getParentRoute: () => AdminRouteRoute
});
const AdminSkillsRoute = Route$6.update({
  id: "/skills",
  path: "/skills",
  getParentRoute: () => AdminRouteRoute
});
const AdminSettingsRoute = Route$5.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AdminRouteRoute
});
const AdminPortfolioRoute = Route$4.update({
  id: "/portfolio",
  path: "/portfolio",
  getParentRoute: () => AdminRouteRoute
});
const AdminInboxRoute = Route$3.update({
  id: "/inbox",
  path: "/inbox",
  getParentRoute: () => AdminRouteRoute
});
const AdminGlobalClientsRoute = Route$2.update({
  id: "/global-clients",
  path: "/global-clients",
  getParentRoute: () => AdminRouteRoute
});
const AdminExperienceRoute = Route$1.update({
  id: "/experience",
  path: "/experience",
  getParentRoute: () => AdminRouteRoute
});
const AdminEducationRoute = Route.update({
  id: "/education",
  path: "/education",
  getParentRoute: () => AdminRouteRoute
});
const AdminRouteRouteChildren = {
  AdminEducationRoute,
  AdminExperienceRoute,
  AdminGlobalClientsRoute,
  AdminInboxRoute,
  AdminPortfolioRoute,
  AdminSettingsRoute,
  AdminSkillsRoute,
  AdminTestimonialsRoute,
  AdminIndexRoute
};
const AdminRouteRouteWithChildren = AdminRouteRoute._addFileChildren(
  AdminRouteRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AdminRouteRoute: AdminRouteRouteWithChildren,
  ForgotPasswordRoute,
  LoginRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  editEducation as $,
  deletePortfolioItem as A,
  restorePortfolioItem as B,
  permanentlyDeletePortfolioItem as C,
  editPortfolioItem as D,
  addPortfolioItem as E,
  createSsrRpc as F,
  Route$3 as G,
  markMessageRead as H,
  deleteMessage as I,
  replyToMessage as J,
  Route$2 as K,
  deleteGlobalClient as L,
  restoreGlobalClient as M,
  permanentlyDeleteGlobalClient as N,
  editGlobalClient as O,
  addGlobalClient as P,
  Route$1 as Q,
  Route$9 as R,
  deleteExperience as S,
  restoreExperience as T,
  permanentlyDeleteExperience as U,
  editExperience as V,
  addExperience as W,
  Route as X,
  deleteEducation as Y,
  restoreEducation as Z,
  permanentlyDeleteEducation as _,
  resetPassword as a,
  addEducation as a0,
  router as a1,
  logout as b,
  Route$8 as c,
  Route$7 as d,
  deleteTestimonial as e,
  restoreTestimonial as f,
  editTestimonial as g,
  addTestimonial as h,
  Route$6 as i,
  deleteSkill as j,
  restoreSkill as k,
  login as l,
  permanentlyDeleteSkill as m,
  editSkill as n,
  addSkill as o,
  permanentlyDeleteTestimonial as p,
  Route$5 as q,
  requestPasswordReset as r,
  getSiteSettingBackups as s,
  getLoginSettings as t,
  updateSiteSetting as u,
  verify2FA as v,
  createSiteSettingBackup as w,
  deleteSiteSettingBackup as x,
  updateLoginSettings as y,
  Route$4 as z
};
