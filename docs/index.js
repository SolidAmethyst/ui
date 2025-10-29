import { sharedConfig as H, createMemo as rt, createRenderEffect as j, untrack as nt, createContext as it, createSignal as B, onMount as Ue, onCleanup as Ee, createComponent as se, useContext as st } from "solid-js";
const ae = (e) => rt(() => e());
function at(e, t, o) {
  let r = o.length, n = t.length, i = r, s = 0, l = 0, a = t[n - 1].nextSibling, c = null;
  for (; s < n || l < i; ) {
    if (t[s] === o[l]) {
      s++, l++;
      continue;
    }
    for (; t[n - 1] === o[i - 1]; )
      n--, i--;
    if (n === s) {
      const g = i < r ? l ? o[l - 1].nextSibling : o[i - l] : a;
      for (; l < i; ) e.insertBefore(o[l++], g);
    } else if (i === l)
      for (; s < n; )
        (!c || !c.has(t[s])) && t[s].remove(), s++;
    else if (t[s] === o[i - 1] && o[l] === t[n - 1]) {
      const g = t[--n].nextSibling;
      e.insertBefore(o[l++], t[s++].nextSibling), e.insertBefore(o[--i], g), t[n] = o[i];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let w = l;
        for (; w < i; ) c.set(o[w], w++);
      }
      const g = c.get(t[s]);
      if (g != null)
        if (l < g && g < i) {
          let w = s, k = 1, P;
          for (; ++w < n && w < i && !((P = c.get(t[w])) == null || P !== g + k); )
            k++;
          if (k > g - l) {
            const z = t[s];
            for (; l < g; ) e.insertBefore(o[l++], z);
          } else e.replaceChild(o[l++], t[s++]);
        } else s++;
      else t[s++].remove();
    }
  }
}
const je = "_$DX_DELEGATE";
function R(e, t, o, r) {
  let n;
  const i = () => {
    const l = document.createElement("template");
    return l.innerHTML = e, l.content.firstChild;
  }, s = () => (n || (n = i())).cloneNode(!0);
  return s.cloneNode = s, s;
}
function me(e, t = window.document) {
  const o = t[je] || (t[je] = /* @__PURE__ */ new Set());
  for (let r = 0, n = e.length; r < n; r++) {
    const i = e[r];
    o.has(i) || (o.add(i), t.addEventListener(i, dt));
  }
}
function lt(e, t, o) {
  Ce(e) || e.removeAttribute(t);
}
function W(e, t) {
  Ce(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function be(e, t, o, r) {
  if (r)
    Array.isArray(o) ? (e[`$$${t}`] = o[0], e[`$$${t}Data`] = o[1]) : e[`$$${t}`] = o;
  else if (Array.isArray(o)) {
    const n = o[0];
    e.addEventListener(t, o[0] = (i) => n.call(e, o[1], i));
  } else e.addEventListener(t, o, typeof o != "function" && o);
}
function ct(e, t, o) {
  if (!t) return o ? lt(e, "style") : t;
  const r = e.style;
  if (typeof t == "string") return r.cssText = t;
  typeof o == "string" && (r.cssText = o = void 0), o || (o = {}), t || (t = {});
  let n, i;
  for (i in o)
    t[i] == null && r.removeProperty(i), delete o[i];
  for (i in t)
    n = t[i], n !== o[i] && (r.setProperty(i, n), o[i] = n);
  return o;
}
function J(e, t, o) {
  o != null ? e.style.setProperty(t, o) : e.style.removeProperty(t);
}
function we(e, t, o) {
  return nt(() => e(t, o));
}
function oe(e, t, o, r) {
  if (o !== void 0 && !r && (r = []), typeof t != "function") return fe(e, t, r, o);
  j((n) => fe(e, t(), n, o), r);
}
function Ce(e) {
  return !!H.context && !H.done && (!e || e.isConnected);
}
function dt(e) {
  if (H.registry && H.events && H.events.find(([a, c]) => c === e))
    return;
  let t = e.target;
  const o = `$$${e.type}`, r = e.target, n = e.currentTarget, i = (a) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: a
  }), s = () => {
    const a = t[o];
    if (a && !t.disabled) {
      const c = t[`${o}Data`];
      if (c !== void 0 ? a.call(t, c, e) : a.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && i(t.host), !0;
  }, l = () => {
    for (; s() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), H.registry && !H.done && (H.done = _$HY.done = !0), e.composedPath) {
    const a = e.composedPath();
    i(a[0]);
    for (let c = 0; c < a.length - 2 && (t = a[c], !!s()); c++) {
      if (t._$host) {
        t = t._$host, l();
        break;
      }
      if (t.parentNode === n)
        break;
    }
  } else l();
  i(r);
}
function fe(e, t, o, r, n) {
  const i = Ce(e);
  if (i) {
    !o && (o = [...e.childNodes]);
    let a = [];
    for (let c = 0; c < o.length; c++) {
      const g = o[c];
      g.nodeType === 8 && g.data.slice(0, 2) === "!$" ? g.remove() : a.push(g);
    }
    o = a;
  }
  for (; typeof o == "function"; ) o = o();
  if (t === o) return o;
  const s = typeof t, l = r !== void 0;
  if (e = l && o[0] && o[0].parentNode || e, s === "string" || s === "number") {
    if (i || s === "number" && (t = t.toString(), t === o))
      return o;
    if (l) {
      let a = o[0];
      a && a.nodeType === 3 ? a.data !== t && (a.data = t) : a = document.createTextNode(t), o = K(e, o, r, a);
    } else
      o !== "" && typeof o == "string" ? o = e.firstChild.data = t : o = e.textContent = t;
  } else if (t == null || s === "boolean") {
    if (i) return o;
    o = K(e, o, r);
  } else {
    if (s === "function")
      return j(() => {
        let a = t();
        for (; typeof a == "function"; ) a = a();
        o = fe(e, a, o, r);
      }), () => o;
    if (Array.isArray(t)) {
      const a = [], c = o && Array.isArray(o);
      if (ze(a, t, o, n))
        return j(() => o = fe(e, a, o, r, !0)), () => o;
      if (i) {
        if (!a.length) return o;
        if (r === void 0) return o = [...e.childNodes];
        let g = a[0];
        if (g.parentNode !== e) return o;
        const w = [g];
        for (; (g = g.nextSibling) !== r; ) w.push(g);
        return o = w;
      }
      if (a.length === 0) {
        if (o = K(e, o, r), l) return o;
      } else c ? o.length === 0 ? Oe(e, a, r) : at(e, o, a) : (o && K(e), Oe(e, a));
      o = a;
    } else if (t.nodeType) {
      if (i && t.parentNode) return o = l ? [t] : t;
      if (Array.isArray(o)) {
        if (l) return o = K(e, o, r, t);
        K(e, o, null, t);
      } else o == null || o === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      o = t;
    }
  }
  return o;
}
function ze(e, t, o, r) {
  let n = !1;
  for (let i = 0, s = t.length; i < s; i++) {
    let l = t[i], a = o && o[e.length], c;
    if (!(l == null || l === !0 || l === !1)) if ((c = typeof l) == "object" && l.nodeType)
      e.push(l);
    else if (Array.isArray(l))
      n = ze(e, l, a) || n;
    else if (c === "function")
      if (r) {
        for (; typeof l == "function"; ) l = l();
        n = ze(e, Array.isArray(l) ? l : [l], Array.isArray(a) ? a : [a]) || n;
      } else
        e.push(l), n = !0;
    else {
      const g = String(l);
      a && a.nodeType === 3 && a.data === g ? e.push(a) : e.push(document.createTextNode(g));
    }
  }
  return n;
}
function Oe(e, t, o = null) {
  for (let r = 0, n = t.length; r < n; r++) e.insertBefore(t[r], o);
}
function K(e, t, o, r) {
  if (o === void 0) return e.textContent = "";
  const n = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let s = t.length - 1; s >= 0; s--) {
      const l = t[s];
      if (n !== l) {
        const a = l.parentNode === e;
        !i && !s ? a ? e.replaceChild(n, l) : e.insertBefore(n, o) : a && l.remove();
      } else i = !0;
    }
  } else e.insertBefore(n, o);
  return [n];
}
const ut = {
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
class ht {
  config = ut;
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
const q = new ht();
q.initialize();
const Be = it(), gt = (e) => {
  const [t, o] = B(q.getConfig());
  Ue(() => {
    const n = q.subscribe(o);
    e.config && q.updateConfig(e.config), Ee(n);
  });
  const r = {
    get config() {
      return t();
    },
    setEngineEnabled: (n) => {
      q.setEngineEnabled(n);
    },
    setTheme: (n) => {
      q.setTheme(n);
    },
    updateConfig: (n) => {
      q.updateConfig(n);
    }
  };
  return se(Be.Provider, {
    value: r,
    get children() {
      return e.children;
    }
  });
}, Ve = () => {
  const e = st(Be);
  if (!e)
    throw new Error("useScrollbarConfig must be used within ScrollbarProvider");
  return e;
}, bt = `
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
function ft() {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--zoom-level"
    ) || "1"
  );
}
function Q(e) {
  return e / ft();
}
class mt {
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
const De = new mt();
class pt {
  currentEngine = null;
  config;
  isInitialized = !1;
  constructor(t) {
    this.config = t;
  }
  async initialize() {
    if (!this.isInitialized)
      try {
        this.config.enabled && this.config.autoDetect && await this.detectTauriEngine() && (this.currentEngine = await this.loadTauriEngine()), this.currentEngine || (this.currentEngine = De), this.isInitialized = !0;
      } catch (t) {
        console.warn("Failed to initialize engine, falling back to mock:", t), this.currentEngine = De, this.isInitialized = !0;
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
      const { tauriEngine: t } = await Promise.resolve().then(() => vo);
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
let ve = null;
function yt(e) {
  return ve || (ve = new pt(
    e || {
      enabled: !0,
      autoDetect: !0,
      fallbackToJS: !0,
      physicsEnabled: !0,
      zoomEnabled: !0
    }
  )), ve;
}
async function ee() {
  return await yt().getEngine();
}
class wt {
  physicsObjectId = null;
  velocity = 0;
  acceleration = 0;
  async createPhysicsObject(t, o) {
    try {
      const n = await (await ee()).createPhysicsObject(t, o);
      return this.physicsObjectId = n, n;
    } catch (r) {
      console.warn("Failed to create physics object, using fallback:", r);
      const n = Math.random() * 1e3;
      return this.physicsObjectId = n, n;
    }
  }
  async updatePhysicsObject(t, o) {
    if (this.physicsObjectId)
      try {
        await (await ee()).updatePhysicsObject(this.physicsObjectId, t, o);
      } catch (r) {
        console.warn("Failed to update physics object:", r);
      }
  }
  async updateZoomLevel(t) {
    try {
      await (await ee()).updateZoomLevel(t);
    } catch (o) {
      console.warn("Failed to update zoom level:", o);
    }
  }
  async getEngineState() {
    try {
      const o = await (await ee()).getEngineState();
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
  async calculateScrollbarPhysics(t, o, r, n) {
    try {
      const i = await ee();
      return "calculateScrollbarPhysics" in i ? await i.calculateScrollbarPhysics(
        t,
        o,
        r,
        n
      ) : this.simplePhysicsCalculation(
        t,
        o,
        r,
        n
      );
    } catch (i) {
      return console.warn(
        "Failed to calculate scrollbar physics, using fallback:",
        i
      ), this.simplePhysicsCalculation(
        t,
        o,
        r,
        n
      );
    }
  }
  simplePhysicsCalculation(t, o, r, n) {
    const i = { ...o }, s = -t.stiffness * (i.position - r), l = -t.damping * i.velocity, a = s + l;
    return i.acceleration = a / t.mass, i.velocity += i.acceleration * n, i.velocity = Math.max(
      -t.max_velocity,
      Math.min(t.max_velocity, i.velocity)
    ), i.position += i.velocity * n, i;
  }
  async getPhysicsEngineInfo() {
    try {
      const t = await ee();
      return "getPhysicsEngineInfo" in t ? await t.getPhysicsEngineInfo() : "Mock Physics Engine - No DLL available";
    } catch (t) {
      return console.warn("Failed to get physics engine info:", t), "Mock Physics Engine - Error occurred";
    }
  }
}
function vt(e, t, o, r, n, i, s, l, a) {
  const c = new wt();
  return {
    scrollBy: (f) => {
      if (!n()) return;
      const p = f * 3;
      o() === "horizontal" ? n().scrollLeft += p : n().scrollTop += p;
    },
    handleWheel: (f) => {
      if (!n()) return;
      f.preventDefault();
      let p, S;
      o() === "horizontal" ? (p = f.deltaY, S = !0) : (p = (f.shiftKey, f.deltaY), S = f.shiftKey);
      const v = p * 0.5;
      S ? n().scrollLeft += v : n().scrollTop += v, a && setTimeout(a, 0);
    },
    handleThumbMouseDown: async (f) => {
      f.preventDefault(), f.stopPropagation();
      const p = i().getBoundingClientRect(), S = o() === "horizontal" ? Q(f.clientX - p.left) : Q(f.clientY - p.top), v = e().thumbPosition + e().thumbSize / 2, E = S - v;
      t((C) => ({
        ...C,
        isDragging: !0,
        dragOffset: E
      })), l() && await c.createPhysicsObject(S, 0), document.body.style.userSelect = "none";
    },
    handleMouseMove: async (f) => {
      if (!e().isDragging || !i() || !n()) return;
      f.preventDefault();
      const p = i().getBoundingClientRect(), S = o() === "horizontal" ? Q(f.clientX - p.left) : Q(f.clientY - p.top);
      l() && await c.updatePhysicsObject(S, 0);
      const E = S - e().dragOffset - e().thumbSize / 2, C = e().showArrows ? 12 : 0, $ = (o() === "horizontal" ? i().clientWidth : i().clientHeight) - C * 2, h = $ - e().thumbSize, M = Math.max(
        C,
        Math.min(E, h + C)
      );
      t((F) => ({ ...F, thumbPosition: M }));
      const Y = o() === "horizontal" ? i().clientWidth : i().clientHeight, G = (o() === "horizontal" ? n().scrollWidth : n().scrollHeight) - Y, x = M - C, D = $ - e().thumbSize, T = Math.max(
        0,
        Math.min(1, x / D)
      ) * G;
      o() === "horizontal" ? n().scrollLeft = T : n().scrollTop = T;
    },
    handleMouseUp: () => {
      t((f) => ({
        ...f,
        isDragging: !1,
        dragOffset: 0
      })), document.body.style.userSelect = "";
    },
    handleTrackClick: (f) => {
      if (!i() || !n() || !s() || f.target === s()) return;
      const p = i().getBoundingClientRect(), S = o() === "horizontal" ? Q(f.clientX - p.left) : Q(f.clientY - p.top), v = e().showArrows ? 12 : 0, E = (o() === "horizontal" ? i().clientWidth : i().clientHeight) - v * 2, O = S - v - e().thumbSize / 2, $ = E - e().thumbSize, h = Math.max(0, Math.min(O, $)) + v;
      t((I) => ({ ...I, thumbPosition: h }));
      const M = o() === "horizontal" ? i().clientWidth : i().clientHeight, Z = (o() === "horizontal" ? n().scrollWidth : n().scrollHeight) - M, G = h - v, D = Math.max(
        0,
        Math.min(1, G / $)
      ) * Z;
      o() === "horizontal" ? n().scrollLeft = D : n().scrollTop = D;
    }
  };
}
function xt(e, t, o, r, n, i, s) {
  const l = () => {
    if (!r() || !n()) return;
    const c = o() === "horizontal" ? r().clientWidth : r().clientHeight, g = o() === "horizontal" ? n().scrollWidth : n().scrollHeight;
    if (!(g > c)) {
      t((v) => ({ ...v, isVisible: !1 }));
      return;
    }
    const k = o() === "horizontal" ? n().scrollLeft : n().scrollTop, P = g - c, z = o() === "horizontal" ? i()?.clientWidth ?? 0 : i()?.clientHeight ?? 0, y = e().showArrows ? 12 : 0, f = z - y * 2, p = Math.max(
      20,
      f * c / g
    ), S = e().isDragging ? e().thumbPosition : Math.max(
      y,
      Math.min(
        y + k / P * (f - p),
        f - p + y
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
function kt(e, t, o) {
  return { setupObservers: () => {
    if (!e() || !t()) return;
    const n = new ResizeObserver(() => {
      o();
    });
    n.observe(t()), n.observe(e());
    const i = new MutationObserver(() => {
      o(), setTimeout(o, 10);
    });
    return i.observe(t(), {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    }), () => {
      n.disconnect(), i.disconnect();
    };
  } };
}
function zt(e) {
  const t = Ve(), [o, r] = B({
    thumbSize: 20,
    thumbPosition: 0,
    isVisible: !1,
    isDragging: !1,
    dragOffset: 0,
    showArrows: e.showArrows ?? !0,
    canScrollUp: !1,
    canScrollDown: !1
  }), [n, i] = B(!1), [s, l] = B(
    null
  ), a = () => e.direction ?? "vertical", c = () => e.theme ?? t.config.theme.name, g = () => e.autoHide ?? !0, w = () => e.minThumbSize ?? 4, k = () => e.engineIntegration !== void 0 ? e.engineIntegration && t.config.engine.enabled : t.config.engine.enabled, P = () => {
    i(!0);
    const y = s();
    y && (clearTimeout(y), l(null));
  }, z = () => {
    if (i(!1), g()) {
      const y = setTimeout(() => {
        r((f) => ({ ...f, isVisible: !1 }));
      }, 800);
      l(y);
    }
  };
  return Ee(() => {
    const y = s();
    y && clearTimeout(y);
  }), {
    state: o,
    setState: r,
    isHovered: n,
    setIsHovered: i,
    hideTimeout: s,
    setHideTimeout: l,
    direction: a,
    theme: c,
    autoHide: g,
    minThumbSize: w,
    engineIntegration: k,
    handleMouseEnter: P,
    handleMouseLeave: z
  };
}
var St = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z">'), Tt = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z">'), _t = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">'), Et = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z">');
const Ct = (e) => {
  const t = (o, r) => {
    o.stopPropagation(), e.onScrollBy(r);
  };
  return ae(() => ae(() => e.direction === "vertical")() ? [(() => {
    var o = St();
    return o.$$click = (r) => t(r, -50), j((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-up ${e.canScrollUp ? "" : "disabled"}`, i = !e.canScrollUp;
      return n !== r.e && W(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })(), (() => {
    var o = Tt();
    return o.$$click = (r) => t(r, 50), j((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-down ${e.canScrollDown ? "" : "disabled"}`, i = !e.canScrollDown;
      return n !== r.e && W(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })()] : [(() => {
    var o = _t();
    return o.$$click = (r) => t(r, -50), j((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-left ${e.canScrollUp ? "" : "disabled"}`, i = !e.canScrollUp;
      return n !== r.e && W(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })(), (() => {
    var o = Et();
    return o.$$click = (r) => t(r, 50), j((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-right ${e.canScrollDown ? "" : "disabled"}`, i = !e.canScrollDown;
      return n !== r.e && W(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })()]);
};
me(["click"]);
var At = /* @__PURE__ */ R("<div>");
const Pt = (e) => (() => {
  var t = At();
  return be(t, "mousedown", e.onMouseDown, !0), j((o) => {
    var r = `scrollbar-thumb ${e.isDragging ? "dragging" : ""}`, n = e.direction === "horizontal" ? `${Math.max(1, e.thumbSize)}px` : "4px", i = e.direction === "horizontal" ? "4px" : `${Math.max(1, e.thumbSize)}px`, s = e.direction === "horizontal" ? `${e.thumbPosition}px` : "auto", l = e.direction === "horizontal" ? "50%" : `${e.thumbPosition}px`, a = e.direction === "horizontal" ? "auto" : "4px", c = e.direction === "horizontal" ? "translateY(-50%)" : "none";
    return r !== o.e && W(t, o.e = r), n !== o.t && J(t, "width", o.t = n), i !== o.a && J(t, "height", o.a = i), s !== o.o && J(t, "left", o.o = s), l !== o.i && J(t, "top", o.i = l), a !== o.n && J(t, "right", o.n = a), c !== o.s && J(t, "transform", o.s = c), o;
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
me(["mousedown"]);
var Mt = /* @__PURE__ */ R("<style>"), It = /* @__PURE__ */ R("<div><div class=scrollbar-content style=overflow-y:hidden;overflow-x:hidden>"), $t = /* @__PURE__ */ R("<div>");
const Lt = (e) => {
  const [t, o] = B(), [r, n] = B(), [i, s] = B(), [l, a] = B(), {
    state: c,
    setState: g,
    isHovered: w,
    direction: k,
    theme: P,
    autoHide: z,
    minThumbSize: y,
    engineIntegration: f,
    handleMouseEnter: p,
    handleMouseLeave: S
  } = zt(e), {
    updateScrollbar: v,
    handleScroll: E
  } = xt(c, g, k, t, r, i), {
    scrollBy: C,
    handleWheel: O,
    handleThumbMouseDown: $,
    handleMouseMove: h,
    handleMouseUp: M,
    handleTrackClick: Y
  } = vt(c, g, k, t, r, i, l, f, v), {
    setupObservers: Z
  } = kt(t, r, v), G = () => c().isVisible && (w() || !z() || c().isDragging);
  return Ue(() => {
    const x = () => {
      v();
    };
    x(), setTimeout(x, 0), setTimeout(x, 50), setTimeout(x, 100), setTimeout(x, 200), setTimeout(x, 500), setTimeout(x, 1e3), setTimeout(x, 2e3), r() && r().addEventListener("scroll", E);
    const D = Z();
    document.addEventListener("mousemove", h), document.addEventListener("mouseup", M), Ee(() => {
      D?.(), r() && r().removeEventListener("scroll", E), document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", M);
    });
  }), [(() => {
    var x = Mt();
    return oe(x, bt), x;
  })(), (() => {
    var x = It(), D = x.firstChild;
    return be(x, "wheel", O), be(x, "mouseleave", S), x.addEventListener("mouseenter", () => {
      p(), v();
    }), we(o, x), we(n, D), oe(D, () => e.children), oe(x, (() => {
      var I = ae(() => !!G());
      return () => I() && (() => {
        var T = $t();
        return be(T, "click", Y, !0), we(s, T), oe(T, (() => {
          var F = ae(() => !!c().showArrows);
          return () => F() && se(Ct, {
            get direction() {
              return k();
            },
            get canScrollUp() {
              return c().canScrollUp;
            },
            get canScrollDown() {
              return c().canScrollDown;
            },
            onScrollBy: C
          });
        })(), null), oe(T, se(Pt, {
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
        }), null), j(() => W(T, `scrollbar-track ${k() === "horizontal" ? "scrollbar-track-horizontal" : "scrollbar-track-vertical"} visible`)), T;
      })();
    })(), null), j((I) => {
      var T = `scrollbar-container ${e.class || ""}`, F = e.style;
      return T !== I.e && W(x, I.e = T), I.t = ct(x, F, I.t), I;
    }, {
      e: void 0,
      t: void 0
    }), x;
  })()];
}, ko = (e) => se(gt, {
  get children() {
    return se(Lt, e);
  }
});
me(["click"]);
var jt = /* @__PURE__ */ R(`<div><button class=scrollbar-controls-toggle title="Scrollbar Settings"><svg width=14 height=14 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=3></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button><style>
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
      `), Ot = /* @__PURE__ */ R("<div class=scrollbar-controls-panel><h3 class=scrollbar-controls-title>Scrollbar Settings</h3><div class=control-group><label><input type=checkbox>Enable Engine</label></div><div class=control-group><label>Theme:</label><select><option value=default>Default</option><option value=minimal>Minimal</option><option value=modern>Modern</option></select></div><div class=control-group><label><input type=checkbox>Auto-detect Engine</label></div><div class=control-group><label><input type=checkbox>Keyboard Navigation");
const zo = (e) => {
  const t = Ve(), [o, r] = B(!1), n = () => {
    t.setEngineEnabled(!t.config.engine.enabled);
  }, i = (s) => {
    t.setTheme({
      name: s
    });
  };
  return (() => {
    var s = jt(), l = s.firstChild, a = l.nextSibling;
    return l.$$click = () => r(!o()), oe(s, (() => {
      var c = ae(() => !!o());
      return () => c() && (() => {
        var g = Ot(), w = g.firstChild, k = w.nextSibling, P = k.firstChild, z = P.firstChild, y = k.nextSibling, f = y.firstChild, p = f.nextSibling, S = y.nextSibling, v = S.firstChild, E = v.firstChild, C = S.nextSibling, O = C.firstChild, $ = O.firstChild;
        return z.addEventListener("change", n), p.addEventListener("change", (h) => i(h.currentTarget.value)), E.addEventListener("change", (h) => t.updateConfig({
          engine: {
            ...t.config.engine,
            autoDetect: h.currentTarget.checked
          }
        })), $.addEventListener("change", (h) => t.updateConfig({
          accessibility: {
            ...t.config.accessibility,
            keyboardNavigation: h.currentTarget.checked
          }
        })), j(() => z.checked = t.config.engine.enabled), j(() => p.value = t.config.theme.name), j(() => E.checked = t.config.engine.autoDetect), j(() => $.checked = t.config.accessibility.keyboardNavigation), g;
      })();
    })(), a), j(() => W(s, `scrollbar-controls ${e.class || ""}`)), s;
  })();
};
me(["click"]);
function He(e) {
  var t, o, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (o = He(e[t])) && (r && (r += " "), r += o);
  } else for (o in e) e[o] && (r && (r += " "), r += o);
  return r;
}
function Dt() {
  for (var e, t, o = 0, r = "", n = arguments.length; o < n; o++) (e = arguments[o]) && (t = He(e)) && (r && (r += " "), r += t);
  return r;
}
const Ae = "-", Ft = (e) => {
  const t = Gt(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const l = s.split(Ae);
      return l[0] === "" && l.length !== 1 && l.shift(), We(l, t) || Nt(s);
    },
    getConflictingClassGroupIds: (s, l) => {
      const a = o[s] || [];
      return l && r[s] ? [...a, ...r[s]] : a;
    }
  };
}, We = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const o = e[0], r = t.nextPart.get(o), n = r ? We(e.slice(1), r) : void 0;
  if (n)
    return n;
  if (t.validators.length === 0)
    return;
  const i = e.join(Ae);
  return t.validators.find(({
    validator: s
  }) => s(i))?.classGroupId;
}, Fe = /^\[(.+)\]$/, Nt = (e) => {
  if (Fe.test(e)) {
    const t = Fe.exec(e)[1], o = t?.substring(0, t.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, Gt = (e) => {
  const {
    theme: t,
    classGroups: o
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const n in o)
    Se(o[n], r, n, t);
  return r;
}, Se = (e, t, o, r) => {
  e.forEach((n) => {
    if (typeof n == "string") {
      const i = n === "" ? t : Ne(t, n);
      i.classGroupId = o;
      return;
    }
    if (typeof n == "function") {
      if (Rt(n)) {
        Se(n(r), t, o, r);
        return;
      }
      t.validators.push({
        validator: n,
        classGroupId: o
      });
      return;
    }
    Object.entries(n).forEach(([i, s]) => {
      Se(s, Ne(t, i), o, r);
    });
  });
}, Ne = (e, t) => {
  let o = e;
  return t.split(Ae).forEach((r) => {
    o.nextPart.has(r) || o.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(r);
  }), o;
}, Rt = (e) => e.isThemeGetter, Ut = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const n = (i, s) => {
    o.set(i, s), t++, t > e && (t = 0, r = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let s = o.get(i);
      if (s !== void 0)
        return s;
      if ((s = r.get(i)) !== void 0)
        return n(i, s), s;
    },
    set(i, s) {
      o.has(i) ? o.set(i, s) : n(i, s);
    }
  };
}, Te = "!", _e = ":", Bt = _e.length, Vt = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: o
  } = e;
  let r = (n) => {
    const i = [];
    let s = 0, l = 0, a = 0, c;
    for (let z = 0; z < n.length; z++) {
      let y = n[z];
      if (s === 0 && l === 0) {
        if (y === _e) {
          i.push(n.slice(a, z)), a = z + Bt;
          continue;
        }
        if (y === "/") {
          c = z;
          continue;
        }
      }
      y === "[" ? s++ : y === "]" ? s-- : y === "(" ? l++ : y === ")" && l--;
    }
    const g = i.length === 0 ? n : n.substring(a), w = Ht(g), k = w !== g, P = c && c > a ? c - a : void 0;
    return {
      modifiers: i,
      hasImportantModifier: k,
      baseClassName: w,
      maybePostfixModifierPosition: P
    };
  };
  if (t) {
    const n = t + _e, i = r;
    r = (s) => s.startsWith(n) ? i(s.substring(n.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: s,
      maybePostfixModifierPosition: void 0
    };
  }
  if (o) {
    const n = r;
    r = (i) => o({
      className: i,
      parseClassName: n
    });
  }
  return r;
}, Ht = (e) => e.endsWith(Te) ? e.substring(0, e.length - 1) : e.startsWith(Te) ? e.substring(1) : e, Wt = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const n = [];
    let i = [];
    return r.forEach((s) => {
      s[0] === "[" || t[s] ? (n.push(...i.sort(), s), i = []) : i.push(s);
    }), n.push(...i.sort()), n;
  };
}, Yt = (e) => ({
  cache: Ut(e.cacheSize),
  parseClassName: Vt(e),
  sortModifiers: Wt(e),
  ...Ft(e)
}), Zt = /\s+/, Xt = (e, t) => {
  const {
    parseClassName: o,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: i
  } = t, s = [], l = e.trim().split(Zt);
  let a = "";
  for (let c = l.length - 1; c >= 0; c -= 1) {
    const g = l[c], {
      isExternal: w,
      modifiers: k,
      hasImportantModifier: P,
      baseClassName: z,
      maybePostfixModifierPosition: y
    } = o(g);
    if (w) {
      a = g + (a.length > 0 ? " " + a : a);
      continue;
    }
    let f = !!y, p = r(f ? z.substring(0, y) : z);
    if (!p) {
      if (!f) {
        a = g + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (p = r(z), !p) {
        a = g + (a.length > 0 ? " " + a : a);
        continue;
      }
      f = !1;
    }
    const S = i(k).join(":"), v = P ? S + Te : S, E = v + p;
    if (s.includes(E))
      continue;
    s.push(E);
    const C = n(p, f);
    for (let O = 0; O < C.length; ++O) {
      const $ = C[O];
      s.push(v + $);
    }
    a = g + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function qt() {
  let e = 0, t, o, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (o = Ye(t)) && (r && (r += " "), r += o);
  return r;
}
const Ye = (e) => {
  if (typeof e == "string")
    return e;
  let t, o = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Ye(e[r])) && (o && (o += " "), o += t);
  return o;
};
function Jt(e, ...t) {
  let o, r, n, i = s;
  function s(a) {
    const c = t.reduce((g, w) => w(g), e());
    return o = Yt(c), r = o.cache.get, n = o.cache.set, i = l, l(a);
  }
  function l(a) {
    const c = r(a);
    if (c)
      return c;
    const g = Xt(a, o);
    return n(a, g), g;
  }
  return function() {
    return i(qt.apply(null, arguments));
  };
}
const _ = (e) => {
  const t = (o) => o[e] || [];
  return t.isThemeGetter = !0, t;
}, Ze = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Xe = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Kt = /^\d+\/\d+$/, Qt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, eo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, to = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, oo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ro = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, te = (e) => Kt.test(e), m = (e) => !!e && !Number.isNaN(Number(e)), V = (e) => !!e && Number.isInteger(Number(e)), xe = (e) => e.endsWith("%") && m(e.slice(0, -1)), U = (e) => Qt.test(e), no = () => !0, io = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  eo.test(e) && !to.test(e)
), qe = () => !1, so = (e) => oo.test(e), ao = (e) => ro.test(e), lo = (e) => !d(e) && !u(e), co = (e) => re(e, Qe, qe), d = (e) => Ze.test(e), X = (e) => re(e, et, io), ke = (e) => re(e, fo, m), Ge = (e) => re(e, Je, qe), uo = (e) => re(e, Ke, ao), he = (e) => re(e, tt, so), u = (e) => Xe.test(e), ie = (e) => ne(e, et), ho = (e) => ne(e, mo), Re = (e) => ne(e, Je), go = (e) => ne(e, Qe), bo = (e) => ne(e, Ke), ge = (e) => ne(e, tt, !0), re = (e, t, o) => {
  const r = Ze.exec(e);
  return r ? r[1] ? t(r[1]) : o(r[2]) : !1;
}, ne = (e, t, o = !1) => {
  const r = Xe.exec(e);
  return r ? r[1] ? t(r[1]) : o : !1;
}, Je = (e) => e === "position" || e === "percentage", Ke = (e) => e === "image" || e === "url", Qe = (e) => e === "length" || e === "size" || e === "bg-size", et = (e) => e === "length", fo = (e) => e === "number", mo = (e) => e === "family-name", tt = (e) => e === "shadow", po = () => {
  const e = _("color"), t = _("font"), o = _("text"), r = _("font-weight"), n = _("tracking"), i = _("leading"), s = _("breakpoint"), l = _("container"), a = _("spacing"), c = _("radius"), g = _("shadow"), w = _("inset-shadow"), k = _("text-shadow"), P = _("drop-shadow"), z = _("blur"), y = _("perspective"), f = _("aspect"), p = _("ease"), S = _("animate"), v = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], E = () => [
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
  ], C = () => [...E(), u, d], O = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", "contain", "none"], h = () => [u, d, a], M = () => [te, "full", "auto", ...h()], Y = () => [V, "none", "subgrid", u, d], Z = () => ["auto", {
    span: ["full", V, u, d]
  }, V, u, d], G = () => [V, "auto", u, d], x = () => ["auto", "min", "max", "fr", u, d], D = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], I = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], T = () => ["auto", ...h()], F = () => [te, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...h()], b = () => [e, u, d], Pe = () => [...E(), Re, Ge, {
    position: [u, d]
  }], Me = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Ie = () => ["auto", "cover", "contain", go, co, {
    size: [u, d]
  }], pe = () => [xe, ie, X], L = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    u,
    d
  ], N = () => ["", m, ie, X], le = () => ["solid", "dashed", "dotted", "double"], $e = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], A = () => [m, xe, Re, Ge], Le = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    z,
    u,
    d
  ], ce = () => ["none", m, u, d], de = () => ["none", m, u, d], ye = () => [m, u, d], ue = () => [te, "full", ...h()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [U],
      breakpoint: [U],
      color: [no],
      container: [U],
      "drop-shadow": [U],
      ease: ["in", "out", "in-out"],
      font: [lo],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [U],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [U],
      shadow: [U],
      spacing: ["px", m],
      text: [U],
      "text-shadow": [U],
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
        aspect: ["auto", "square", te, d, u, f]
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
        object: C()
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
        z: [V, "auto", u, d]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [te, "full", "auto", l, ...h()]
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
        flex: [m, te, "auto", "initial", "none", d]
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
        order: [V, "first", "last", "none", u, d]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": Y()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: Z()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": G()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": G()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": Y()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: Z()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": G()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": G()
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
        gap: h()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": h()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": h()
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
        p: h()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: h()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: h()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: h()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: h()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: h()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: h()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: h()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: h()
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
        "space-x": h()
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
        "space-y": h()
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
        text: ["base", o, ie, X]
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
        font: [r, u, ke]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", xe, d]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ho, d, t]
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
        tracking: [n, u, d]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [m, "none", u, ke]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...h()
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
        decoration: [...le(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [m, "from-font", "auto", u, X]
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
        indent: h()
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
        bg: Pe()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Me()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Ie()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, V, u, d],
          radial: ["", u, d],
          conic: [V, u, d]
        }, bo, uo]
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
        from: pe()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: pe()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: pe()
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
        rounded: L()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": L()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": L()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": L()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": L()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": L()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": L()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": L()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": L()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": L()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": L()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": L()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": L()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": L()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": L()
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
        border: [...le(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...le(), "hidden", "none"]
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
        outline: [...le(), "none", "hidden"]
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
        outline: ["", m, ie, X]
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
          g,
          ge,
          he
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
        "inset-shadow": ["none", w, ge, he]
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
        "ring-offset": [m, X]
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
        "text-shadow": ["none", k, ge, he]
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
        "mix-blend": [...$e(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": $e()
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
        "mask-radial-at": E()
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
        mask: Pe()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Me()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Ie()
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
        blur: Le()
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
          ge,
          he
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
        "backdrop-blur": Le()
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
        "border-spacing": h()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": h()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": h()
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
        perspective: [y, u, d]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": C()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ce()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ce()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ce()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ce()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: de()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": de()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": de()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": de()
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
        skew: ye()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ye()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ye()
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
        origin: C()
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
        translate: ue()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ue()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ue()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ue()
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
        "scroll-m": h()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": h()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": h()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": h()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": h()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": h()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": h()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": h()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": h()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": h()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": h()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": h()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": h()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": h()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": h()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": h()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": h()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": h()
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
        stroke: [m, ie, X, ke]
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
}, yo = /* @__PURE__ */ Jt(po);
function So(...e) {
  return yo(Dt(e));
}
class ot {
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
    } catch (n) {
      throw console.error("Failed to update physics object:", n), n;
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
  async calculateScrollbarPhysics(t, o, r, n) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      return await window.__TAURI__.invoke(
        "calculate_scrollbar_physics",
        {
          config: t,
          currentState: o,
          targetPosition: r,
          deltaTime: n
        }
      );
    } catch (i) {
      throw console.error("Failed to calculate scrollbar physics:", i), i;
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
const wo = new ot(), vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TauriEngine: ot,
  tauriEngine: wo
}, Symbol.toStringTag, { value: "Module" }));
export {
  pt as EngineManager,
  mt as MockEngine,
  ko as Scrollbar,
  Ct as ScrollbarArrows,
  zo as ScrollbarControls,
  gt as ScrollbarProvider,
  Pt as ScrollbarThumb,
  ot as TauriEngine,
  So as cn,
  ee as getCurrentEngine,
  yt as getEngineManager,
  De as mockEngine,
  q as scrollbarConfig,
  bt as scrollbarStyles,
  wo as tauriEngine,
  Ve as useScrollbarConfig,
  vt as useScrollbarHandlers,
  xt as useScrollbarLogic,
  kt as useScrollbarObservers,
  zt as useScrollbarState
};
//# sourceMappingURL=index.js.map
