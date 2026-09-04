import { r as reactExports, R as React } from "./react.mjs";
import { c as clsx } from "./clsx.mjs";
import { r as reactDomExports } from "./react-dom.mjs";
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift, b as arrow } from "./floating-ui__dom.mjs";
const y = { core: false, base: false };
function w({ css: e, id: t = "react-tooltip-base-styles", type: o = "base", ref: r, state: n = {} }) {
  if (!e || "undefined" == typeof document || (void 0 !== n[o] ? n[o] : y[o])) return;
  if ("core" === o && "undefined" != typeof process && process.env && process.env.REACT_TOOLTIP_DISABLE_CORE_STYLES) return;
  if ("base" === o && "undefined" != typeof process && process.env && process.env.REACT_TOOLTIP_DISABLE_BASE_STYLES) return;
  "core" === o && (t = "react-tooltip-core-styles"), r || (r = {});
  const { insertAt: l } = r;
  if (document.getElementById(t)) return;
  const c = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.id = t, i.type = "text/css", "top" === l && c.firstChild ? c.insertBefore(i, c.firstChild) : c.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e)), void 0 !== n[o] ? n[o] = true : y[o] = true;
}
const b = flip({ fallbackAxisSideDirection: "start" }), S = shift({ padding: 5 }), g = async ({ elementReference: e = null, tooltipReference: t = null, tooltipArrowReference: o = null, place: r = "top", offset: n = 10, strategy: l = "absolute", middlewares: c = [offset(Number(n)), b, S], border: i, arrowSize: s = 8 }) => {
  if (!e) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: r };
  if (null === t) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: r };
  const u = [...c];
  return o ? (u.push(arrow({ element: o, padding: 5 })), computePosition(e, t, { placement: r, strategy: l, middleware: u }).then(({ x: e2, y: t2, placement: o2, middlewareData: r2 }) => {
    var n2, l2;
    const c2 = { left: `${e2}px`, top: `${t2}px`, border: i }, { x: u2, y: a } = null !== (n2 = r2.arrow) && void 0 !== n2 ? n2 : { x: 0, y: 0 }, d = null !== (l2 = { top: "bottom", right: "left", bottom: "top", left: "right" }[o2.split("-")[0]]) && void 0 !== l2 ? l2 : "bottom", p = i && { borderBottom: i, borderRight: i };
    let v = 0;
    if (i) {
      const e3 = `${i}`.match(/(\d+)px/);
      v = (null == e3 ? void 0 : e3[1]) ? Number(e3[1]) : 1;
    }
    return { tooltipStyles: c2, tooltipArrowStyles: { left: null != u2 ? `${u2}px` : "", top: null != a ? `${a}px` : "", right: "", bottom: "", ...p, [d]: `-${s / 2 + v - 1}px` }, place: o2 };
  })) : computePosition(e, t, { placement: "bottom", strategy: l, middleware: u }).then(({ x: e2, y: t2, placement: o2 }) => ({ tooltipStyles: { left: `${e2}px`, top: `${t2}px` }, tooltipArrowStyles: {}, place: o2 }));
}, A = (e, t, o) => {
  let r = null, n = e;
  const l = function(...e2) {
    const o2 = () => {
      r = null;
    };
    r || (n.apply(this, e2), r = setTimeout(o2, t));
  };
  return l.cancel = () => {
    r && (clearTimeout(r), r = null);
  }, l.setCallback = (e2) => {
    n = e2;
  }, l;
}, E = (e) => {
  if (!(e instanceof HTMLElement || e instanceof SVGElement)) return false;
  const t = getComputedStyle(e);
  return ["overflow", "overflow-x", "overflow-y"].some((e2) => {
    const o = t.getPropertyValue(e2);
    return "auto" === o || "scroll" === o;
  });
}, _ = (e) => {
  if (!e) return null;
  let t = e.parentElement;
  for (; t; ) {
    if (E(t)) return t;
    t = t.parentElement;
  }
  return document.scrollingElement || document.documentElement;
}, T = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? reactExports.useLayoutEffect : reactExports.useEffect, k = (e) => {
  e.current && (clearTimeout(e.current), e.current = null);
};
var O = { tooltip: "core-styles-module_tooltip__3vRRp", fixed: "core-styles-module_fixed__pcSol", arrow: "core-styles-module_arrow__cvMwQ", content: "core-styles-module_content__BRKdB", noArrow: "core-styles-module_noArrow__xock6", clickable: "core-styles-module_clickable__ZuTTB", show: "core-styles-module_show__Nt9eE", closing: "core-styles-module_closing__sGnxF" }, C = { tooltip: "styles-module_tooltip__mnnfp", content: "styles-module_content__ydYdI", arrow: "styles-module_arrow__K0L3T", dark: "styles-module_dark__xNqje", light: "styles-module_light__Z6W-X", success: "styles-module_success__A2AKt", warning: "styles-module_warning__SCK0X", error: "styles-module_error__JvumD", info: "styles-module_info__BWdHW" };
const R = /* @__PURE__ */ new Map();
let N = null;
function x(e) {
  const t = e.match(/^\[data-tooltip-id=(['"])((?:\\.|(?!\1).)*)\1\]$/);
  return t ? t[2].replace(/\\(['"])/g, "$1") : null;
}
function L(e) {
  try {
    return { anchors: Array.from(document.querySelectorAll(e)), error: null };
  } catch (e2) {
    return { anchors: [], error: e2 instanceof Error ? e2 : new Error(String(e2)) };
  }
}
function B(e, t) {
  var o, r, n, l;
  const c = L(e), i = null !== (r = null === (o = c.error) || void 0 === o ? void 0 : o.message) && void 0 !== r ? r : null, s = null !== (l = null === (n = t.error) || void 0 === n ? void 0 : n.message) && void 0 !== l ? l : null;
  if (u = t.anchors, a = c.anchors, u.length === a.length && u.every((e2, t2) => e2 === a[t2]) && i === s) return;
  var u, a;
  const d = { ...t, anchors: c.anchors, error: c.error };
  R.set(e, d), (function(e2) {
    e2.subscribers.forEach((t2) => t2(e2.anchors, e2.error));
  })(d);
}
let z = false, $ = null, I = false;
function j(e) {
  if (e ? ($ || ($ = /* @__PURE__ */ new Set()), e.forEach((e2) => $.add(e2))) : I = true, z) return;
  z = true;
  const t = () => {
    z = false;
    const e2 = I, t2 = $;
    var o;
    I = false, $ = null, e2 ? R.forEach((e3, t3) => {
      B(t3, e3);
    }) : t2 && t2.size > 0 && (o = t2, R.forEach((e3, t3) => {
      (null === e3.tooltipId || o.has(e3.tooltipId)) && B(t3, e3);
    }));
  };
  "function" == typeof requestAnimationFrame ? requestAnimationFrame(t) : Promise.resolve().then(t);
}
function D() {
  N || "undefined" == typeof MutationObserver || (N = new MutationObserver((e) => {
    const t = (function(e2) {
      var t2;
      if (R.size <= 4) return null;
      const o = /* @__PURE__ */ new Set();
      for (const r of e2) {
        if ("attributes" === r.type) {
          const e3 = r.target, n = null === (t2 = e3.getAttribute) || void 0 === t2 ? void 0 : t2.call(e3, "data-tooltip-id");
          n && o.add(n), r.oldValue && o.add(r.oldValue);
          continue;
        }
        if ("childList" === r.type) {
          const e3 = (e4) => {
            var t3, r2;
            for (let n = 0; n < e4.length; n++) {
              const l = e4[n];
              if (l.nodeType !== Node.ELEMENT_NODE) continue;
              const c = l, i = null === (t3 = c.getAttribute) || void 0 === t3 ? void 0 : t3.call(c, "data-tooltip-id");
              i && o.add(i);
              const s = null === (r2 = c.querySelectorAll) || void 0 === r2 ? void 0 : r2.call(c, "[data-tooltip-id]");
              if (s) {
                if (s.length > 50) return true;
                for (let e5 = 0; e5 < s.length; e5++) {
                  const t4 = s[e5].getAttribute("data-tooltip-id");
                  t4 && o.add(t4);
                }
              }
            }
            return false;
          };
          if (e3(r.addedNodes) || e3(r.removedNodes)) return null;
          continue;
        }
      }
      return o;
    })(e);
    j(t);
  }), N.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-tooltip-id"], attributeOldValue: true }));
}
function H(e, t) {
  let o = R.get(e);
  if (!o) {
    const t2 = L(e);
    o = { anchors: t2.anchors, error: t2.error, subscribers: /* @__PURE__ */ new Set(), tooltipId: x(e) }, R.set(e, o);
  }
  return o.subscribers.add(t), D(), t([...o.anchors], o.error), () => {
    const o2 = R.get(e);
    o2 && (o2.subscribers.delete(t), 0 === o2.subscribers.size && R.delete(e), 0 === R.size && N && (N.disconnect(), N = null));
  };
}
const M = /* @__PURE__ */ new Map();
function P(e, t) {
  return `${e}:${t ? "capture" : "bubble"}`;
}
function W(e, t, o = {}) {
  const r = Boolean(o.capture), n = P(e, r), l = (function(e2, t2) {
    const o2 = P(e2, t2);
    let r2 = M.get(o2);
    if (!r2) {
      const n2 = /* @__PURE__ */ new Set(), l2 = (e3) => {
        n2.forEach((t3) => {
          t3(e3);
        });
      };
      r2 = { handlers: n2, dispatch: l2, eventType: e2, capture: t2 }, M.set(o2, r2), document.addEventListener(e2, l2, { capture: t2 });
    }
    return r2;
  })(e, r);
  return l.handlers.add(t), () => {
    l.handlers.delete(t), 0 === l.handlers.size && (M.delete(n), document.removeEventListener(e, l.dispatch, { capture: r }));
  };
}
let q = null;
var F = reactExports.memo(({ forwardRef: t, id: c, className: d, classNameArrow: p, variant: v = "dark", portalRoot: m, anchorSelect: f, place: y2 = "top", offset: w2 = 10, openOnClick: b2 = false, positionStrategy: S2 = "absolute", middlewares: E2, wrapper: R2, delayShow: N2 = 0, delayHide: x2 = 0, autoClose: L2, float: B2 = false, hidden: z2 = false, noArrow: $2 = false, clickable: I2 = false, openEvents: j2, closeEvents: D2, globalCloseEvents: M2, imperativeModeOnly: P2, style: F2, position: V2, afterShow: K2, afterHide: Y2, disableTooltip: X2, content: G2, contentWrapperRef: Z2, isOpen: J, defaultIsOpen: Q = false, setIsOpen: U, previousActiveAnchor: ee, activeAnchor: te, setActiveAnchor: oe, border: re, opacity: ne, arrowColor: le, arrowSize: ce = 8, role: ie = "tooltip" }) => {
  var se;
  const ue = reactExports.useRef(null), ae = reactExports.useRef(null), de = reactExports.useRef(null), pe = reactExports.useRef(null), ve = reactExports.useRef(null), me = reactExports.useRef(null), [fe, he] = reactExports.useState({ tooltipStyles: {}, tooltipArrowStyles: {}, place: y2 }), [ye, we] = reactExports.useState(false), [be, Se] = reactExports.useState(false), [ge, Ae] = reactExports.useState(null), Ee = reactExports.useRef(false), _e = reactExports.useRef(null), Te = reactExports.useRef(false), ke = reactExports.useRef(false), Oe = reactExports.useRef({ getBoundingClientRect: () => ({ x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }) });
  T(() => (ke.current = true, () => {
    ke.current = false;
  }), []);
  const Ce = reactExports.useCallback((e) => {
    ke.current && (e && Se(true), setTimeout(() => {
      ke.current && (null == U || U(e), void 0 === J && we(e));
    }, 10));
  }, [J, U]);
  reactExports.useEffect(() => {
    if (c) {
      if (ye) {
        t2(ee);
        const o = e(te), r = [.../* @__PURE__ */ new Set([...o, c])].filter(Boolean).join(" ");
        null == te || te.setAttribute("aria-describedby", r);
      } else t2(te);
      return () => {
        t2(te), t2(ee);
      };
    }
    function e(e2) {
      var t3;
      return (null === (t3 = null == e2 ? void 0 : e2.getAttribute("aria-describedby")) || void 0 === t3 ? void 0 : t3.split(" ")) || [];
    }
    function t2(t3) {
      const o = e(t3).filter((e2) => e2 !== c);
      o.length ? null == t3 || t3.setAttribute("aria-describedby", o.join(" ")) : null == t3 || t3.removeAttribute("aria-describedby");
    }
  }, [te, ye, c, ee]), reactExports.useEffect(() => {
    if (void 0 === J) return () => null;
    J && Se(true);
    const e = setTimeout(() => {
      we(J);
    }, 10);
    return () => {
      clearTimeout(e);
    };
  }, [J]), reactExports.useEffect(() => {
    if (ye !== Ee.current) if (k(me), Ee.current = ye, ye) null == K2 || K2();
    else {
      if (null === q) {
        const e2 = getComputedStyle(document.body);
        q = ((e3) => {
          const t2 = e3.match(/^([\d.]+)(m?s)$/);
          if (!t2) return 0;
          const [, o, r] = t2;
          return Number(o) * ("ms" === r ? 1 : 1e3);
        })(e2.getPropertyValue("--rt-transition-show-delay"));
      }
      const e = q;
      me.current = setTimeout(() => {
        Se(false), Ae(null), null == Y2 || Y2();
      }, e + 25);
    }
  }, [Y2, K2, ye]), reactExports.useEffect(() => (k(ve), !ye || !L2 || L2 <= 0 || (ve.current = setTimeout(() => {
    Ce(false);
  }, L2)), () => {
    k(ve);
  }), [te, L2, Ce, ye]);
  const Re = reactExports.useCallback((e) => {
    ke.current && he((t2) => t2.place === e.place && t2.tooltipStyles.left === e.tooltipStyles.left && t2.tooltipStyles.top === e.tooltipStyles.top && t2.tooltipStyles.border === e.tooltipStyles.border && t2.tooltipArrowStyles.left === e.tooltipArrowStyles.left && t2.tooltipArrowStyles.top === e.tooltipArrowStyles.top && t2.tooltipArrowStyles.right === e.tooltipArrowStyles.right && t2.tooltipArrowStyles.bottom === e.tooltipArrowStyles.bottom && t2.tooltipArrowStyles.borderBottom === e.tooltipArrowStyles.borderBottom && t2.tooltipArrowStyles.borderRight === e.tooltipArrowStyles.borderRight ? t2 : e);
  }, []), Ne = reactExports.useRef(be);
  Ne.current = be;
  const xe = reactExports.useCallback((e = N2) => {
    de.current && clearTimeout(de.current), Ne.current ? Ce(true) : de.current = setTimeout(() => {
      Ce(true);
    }, e);
  }, [N2, Ce]), Le = reactExports.useCallback((e = x2) => {
    pe.current && clearTimeout(pe.current), pe.current = setTimeout(() => {
      Te.current || Ce(false);
    }, e);
  }, [x2, Ce]), Be = reactExports.useCallback(({ x: e, y: t2 }) => {
    var o;
    Oe.current.getBoundingClientRect = () => ({ x: e, y: t2, width: 0, height: 0, top: t2, left: e, right: e, bottom: t2 }), g({ place: null !== (o = null == ge ? void 0 : ge.place) && void 0 !== o ? o : y2, offset: w2, elementReference: Oe.current, tooltipReference: ue.current, tooltipArrowReference: ae.current, strategy: S2, middlewares: E2, border: re, arrowSize: ce }).then((e2) => {
      Re(e2);
    });
  }, [null == ge ? void 0 : ge.place, y2, w2, S2, E2, re, ce, Re]), ze = reactExports.useCallback(() => {
    var e, t2;
    const o = null !== (e = null == ge ? void 0 : ge.position) && void 0 !== e ? e : V2;
    o ? Be(o) : B2 ? _e.current && Be(_e.current) : (null == te ? void 0 : te.isConnected) && g({ place: null !== (t2 = null == ge ? void 0 : ge.place) && void 0 !== t2 ? t2 : y2, offset: w2, elementReference: te, tooltipReference: ue.current, tooltipArrowReference: ae.current, strategy: S2, middlewares: E2, border: re, arrowSize: ce }).then((e2) => {
      ke.current && Re(e2);
    });
  }, [null == ge ? void 0 : ge.position, null == ge ? void 0 : ge.place, V2, B2, te, y2, w2, S2, E2, re, Be, Re, ce]), $e = reactExports.useCallback(() => {
    Se(false), Ce(false), oe(null), k(de), k(pe), k(ve);
  }, [Ce, oe]), Ie = be || Q || Boolean(J) || Boolean(te) || Boolean(null == ge ? void 0 : ge.anchorSelect), { anchorElements: je, selector: De } = (({ id: e, anchorSelect: t2, imperativeAnchorSelect: c2, activeAnchor: i, disableTooltip: s, onActiveAnchorRemoved: u, trackAnchors: a }) => {
    const [d2, p2] = reactExports.useState([]), [v2, m2] = reactExports.useState(null), f2 = reactExports.useRef(null), h = reactExports.useMemo(() => (({ id: e2, anchorSelect: t3, imperativeAnchorSelect: o }) => {
      var r;
      let n = null !== (r = null != o ? o : t3) && void 0 !== r ? r : "";
      return !n && e2 && (n = `[data-tooltip-id='${e2.replace(/'/g, "\\'")}']`), n;
    })({ id: e, anchorSelect: t2, imperativeAnchorSelect: c2 }), [e, t2, c2]), y3 = reactExports.useMemo(() => d2.filter((e2) => !(null == s ? void 0 : s(e2))), [d2, s]), w3 = reactExports.useMemo(() => {
      if (!i || !h) return false;
      try {
        return i.matches(h);
      } catch (e2) {
        return false;
      }
    }, [i, h, y3]);
    return reactExports.useEffect(() => h && a ? H(h, (e2, t3) => {
      p2(e2), m2(t3);
    }) : (p2([]), void m2(null)), [h, a]), reactExports.useEffect(() => {
      v2 && f2.current !== h && (f2.current = h);
    }, [h, v2]), reactExports.useEffect(() => {
      i && (i.isConnected && (y3.includes(i) || w3) || u());
    }, [i, y3, w3, u]), { anchorElements: y3, selector: h };
  })({ id: c, anchorSelect: f, imperativeAnchorSelect: null == ge ? void 0 : ge.anchorSelect, activeAnchor: te, disableTooltip: X2, onActiveAnchorRemoved: $e, trackAnchors: Ie });
  (({ activeAnchor: e, anchorElements: t2, anchorSelector: r, clickable: c2, closeEvents: i, delayHide: s, delayShow: u, disableTooltip: a, float: d2, globalCloseEvents: p2, handleHideTooltipDelayed: v2, handleShow: m2, handleShowTooltipDelayed: f2, handleTooltipPosition: y3, hoveringTooltip: w3, imperativeModeOnly: b3, lastFloatPosition: S3, openEvents: g2, openOnClick: E3, rendered: T2, setActiveAnchor: O2, show: C2, tooltipHideDelayTimerRef: R3, tooltipRef: N3, tooltipShowDelayTimerRef: x3, updateTooltipPosition: L3 }) => {
    const B3 = reactExports.useRef(A((e2) => {
    }, 50)), z3 = reactExports.useRef(A(() => {
    }, 50)), $3 = reactExports.useRef(null), I3 = reactExports.useRef(null), j3 = reactExports.useRef(null), D3 = reactExports.useRef(null);
    e !== j3.current && (j3.current = e, $3.current = _(e));
    const H2 = N3.current;
    H2 !== D3.current && (D3.current = H2, I3.current = _(H2));
    const M3 = E3 || (null == g2 ? void 0 : g2.click) || (null == g2 ? void 0 : g2.dblclick) || (null == g2 ? void 0 : g2.mousedown), P3 = reactExports.useMemo(() => {
      const e2 = g2 ? { ...g2 } : { mouseenter: true, focus: true, click: false, dblclick: false, mousedown: false };
      return !g2 && E3 && Object.assign(e2, { mouseenter: false, focus: false, click: true }), b3 && Object.assign(e2, { mouseenter: false, focus: false, click: false, dblclick: false, mousedown: false }), e2;
    }, [g2, E3, b3]), q2 = reactExports.useMemo(() => {
      const e2 = i ? { ...i } : { mouseleave: true, blur: true, click: false, dblclick: false, mouseup: false };
      return !i && E3 && Object.assign(e2, { mouseleave: false, blur: false }), b3 && Object.assign(e2, { mouseleave: false, blur: false, click: false, dblclick: false, mouseup: false }), e2;
    }, [i, E3, b3]), F3 = reactExports.useMemo(() => {
      const e2 = p2 ? { ...p2 } : { escape: false, scroll: false, resize: false, clickOutsideAnchor: M3 || false };
      return b3 && Object.assign(e2, { escape: false, scroll: false, resize: false, clickOutsideAnchor: false }), e2;
    }, [p2, M3, b3]), V3 = reactExports.useRef(e);
    V3.current = e;
    const K3 = reactExports.useRef(C2);
    K3.current = C2;
    const Y3 = reactExports.useRef(t2);
    Y3.current = t2;
    const X3 = reactExports.useRef(m2);
    X3.current = m2;
    const G3 = reactExports.useRef(y3);
    G3.current = y3;
    const Z3 = reactExports.useRef(L3);
    Z3.current = L3;
    const J2 = reactExports.useRef(() => null), Q2 = reactExports.useRef(() => {
    }), U2 = reactExports.useRef(() => {
    }), ee2 = r ? (function(e2) {
      const t3 = e2.match(/^\[data-tooltip-id=(['"])((?:\\.|(?!\1).)*)\1\]$/);
      return t3 ? t3[2].replace(/\\(['"])/g, "$1") : null;
    })(r) : null;
    J2.current = (e2) => {
      var t3, o;
      if (!(e2 instanceof Element && e2.isConnected)) return null;
      const n = e2;
      if (ee2) {
        const e3 = (function(e4, t4) {
          let o2 = e4;
          for (; o2; ) {
            const e5 = o2.dataset;
            if ((null == e5 ? void 0 : e5.tooltipId) === t4) return o2;
            o2 = o2.parentElement;
          }
          return null;
        })(n, ee2);
        if (e3 && !(null == a ? void 0 : a(e3))) return e3;
      } else if (r) try {
        const e3 = null !== (t3 = n.matches(r) ? n : n.closest(r)) && void 0 !== t3 ? t3 : null;
        if (e3 && !(null == a ? void 0 : a(e3))) return e3;
      } catch (e3) {
        return null;
      }
      return null !== (o = Y3.current.find((e3) => e3 === n || e3.contains(n))) && void 0 !== o ? o : null;
    }, Q2.current = (e2) => {
      e2 && (e2.isConnected ? (null == a ? void 0 : a(e2)) || (u && V3.current && e2 !== V3.current ? (x3.current && clearTimeout(x3.current), x3.current = setTimeout(() => {
        O2(e2), m2(true);
      }, u)) : (O2(e2), u ? f2() : m2(true)), R3.current && clearTimeout(R3.current)) : O2(null));
    }, U2.current = () => {
      c2 ? v2(s || 100) : s ? v2() : m2(false), x3.current && clearTimeout(x3.current);
    };
    const te2 = B3.current, oe2 = z3.current;
    te2.setCallback((e2) => Q2.current(e2)), oe2.setCallback(() => U2.current()), reactExports.useEffect(() => {
      const e2 = [], t3 = (t4, o2, r3) => {
        e2.push(W(t4, o2, r3));
      }, o = (e3) => {
        var t4;
        return Boolean((null == e3 ? void 0 : e3.target) instanceof Node && (null === (t4 = V3.current) || void 0 === t4 ? void 0 : t4.contains(e3.target)));
      }, r2 = (e3) => {
        oe2.cancel(), te2(e3);
      }, n = () => {
        te2.cancel(), oe2();
      }, l = () => {
        t3("mouseover", (e3) => {
          const t4 = J2.current(e3.target);
          t4 && J2.current(e3.relatedTarget) !== t4 && r2(t4);
        });
      }, i2 = () => {
        t3("mouseout", (e3) => {
          const t4 = J2.current(e3.target);
          if (!t4 && !o(e3)) return;
          const r3 = e3.relatedTarget, l2 = t4 || V3.current;
          r3 instanceof Node && (null == l2 ? void 0 : l2.contains(r3)) || n();
        });
      };
      P3.mouseenter && l(), q2.mouseleave && i2(), P3.mouseover && l(), q2.mouseout && i2(), P3.focus && t3("focusin", (e3) => {
        r2(J2.current(e3.target));
      }), q2.blur && t3("focusout", (e3) => {
        const t4 = J2.current(e3.target);
        if (!t4 && !o(e3)) return;
        const r3 = e3.relatedTarget, l2 = t4 || V3.current;
        r3 instanceof Node && (null == l2 ? void 0 : l2.contains(r3)) || n();
      });
      const s2 = ["mouseover", "mouseout", "mouseenter", "mouseleave", "focus", "blur"], u2 = ["click", "dblclick", "mousedown", "mouseup"], a2 = (e3) => {
        var t4;
        const o2 = J2.current(null !== (t4 = null == e3 ? void 0 : e3.target) && void 0 !== t4 ? t4 : null);
        o2 && (K3.current && V3.current === o2 || Q2.current(o2));
      }, p3 = (e3) => {
        K3.current && o(e3) && U2.current();
      };
      Object.entries(P3).forEach(([e3, o2]) => {
        o2 && !s2.includes(e3) && u2.includes(e3) && t3(e3, a2, { capture: true });
      }), Object.entries(q2).forEach(([e3, o2]) => {
        o2 && !s2.includes(e3) && u2.includes(e3) && t3(e3, p3, { capture: true });
      }), d2 && t3("pointermove", (e3) => {
        const t4 = V3.current;
        if (!t4) return;
        if (J2.current(e3.target) !== t4) return;
        const o2 = e3, r3 = { x: o2.clientX, y: o2.clientY };
        G3.current(r3), S3.current = r3;
      });
      const v3 = N3.current, m3 = () => {
        w3.current = true;
      }, f3 = () => {
        w3.current = false, U2.current();
      }, h = c2 && (q2.mouseout || q2.mouseleave);
      return h && (null == v3 || v3.addEventListener("mouseover", m3), null == v3 || v3.addEventListener("mouseout", f3)), () => {
        e2.forEach((e3) => e3()), h && (null == v3 || v3.removeEventListener("mouseover", m3), null == v3 || v3.removeEventListener("mouseout", f3)), te2.cancel(), oe2.cancel();
      };
    }, [P3, q2, d2, c2, T2]), reactExports.useEffect(() => {
      const t3 = () => {
        X3.current(false);
      }, o = I3.current, r2 = $3.current;
      F3.scroll && (window.addEventListener("scroll", t3), null == r2 || r2.addEventListener("scroll", t3), null == o || o.addEventListener("scroll", t3));
      let n = null;
      F3.resize ? window.addEventListener("resize", t3) : e && N3.current && (n = autoUpdate(e, N3.current, () => Z3.current(), { ancestorResize: true, elementResize: true, layoutShift: true }));
      const l = (e2) => {
        "Escape" === e2.key && X3.current(false);
      };
      F3.escape && window.addEventListener("keydown", l);
      const c3 = (e2) => {
        var t4, o2;
        if (!K3.current) return;
        const r3 = e2.target;
        r3 instanceof Node && r3.isConnected && ((null === (t4 = N3.current) || void 0 === t4 ? void 0 : t4.contains(r3)) || (null === (o2 = V3.current) || void 0 === o2 ? void 0 : o2.contains(r3)) || Y3.current.some((e3) => null == e3 ? void 0 : e3.contains(r3)) || (X3.current(false), k(x3)));
      };
      return F3.clickOutsideAnchor && window.addEventListener("click", c3), () => {
        F3.scroll && (window.removeEventListener("scroll", t3), null == r2 || r2.removeEventListener("scroll", t3), null == o || o.removeEventListener("scroll", t3)), F3.resize && window.removeEventListener("resize", t3), n && n(), F3.escape && window.removeEventListener("keydown", l), F3.clickOutsideAnchor && window.removeEventListener("click", c3);
      };
    }, [F3, e]);
  })({ activeAnchor: te, anchorElements: je, anchorSelector: De, clickable: I2, closeEvents: D2, delayHide: x2, delayShow: N2, disableTooltip: X2, float: B2, globalCloseEvents: M2, handleHideTooltipDelayed: Le, handleShow: Ce, handleShowTooltipDelayed: xe, handleTooltipPosition: Be, hoveringTooltip: Te, imperativeModeOnly: P2, lastFloatPosition: _e, openEvents: j2, openOnClick: b2, rendered: be, setActiveAnchor: oe, show: ye, tooltipHideDelayTimerRef: pe, tooltipRef: ue, tooltipShowDelayTimerRef: de, updateTooltipPosition: ze });
  const He = reactExports.useRef(ze);
  He.current = ze, reactExports.useEffect(() => {
    be && ze();
  }, [be, ze]), reactExports.useEffect(() => {
    if (!be || !(null == Z2 ? void 0 : Z2.current)) return () => null;
    let e = null;
    const t2 = new ResizeObserver(() => {
      e && clearTimeout(e), e = setTimeout(() => {
        ke.current && He.current(), e = null;
      }, 0);
    });
    return t2.observe(Z2.current), () => {
      t2.disconnect(), e && clearTimeout(e);
    };
  }, [G2, Z2, be]), reactExports.useEffect(() => {
    var e;
    if (!(Q || Boolean(J))) return;
    const t2 = (() => {
      if (!te || !(null == ge ? void 0 : ge.anchorSelect)) return false;
      try {
        return te.matches(ge.anchorSelect);
      } catch (e2) {
        return false;
      }
    })();
    if (!te || !je.includes(te)) {
      if (t2) return;
      oe(null !== (e = je[0]) && void 0 !== e ? e : null);
    }
  }, [te, je, Q, null == ge ? void 0 : ge.anchorSelect, J, be, oe]), reactExports.useEffect(() => (Q && Ce(true), () => {
    k(de), k(pe), k(ve), k(me);
  }), [Q, Ce]), reactExports.useEffect(() => {
    de.current && (k(de), xe(N2));
  }, [N2, xe]);
  const Me = null !== (se = null == ge ? void 0 : ge.content) && void 0 !== se ? se : G2, Pe = null != Me, We = ye && void 0 !== fe.tooltipStyles.left, qe = reactExports.useMemo(() => ({ ...F2, ...fe.tooltipStyles, opacity: void 0 !== ne && We ? ne : void 0 }), [F2, fe.tooltipStyles, ne, We]), Fe = reactExports.useMemo(() => le ? `linear-gradient(to right bottom, transparent 50%, ${le} 50%)` : void 0, [le]), Ve = reactExports.useMemo(() => ({ ...fe.tooltipArrowStyles, background: Fe, "--rt-arrow-size": `${ce}px` }), [fe.tooltipArrowStyles, Fe, ce]);
  reactExports.useImperativeHandle(t, () => ({ open: (e) => {
    let t2 = null;
    if (null == e ? void 0 : e.anchorSelect) {
      try {
        t2 = document.querySelector(e.anchorSelect);
      } catch (e2) {
        return;
      }
      if (!t2) return;
    }
    t2 && oe(t2), Ae(null != e ? e : null), (null == e ? void 0 : e.delay) ? xe(e.delay) : Ce(true);
  }, close: (e) => {
    (null == e ? void 0 : e.delay) ? Le(e.delay) : Ce(false);
  }, activeAnchor: te, place: fe.place, isOpen: Boolean(be && !z2 && Pe && We) })), reactExports.useEffect(() => () => {
    k(de), k(pe), k(ve), k(me);
  }, []);
  const Ke = be && !z2 && Pe ? React.createElement(R2, { id: c, role: ie, className: clsx("react-tooltip", O.tooltip, C.tooltip, C[v], d, `react-tooltip__place-${fe.place}`, O[We ? "show" : "closing"], We ? "react-tooltip__show" : "react-tooltip__closing", "fixed" === S2 && O.fixed, I2 && O.clickable), onTransitionEnd: (e) => {
    k(me), ye || "opacity" !== e.propertyName || (Se(false), Ae(null), null == Y2 || Y2());
  }, style: qe, ref: ue }, React.createElement(R2, { className: clsx("react-tooltip-content-wrapper", O.content, C.content) }, Me), React.createElement(R2, { className: clsx("react-tooltip-arrow", O.arrow, C.arrow, p, $2 && O.noArrow), style: Ve, ref: ae })) : null;
  return Ke ? m ? reactDomExports.createPortal(Ke, m) : Ke : null;
});
const V = /* @__PURE__ */ new Map();
let K = null;
const Y = { attributes: true, childList: false, subtree: false };
function X(e, t) {
  const o = (K || (K = new MutationObserver((e2) => {
    var t2;
    for (const o2 of e2) {
      if ("attributes" !== o2.type || !(null === (t2 = o2.attributeName) || void 0 === t2 ? void 0 : t2.startsWith("data-tooltip-"))) continue;
      const e3 = o2.target, r2 = V.get(e3);
      r2 && r2.forEach((t3) => t3(e3));
    }
  })), K);
  let r = V.get(e);
  return r || (r = /* @__PURE__ */ new Set(), V.set(e, r), o.observe(e, Y)), r.add(t), () => {
    const r2 = V.get(e);
    r2 && (r2.delete(t), 0 === r2.size && (V.delete(e), 0 === V.size ? o.disconnect() : (o.disconnect(), V.forEach((e2, t2) => {
      o.observe(t2, Y);
    }))));
  };
}
const G = React.forwardRef(({ id: t, anchorSelect: l, content: c, render: s, className: a, classNameArrow: d, variant: p = "dark", portalRoot: v, place: m = "top", offset: f = 10, wrapper: h = "div", children: y2 = null, openOnClick: w2 = false, positionStrategy: b2 = "absolute", middlewares: S2, delayShow: g2 = 0, delayHide: A2 = 0, autoClose: E2, float: _2 = false, hidden: T2 = false, noArrow: k2 = false, clickable: O2 = false, openEvents: C2, closeEvents: R2, globalCloseEvents: N2, imperativeModeOnly: x2 = false, style: L2, position: B2, isOpen: z2, defaultIsOpen: $2 = false, disableStyleInjection: I2 = false, border: j2, opacity: D2, arrowColor: H2, arrowSize: M2, setIsOpen: P2, afterShow: W2, afterHide: q2, disableTooltip: V2, role: K2 = "tooltip" }, Y2) => {
  var G2, Z2, J, Q, U, ee, te, oe;
  const [re, ne] = reactExports.useState(null), [le, ce] = reactExports.useState({}), ie = reactExports.useRef(null), se = reactExports.useRef(I2), ue = reactExports.useCallback((e) => {
    ne((t2) => ((null == e ? void 0 : e.isSameNode(t2)) || (ie.current = t2), e));
  }, []), ae = (e) => {
    const t2 = null == e ? void 0 : e.getAttributeNames().reduce((t3, o) => {
      var r;
      if (o.startsWith("data-tooltip-")) {
        t3[o.replace(/^data-tooltip-/, "")] = null !== (r = null == e ? void 0 : e.getAttribute(o)) && void 0 !== r ? r : null;
      }
      return t3;
    }, {});
    return t2;
  };
  reactExports.useEffect(() => {
    se.current;
  }, [I2]), reactExports.useEffect(() => {
    "undefined" != typeof window && window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles", { detail: { disableCore: "core" === I2, disableBase: I2 } }));
  }, []), reactExports.useEffect(() => {
    if (!re) return ce({}), () => {
    };
    const e = (e2) => {
      const t2 = ae(e2);
      ce((e3) => {
        const o = Object.keys(t2), r = Object.keys(e3);
        return o.length === r.length && o.every((o2) => t2[o2] === e3[o2]) ? e3 : t2;
      });
    };
    e(re);
    return X(re, e);
  }, [re, l]), reactExports.useEffect(() => {
  }, [j2, D2, null == L2 ? void 0 : L2.border, null == L2 ? void 0 : L2.opacity]);
  const de = re ? ae(re) : le, pe = null !== (G2 = de.content) && void 0 !== G2 ? G2 : c, ve = null !== (Z2 = de.place) && void 0 !== Z2 ? Z2 : m, me = null !== (J = de.variant) && void 0 !== J ? J : p, fe = null == de.offset ? f : Number(de.offset), he = null !== (Q = de.wrapper) && void 0 !== Q ? Q : h, ye = null !== (U = de["position-strategy"]) && void 0 !== U ? U : b2, we = null == de["delay-show"] ? g2 : Number(de["delay-show"]), be = null == de["delay-hide"] ? A2 : Number(de["delay-hide"]), Se = null == de["auto-close"] ? E2 : Number(de["auto-close"]), ge = null == de.float ? _2 : "true" === de.float, Ae = null == de.hidden ? T2 : "true" === de.hidden, Ee = null !== (ee = de["class-name"]) && void 0 !== ee ? ee : null;
  let _e = y2;
  const Te = reactExports.useRef(null);
  if (s) {
    const t2 = s({ content: null !== (oe = null !== (te = de.content) && void 0 !== te ? te : pe) && void 0 !== oe ? oe : null, activeAnchor: re });
    _e = t2 ? React.createElement("div", { ref: Te, className: "react-tooltip-content-wrapper" }, t2) : null;
  } else null != pe && (_e = pe);
  const ke = { forwardRef: Y2, id: t, anchorSelect: l, className: clsx(a, Ee), classNameArrow: d, content: _e, contentWrapperRef: Te, portalRoot: v, place: ve, variant: me, offset: fe, wrapper: he, openOnClick: w2, positionStrategy: ye, middlewares: S2, delayShow: we, delayHide: be, autoClose: Se, float: ge, hidden: Ae, noArrow: k2, clickable: O2, openEvents: C2, closeEvents: R2, globalCloseEvents: N2, imperativeModeOnly: x2, style: L2, position: B2, isOpen: z2, defaultIsOpen: $2, border: j2, opacity: D2, arrowColor: H2, arrowSize: M2, setIsOpen: P2, afterShow: W2, afterHide: q2, disableTooltip: V2, activeAnchor: re, previousActiveAnchor: ie.current, setActiveAnchor: ue, role: K2 };
  return React.createElement(F, { ...ke });
});
var Z = reactExports.memo(G);
"undefined" != typeof window && window.addEventListener("react-tooltip-inject-styles", (e) => {
  e.detail.disableCore || w({ css: `:root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s;--rt-arrow-size:8px}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit;z-index:-1;-webkit-backface-visibility:hidden;backface-visibility:hidden}.core-styles-module_content__BRKdB{position:relative;z-index:1}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out;will-change:opacity}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in;will-change:opacity}`, type: "core" }), e.detail.disableBase || w({ css: `
.styles-module_tooltip__mnnfp{border-radius:3px;font-size:90%;width:max-content}.styles-module_content__ydYdI{background:inherit;border-radius:inherit;padding:8px 16px}.styles-module_arrow__K0L3T{width:var(--rt-arrow-size);height:var(--rt-arrow-size)}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`, type: "base" });
});
export {
  Z
};
