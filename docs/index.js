import { sharedConfig as Y, createMemo as nt, createRenderEffect as L, untrack as st, createContext as at, createSignal as H, onMount as Ve, onCleanup as Ae, createComponent as ae, useContext as lt } from "solid-js";
const le = (e) => nt(() => e());
function ct(e, t, o) {
  let r = o.length, i = t.length, n = r, s = 0, l = 0, a = t[i - 1].nextSibling, c = null;
  for (; s < i || l < n; ) {
    if (t[s] === o[l]) {
      s++, l++;
      continue;
    }
    for (; t[i - 1] === o[n - 1]; )
      i--, n--;
    if (i === s) {
      const h = n < r ? l ? o[l - 1].nextSibling : o[n - l] : a;
      for (; l < n; ) e.insertBefore(o[l++], h);
    } else if (n === l)
      for (; s < i; )
        (!c || !c.has(t[s])) && t[s].remove(), s++;
    else if (t[s] === o[n - 1] && o[l] === t[i - 1]) {
      const h = t[--i].nextSibling;
      e.insertBefore(o[l++], t[s++].nextSibling), e.insertBefore(o[--n], h), t[i] = o[n];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let y = l;
        for (; y < n; ) c.set(o[y], y++);
      }
      const h = c.get(t[s]);
      if (h != null)
        if (l < h && h < n) {
          let y = s, k = 1, P;
          for (; ++y < i && y < n && !((P = c.get(t[y])) == null || P !== h + k); )
            k++;
          if (k > h - l) {
            const z = t[s];
            for (; l < h; ) e.insertBefore(o[l++], z);
          } else e.replaceChild(o[l++], t[s++]);
        } else s++;
      else t[s++].remove();
    }
  }
}
const De = "_$DX_DELEGATE";
function R(e, t, o, r) {
  let i;
  const n = () => {
    const l = document.createElement("template");
    return l.innerHTML = e, l.content.firstChild;
  }, s = () => (i || (i = n())).cloneNode(!0);
  return s.cloneNode = s, s;
}
function ce(e, t = window.document) {
  const o = t[De] || (t[De] = /* @__PURE__ */ new Set());
  for (let r = 0, i = e.length; r < i; r++) {
    const n = e[r];
    o.has(n) || (o.add(n), t.addEventListener(n, ut));
  }
}
function me(e, t, o) {
  Pe(e) || (o == null ? e.removeAttribute(t) : e.setAttribute(t, o));
}
function G(e, t) {
  Pe(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function pe(e, t, o, r) {
  if (r)
    Array.isArray(o) ? (e[`$$${t}`] = o[0], e[`$$${t}Data`] = o[1]) : e[`$$${t}`] = o;
  else if (Array.isArray(o)) {
    const i = o[0];
    e.addEventListener(t, o[0] = (n) => i.call(e, o[1], n));
  } else e.addEventListener(t, o, typeof o != "function" && o);
}
function dt(e, t, o) {
  if (!t) return o ? me(e, "style") : t;
  const r = e.style;
  if (typeof t == "string") return r.cssText = t;
  typeof o == "string" && (r.cssText = o = void 0), o || (o = {}), t || (t = {});
  let i, n;
  for (n in o)
    t[n] == null && r.removeProperty(n), delete o[n];
  for (n in t)
    i = t[n], i !== o[n] && (r.setProperty(n, i), o[n] = i);
  return o;
}
function Q(e, t, o) {
  o != null ? e.style.setProperty(t, o) : e.style.removeProperty(t);
}
function xe(e, t, o) {
  return st(() => e(t, o));
}
function Z(e, t, o, r) {
  if (o !== void 0 && !r && (r = []), typeof t != "function") return ye(e, t, r, o);
  L((i) => ye(e, t(), i, o), r);
}
function Pe(e) {
  return !!Y.context && !Y.done && (!e || e.isConnected);
}
function ut(e) {
  if (Y.registry && Y.events && Y.events.find(([a, c]) => c === e))
    return;
  let t = e.target;
  const o = `$$${e.type}`, r = e.target, i = e.currentTarget, n = (a) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: a
  }), s = () => {
    const a = t[o];
    if (a && !t.disabled) {
      const c = t[`${o}Data`];
      if (c !== void 0 ? a.call(t, c, e) : a.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && n(t.host), !0;
  }, l = () => {
    for (; s() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), Y.registry && !Y.done && (Y.done = _$HY.done = !0), e.composedPath) {
    const a = e.composedPath();
    n(a[0]);
    for (let c = 0; c < a.length - 2 && (t = a[c], !!s()); c++) {
      if (t._$host) {
        t = t._$host, l();
        break;
      }
      if (t.parentNode === i)
        break;
    }
  } else l();
  n(r);
}
function ye(e, t, o, r, i) {
  const n = Pe(e);
  if (n) {
    !o && (o = [...e.childNodes]);
    let a = [];
    for (let c = 0; c < o.length; c++) {
      const h = o[c];
      h.nodeType === 8 && h.data.slice(0, 2) === "!$" ? h.remove() : a.push(h);
    }
    o = a;
  }
  for (; typeof o == "function"; ) o = o();
  if (t === o) return o;
  const s = typeof t, l = r !== void 0;
  if (e = l && o[0] && o[0].parentNode || e, s === "string" || s === "number") {
    if (n || s === "number" && (t = t.toString(), t === o))
      return o;
    if (l) {
      let a = o[0];
      a && a.nodeType === 3 ? a.data !== t && (a.data = t) : a = document.createTextNode(t), o = ee(e, o, r, a);
    } else
      o !== "" && typeof o == "string" ? o = e.firstChild.data = t : o = e.textContent = t;
  } else if (t == null || s === "boolean") {
    if (n) return o;
    o = ee(e, o, r);
  } else {
    if (s === "function")
      return L(() => {
        let a = t();
        for (; typeof a == "function"; ) a = a();
        o = ye(e, a, o, r);
      }), () => o;
    if (Array.isArray(t)) {
      const a = [], c = o && Array.isArray(o);
      if (Te(a, t, o, i))
        return L(() => o = ye(e, a, o, r, !0)), () => o;
      if (n) {
        if (!a.length) return o;
        if (r === void 0) return o = [...e.childNodes];
        let h = a[0];
        if (h.parentNode !== e) return o;
        const y = [h];
        for (; (h = h.nextSibling) !== r; ) y.push(h);
        return o = y;
      }
      if (a.length === 0) {
        if (o = ee(e, o, r), l) return o;
      } else c ? o.length === 0 ? Fe(e, a, r) : ct(e, o, a) : (o && ee(e), Fe(e, a));
      o = a;
    } else if (t.nodeType) {
      if (n && t.parentNode) return o = l ? [t] : t;
      if (Array.isArray(o)) {
        if (l) return o = ee(e, o, r, t);
        ee(e, o, null, t);
      } else o == null || o === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      o = t;
    }
  }
  return o;
}
function Te(e, t, o, r) {
  let i = !1;
  for (let n = 0, s = t.length; n < s; n++) {
    let l = t[n], a = o && o[e.length], c;
    if (!(l == null || l === !0 || l === !1)) if ((c = typeof l) == "object" && l.nodeType)
      e.push(l);
    else if (Array.isArray(l))
      i = Te(e, l, a) || i;
    else if (c === "function")
      if (r) {
        for (; typeof l == "function"; ) l = l();
        i = Te(e, Array.isArray(l) ? l : [l], Array.isArray(a) ? a : [a]) || i;
      } else
        e.push(l), i = !0;
    else {
      const h = String(l);
      a && a.nodeType === 3 && a.data === h ? e.push(a) : e.push(document.createTextNode(h));
    }
  }
  return i;
}
function Fe(e, t, o = null) {
  for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], o);
}
function ee(e, t, o, r) {
  if (o === void 0) return e.textContent = "";
  const i = r || document.createTextNode("");
  if (t.length) {
    let n = !1;
    for (let s = t.length - 1; s >= 0; s--) {
      const l = t[s];
      if (i !== l) {
        const a = l.parentNode === e;
        !n && !s ? a ? e.replaceChild(i, l) : e.insertBefore(i, o) : a && l.remove();
      } else n = !0;
    }
  } else e.insertBefore(i, o);
  return [i];
}
const ht = {
  engine: {
    enabled: !0,
    autoDetect: !0,
    fallbackToJS: !0
  },
  theme: {
    name: "default"
  },
  performance: {
    useRequestAnimationFrame: !0,
    debounceMs: 16,
    throttleMs: 8
  },
  accessibility: {
    keyboardNavigation: !0,
    screenReaderSupport: !0,
    highContrast: !1
  }
};
class gt {
  config = ht;
  listeners = /* @__PURE__ */ new Set();
  getConfig() {
    return { ...this.config };
  }
  updateConfig(t) {
    this.config = { ...this.config, ...t }, this.notifyListeners();
  }
  setEngineEnabled(t) {
    this.updateConfig({
      engine: { ...this.config.engine, enabled: t }
    });
  }
  setTheme(t) {
    this.updateConfig({ theme: t });
  }
  subscribe(t) {
    return this.listeners.add(t), () => this.listeners.delete(t);
  }
  notifyListeners() {
    this.listeners.forEach((t) => t(this.config));
  }
  // Auto-detect engine availability - simplified for Solid UI Toolkit
  async detectEngineAvailability() {
    return !1;
  }
  // Smart engine detection
  async initialize() {
    if (this.config.engine.autoDetect) {
      const t = await this.detectEngineAvailability();
      this.setEngineEnabled(t);
    }
  }
}
const K = new gt();
K.initialize();
const He = at(), bt = (e) => {
  const [t, o] = H(K.getConfig());
  Ve(() => {
    const i = K.subscribe(o);
    e.config && K.updateConfig(e.config), Ae(i);
  });
  const r = {
    get config() {
      return t();
    },
    setEngineEnabled: (i) => {
      K.setEngineEnabled(i);
    },
    setTheme: (i) => {
      K.setTheme(i);
    },
    updateConfig: (i) => {
      K.updateConfig(i);
    }
  };
  return ae(He.Provider, {
    value: r,
    get children() {
      return e.children;
    }
  });
}, We = () => {
  const e = lt(He);
  if (!e)
    throw new Error("useScrollbarConfig must be used within ScrollbarProvider");
  return e;
}, ft = `
.scrollbar-container {
  position: relative;
  overflow: hidden;
}
.scrollbar-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
.scrollbar-content::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
.scrollbar-track {
  position: absolute;
  z-index: 999;
  background: transparent;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}
.scrollbar-track.visible {
  opacity: 1;
}
.scrollbar-track-vertical {
  top: 0;
  right: 0;
  width: 12px;
  height: 100%;
}
.scrollbar-track-horizontal {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12px;
}
.scrollbar-thumb {
  position: absolute;
  background: rgba(59, 130, 246, 0.8);
  border-radius: 2px;
  cursor: grab;
  transition: background 100ms ease;
  z-index: 99999;
  min-width: 1px;
  min-height: 1px;
}
.scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.8);
}
.scrollbar-thumb:active,
.scrollbar-thumb.dragging {
  background: rgba(59, 130, 246, 1);
  cursor: grabbing;
}
.scrollbar-arrow {
  position: absolute;
  width: 12px;
  height: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #6b7280;
  transition: color 150ms ease;
  z-index: 1000;
  padding: 0;
  margin: 0;
}
.scrollbar-arrow:hover {
  color: #3b82f6;
}
.scrollbar-arrow:active {
  color: #1d4ed8;
}
.scrollbar-arrow:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}
.scrollbar-arrow-up {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 0;
  margin: 0;
}
.scrollbar-arrow-down {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 0;
  margin: 0;
}
.scrollbar-arrow-left {
  position: absolute;
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}
.scrollbar-arrow-right {
  position: absolute;
  top: 50%;
  right: 0;
  width: 12px;
  height: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}
`;
function mt() {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--zoom-level"
    ) || "1"
  );
}
function te(e) {
  return e / mt();
}
class pt {
  physicsObjectId = null;
  velocity = 0;
  acceleration = 0;
  zoomLevel = 1;
  isInitialized = !1;
  async createPhysicsObject(t, o) {
    const r = Math.random() * 1e3;
    return this.physicsObjectId = r, r;
  }
  async updatePhysicsObject(t, o, r) {
    this.physicsObjectId === t && (this.velocity = Math.random() * 0.1);
  }
  async destroyPhysicsObject(t) {
    this.physicsObjectId === t && (this.physicsObjectId = null);
  }
  async updateZoomLevel(t) {
    this.zoomLevel = t;
  }
  async screenToWorld(t, o) {
    return { x: t, y: o };
  }
  async worldToScreen(t, o) {
    return { x: t, y: o };
  }
  async getEngineState() {
    return {
      physicsObjectId: this.physicsObjectId || void 0,
      velocity: this.velocity,
      acceleration: this.acceleration,
      zoomLevel: this.zoomLevel,
      isInitialized: this.isInitialized
    };
  }
  async isAvailable() {
    return this.isInitialized = !0, !0;
  }
}
const Ne = new pt();
class yt {
  currentEngine = null;
  config;
  isInitialized = !1;
  constructor(t) {
    this.config = t;
  }
  async initialize() {
    if (!this.isInitialized)
      try {
        this.config.enabled && this.config.autoDetect && await this.detectTauriEngine() && (this.currentEngine = await this.loadTauriEngine()), this.currentEngine || (this.currentEngine = Ne), this.isInitialized = !0;
      } catch (t) {
        console.warn("Failed to initialize engine, falling back to mock:", t), this.currentEngine = Ne, this.isInitialized = !0;
      }
  }
  async getEngine() {
    return this.isInitialized || await this.initialize(), this.currentEngine;
  }
  async detectTauriEngine() {
    if (typeof window > "u" || !window.__TAURI__ || typeof window.__TAURI__.invoke != "function") return !1;
    try {
      return await (await this.loadTauriEngine()).isAvailable();
    } catch {
      return !1;
    }
  }
  async loadTauriEngine() {
    try {
      const { tauriEngine: t } = await Promise.resolve().then(() => Gt);
      if (this.config.physicsEnabled)
        try {
          const o = t;
          o.initPhysicsEngine && (await o.initPhysicsEngine(), console.log("Physics engine DLL initialized successfully"));
        } catch (o) {
          console.warn("Failed to initialize physics engine DLL:", o);
        }
      return t;
    } catch (t) {
      throw console.warn("Failed to load Tauri engine:", t), t;
    }
  }
  updateConfig(t) {
    this.config = { ...this.config, ...t }, this.isInitialized = !1;
  }
  getConfig() {
    return { ...this.config };
  }
}
let ke = null;
function wt(e) {
  return ke || (ke = new yt(
    e || {
      enabled: !0,
      autoDetect: !0,
      fallbackToJS: !0,
      physicsEnabled: !0,
      zoomEnabled: !0
    }
  )), ke;
}
async function oe() {
  return await wt().getEngine();
}
class vt {
  physicsObjectId = null;
  velocity = 0;
  acceleration = 0;
  async createPhysicsObject(t, o) {
    try {
      const i = await (await oe()).createPhysicsObject(t, o);
      return this.physicsObjectId = i, i;
    } catch (r) {
      console.warn("Failed to create physics object, using fallback:", r);
      const i = Math.random() * 1e3;
      return this.physicsObjectId = i, i;
    }
  }
  async updatePhysicsObject(t, o) {
    if (this.physicsObjectId)
      try {
        await (await oe()).updatePhysicsObject(this.physicsObjectId, t, o);
      } catch (r) {
        console.warn("Failed to update physics object:", r);
      }
  }
  async updateZoomLevel(t) {
    try {
      await (await oe()).updateZoomLevel(t);
    } catch (o) {
      console.warn("Failed to update zoom level:", o);
    }
  }
  async getEngineState() {
    try {
      const o = await (await oe()).getEngineState();
      return {
        physicsObjectId: o.physicsObjectId,
        velocity: o.velocity,
        acceleration: o.acceleration
      };
    } catch (t) {
      return console.warn("Failed to get engine state, using local state:", t), {
        physicsObjectId: this.physicsObjectId || void 0,
        velocity: this.velocity,
        acceleration: this.acceleration
      };
    }
  }
  setVelocity(t) {
    this.velocity = t;
  }
  setAcceleration(t) {
    this.acceleration = t;
  }
  // Physics Engine DLL methods
  async calculateScrollbarPhysics(t, o, r, i) {
    try {
      const n = await oe();
      return "calculateScrollbarPhysics" in n ? await n.calculateScrollbarPhysics(
        t,
        o,
        r,
        i
      ) : this.simplePhysicsCalculation(
        t,
        o,
        r,
        i
      );
    } catch (n) {
      return console.warn(
        "Failed to calculate scrollbar physics, using fallback:",
        n
      ), this.simplePhysicsCalculation(
        t,
        o,
        r,
        i
      );
    }
  }
  simplePhysicsCalculation(t, o, r, i) {
    const n = { ...o }, s = -t.stiffness * (n.position - r), l = -t.damping * n.velocity, a = s + l;
    return n.acceleration = a / t.mass, n.velocity += n.acceleration * i, n.velocity = Math.max(
      -t.max_velocity,
      Math.min(t.max_velocity, n.velocity)
    ), n.position += n.velocity * i, n;
  }
  async getPhysicsEngineInfo() {
    try {
      const t = await oe();
      return "getPhysicsEngineInfo" in t ? await t.getPhysicsEngineInfo() : "Mock Physics Engine - No DLL available";
    } catch (t) {
      return console.warn("Failed to get physics engine info:", t), "Mock Physics Engine - Error occurred";
    }
  }
}
function xt(e, t, o, r, i, n, s, l, a) {
  const c = new vt();
  return {
    scrollBy: (f) => {
      if (!i()) return;
      const p = f * 3;
      o() === "horizontal" ? i().scrollLeft += p : i().scrollTop += p;
    },
    handleWheel: (f) => {
      if (!i()) return;
      f.preventDefault();
      let p, S;
      o() === "horizontal" ? (p = f.deltaY, S = !0) : (p = (f.shiftKey, f.deltaY), S = f.shiftKey);
      const v = p * 0.5;
      S ? i().scrollLeft += v : i().scrollTop += v, a && setTimeout(a, 0);
    },
    handleThumbMouseDown: async (f) => {
      f.preventDefault(), f.stopPropagation();
      const p = n().getBoundingClientRect(), S = o() === "horizontal" ? te(f.clientX - p.left) : te(f.clientY - p.top), v = e().thumbPosition + e().thumbSize / 2, C = S - v;
      t((E) => ({
        ...E,
        isDragging: !0,
        dragOffset: C
      })), l() && await c.createPhysicsObject(S, 0), document.body.style.userSelect = "none";
    },
    handleMouseMove: async (f) => {
      if (!e().isDragging || !n() || !i()) return;
      f.preventDefault();
      const p = n().getBoundingClientRect(), S = o() === "horizontal" ? te(f.clientX - p.left) : te(f.clientY - p.top);
      l() && await c.updatePhysicsObject(S, 0);
      const C = S - e().dragOffset - e().thumbSize / 2, E = e().showArrows ? 12 : 0, $ = (o() === "horizontal" ? n().clientWidth : n().clientHeight) - E * 2, g = $ - e().thumbSize, M = Math.max(
        E,
        Math.min(C, g + E)
      );
      t((F) => ({ ...F, thumbPosition: M }));
      const X = o() === "horizontal" ? n().clientWidth : n().clientHeight, U = (o() === "horizontal" ? i().scrollWidth : i().scrollHeight) - X, x = M - E, D = $ - e().thumbSize, T = Math.max(
        0,
        Math.min(1, x / D)
      ) * U;
      o() === "horizontal" ? i().scrollLeft = T : i().scrollTop = T;
    },
    handleMouseUp: () => {
      t((f) => ({
        ...f,
        isDragging: !1,
        dragOffset: 0
      })), document.body.style.userSelect = "";
    },
    handleTrackClick: (f) => {
      if (!n() || !i() || !s() || f.target === s()) return;
      const p = n().getBoundingClientRect(), S = o() === "horizontal" ? te(f.clientX - p.left) : te(f.clientY - p.top), v = e().showArrows ? 12 : 0, C = (o() === "horizontal" ? n().clientWidth : n().clientHeight) - v * 2, O = S - v - e().thumbSize / 2, $ = C - e().thumbSize, g = Math.max(0, Math.min(O, $)) + v;
      t((I) => ({ ...I, thumbPosition: g }));
      const M = o() === "horizontal" ? n().clientWidth : n().clientHeight, q = (o() === "horizontal" ? i().scrollWidth : i().scrollHeight) - M, U = g - v, D = Math.max(
        0,
        Math.min(1, U / $)
      ) * q;
      o() === "horizontal" ? i().scrollLeft = D : i().scrollTop = D;
    }
  };
}
function kt(e, t, o, r, i, n, s) {
  const l = () => {
    if (!r() || !i()) return;
    const c = o() === "horizontal" ? r().clientWidth : r().clientHeight, h = o() === "horizontal" ? i().scrollWidth : i().scrollHeight;
    if (!(h > c)) {
      t((v) => ({ ...v, isVisible: !1 }));
      return;
    }
    const k = o() === "horizontal" ? i().scrollLeft : i().scrollTop, P = h - c, z = o() === "horizontal" ? n()?.clientWidth ?? 0 : n()?.clientHeight ?? 0, w = e().showArrows ? 12 : 0, f = z - w * 2, p = Math.max(
      20,
      f * c / h
    ), S = e().isDragging ? e().thumbPosition : Math.max(
      w,
      Math.min(
        w + k / P * (f - p),
        f - p + w
      )
    );
    t((v) => ({
      ...v,
      isVisible: !0,
      thumbSize: p,
      thumbPosition: S,
      canScrollUp: k > 0,
      canScrollDown: k < P
    }));
  };
  return {
    updateScrollbar: l,
    handleScroll: () => {
      e().isDragging || l();
    }
  };
}
function zt(e, t, o) {
  return { setupObservers: () => {
    if (!e() || !t()) return;
    const i = new ResizeObserver(() => {
      o();
    });
    i.observe(t()), i.observe(e());
    const n = new MutationObserver(() => {
      o(), setTimeout(o, 10);
    });
    return n.observe(t(), {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    }), () => {
      i.disconnect(), n.disconnect();
    };
  } };
}
function St(e) {
  const t = We(), [o, r] = H({
    thumbSize: 20,
    thumbPosition: 0,
    isVisible: !1,
    isDragging: !1,
    dragOffset: 0,
    showArrows: e.showArrows ?? !0,
    canScrollUp: !1,
    canScrollDown: !1
  }), [i, n] = H(!1), [s, l] = H(
    null
  ), a = () => e.direction ?? "vertical", c = () => e.theme ?? t.config.theme.name, h = () => e.autoHide ?? !0, y = () => e.minThumbSize ?? 4, k = () => e.engineIntegration !== void 0 ? e.engineIntegration && t.config.engine.enabled : t.config.engine.enabled, P = () => {
    n(!0);
    const w = s();
    w && (clearTimeout(w), l(null));
  }, z = () => {
    if (n(!1), h()) {
      const w = setTimeout(() => {
        r((f) => ({ ...f, isVisible: !1 }));
      }, 800);
      l(w);
    }
  };
  return Ae(() => {
    const w = s();
    w && clearTimeout(w);
  }), {
    state: o,
    setState: r,
    isHovered: i,
    setIsHovered: n,
    hideTimeout: s,
    setHideTimeout: l,
    direction: a,
    theme: c,
    autoHide: h,
    minThumbSize: y,
    engineIntegration: k,
    handleMouseEnter: P,
    handleMouseLeave: z
  };
}
var Tt = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z">'), _t = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z">'), Ct = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">'), Et = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z">');
const At = (e) => {
  const t = (o, r) => {
    o.stopPropagation(), e.onScrollBy(r);
  };
  return le(() => le(() => e.direction === "vertical")() ? [(() => {
    var o = Tt();
    return o.$$click = (r) => t(r, -50), L((r) => {
      var i = `scrollbar-arrow scrollbar-arrow-up ${e.canScrollUp ? "" : "disabled"}`, n = !e.canScrollUp;
      return i !== r.e && G(o, r.e = i), n !== r.t && (o.disabled = r.t = n), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })(), (() => {
    var o = _t();
    return o.$$click = (r) => t(r, 50), L((r) => {
      var i = `scrollbar-arrow scrollbar-arrow-down ${e.canScrollDown ? "" : "disabled"}`, n = !e.canScrollDown;
      return i !== r.e && G(o, r.e = i), n !== r.t && (o.disabled = r.t = n), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })()] : [(() => {
    var o = Ct();
    return o.$$click = (r) => t(r, -50), L((r) => {
      var i = `scrollbar-arrow scrollbar-arrow-left ${e.canScrollUp ? "" : "disabled"}`, n = !e.canScrollUp;
      return i !== r.e && G(o, r.e = i), n !== r.t && (o.disabled = r.t = n), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })(), (() => {
    var o = Et();
    return o.$$click = (r) => t(r, 50), L((r) => {
      var i = `scrollbar-arrow scrollbar-arrow-right ${e.canScrollDown ? "" : "disabled"}`, n = !e.canScrollDown;
      return i !== r.e && G(o, r.e = i), n !== r.t && (o.disabled = r.t = n), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })()]);
};
ce(["click"]);
var Pt = /* @__PURE__ */ R("<div>");
const Mt = (e) => (() => {
  var t = Pt();
  return pe(t, "mousedown", e.onMouseDown, !0), L((o) => {
    var r = `scrollbar-thumb ${e.isDragging ? "dragging" : ""}`, i = e.direction === "horizontal" ? `${Math.max(1, e.thumbSize)}px` : "4px", n = e.direction === "horizontal" ? "4px" : `${Math.max(1, e.thumbSize)}px`, s = e.direction === "horizontal" ? `${e.thumbPosition}px` : "auto", l = e.direction === "horizontal" ? "50%" : `${e.thumbPosition}px`, a = e.direction === "horizontal" ? "auto" : "4px", c = e.direction === "horizontal" ? "translateY(-50%)" : "none";
    return r !== o.e && G(t, o.e = r), i !== o.t && Q(t, "width", o.t = i), n !== o.a && Q(t, "height", o.a = n), s !== o.o && Q(t, "left", o.o = s), l !== o.i && Q(t, "top", o.i = l), a !== o.n && Q(t, "right", o.n = a), c !== o.s && Q(t, "transform", o.s = c), o;
  }, {
    e: void 0,
    t: void 0,
    a: void 0,
    o: void 0,
    i: void 0,
    n: void 0,
    s: void 0
  }), t;
})();
ce(["mousedown"]);
var It = /* @__PURE__ */ R("<style>"), $t = /* @__PURE__ */ R("<div><div class=scrollbar-content style=overflow-y:hidden;overflow-x:hidden>"), Lt = /* @__PURE__ */ R("<div>");
const jt = (e) => {
  const [t, o] = H(), [r, i] = H(), [n, s] = H(), [l, a] = H(), {
    state: c,
    setState: h,
    isHovered: y,
    direction: k,
    theme: P,
    autoHide: z,
    minThumbSize: w,
    engineIntegration: f,
    handleMouseEnter: p,
    handleMouseLeave: S
  } = St(e), {
    updateScrollbar: v,
    handleScroll: C
  } = kt(c, h, k, t, r, n), {
    scrollBy: E,
    handleWheel: O,
    handleThumbMouseDown: $,
    handleMouseMove: g,
    handleMouseUp: M,
    handleTrackClick: X
  } = xt(c, h, k, t, r, n, l, f, v), {
    setupObservers: q
  } = zt(t, r, v), U = () => c().isVisible && (y() || !z() || c().isDragging);
  return Ve(() => {
    const x = () => {
      v();
    };
    x(), setTimeout(x, 0), setTimeout(x, 50), setTimeout(x, 100), setTimeout(x, 200), setTimeout(x, 500), setTimeout(x, 1e3), setTimeout(x, 2e3), r() && r().addEventListener("scroll", C);
    const D = q();
    document.addEventListener("mousemove", g), document.addEventListener("mouseup", M), Ae(() => {
      D?.(), r() && r().removeEventListener("scroll", C), document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", M);
    });
  }), [(() => {
    var x = It();
    return Z(x, ft), x;
  })(), (() => {
    var x = $t(), D = x.firstChild;
    return pe(x, "wheel", O), pe(x, "mouseleave", S), x.addEventListener("mouseenter", () => {
      p(), v();
    }), xe(o, x), xe(i, D), Z(D, () => e.children), Z(x, (() => {
      var I = le(() => !!U());
      return () => I() && (() => {
        var T = Lt();
        return pe(T, "click", X, !0), xe(s, T), Z(T, (() => {
          var F = le(() => !!c().showArrows);
          return () => F() && ae(At, {
            get direction() {
              return k();
            },
            get canScrollUp() {
              return c().canScrollUp;
            },
            get canScrollDown() {
              return c().canScrollDown;
            },
            onScrollBy: E
          });
        })(), null), Z(T, ae(Mt, {
          get direction() {
            return k();
          },
          get thumbSize() {
            return c().thumbSize;
          },
          get thumbPosition() {
            return c().thumbPosition;
          },
          get isDragging() {
            return c().isDragging;
          },
          onMouseDown: $
        }), null), L(() => G(T, `scrollbar-track ${k() === "horizontal" ? "scrollbar-track-horizontal" : "scrollbar-track-vertical"} visible`)), T;
      })();
    })(), null), L((I) => {
      var T = `scrollbar-container ${e.class || ""}`, F = e.style;
      return T !== I.e && G(x, I.e = T), I.t = dt(x, F, I.t), I;
    }, {
      e: void 0,
      t: void 0
    }), x;
  })()];
}, So = (e) => ae(bt, {
  get children() {
    return ae(jt, e);
  }
});
ce(["click"]);
var Ot = /* @__PURE__ */ R(`<div><button class=scrollbar-controls-toggle title="Scrollbar Settings"><svg width=14 height=14 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=3></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button><style>
        .scrollbar-controls {
          position: relative;
          display: inline-block;
        }

        .scrollbar-controls-toggle {
          background: transparent;
          border: none;
          border-radius: 4px;
          padding: 6px;
          cursor: pointer;
          font-size: 16px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 200ms ease;
          color: #6b7280;
        }

        .scrollbar-controls-toggle:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .scrollbar-controls-toggle:active {
          background: rgba(59, 130, 246, 0.2);
        }

        .dark .scrollbar-controls-toggle {
          color: #9ca3af;
        }

        .dark .scrollbar-controls-toggle:hover {
          color: #60a5fa;
        }

        .scrollbar-controls-panel {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          min-width: 200px;
          margin-top: 4px;
        }

        .dark .scrollbar-controls-panel {
          background: #1f2937;
          border-color: #374151;
        }

        .control-group {
          margin-bottom: 12px;
        }

        .control-group label {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #374151;
          margin-bottom: 4px;
          cursor: pointer;
        }

        .dark .control-group label {
          color: #e5e7eb;
        }

        .control-group input[type="checkbox"] {
          margin-right: 8px;
        }

        .control-group select {
          width: 100%;
          padding: 4px 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background: white;
          font-size: 14px;
        }

        .dark .control-group select {
          background: #374151;
          border-color: #4b5563;
          color: #e5e7eb;
        }

        .scrollbar-controls-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 16px 0;
        }

        .dark .scrollbar-controls-title {
          color: #f9fafb;
        }
      `), Dt = /* @__PURE__ */ R("<div class=scrollbar-controls-panel><h3 class=scrollbar-controls-title>Scrollbar Settings</h3><div class=control-group><label><input type=checkbox>Enable Engine</label></div><div class=control-group><label>Theme:</label><select><option value=default>Default</option><option value=minimal>Minimal</option><option value=modern>Modern</option></select></div><div class=control-group><label><input type=checkbox>Auto-detect Engine</label></div><div class=control-group><label><input type=checkbox>Keyboard Navigation");
const To = (e) => {
  const t = We(), [o, r] = H(!1), i = () => {
    t.setEngineEnabled(!t.config.engine.enabled);
  }, n = (s) => {
    t.setTheme({
      name: s
    });
  };
  return (() => {
    var s = Ot(), l = s.firstChild, a = l.nextSibling;
    return l.$$click = () => r(!o()), Z(s, (() => {
      var c = le(() => !!o());
      return () => c() && (() => {
        var h = Dt(), y = h.firstChild, k = y.nextSibling, P = k.firstChild, z = P.firstChild, w = k.nextSibling, f = w.firstChild, p = f.nextSibling, S = w.nextSibling, v = S.firstChild, C = v.firstChild, E = S.nextSibling, O = E.firstChild, $ = O.firstChild;
        return z.addEventListener("change", i), p.addEventListener("change", (g) => n(g.currentTarget.value)), C.addEventListener("change", (g) => t.updateConfig({
          engine: {
            ...t.config.engine,
            autoDetect: g.currentTarget.checked
          }
        })), $.addEventListener("change", (g) => t.updateConfig({
          accessibility: {
            ...t.config.accessibility,
            keyboardNavigation: g.currentTarget.checked
          }
        })), L(() => z.checked = t.config.engine.enabled), L(() => p.value = t.config.theme.name), L(() => C.checked = t.config.engine.autoDetect), L(() => $.checked = t.config.accessibility.keyboardNavigation), h;
      })();
    })(), a), L(() => G(s, `scrollbar-controls ${e.class || ""}`)), s;
  })();
};
ce(["click"]);
const B = {
  base: `
		inline-flex items-center gap-1.5 px-3 py-1
		text-xs font-medium
		backdrop-blur-md border border-solid
		transition-all duration-200 ease-in-out
		relative
	`,
  variants: {
    frontend: `
			bg-[rgba(49,120,198,0.15)]
			border-[rgba(49,120,198,0.3)]
			text-[#3178c6]
		`,
    backend: `
			bg-[rgba(206,66,43,0.15)]
			border-[rgba(206,66,43,0.3)]
			text-[#ce422b]
		`,
    engine: `
			bg-[rgba(206,66,43,0.15)]
			border-[rgba(206,66,43,0.3)]
			text-[#ce422b]
		`
  },
  hover: `
		hover:-translate-y-0.5
		hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
	`,
  indicator: `
		w-1.5 h-1.5 rounded-full flex-shrink-0 relative
	`,
  icon: `
		text-sm leading-none h-3.5 -mt-px
	`,
  status: {
    loading: `
			bg-[#ff9800]
			animate-pulse
		`,
    ready: `
			bg-[#4caf50]
			shadow-[0_0_8px_rgba(76,175,80,0.5)]
		`,
    error: `
			bg-[#f44336]
			animate-pulse
		`
  }
}, _o = `
@keyframes pulse {
	0%, 100% {
		opacity: 1;
		transform: scale(1);
	}
	50% {
		opacity: 0.5;
		transform: scale(0.8);
	}
}

@keyframes blink {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.3;
	}
}
`;
var Ft = /* @__PURE__ */ R("<span role=status><span aria-hidden=true></span><span aria-hidden=true></span><span>");
const Co = (e) => (() => {
  var t = Ft(), o = t.firstChild, r = o.nextSibling, i = r.nextSibling;
  return t.$$click = () => e.onClick ? e.onClick() : void 0, Z(r, () => e.icon), Z(i, () => e.label), L((n) => {
    var s = e.class ? `${B.base} ${B.variants[e.variant]} ${B.hover} ${e.class}` : `${B.base} ${B.variants[e.variant]} ${B.hover}`, l = e.status, a = e.variant, c = `${e.label} status: ${e.status}`, h = `${B.indicator} ${B.status[e.status]}`.trim(), y = `material-symbols-rounded ${B.icon}`;
    return s !== n.e && G(t, n.e = s), l !== n.t && me(t, "data-status", n.t = l), a !== n.a && me(t, "data-variant", n.a = a), c !== n.o && me(t, "aria-label", n.o = c), h !== n.i && G(o, n.i = h), y !== n.n && G(r, n.n = y), n;
  }, {
    e: void 0,
    t: void 0,
    a: void 0,
    o: void 0,
    i: void 0,
    n: void 0
  }), t;
})();
ce(["click"]);
class Ye {
  physicsObjectId = null;
  velocity = 0;
  acceleration = 0;
  zoomLevel = 1;
  isInitialized = !1;
  async createPhysicsObject(t, o) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      const r = await window.__TAURI__.invoke("create_physics_object", {
        x: t,
        y: o
      });
      return this.physicsObjectId = r, r;
    } catch (r) {
      throw console.error("Failed to create physics object:", r), r;
    }
  }
  async updatePhysicsObject(t, o, r) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      await window.__TAURI__.invoke("update_physics_object", { id: t, x: o, y: r });
    } catch (i) {
      throw console.error("Failed to update physics object:", i), i;
    }
  }
  async destroyPhysicsObject(t) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      await window.__TAURI__.invoke("destroy_physics_object", { id: t }), this.physicsObjectId === t && (this.physicsObjectId = null);
    } catch (o) {
      throw console.error("Failed to destroy physics object:", o), o;
    }
  }
  async updateZoomLevel(t) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      await window.__TAURI__.invoke("update_zoom_level", { zoom: t }), this.zoomLevel = t;
    } catch (o) {
      throw console.error("Failed to update zoom level:", o), o;
    }
  }
  async screenToWorld(t, o) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      const r = await window.__TAURI__.invoke("screen_to_world", {
        screenX: t,
        screenY: o
      });
      return { x: r.x, y: r.y };
    } catch (r) {
      throw console.error("Failed to convert screen to world:", r), r;
    }
  }
  async worldToScreen(t, o) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      const r = await window.__TAURI__.invoke("world_to_screen", {
        worldX: t,
        worldY: o
      });
      return { x: r.x, y: r.y };
    } catch (r) {
      throw console.error("Failed to convert world to screen:", r), r;
    }
  }
  async getEngineState() {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      const t = await window.__TAURI__.invoke("get_engine_state");
      return {
        physicsObjectId: t.physicsObjectId,
        velocity: t.velocity || this.velocity,
        acceleration: t.acceleration || this.acceleration,
        zoomLevel: t.zoomLevel || this.zoomLevel,
        isInitialized: t.isInitialized || this.isInitialized
      };
    } catch (t) {
      return console.error("Failed to get engine state:", t), {
        physicsObjectId: this.physicsObjectId || void 0,
        velocity: this.velocity,
        acceleration: this.acceleration,
        zoomLevel: this.zoomLevel,
        isInitialized: this.isInitialized
      };
    }
  }
  async isAvailable() {
    const t = this.isTauriAvailable();
    return t && (this.isInitialized = !0), t;
  }
  // Physics Engine DLL methods
  async initPhysicsEngine() {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      await window.__TAURI__.invoke("init_physics_engine"), this.isInitialized = !0;
    } catch (t) {
      throw console.error("Failed to initialize physics engine:", t), t;
    }
  }
  async calculateScrollbarPhysics(t, o, r, i) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      return await window.__TAURI__.invoke(
        "calculate_scrollbar_physics",
        {
          config: t,
          currentState: o,
          targetPosition: r,
          deltaTime: i
        }
      );
    } catch (n) {
      throw console.error("Failed to calculate scrollbar physics:", n), n;
    }
  }
  async getPhysicsEngineInfo() {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      return await window.__TAURI__.invoke("get_physics_engine_info");
    } catch (t) {
      throw console.error("Failed to get physics engine info:", t), t;
    }
  }
  isTauriAvailable() {
    return typeof window < "u" && window.__TAURI__ !== void 0 && typeof window.__TAURI__.invoke == "function";
  }
}
const Nt = new Ye(), Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TauriEngine: Ye,
  tauriEngine: Nt
}, Symbol.toStringTag, { value: "Module" }));
function Ze(e) {
  var t, o, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (o = Ze(e[t])) && (r && (r += " "), r += o);
  } else for (o in e) e[o] && (r && (r += " "), r += o);
  return r;
}
function Rt() {
  for (var e, t, o = 0, r = "", i = arguments.length; o < i; o++) (e = arguments[o]) && (t = Ze(e)) && (r && (r += " "), r += t);
  return r;
}
const Me = "-", Ut = (e) => {
  const t = Vt(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const l = s.split(Me);
      return l[0] === "" && l.length !== 1 && l.shift(), Xe(l, t) || Bt(s);
    },
    getConflictingClassGroupIds: (s, l) => {
      const a = o[s] || [];
      return l && r[s] ? [...a, ...r[s]] : a;
    }
  };
}, Xe = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const o = e[0], r = t.nextPart.get(o), i = r ? Xe(e.slice(1), r) : void 0;
  if (i)
    return i;
  if (t.validators.length === 0)
    return;
  const n = e.join(Me);
  return t.validators.find(({
    validator: s
  }) => s(n))?.classGroupId;
}, Ge = /^\[(.+)\]$/, Bt = (e) => {
  if (Ge.test(e)) {
    const t = Ge.exec(e)[1], o = t?.substring(0, t.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, Vt = (e) => {
  const {
    theme: t,
    classGroups: o
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const i in o)
    _e(o[i], r, i, t);
  return r;
}, _e = (e, t, o, r) => {
  e.forEach((i) => {
    if (typeof i == "string") {
      const n = i === "" ? t : Re(t, i);
      n.classGroupId = o;
      return;
    }
    if (typeof i == "function") {
      if (Ht(i)) {
        _e(i(r), t, o, r);
        return;
      }
      t.validators.push({
        validator: i,
        classGroupId: o
      });
      return;
    }
    Object.entries(i).forEach(([n, s]) => {
      _e(s, Re(t, n), o, r);
    });
  });
}, Re = (e, t) => {
  let o = e;
  return t.split(Me).forEach((r) => {
    o.nextPart.has(r) || o.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(r);
  }), o;
}, Ht = (e) => e.isThemeGetter, Wt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const i = (n, s) => {
    o.set(n, s), t++, t > e && (t = 0, r = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(n) {
      let s = o.get(n);
      if (s !== void 0)
        return s;
      if ((s = r.get(n)) !== void 0)
        return i(n, s), s;
    },
    set(n, s) {
      o.has(n) ? o.set(n, s) : i(n, s);
    }
  };
}, Ce = "!", Ee = ":", Yt = Ee.length, Zt = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: o
  } = e;
  let r = (i) => {
    const n = [];
    let s = 0, l = 0, a = 0, c;
    for (let z = 0; z < i.length; z++) {
      let w = i[z];
      if (s === 0 && l === 0) {
        if (w === Ee) {
          n.push(i.slice(a, z)), a = z + Yt;
          continue;
        }
        if (w === "/") {
          c = z;
          continue;
        }
      }
      w === "[" ? s++ : w === "]" ? s-- : w === "(" ? l++ : w === ")" && l--;
    }
    const h = n.length === 0 ? i : i.substring(a), y = Xt(h), k = y !== h, P = c && c > a ? c - a : void 0;
    return {
      modifiers: n,
      hasImportantModifier: k,
      baseClassName: y,
      maybePostfixModifierPosition: P
    };
  };
  if (t) {
    const i = t + Ee, n = r;
    r = (s) => s.startsWith(i) ? n(s.substring(i.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: s,
      maybePostfixModifierPosition: void 0
    };
  }
  if (o) {
    const i = r;
    r = (n) => o({
      className: n,
      parseClassName: i
    });
  }
  return r;
}, Xt = (e) => e.endsWith(Ce) ? e.substring(0, e.length - 1) : e.startsWith(Ce) ? e.substring(1) : e, qt = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const i = [];
    let n = [];
    return r.forEach((s) => {
      s[0] === "[" || t[s] ? (i.push(...n.sort(), s), n = []) : n.push(s);
    }), i.push(...n.sort()), i;
  };
}, Jt = (e) => ({
  cache: Wt(e.cacheSize),
  parseClassName: Zt(e),
  sortModifiers: qt(e),
  ...Ut(e)
}), Kt = /\s+/, Qt = (e, t) => {
  const {
    parseClassName: o,
    getClassGroupId: r,
    getConflictingClassGroupIds: i,
    sortModifiers: n
  } = t, s = [], l = e.trim().split(Kt);
  let a = "";
  for (let c = l.length - 1; c >= 0; c -= 1) {
    const h = l[c], {
      isExternal: y,
      modifiers: k,
      hasImportantModifier: P,
      baseClassName: z,
      maybePostfixModifierPosition: w
    } = o(h);
    if (y) {
      a = h + (a.length > 0 ? " " + a : a);
      continue;
    }
    let f = !!w, p = r(f ? z.substring(0, w) : z);
    if (!p) {
      if (!f) {
        a = h + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (p = r(z), !p) {
        a = h + (a.length > 0 ? " " + a : a);
        continue;
      }
      f = !1;
    }
    const S = n(k).join(":"), v = P ? S + Ce : S, C = v + p;
    if (s.includes(C))
      continue;
    s.push(C);
    const E = i(p, f);
    for (let O = 0; O < E.length; ++O) {
      const $ = E[O];
      s.push(v + $);
    }
    a = h + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function eo() {
  let e = 0, t, o, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (o = qe(t)) && (r && (r += " "), r += o);
  return r;
}
const qe = (e) => {
  if (typeof e == "string")
    return e;
  let t, o = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = qe(e[r])) && (o && (o += " "), o += t);
  return o;
};
function to(e, ...t) {
  let o, r, i, n = s;
  function s(a) {
    const c = t.reduce((h, y) => y(h), e());
    return o = Jt(c), r = o.cache.get, i = o.cache.set, n = l, l(a);
  }
  function l(a) {
    const c = r(a);
    if (c)
      return c;
    const h = Qt(a, o);
    return i(a, h), h;
  }
  return function() {
    return n(eo.apply(null, arguments));
  };
}
const _ = (e) => {
  const t = (o) => o[e] || [];
  return t.isThemeGetter = !0, t;
}, Je = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ke = /^\((?:(\w[\w-]*):)?(.+)\)$/i, oo = /^\d+\/\d+$/, ro = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, io = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, no = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, so = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ao = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, re = (e) => oo.test(e), m = (e) => !!e && !Number.isNaN(Number(e)), W = (e) => !!e && Number.isInteger(Number(e)), ze = (e) => e.endsWith("%") && m(e.slice(0, -1)), V = (e) => ro.test(e), lo = () => !0, co = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  io.test(e) && !no.test(e)
), Qe = () => !1, uo = (e) => so.test(e), ho = (e) => ao.test(e), go = (e) => !d(e) && !u(e), bo = (e) => ie(e, ot, Qe), d = (e) => Je.test(e), J = (e) => ie(e, rt, co), Se = (e) => ie(e, wo, m), Ue = (e) => ie(e, et, Qe), fo = (e) => ie(e, tt, ho), be = (e) => ie(e, it, uo), u = (e) => Ke.test(e), se = (e) => ne(e, rt), mo = (e) => ne(e, vo), Be = (e) => ne(e, et), po = (e) => ne(e, ot), yo = (e) => ne(e, tt), fe = (e) => ne(e, it, !0), ie = (e, t, o) => {
  const r = Je.exec(e);
  return r ? r[1] ? t(r[1]) : o(r[2]) : !1;
}, ne = (e, t, o = !1) => {
  const r = Ke.exec(e);
  return r ? r[1] ? t(r[1]) : o : !1;
}, et = (e) => e === "position" || e === "percentage", tt = (e) => e === "image" || e === "url", ot = (e) => e === "length" || e === "size" || e === "bg-size", rt = (e) => e === "length", wo = (e) => e === "number", vo = (e) => e === "family-name", it = (e) => e === "shadow", xo = () => {
  const e = _("color"), t = _("font"), o = _("text"), r = _("font-weight"), i = _("tracking"), n = _("leading"), s = _("breakpoint"), l = _("container"), a = _("spacing"), c = _("radius"), h = _("shadow"), y = _("inset-shadow"), k = _("text-shadow"), P = _("drop-shadow"), z = _("blur"), w = _("perspective"), f = _("aspect"), p = _("ease"), S = _("animate"), v = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], E = () => [...C(), u, d], O = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", "contain", "none"], g = () => [u, d, a], M = () => [re, "full", "auto", ...g()], X = () => [W, "none", "subgrid", u, d], q = () => ["auto", {
    span: ["full", W, u, d]
  }, W, u, d], U = () => [W, "auto", u, d], x = () => ["auto", "min", "max", "fr", u, d], D = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], I = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], T = () => ["auto", ...g()], F = () => [re, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...g()], b = () => [e, u, d], Ie = () => [...C(), Be, Ue, {
    position: [u, d]
  }], $e = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Le = () => ["auto", "cover", "contain", po, bo, {
    size: [u, d]
  }], we = () => [ze, se, J], j = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    u,
    d
  ], N = () => ["", m, se, J], de = () => ["solid", "dashed", "dotted", "double"], je = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], A = () => [m, ze, Be, Ue], Oe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    z,
    u,
    d
  ], ue = () => ["none", m, u, d], he = () => ["none", m, u, d], ve = () => [m, u, d], ge = () => [re, "full", ...g()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [V],
      breakpoint: [V],
      color: [lo],
      container: [V],
      "drop-shadow": [V],
      ease: ["in", "out", "in-out"],
      font: [go],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [V],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [V],
      shadow: [V],
      spacing: ["px", m],
      text: [V],
      "text-shadow": [V],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", re, d, u, f]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [m, d, u, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": v()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": v()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: E()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: O()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": O()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": O()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: $()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": $()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": $()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: M()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": M()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": M()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: M()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: M()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: M()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: M()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: M()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: M()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [W, "auto", u, d]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [re, "full", "auto", l, ...g()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [m, re, "auto", "initial", "none", d]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", m, u, d]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", m, u, d]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [W, "first", "last", "none", u, d]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": X()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: q()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": U()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": U()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": X()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: q()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": U()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": U()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": x()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": x()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: g()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": g()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": g()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...D(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...I(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...I()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...D()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...I(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...I(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": D()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...I(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...I()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: g()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: g()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: g()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: g()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: g()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: g()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: g()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: g()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: g()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: T()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: T()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: T()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: T()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: T()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: T()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: T()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: T()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: T()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": g()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": g()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: F()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...F()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          l,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...F()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          l,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [s]
          },
          ...F()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...F()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...F()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...F()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", o, se, J]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, u, Se]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ze, d]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [mo, d, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [i, u, d]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [m, "none", u, Se]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          n,
          ...g()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", u, d]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", u, d]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: b()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: b()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...de(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [m, "from-font", "auto", u, J]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: b()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [m, "auto", u, d]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: g()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", u, d]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", u, d]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: Ie()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: $e()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Le()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, W, u, d],
          radial: ["", u, d],
          conic: [W, u, d]
        }, yo, fo]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: b()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: we()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: we()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: we()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: b()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: b()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: b()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: j()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": j()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": j()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": j()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": j()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": j()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": j()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": j()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": j()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": j()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": j()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": j()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": j()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": j()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": j()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: N()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": N()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": N()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": N()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": N()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": N()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": N()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": N()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": N()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": N()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": N()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...de(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...de(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: b()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": b()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": b()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": b()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": b()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": b()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": b()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": b()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": b()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: b()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...de(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [m, u, d]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", m, se, J]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: b()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          h,
          fe,
          be
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: b()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", y, fe, be]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": b()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: N()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: b()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [m, J]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": b()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": N()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": b()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", k, fe, be]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": b()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [m, u, d]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...je(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": je()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [m]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": A()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": A()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": b()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": b()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": A()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": A()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": b()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": b()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": A()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": A()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": b()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": b()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": A()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": A()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": b()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": b()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": A()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": A()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": b()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": b()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": A()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": A()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": b()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": b()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": A()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": A()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": b()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": b()
      }],
      "mask-image-radial": [{
        "mask-radial": [u, d]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": A()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": A()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": b()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": b()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [m]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": A()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": A()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": b()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": b()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: Ie()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: $e()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Le()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", u, d]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          u,
          d
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Oe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [m, u, d]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [m, u, d]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          P,
          fe,
          be
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": b()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", m, u, d]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [m, u, d]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", m, u, d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [m, u, d]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", m, u, d]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          u,
          d
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Oe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [m, u, d]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [m, u, d]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", m, u, d]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [m, u, d]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", m, u, d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [m, u, d]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [m, u, d]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", m, u, d]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": g()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": g()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": g()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", u, d]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [m, "initial", u, d]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", p, u, d]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [m, u, d]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", S, u, d]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [w, u, d]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": E()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ue()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ue()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ue()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ue()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: he()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": he()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": he()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": he()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ve()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ve()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ve()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [u, d, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: E()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: ge()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ge()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ge()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ge()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: b()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: b()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", u, d]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": g()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": g()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": g()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": g()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": g()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": g()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": g()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": g()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": g()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": g()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": g()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": g()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": g()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": g()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": g()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": g()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": g()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": g()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", u, d]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...b()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [m, se, J, Se]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...b()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, ko = /* @__PURE__ */ to(xo);
function Eo(...e) {
  return ko(Rt(e));
}
export {
  yt as EngineManager,
  pt as MockEngine,
  So as Scrollbar,
  At as ScrollbarArrows,
  To as ScrollbarControls,
  bt as ScrollbarProvider,
  Mt as ScrollbarThumb,
  Ye as TauriEngine,
  Co as TechChip,
  _o as animations,
  Eo as cn,
  oe as getCurrentEngine,
  wt as getEngineManager,
  Ne as mockEngine,
  K as scrollbarConfig,
  ft as scrollbarStyles,
  Nt as tauriEngine,
  B as techChipStyles,
  We as useScrollbarConfig,
  xt as useScrollbarHandlers,
  kt as useScrollbarLogic,
  zt as useScrollbarObservers,
  St as useScrollbarState
};
//# sourceMappingURL=index.js.map
