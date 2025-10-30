import { sharedConfig as Z, createMemo as it, createRenderEffect as $, untrack as st, createContext as at, createSignal as W, onMount as Ve, onCleanup as Ae, createComponent as ae, useContext as lt } from "solid-js";
const le = (e) => it(() => e());
function ct(e, t, o) {
  let r = o.length, n = t.length, i = r, a = 0, l = 0, s = t[n - 1].nextSibling, u = null;
  for (; a < n || l < i; ) {
    if (t[a] === o[l]) {
      a++, l++;
      continue;
    }
    for (; t[n - 1] === o[i - 1]; )
      n--, i--;
    if (n === a) {
      const h = i < r ? l ? o[l - 1].nextSibling : o[i - l] : s;
      for (; l < i; ) e.insertBefore(o[l++], h);
    } else if (i === l)
      for (; a < n; )
        (!u || !u.has(t[a])) && t[a].remove(), a++;
    else if (t[a] === o[i - 1] && o[l] === t[n - 1]) {
      const h = t[--n].nextSibling;
      e.insertBefore(o[l++], t[a++].nextSibling), e.insertBefore(o[--i], h), t[n] = o[i];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let y = l;
        for (; y < i; ) u.set(o[y], y++);
      }
      const h = u.get(t[a]);
      if (h != null)
        if (l < h && h < i) {
          let y = a, S = 1, _;
          for (; ++y < n && y < i && !((_ = u.get(t[y])) == null || _ !== h + S); )
            S++;
          if (S > h - l) {
            const v = t[a];
            for (; l < h; ) e.insertBefore(o[l++], v);
          } else e.replaceChild(o[l++], t[a++]);
        } else a++;
      else t[a++].remove();
    }
  }
}
const De = "_$DX_DELEGATE";
function R(e, t, o, r) {
  let n;
  const i = () => {
    const l = document.createElement("template");
    return l.innerHTML = e, l.content.firstChild;
  }, a = () => (n || (n = i())).cloneNode(!0);
  return a.cloneNode = a, a;
}
function ce(e, t = window.document) {
  const o = t[De] || (t[De] = /* @__PURE__ */ new Set());
  for (let r = 0, n = e.length; r < n; r++) {
    const i = e[r];
    o.has(i) || (o.add(i), t.addEventListener(i, ut));
  }
}
function me(e, t, o) {
  Pe(e) || (o == null ? e.removeAttribute(t) : e.setAttribute(t, o));
}
function U(e, t) {
  Pe(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function ve(e, t, o, r) {
  if (r)
    Array.isArray(o) ? (e[`$$${t}`] = o[0], e[`$$${t}Data`] = o[1]) : e[`$$${t}`] = o;
  else if (Array.isArray(o)) {
    const n = o[0];
    e.addEventListener(t, o[0] = (i) => n.call(e, o[1], i));
  } else e.addEventListener(t, o, typeof o != "function" && o);
}
function dt(e, t, o) {
  if (!t) return o ? me(e, "style") : t;
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
function Q(e, t, o) {
  o != null ? e.style.setProperty(t, o) : e.style.removeProperty(t);
}
function xe(e, t, o) {
  return st(() => e(t, o));
}
function X(e, t, o, r) {
  if (o !== void 0 && !r && (r = []), typeof t != "function") return pe(e, t, r, o);
  $((n) => pe(e, t(), n, o), r);
}
function Pe(e) {
  return !!Z.context && !Z.done && (!e || e.isConnected);
}
function ut(e) {
  if (Z.registry && Z.events && Z.events.find(([s, u]) => u === e))
    return;
  let t = e.target;
  const o = `$$${e.type}`, r = e.target, n = e.currentTarget, i = (s) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: s
  }), a = () => {
    const s = t[o];
    if (s && !t.disabled) {
      const u = t[`${o}Data`];
      if (u !== void 0 ? s.call(t, u, e) : s.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && i(t.host), !0;
  }, l = () => {
    for (; a() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), Z.registry && !Z.done && (Z.done = _$HY.done = !0), e.composedPath) {
    const s = e.composedPath();
    i(s[0]);
    for (let u = 0; u < s.length - 2 && (t = s[u], !!a()); u++) {
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
function pe(e, t, o, r, n) {
  const i = Pe(e);
  if (i) {
    !o && (o = [...e.childNodes]);
    let s = [];
    for (let u = 0; u < o.length; u++) {
      const h = o[u];
      h.nodeType === 8 && h.data.slice(0, 2) === "!$" ? h.remove() : s.push(h);
    }
    o = s;
  }
  for (; typeof o == "function"; ) o = o();
  if (t === o) return o;
  const a = typeof t, l = r !== void 0;
  if (e = l && o[0] && o[0].parentNode || e, a === "string" || a === "number") {
    if (i || a === "number" && (t = t.toString(), t === o))
      return o;
    if (l) {
      let s = o[0];
      s && s.nodeType === 3 ? s.data !== t && (s.data = t) : s = document.createTextNode(t), o = ee(e, o, r, s);
    } else
      o !== "" && typeof o == "string" ? o = e.firstChild.data = t : o = e.textContent = t;
  } else if (t == null || a === "boolean") {
    if (i) return o;
    o = ee(e, o, r);
  } else {
    if (a === "function")
      return $(() => {
        let s = t();
        for (; typeof s == "function"; ) s = s();
        o = pe(e, s, o, r);
      }), () => o;
    if (Array.isArray(t)) {
      const s = [], u = o && Array.isArray(o);
      if (Te(s, t, o, n))
        return $(() => o = pe(e, s, o, r, !0)), () => o;
      if (i) {
        if (!s.length) return o;
        if (r === void 0) return o = [...e.childNodes];
        let h = s[0];
        if (h.parentNode !== e) return o;
        const y = [h];
        for (; (h = h.nextSibling) !== r; ) y.push(h);
        return o = y;
      }
      if (s.length === 0) {
        if (o = ee(e, o, r), l) return o;
      } else u ? o.length === 0 ? Fe(e, s, r) : ct(e, o, s) : (o && ee(e), Fe(e, s));
      o = s;
    } else if (t.nodeType) {
      if (i && t.parentNode) return o = l ? [t] : t;
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
  let n = !1;
  for (let i = 0, a = t.length; i < a; i++) {
    let l = t[i], s = o && o[e.length], u;
    if (!(l == null || l === !0 || l === !1)) if ((u = typeof l) == "object" && l.nodeType)
      e.push(l);
    else if (Array.isArray(l))
      n = Te(e, l, s) || n;
    else if (u === "function")
      if (r) {
        for (; typeof l == "function"; ) l = l();
        n = Te(e, Array.isArray(l) ? l : [l], Array.isArray(s) ? s : [s]) || n;
      } else
        e.push(l), n = !0;
    else {
      const h = String(l);
      s && s.nodeType === 3 && s.data === h ? e.push(s) : e.push(document.createTextNode(h));
    }
  }
  return n;
}
function Fe(e, t, o = null) {
  for (let r = 0, n = t.length; r < n; r++) e.insertBefore(t[r], o);
}
function ee(e, t, o, r) {
  if (o === void 0) return e.textContent = "";
  const n = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let a = t.length - 1; a >= 0; a--) {
      const l = t[a];
      if (n !== l) {
        const s = l.parentNode === e;
        !i && !a ? s ? e.replaceChild(n, l) : e.insertBefore(n, o) : s && l.remove();
      } else i = !0;
    }
  } else e.insertBefore(n, o);
  return [n];
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
  const [t, o] = W(K.getConfig());
  Ve(() => {
    const n = K.subscribe(o);
    e.config && K.updateConfig(e.config), Ae(n);
  });
  const r = {
    get config() {
      return t();
    },
    setEngineEnabled: (n) => {
      K.setEngineEnabled(n);
    },
    setTheme: (n) => {
      K.setTheme(n);
    },
    updateConfig: (n) => {
      K.updateConfig(n);
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
    console.debug("Mock createPhysicsObject:", t, o);
    const r = Math.random() * 1e3;
    return this.physicsObjectId = r, r;
  }
  async updatePhysicsObject(t, o, r) {
    console.debug("Mock updatePhysicsObject:", t, o, r), this.physicsObjectId === t && (this.velocity = Math.random() * 0.1);
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
      const n = await (await oe()).createPhysicsObject(t, o);
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
  async calculateScrollbarPhysics(t, o, r, n) {
    try {
      const i = await oe();
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
    const i = { ...o }, a = -t.stiffness * (i.position - r), l = -t.friction * i.velocity, s = a + l, u = 1, h = 1e3;
    return i.acceleration = s / u, i.velocity += i.acceleration * n, i.velocity = Math.max(
      -h,
      Math.min(h, i.velocity)
    ), i.position += i.velocity * n, i;
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
function xt(e, t, o, r, n, i, a, l, s) {
  const u = new vt();
  return {
    scrollBy: (f) => {
      if (!n()) return;
      const p = f * 3;
      o() === "horizontal" ? n().scrollLeft += p : n().scrollTop += p;
    },
    handleWheel: (f) => {
      if (!n()) return;
      f.preventDefault();
      let p, k;
      o() === "horizontal" ? (p = f.deltaY, k = !0) : (p = (f.shiftKey, f.deltaY), k = f.shiftKey);
      const z = p * 0.5;
      k ? n().scrollLeft += z : n().scrollTop += z, s && setTimeout(s, 0);
    },
    handleThumbMouseDown: async (f) => {
      f.preventDefault(), f.stopPropagation();
      const p = i().getBoundingClientRect(), k = o() === "horizontal" ? te(f.clientX - p.left) : te(f.clientY - p.top), z = e().thumbPosition + e().thumbSize / 2, P = k - z;
      t((C) => ({
        ...C,
        isDragging: !0,
        dragOffset: P
      })), l() && await u.createPhysicsObject(k, 0), document.body.style.userSelect = "none";
    },
    handleMouseMove: async (f) => {
      if (!e().isDragging || !i() || !n()) return;
      f.preventDefault();
      const p = i().getBoundingClientRect(), k = o() === "horizontal" ? te(f.clientX - p.left) : te(f.clientY - p.top);
      l() && await u.updatePhysicsObject(k, 0);
      const P = k - e().dragOffset - e().thumbSize / 2, C = e().showArrows ? 12 : 0, M = (o() === "horizontal" ? i().clientWidth : i().clientHeight) - C * 2, g = M - e().thumbSize, I = Math.max(
        C,
        Math.min(P, g + C)
      );
      t((B) => ({ ...B, thumbPosition: I }));
      const q = o() === "horizontal" ? i().clientWidth : i().clientHeight, O = (o() === "horizontal" ? n().scrollWidth : n().scrollHeight) - q, D = I - C, E = M - e().thumbSize, G = Math.max(
        0,
        Math.min(1, D / E)
      ) * O;
      o() === "horizontal" ? n().scrollLeft = G : n().scrollTop = G;
    },
    handleMouseUp: () => {
      t((f) => ({
        ...f,
        isDragging: !1,
        dragOffset: 0
      })), document.body.style.userSelect = "";
    },
    handleTrackClick: (f) => {
      if (!i() || !n() || !a() || f.target === a()) return;
      const p = i().getBoundingClientRect(), k = o() === "horizontal" ? te(f.clientX - p.left) : te(f.clientY - p.top), z = e().showArrows ? 12 : 0, P = (o() === "horizontal" ? i().clientWidth : i().clientHeight) - z * 2, L = k - z - e().thumbSize / 2, M = P - e().thumbSize, g = Math.max(0, Math.min(L, M)) + z;
      t((F) => ({ ...F, thumbPosition: g }));
      const I = o() === "horizontal" ? i().clientWidth : i().clientHeight, w = (o() === "horizontal" ? n().scrollWidth : n().scrollHeight) - I, O = g - z, E = Math.max(0, Math.min(1, O / M)) * w;
      o() === "horizontal" ? n().scrollLeft = E : n().scrollTop = E;
    }
  };
}
function kt(e, t, o, r, n, i, a) {
  const l = () => {
    if (!r() || !n()) return;
    const u = o() === "horizontal" ? r().clientWidth : r().clientHeight, h = o() === "horizontal" ? n().scrollWidth : n().scrollHeight;
    if (!(h > u)) {
      t((z) => ({ ...z, isVisible: !1 }));
      return;
    }
    const S = o() === "horizontal" ? n().scrollLeft : n().scrollTop, _ = h - u, v = o() === "horizontal" ? i()?.clientWidth ?? 0 : i()?.clientHeight ?? 0, x = e().showArrows ? 12 : 0, f = v - x * 2, p = Math.max(
      a(),
      f * u / h
    ), k = e().isDragging ? e().thumbPosition : Math.max(
      x,
      Math.min(
        x + S / _ * (f - p),
        f - p + x
      )
    );
    t((z) => ({
      ...z,
      isVisible: !0,
      thumbSize: p,
      thumbPosition: k,
      canScrollUp: S > 0,
      canScrollDown: S < _
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
function St(e) {
  const t = We(), o = () => e.showArrows ?? !0, [r, n] = W({
    thumbSize: 20,
    thumbPosition: 0,
    isVisible: !1,
    isDragging: !1,
    dragOffset: 0,
    showArrows: o(),
    canScrollUp: !1,
    canScrollDown: !1
  }), [i, a] = W(!1), [l, s] = W(
    null
  ), u = () => e.direction ?? "vertical", h = () => e.theme ?? t.config.theme.name, y = () => e.autoHide ?? !0, S = () => e.minThumbSize ?? 4, _ = () => e.engineIntegration !== void 0 ? e.engineIntegration && t.config.engine.enabled : t.config.engine.enabled, v = () => {
    a(!0);
    const f = l();
    f && (clearTimeout(f), s(null));
  }, x = () => {
    if (a(!1), y()) {
      const f = setTimeout(() => {
        n((p) => ({ ...p, isVisible: !1 }));
      }, 800);
      s(f);
    }
  };
  return Ae(() => {
    const f = l();
    f && clearTimeout(f);
  }), {
    state: r,
    setState: n,
    isHovered: i,
    setIsHovered: a,
    hideTimeout: l,
    setHideTimeout: s,
    direction: u,
    theme: h,
    autoHide: y,
    minThumbSize: S,
    engineIntegration: _,
    handleMouseEnter: v,
    handleMouseLeave: x
  };
}
var Tt = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z">'), _t = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z">'), Ct = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">'), Et = /* @__PURE__ */ R('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z">');
const At = (e) => {
  const t = (o, r) => {
    o.stopPropagation(), e.onScrollBy(r);
  };
  return le(() => le(() => e.direction === "vertical")() ? [(() => {
    var o = Tt();
    return o.$$click = (r) => t(r, -50), $((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-up ${e.canScrollUp ? "" : "disabled"}`, i = !e.canScrollUp;
      return n !== r.e && U(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })(), (() => {
    var o = _t();
    return o.$$click = (r) => t(r, 50), $((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-down ${e.canScrollDown ? "" : "disabled"}`, i = !e.canScrollDown;
      return n !== r.e && U(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })()] : [(() => {
    var o = Ct();
    return o.$$click = (r) => t(r, -50), $((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-left ${e.canScrollUp ? "" : "disabled"}`, i = !e.canScrollUp;
      return n !== r.e && U(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })(), (() => {
    var o = Et();
    return o.$$click = (r) => t(r, 50), $((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-right ${e.canScrollDown ? "" : "disabled"}`, i = !e.canScrollDown;
      return n !== r.e && U(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
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
  return t.$$mousedown = (o) => e.onMouseDown(o), $((o) => {
    var r = `scrollbar-thumb ${e.isDragging ? "dragging" : ""}`, n = e.direction === "horizontal" ? `${Math.max(1, e.thumbSize)}px` : "4px", i = e.direction === "horizontal" ? "4px" : `${Math.max(1, e.thumbSize)}px`, a = e.direction === "horizontal" ? `${e.thumbPosition}px` : "auto", l = e.direction === "horizontal" ? "50%" : `${e.thumbPosition}px`, s = e.direction === "horizontal" ? "auto" : "4px", u = e.direction === "horizontal" ? "translateY(-50%)" : "none";
    return r !== o.e && U(t, o.e = r), n !== o.t && Q(t, "width", o.t = n), i !== o.a && Q(t, "height", o.a = i), a !== o.o && Q(t, "left", o.o = a), l !== o.i && Q(t, "top", o.i = l), s !== o.n && Q(t, "right", o.n = s), u !== o.s && Q(t, "transform", o.s = u), o;
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
  const [t, o] = W(), [r, n] = W(), [i, a] = W(), [l] = W(), {
    state: s,
    setState: u,
    isHovered: h,
    direction: y,
    autoHide: S,
    minThumbSize: _,
    engineIntegration: v,
    handleMouseEnter: x,
    handleMouseLeave: f
  } = St(e), {
    updateScrollbar: p,
    handleScroll: k
  } = kt(s, u, y, t, r, i, _), {
    scrollBy: z,
    handleWheel: P,
    handleThumbMouseDown: C,
    handleMouseMove: L,
    handleMouseUp: M,
    handleTrackClick: g
  } = xt(s, u, y, t, r, i, l, v, p), {
    setupObservers: I
  } = zt(t, r, p), q = () => s().isVisible && (h() || !S() || s().isDragging);
  return Ve(() => {
    const w = () => {
      p();
    };
    w(), setTimeout(w, 0), setTimeout(w, 50), setTimeout(w, 100), setTimeout(w, 200), setTimeout(w, 500), setTimeout(w, 1e3), setTimeout(w, 2e3), r() && r().addEventListener("scroll", k);
    const O = I();
    document.addEventListener("mousemove", L), document.addEventListener("mouseup", M), Ae(() => {
      O?.(), r() && r().removeEventListener("scroll", k), document.removeEventListener("mousemove", L), document.removeEventListener("mouseup", M);
    });
  }), [(() => {
    var w = It();
    return X(w, ft), w;
  })(), (() => {
    var w = $t(), O = w.firstChild;
    return ve(w, "wheel", P), ve(w, "mouseleave", f), w.addEventListener("mouseenter", () => {
      x(), p();
    }), xe(o, w), xe(n, O), X(O, () => e.children), X(w, (() => {
      var D = le(() => !!q());
      return () => D() && (() => {
        var E = Lt();
        return ve(E, "click", g, !0), xe(a, E), X(E, (() => {
          var F = le(() => !!s().showArrows);
          return () => F() && ae(At, {
            get direction() {
              return y();
            },
            get canScrollUp() {
              return s().canScrollUp;
            },
            get canScrollDown() {
              return s().canScrollDown;
            },
            onScrollBy: z
          });
        })(), null), X(E, ae(Mt, {
          get direction() {
            return y();
          },
          get thumbSize() {
            return s().thumbSize;
          },
          get thumbPosition() {
            return s().thumbPosition;
          },
          get isDragging() {
            return s().isDragging;
          },
          onMouseDown: C
        }), null), $(() => U(E, `scrollbar-track ${y() === "horizontal" ? "scrollbar-track-horizontal" : "scrollbar-track-vertical"} visible`)), E;
      })();
    })(), null), $((D) => {
      var E = `scrollbar-container ${e.class || ""}`, F = e.style;
      return E !== D.e && U(w, D.e = E), D.t = dt(w, F, D.t), D;
    }, {
      e: void 0,
      t: void 0
    }), w;
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
  const t = We(), [o, r] = W(!1), n = () => {
    t.setEngineEnabled(!t.config.engine.enabled);
  }, i = (a) => {
    t.setTheme({
      name: a
    });
  };
  return (() => {
    var a = Ot(), l = a.firstChild, s = l.nextSibling;
    return l.$$click = () => r(!o()), X(a, (() => {
      var u = le(() => !!o());
      return () => u() && (() => {
        var h = Dt(), y = h.firstChild, S = y.nextSibling, _ = S.firstChild, v = _.firstChild, x = S.nextSibling, f = x.firstChild, p = f.nextSibling, k = x.nextSibling, z = k.firstChild, P = z.firstChild, C = k.nextSibling, L = C.firstChild, M = L.firstChild;
        return v.addEventListener("change", n), p.addEventListener("change", (g) => i(g.currentTarget.value)), P.addEventListener("change", (g) => t.updateConfig({
          engine: {
            ...t.config.engine,
            autoDetect: g.currentTarget.checked
          }
        })), M.addEventListener("change", (g) => t.updateConfig({
          accessibility: {
            ...t.config.accessibility,
            keyboardNavigation: g.currentTarget.checked
          }
        })), $(() => v.checked = t.config.engine.enabled), $(() => p.value = t.config.theme.name), $(() => P.checked = t.config.engine.autoDetect), $(() => M.checked = t.config.accessibility.keyboardNavigation), h;
      })();
    })(), s), $(() => U(a, `scrollbar-controls ${e.class || ""}`)), a;
  })();
};
ce(["click"]);
const V = {
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
  var t = Ft(), o = t.firstChild, r = o.nextSibling, n = r.nextSibling;
  return t.$$click = () => e.onClick ? e.onClick() : void 0, X(r, () => e.icon), X(n, () => e.label), $((i) => {
    var a = e.class ? `${V.base} ${V.variants[e.variant]} ${V.hover} ${e.class}` : `${V.base} ${V.variants[e.variant]} ${V.hover}`, l = e.status, s = e.variant, u = `${e.label} status: ${e.status}`, h = `${V.indicator} ${V.status[e.status]}`.trim(), y = `material-symbols-rounded ${V.icon}`;
    return a !== i.e && U(t, i.e = a), l !== i.t && me(t, "data-status", i.t = l), s !== i.a && me(t, "data-variant", i.a = s), u !== i.o && me(t, "aria-label", i.o = u), h !== i.i && U(o, i.i = h), y !== i.n && U(r, i.n = y), i;
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
      const r = await window.__TAURI__.invoke(
        "create_physics_object",
        {
          x: t,
          y: o
        }
      );
      return this.physicsObjectId = r, r;
    } catch (r) {
      throw console.error("Failed to create physics object:", r), r;
    }
  }
  async updatePhysicsObject(t, o, r) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      await window.__TAURI__.invoke("update_physics_object", {
        id: t,
        x: o,
        y: r
      });
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
      const r = await window.__TAURI__.invoke(
        "screen_to_world",
        {
          screenX: t,
          screenY: o
        }
      );
      return { x: r.x, y: r.y };
    } catch (r) {
      throw console.error("Failed to convert screen to world:", r), r;
    }
  }
  async worldToScreen(t, o) {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      const r = await window.__TAURI__.invoke(
        "world_to_screen",
        {
          worldX: t,
          worldY: o
        }
      );
      return { x: r.x, y: r.y };
    } catch (r) {
      throw console.error("Failed to convert world to screen:", r), r;
    }
  }
  async getEngineState() {
    if (!this.isTauriAvailable())
      throw new Error("Tauri is not available");
    try {
      const t = await window.__TAURI__.invoke(
        "get_engine_state"
      );
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
      return await window.__TAURI__.invoke(
        "get_physics_engine_info"
      );
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
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (o = Ze(e[t])) && (r && (r += " "), r += o);
  } else for (o in e) e[o] && (r && (r += " "), r += o);
  return r;
}
function Ut() {
  for (var e, t, o = 0, r = "", n = arguments.length; o < n; o++) (e = arguments[o]) && (t = Ze(e)) && (r && (r += " "), r += t);
  return r;
}
const Me = "-", Rt = (e) => {
  const t = Vt(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const l = a.split(Me);
      return l[0] === "" && l.length !== 1 && l.shift(), Xe(l, t) || Bt(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const s = o[a] || [];
      return l && r[a] ? [...s, ...r[a]] : s;
    }
  };
}, Xe = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const o = e[0], r = t.nextPart.get(o), n = r ? Xe(e.slice(1), r) : void 0;
  if (n)
    return n;
  if (t.validators.length === 0)
    return;
  const i = e.join(Me);
  return t.validators.find(({
    validator: a
  }) => a(i))?.classGroupId;
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
  for (const n in o)
    _e(o[n], r, n, t);
  return r;
}, _e = (e, t, o, r) => {
  e.forEach((n) => {
    if (typeof n == "string") {
      const i = n === "" ? t : Ue(t, n);
      i.classGroupId = o;
      return;
    }
    if (typeof n == "function") {
      if (Ht(n)) {
        _e(n(r), t, o, r);
        return;
      }
      t.validators.push({
        validator: n,
        classGroupId: o
      });
      return;
    }
    Object.entries(n).forEach(([i, a]) => {
      _e(a, Ue(t, i), o, r);
    });
  });
}, Ue = (e, t) => {
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
  const n = (i, a) => {
    o.set(i, a), t++, t > e && (t = 0, r = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let a = o.get(i);
      if (a !== void 0)
        return a;
      if ((a = r.get(i)) !== void 0)
        return n(i, a), a;
    },
    set(i, a) {
      o.has(i) ? o.set(i, a) : n(i, a);
    }
  };
}, Ce = "!", Ee = ":", Yt = Ee.length, Zt = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: o
  } = e;
  let r = (n) => {
    const i = [];
    let a = 0, l = 0, s = 0, u;
    for (let v = 0; v < n.length; v++) {
      let x = n[v];
      if (a === 0 && l === 0) {
        if (x === Ee) {
          i.push(n.slice(s, v)), s = v + Yt;
          continue;
        }
        if (x === "/") {
          u = v;
          continue;
        }
      }
      x === "[" ? a++ : x === "]" ? a-- : x === "(" ? l++ : x === ")" && l--;
    }
    const h = i.length === 0 ? n : n.substring(s), y = Xt(h), S = y !== h, _ = u && u > s ? u - s : void 0;
    return {
      modifiers: i,
      hasImportantModifier: S,
      baseClassName: y,
      maybePostfixModifierPosition: _
    };
  };
  if (t) {
    const n = t + Ee, i = r;
    r = (a) => a.startsWith(n) ? i(a.substring(n.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: a,
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
}, Xt = (e) => e.endsWith(Ce) ? e.substring(0, e.length - 1) : e.startsWith(Ce) ? e.substring(1) : e, qt = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const n = [];
    let i = [];
    return r.forEach((a) => {
      a[0] === "[" || t[a] ? (n.push(...i.sort(), a), i = []) : i.push(a);
    }), n.push(...i.sort()), n;
  };
}, Jt = (e) => ({
  cache: Wt(e.cacheSize),
  parseClassName: Zt(e),
  sortModifiers: qt(e),
  ...Rt(e)
}), Kt = /\s+/, Qt = (e, t) => {
  const {
    parseClassName: o,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: i
  } = t, a = [], l = e.trim().split(Kt);
  let s = "";
  for (let u = l.length - 1; u >= 0; u -= 1) {
    const h = l[u], {
      isExternal: y,
      modifiers: S,
      hasImportantModifier: _,
      baseClassName: v,
      maybePostfixModifierPosition: x
    } = o(h);
    if (y) {
      s = h + (s.length > 0 ? " " + s : s);
      continue;
    }
    let f = !!x, p = r(f ? v.substring(0, x) : v);
    if (!p) {
      if (!f) {
        s = h + (s.length > 0 ? " " + s : s);
        continue;
      }
      if (p = r(v), !p) {
        s = h + (s.length > 0 ? " " + s : s);
        continue;
      }
      f = !1;
    }
    const k = i(S).join(":"), z = _ ? k + Ce : k, P = z + p;
    if (a.includes(P))
      continue;
    a.push(P);
    const C = n(p, f);
    for (let L = 0; L < C.length; ++L) {
      const M = C[L];
      a.push(z + M);
    }
    s = h + (s.length > 0 ? " " + s : s);
  }
  return s;
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
  let o, r, n, i = a;
  function a(s) {
    const u = t.reduce((h, y) => y(h), e());
    return o = Jt(u), r = o.cache.get, n = o.cache.set, i = l, l(s);
  }
  function l(s) {
    const u = r(s);
    if (u)
      return u;
    const h = Qt(s, o);
    return n(s, h), h;
  }
  return function() {
    return i(eo.apply(null, arguments));
  };
}
const T = (e) => {
  const t = (o) => o[e] || [];
  return t.isThemeGetter = !0, t;
}, Je = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ke = /^\((?:(\w[\w-]*):)?(.+)\)$/i, oo = /^\d+\/\d+$/, ro = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, no = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, io = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, so = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ao = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, re = (e) => oo.test(e), m = (e) => !!e && !Number.isNaN(Number(e)), Y = (e) => !!e && Number.isInteger(Number(e)), ze = (e) => e.endsWith("%") && m(e.slice(0, -1)), H = (e) => ro.test(e), lo = () => !0, co = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  no.test(e) && !io.test(e)
), Qe = () => !1, uo = (e) => so.test(e), ho = (e) => ao.test(e), go = (e) => !c(e) && !d(e), bo = (e) => ne(e, ot, Qe), c = (e) => Je.test(e), J = (e) => ne(e, rt, co), Se = (e) => ne(e, wo, m), Re = (e) => ne(e, et, Qe), fo = (e) => ne(e, tt, ho), be = (e) => ne(e, nt, uo), d = (e) => Ke.test(e), se = (e) => ie(e, rt), mo = (e) => ie(e, vo), Be = (e) => ie(e, et), po = (e) => ie(e, ot), yo = (e) => ie(e, tt), fe = (e) => ie(e, nt, !0), ne = (e, t, o) => {
  const r = Je.exec(e);
  return r ? r[1] ? t(r[1]) : o(r[2]) : !1;
}, ie = (e, t, o = !1) => {
  const r = Ke.exec(e);
  return r ? r[1] ? t(r[1]) : o : !1;
}, et = (e) => e === "position" || e === "percentage", tt = (e) => e === "image" || e === "url", ot = (e) => e === "length" || e === "size" || e === "bg-size", rt = (e) => e === "length", wo = (e) => e === "number", vo = (e) => e === "family-name", nt = (e) => e === "shadow", xo = () => {
  const e = T("color"), t = T("font"), o = T("text"), r = T("font-weight"), n = T("tracking"), i = T("leading"), a = T("breakpoint"), l = T("container"), s = T("spacing"), u = T("radius"), h = T("shadow"), y = T("inset-shadow"), S = T("text-shadow"), _ = T("drop-shadow"), v = T("blur"), x = T("perspective"), f = T("aspect"), p = T("ease"), k = T("animate"), z = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], P = () => [
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
  ], C = () => [...P(), d, c], L = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], g = () => [d, c, s], I = () => [re, "full", "auto", ...g()], q = () => [Y, "none", "subgrid", d, c], w = () => ["auto", {
    span: ["full", Y, d, c]
  }, Y, d, c], O = () => [Y, "auto", d, c], D = () => ["auto", "min", "max", "fr", d, c], E = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], F = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], G = () => ["auto", ...g()], B = () => [re, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...g()], b = () => [e, d, c], Ie = () => [...P(), Be, Re, {
    position: [d, c]
  }], $e = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Le = () => ["auto", "cover", "contain", po, bo, {
    size: [d, c]
  }], ye = () => [ze, se, J], j = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    d,
    c
  ], N = () => ["", m, se, J], de = () => ["solid", "dashed", "dotted", "double"], je = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], A = () => [m, ze, Be, Re], Oe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    d,
    c
  ], ue = () => ["none", m, d, c], he = () => ["none", m, d, c], we = () => [m, d, c], ge = () => [re, "full", ...g()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [H],
      breakpoint: [H],
      color: [lo],
      container: [H],
      "drop-shadow": [H],
      ease: ["in", "out", "in-out"],
      font: [go],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [H],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [H],
      shadow: [H],
      spacing: ["px", m],
      text: [H],
      "text-shadow": [H],
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
        aspect: ["auto", "square", re, c, d, f]
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
        columns: [m, c, d, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": z()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": z()
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
        overflow: L()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": L()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": L()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: M()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": M()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": M()
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
        inset: I()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": I()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": I()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: I()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: I()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: I()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: I()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: I()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: I()
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
        z: [Y, "auto", d, c]
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
        flex: [m, re, "auto", "initial", "none", c]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", m, d, c]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", m, d, c]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Y, "first", "last", "none", d, c]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": q()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: w()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": O()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": O()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": q()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: w()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": O()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": O()
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
        "auto-cols": D()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": D()
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
        justify: [...E(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...F(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...F()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...E()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...F(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...F(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": E()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...F(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...F()]
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
        m: G()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: G()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: G()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: G()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: G()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: G()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: G()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: G()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: G()
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
        size: B()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...B()]
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
          ...B()
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
            screen: [a]
          },
          ...B()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...B()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...B()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...B()]
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
        font: [r, d, Se]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ze, c]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [mo, c, t]
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
        tracking: [n, d, c]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [m, "none", d, Se]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...g()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", d, c]
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
        list: ["disc", "decimal", "none", d, c]
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
        decoration: [m, "from-font", "auto", d, J]
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
        "underline-offset": [m, "auto", d, c]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", d, c]
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
        content: ["none", d, c]
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
          }, Y, d, c],
          radial: ["", d, c],
          conic: [Y, d, c]
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
        from: ye()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ye()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ye()
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
        "outline-offset": [m, d, c]
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
        "text-shadow": ["none", S, fe, be]
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
        opacity: [m, d, c]
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
        "mask-radial": [d, c]
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
        "mask-radial-at": P()
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
        mask: ["none", d, c]
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
          d,
          c
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
        brightness: [m, d, c]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [m, d, c]
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
          _,
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
        grayscale: ["", m, d, c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [m, d, c]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", m, d, c]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [m, d, c]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", m, d, c]
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
          d,
          c
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
        "backdrop-brightness": [m, d, c]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [m, d, c]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", m, d, c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [m, d, c]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", m, d, c]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [m, d, c]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [m, d, c]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", m, d, c]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", d, c]
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
        duration: [m, "initial", d, c]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", p, d, c]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [m, d, c]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", k, d, c]
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
        perspective: [x, d, c]
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
        skew: we()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": we()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": we()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [d, c, "", "none", "gpu", "cpu"]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", d, c]
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
        "will-change": ["auto", "scroll", "contents", "transform", d, c]
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
  return ko(Ut(e));
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
  V as techChipStyles,
  We as useScrollbarConfig,
  xt as useScrollbarHandlers,
  kt as useScrollbarLogic,
  zt as useScrollbarObservers,
  St as useScrollbarState
};
//# sourceMappingURL=index.js.map
