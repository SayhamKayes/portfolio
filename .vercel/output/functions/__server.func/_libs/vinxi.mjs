import { H as H3Event, g as getCookie$1, s as setCookie$1, d as deleteCookie$1 } from "./h3.mjs";
import { g as getContext } from "./unctx.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
function getHTTPEvent() {
  return getEvent();
}
const HTTPEventSymbol = /* @__PURE__ */ Symbol("$HTTPEvent");
function isEvent(obj) {
  return typeof obj === "object" && (obj instanceof H3Event || obj?.[HTTPEventSymbol] instanceof H3Event || obj?.__is_event__ === true);
}
function createWrapperFunction(h3Function) {
  return function(...args) {
    let event = args[0];
    if (!isEvent(event)) {
      if (!globalThis.app.config.server.experimental?.asyncContext) {
        throw new Error(
          "AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function."
        );
      }
      event = getHTTPEvent();
      if (!event) {
        throw new Error(
          `No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
        );
      }
      args.unshift(event);
    } else {
      args[0] = event instanceof H3Event || event.__is_event__ ? event : event[HTTPEventSymbol];
    }
    return h3Function(...args);
  };
}
const getCookie = createWrapperFunction(getCookie$1);
const setCookie = createWrapperFunction(setCookie$1);
const deleteCookie = createWrapperFunction(deleteCookie$1);
function getNitroAsyncContext() {
  const nitroAsyncContext = getContext("nitro-app", {
    asyncContext: globalThis.app.config.server.experimental?.asyncContext ? true : false,
    AsyncLocalStorage
  });
  return nitroAsyncContext;
}
function getEvent() {
  return getNitroAsyncContext().use().event;
}
export {
  deleteCookie as d,
  getCookie as g,
  setCookie as s
};
