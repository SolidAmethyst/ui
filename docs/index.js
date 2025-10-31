import { sharedConfig as J, createMemo as st, createRenderEffect as _, untrack as at, createComponent as Z, Show as be, createContext as lt, createSignal as X, onMount as He, onCleanup as Ae, useContext as ct, createEffect as dt } from "solid-js";
const ee = (e) => st(() => e());
function ut(e, t, o) {
  let r = o.length, n = t.length, i = r, a = 0, l = 0, s = t[n - 1].nextSibling, c = null;
  for (; a < n || l < i; ) {
    if (t[a] === o[l]) {
      a++, l++;
      continue;
    }
    for (; t[n - 1] === o[i - 1]; )
      n--, i--;
    if (n === a) {
      const d = i < r ? l ? o[l - 1].nextSibling : o[i - l] : s;
      for (; l < i; ) e.insertBefore(o[l++], d);
    } else if (i === l)
      for (; a < n; )
        (!c || !c.has(t[a])) && t[a].remove(), a++;
    else if (t[a] === o[i - 1] && o[l] === t[n - 1]) {
      const d = t[--n].nextSibling;
      e.insertBefore(o[l++], t[a++].nextSibling), e.insertBefore(o[--i], d), t[n] = o[i];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let m = l;
        for (; m < i; ) c.set(o[m], m++);
      }
      const d = c.get(t[a]);
      if (d != null)
        if (l < d && d < i) {
          let m = a, v = 1, S;
          for (; ++m < n && m < i && !((S = c.get(t[m])) == null || S !== d + v); )
            v++;
          if (v > d - l) {
            const w = t[a];
            for (; l < d; ) e.insertBefore(o[l++], w);
          } else e.replaceChild(o[l++], t[a++]);
        } else a++;
      else t[a++].remove();
    }
  }
}
const De = "_$DX_DELEGATE";
function F(e, t, o, r) {
  let n;
  const i = () => {
    const l = document.createElement("template");
    return l.innerHTML = e, l.content.firstChild;
  }, a = () => (n || (n = i())).cloneNode(!0);
  return a.cloneNode = a, a;
}
function se(e, t = window.document) {
  const o = t[De] || (t[De] = /* @__PURE__ */ new Set());
  for (let r = 0, n = e.length; r < n; r++) {
    const i = e[r];
    o.has(i) || (o.add(i), t.addEventListener(i, gt));
  }
}
function ie(e, t, o) {
  Ie(e) || (o == null ? e.removeAttribute(t) : e.setAttribute(t, o));
}
function R(e, t) {
  Ie(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function we(e, t, o, r) {
  if (r)
    Array.isArray(o) ? (e[`$$${t}`] = o[0], e[`$$${t}Data`] = o[1]) : e[`$$${t}`] = o;
  else if (Array.isArray(o)) {
    const n = o[0];
    e.addEventListener(t, o[0] = (i) => n.call(e, o[1], i));
  } else e.addEventListener(t, o, typeof o != "function" && o);
}
function ht(e, t, o) {
  if (!t) return o ? ie(e, "style") : t;
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
function V(e, t, o) {
  o != null ? e.style.setProperty(t, o) : e.style.removeProperty(t);
}
function xe(e, t, o) {
  return at(() => e(t, o));
}
function D(e, t, o, r) {
  if (o !== void 0 && !r && (r = []), typeof t != "function") return pe(e, t, r, o);
  _((n) => pe(e, t(), n, o), r);
}
function Ie(e) {
  return !!J.context && !J.done && (!e || e.isConnected);
}
function gt(e) {
  if (J.registry && J.events && J.events.find(([s, c]) => c === e))
    return;
  let t = e.target;
  const o = `$$${e.type}`, r = e.target, n = e.currentTarget, i = (s) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: s
  }), a = () => {
    const s = t[o];
    if (s && !t.disabled) {
      const c = t[`${o}Data`];
      if (c !== void 0 ? s.call(t, c, e) : s.call(t, e), e.cancelBubble) return;
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
  }), J.registry && !J.done && (J.done = _$HY.done = !0), e.composedPath) {
    const s = e.composedPath();
    i(s[0]);
    for (let c = 0; c < s.length - 2 && (t = s[c], !!a()); c++) {
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
  const i = Ie(e);
  if (i) {
    !o && (o = [...e.childNodes]);
    let s = [];
    for (let c = 0; c < o.length; c++) {
      const d = o[c];
      d.nodeType === 8 && d.data.slice(0, 2) === "!$" ? d.remove() : s.push(d);
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
      s && s.nodeType === 3 ? s.data !== t && (s.data = t) : s = document.createTextNode(t), o = te(e, o, r, s);
    } else
      o !== "" && typeof o == "string" ? o = e.firstChild.data = t : o = e.textContent = t;
  } else if (t == null || a === "boolean") {
    if (i) return o;
    o = te(e, o, r);
  } else {
    if (a === "function")
      return _(() => {
        let s = t();
        for (; typeof s == "function"; ) s = s();
        o = pe(e, s, o, r);
      }), () => o;
    if (Array.isArray(t)) {
      const s = [], c = o && Array.isArray(o);
      if (Te(s, t, o, n))
        return _(() => o = pe(e, s, o, r, !0)), () => o;
      if (i) {
        if (!s.length) return o;
        if (r === void 0) return o = [...e.childNodes];
        let d = s[0];
        if (d.parentNode !== e) return o;
        const m = [d];
        for (; (d = d.nextSibling) !== r; ) m.push(d);
        return o = m;
      }
      if (s.length === 0) {
        if (o = te(e, o, r), l) return o;
      } else c ? o.length === 0 ? Fe(e, s, r) : ut(e, o, s) : (o && te(e), Fe(e, s));
      o = s;
    } else if (t.nodeType) {
      if (i && t.parentNode) return o = l ? [t] : t;
      if (Array.isArray(o)) {
        if (l) return o = te(e, o, r, t);
        te(e, o, null, t);
      } else o == null || o === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      o = t;
    }
  }
  return o;
}
function Te(e, t, o, r) {
  let n = !1;
  for (let i = 0, a = t.length; i < a; i++) {
    let l = t[i], s = o && o[e.length], c;
    if (!(l == null || l === !0 || l === !1)) if ((c = typeof l) == "object" && l.nodeType)
      e.push(l);
    else if (Array.isArray(l))
      n = Te(e, l, s) || n;
    else if (c === "function")
      if (r) {
        for (; typeof l == "function"; ) l = l();
        n = Te(e, Array.isArray(l) ? l : [l], Array.isArray(s) ? s : [s]) || n;
      } else
        e.push(l), n = !0;
    else {
      const d = String(l);
      s && s.nodeType === 3 && s.data === d ? e.push(s) : e.push(document.createTextNode(d));
    }
  }
  return n;
}
function Fe(e, t, o = null) {
  for (let r = 0, n = t.length; r < n; r++) e.insertBefore(t[r], o);
}
function te(e, t, o, r) {
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
var bt = /* @__PURE__ */ F('<span class=material-symbols-rounded style="animation:spin 1s linear infinite">refresh'), Ne = /* @__PURE__ */ F("<span aria-hidden=true>"), ft = /* @__PURE__ */ F("<button>");
const Eo = (e) => {
  const t = () => {
    let s = "control-btn";
    return e.variant === "play-pause" ? s = "play-pause-btn" : e.variant === "small" ? s = "control-btn small-btn" : e.variant === "close" ? s = "control-btn close-btn" : e.variant === "minimize" ? s = "control-btn minimize-btn" : e.variant === "maximize" ? s = "control-btn maximize-btn" : e.variant === "pin" ? s = "control-btn pin-btn" : e.variant === "expand" ? s = "control-btn expand-btn" : e.variant === "copy" ? s = "control-btn copy-btn" : e.variant === "attach" && (s = "control-btn attach-btn"), e.active && (s += " active"), e.pinned && (s += " pinned"), e.maximized && (s += " maximized"), `${s} ${e.class || ""}`;
  }, o = () => e.variant === "small" ? "12px" : e.variant === "play-pause" ? "20px" : e.variant === "expand" || e.variant === "copy" || e.variant === "attach" ? "16px" : "14px", r = () => e.variant === "pin" && !e.icon ? "push_pin" : e.variant === "expand" && !e.icon ? "open_in_full" : e.variant === "copy" && !e.icon ? "content_copy" : e.variant === "attach" && !e.icon ? "attach_file" : e.icon, n = () => {
    if (e.iconPosition === "only") return !0;
    const c = r() || e.icon, d = e.variant === "pin" || e.variant === "expand" || e.variant === "copy" || e.variant === "attach" || e.variant === "close" || e.variant === "minimize" || e.variant === "maximize" || e.variant === "play-pause";
    return c && !e.children || d && !e.children;
  }, i = () => (r() || e.icon) && e.iconPosition !== "only", a = () => i() && (e.iconPosition === "left" || !e.iconPosition), l = () => i() && e.iconPosition === "right";
  return (() => {
    var s = ft();
    return s.$$click = () => e.onClick?.(), D(s, Z(be, {
      get when() {
        return e.loading;
      },
      get children() {
        var c = bt();
        return _((d) => V(c, "font-size", o())), c;
      }
    }), null), D(s, Z(be, {
      get when() {
        return ee(() => !e.loading)() && (a() || n());
      },
      get children() {
        var c = Ne();
        return D(c, r), _((d) => {
          var m = `material-symbols-rounded ${e.iconFilled ? "filled" : ""}`, v = o();
          return m !== d.e && R(c, d.e = m), v !== d.t && V(c, "font-size", d.t = v), d;
        }, {
          e: void 0,
          t: void 0
        }), c;
      }
    }), null), D(s, Z(be, {
      get when() {
        return !n();
      },
      get children() {
        return e.children;
      }
    }), null), D(s, Z(be, {
      get when() {
        return ee(() => !e.loading)() && l();
      },
      get children() {
        var c = Ne();
        return D(c, r), _((d) => {
          var m = `material-symbols-rounded ${e.iconFilled ? "filled" : ""}`, v = o();
          return m !== d.e && R(c, d.e = m), v !== d.t && V(c, "font-size", d.t = v), d;
        }, {
          e: void 0,
          t: void 0
        }), c;
      }
    }), null), _((c) => {
      var d = e.type || "button", m = t(), v = e.disabled || e.loading, S = e.title;
      return d !== c.e && ie(s, "type", c.e = d), m !== c.t && R(s, c.t = m), v !== c.a && (s.disabled = c.a = v), S !== c.o && ie(s, "title", c.o = S), c;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), s;
  })();
};
se(["click"]);
const Ao = {
  // Control button (основная кнопка)
  control: `
    height: var(--normal-btn-height);
    padding: var(--normal-btn-padding);
    border: none;
    background: transparent;
    color: hsl(var(--foreground));
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: no-drag;
    font-size: 12px;
    border-radius: 0;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: none;
    outline: none;
    position: relative;
    z-index: 2;
  `,
  // Play/Pause button
  playPause: `
    position: relative;
    width: 50px;
    height: 50px;
    border: 2px solid transparent;
    background: transparent;
    color: hsl(var(--foreground));
    cursor: pointer;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    box-sizing: border-box;
    box-shadow: none;
    outline: none;
  `,
  // Small button (для иконок в заголовке)
  small: `
    width: var(--small-btn-size);
    height: var(--small-btn-size);
    padding: 0;
    margin: 0 2px;
    align-self: center;
    pointer-events: auto;
  `,
  // Hover effects
  hover: `
    background: transparent;
    color: #3b82f6;
    box-shadow: none;
  `,
  // Active state
  active: `
    color: #3b82f6;
  `,
  // Close button hover
  closeHover: `
    background: transparent;
    color: #e81123;
  `,
  // Close button active
  closeActive: `
    background: #c50e1f;
  `,
  // Disabled state
  disabled: `
    opacity: 0.3;
    cursor: not-allowed;
  `,
  // Icon sizes
  iconSizes: {
    small: "12px",
    normal: "14px",
    large: "20px"
  }
}, mt = {
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
class pt {
  config = mt;
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
const Q = new pt();
Q.initialize();
const We = lt(), yt = (e) => {
  const [t, o] = X(Q.getConfig());
  He(() => {
    const n = Q.subscribe(o);
    e.config && Q.updateConfig(e.config), Ae(n);
  });
  const r = {
    get config() {
      return t();
    },
    setEngineEnabled: (n) => {
      Q.setEngineEnabled(n);
    },
    setTheme: (n) => {
      Q.setTheme(n);
    },
    updateConfig: (n) => {
      Q.updateConfig(n);
    }
  };
  return Z(We.Provider, {
    value: r,
    get children() {
      return e.children;
    }
  });
}, Ye = () => {
  const e = ct(We);
  if (!e)
    throw new Error("useScrollbarConfig must be used within ScrollbarProvider");
  return e;
}, vt = `
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
function wt() {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--zoom-level"
    ) || "1"
  );
}
function oe(e) {
  return e / wt();
}
class xt {
  physicsObjectId = null;
  velocity = 0;
  acceleration = 0;
  zoomLevel = 1;
  isInitialized = !1;
  async createPhysicsObject() {
    const t = Math.random() * 1e3;
    return this.physicsObjectId = t, t;
  }
  async updatePhysicsObject(t) {
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
const Be = new xt();
class kt {
  currentEngine = null;
  config;
  isInitialized = !1;
  constructor(t) {
    this.config = t;
  }
  async initialize() {
    if (!this.isInitialized)
      try {
        this.config.enabled && this.config.autoDetect && await this.detectTauriEngine() && (this.currentEngine = await this.loadTauriEngine()), this.currentEngine || (this.currentEngine = Be), this.isInitialized = !0;
      } catch (t) {
        console.warn("Failed to initialize engine, falling back to mock:", t), this.currentEngine = Be, this.isInitialized = !0;
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
      const { tauriEngine: t } = await Promise.resolve().then(() => Vt);
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
function zt(e) {
  return ke || (ke = new kt(
    e || {
      enabled: !0,
      autoDetect: !0,
      fallbackToJS: !0,
      physicsEnabled: !0,
      zoomEnabled: !0
    }
  )), ke;
}
async function re() {
  return await zt().getEngine();
}
class St {
  physicsObjectId = null;
  velocity = 0;
  acceleration = 0;
  async createPhysicsObject(t, o) {
    try {
      const n = await (await re()).createPhysicsObject(t, o);
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
        await (await re()).updatePhysicsObject(this.physicsObjectId, t, o);
      } catch (r) {
        console.warn("Failed to update physics object:", r);
      }
  }
  async updateZoomLevel(t) {
    try {
      await (await re()).updateZoomLevel(t);
    } catch (o) {
      console.warn("Failed to update zoom level:", o);
    }
  }
  async getEngineState() {
    try {
      const o = await (await re()).getEngineState();
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
      const a = await re();
      return a.calculateScrollbarPhysics ? await a.calculateScrollbarPhysics(
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
    const i = { ...o }, a = -t.stiffness * (i.position - r), l = -t.damping * i.velocity, s = a + l;
    return i.acceleration = s / t.mass, i.velocity += i.acceleration * n, i.velocity = Math.max(
      -t.max_velocity,
      Math.min(t.max_velocity, i.velocity)
    ), i.position += i.velocity * n, i;
  }
  async getPhysicsEngineInfo() {
    try {
      const o = await re();
      return o.getPhysicsEngineInfo ? await o.getPhysicsEngineInfo() : "Mock Physics Engine - No DLL available";
    } catch (t) {
      return console.warn("Failed to get physics engine info:", t), "Mock Physics Engine - Error occurred";
    }
  }
}
function Tt(e, t, o, r, n, i, a, l, s) {
  const c = new St();
  return {
    scrollBy: (b) => {
      if (!n()) return;
      const y = b * 3;
      o() === "horizontal" ? n().scrollLeft += y : n().scrollTop += y;
    },
    handleWheel: (b) => {
      if (!n()) return;
      b.preventDefault();
      let y, k;
      o() === "horizontal" ? (y = b.deltaY, k = !0) : (y = (b.shiftKey, b.deltaY), k = b.shiftKey);
      const T = y * 0.5;
      k ? n().scrollLeft += T : n().scrollTop += T, s && setTimeout(s, 0);
    },
    handleThumbMouseDown: async (b) => {
      b.preventDefault(), b.stopPropagation();
      const y = i().getBoundingClientRect(), k = o() === "horizontal" ? oe(b.clientX - y.left) : oe(b.clientY - y.top), T = e().thumbPosition + e().thumbSize / 2, P = k - T;
      t((C) => ({
        ...C,
        isDragging: !0,
        dragOffset: P
      })), l() && await c.createPhysicsObject(k, 0), document.body.style.userSelect = "none";
    },
    handleMouseMove: async (b) => {
      if (!e().isDragging || !i() || !n()) return;
      b.preventDefault();
      const y = i().getBoundingClientRect(), k = o() === "horizontal" ? oe(b.clientX - y.left) : oe(b.clientY - y.top);
      l() && await c.updatePhysicsObject(k, 0);
      const P = k - e().dragOffset - e().thumbSize / 2, C = e().showArrows ? 12 : 0, M = (o() === "horizontal" ? i().clientWidth : i().clientHeight) - C * 2, g = M - e().thumbSize, A = Math.max(
        C,
        Math.min(P, g + C)
      );
      t((W) => ({ ...W, thumbPosition: A }));
      const x = o() === "horizontal" ? i().clientWidth : i().clientHeight, $ = (o() === "horizontal" ? n().scrollWidth : n().scrollHeight) - x, j = A - C, B = M - e().thumbSize, G = Math.max(
        0,
        Math.min(1, j / B)
      ) * $;
      o() === "horizontal" ? n().scrollLeft = G : n().scrollTop = G;
    },
    handleMouseUp: () => {
      t((b) => ({
        ...b,
        isDragging: !1,
        dragOffset: 0
      })), document.body.style.userSelect = "";
    },
    handleTrackClick: (b) => {
      if (!i() || !n() || !a() || b.target === a()) return;
      const y = i().getBoundingClientRect(), k = o() === "horizontal" ? oe(b.clientX - y.left) : oe(b.clientY - y.top), T = e().showArrows ? 12 : 0, P = (o() === "horizontal" ? i().clientWidth : i().clientHeight) - T * 2, L = k - T - e().thumbSize / 2, M = P - e().thumbSize, g = Math.max(0, Math.min(L, M)) + T;
      t((H) => ({ ...H, thumbPosition: g }));
      const A = o() === "horizontal" ? i().clientWidth : i().clientHeight, U = (o() === "horizontal" ? n().scrollWidth : n().scrollHeight) - A, $ = g - T, B = Math.max(0, Math.min(1, $ / M)) * U;
      o() === "horizontal" ? n().scrollLeft = B : n().scrollTop = B;
    }
  };
}
function _t(e, t, o, r, n, i) {
  const a = () => {
    if (!r() || !n()) return;
    const s = o() === "horizontal" ? r().clientWidth : r().clientHeight, c = o() === "horizontal" ? n().scrollWidth : n().scrollHeight;
    if (!(c > s)) {
      t((k) => ({ ...k, isVisible: !1 }));
      return;
    }
    const m = o() === "horizontal" ? n().scrollLeft : n().scrollTop, v = c - s, S = o() === "horizontal" ? i()?.clientWidth ?? 0 : i()?.clientHeight ?? 0, w = e().showArrows ? 12 : 0, z = S - w * 2, b = Math.max(
      20,
      z * s / c
    ), y = e().isDragging ? e().thumbPosition : Math.max(
      w,
      Math.min(
        w + m / v * (z - b),
        z - b + w
      )
    );
    t((k) => ({
      ...k,
      isVisible: !0,
      thumbSize: b,
      thumbPosition: y,
      canScrollUp: m > 0,
      canScrollDown: m < v
    }));
  };
  return {
    updateScrollbar: a,
    handleScroll: () => {
      e().isDragging || a();
    }
  };
}
function Ct(e, t, o) {
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
function Et(e) {
  const t = Ye(), o = () => e.showArrows ?? !0, [r, n] = X({
    thumbSize: 20,
    thumbPosition: 0,
    isVisible: !1,
    isDragging: !1,
    dragOffset: 0,
    showArrows: o(),
    canScrollUp: !1,
    canScrollDown: !1
  });
  dt(() => {
    n((b) => ({ ...b, showArrows: o() }));
  });
  const [i, a] = X(!1), [l, s] = X(
    null
  ), c = () => e.direction ?? "vertical", d = () => e.theme ?? t.config.theme.name, m = () => e.autoHide ?? !0, v = () => e.minThumbSize ?? 4, S = () => e.engineIntegration !== void 0 ? e.engineIntegration && t.config.engine.enabled : t.config.engine.enabled, w = () => {
    a(!0);
    const b = l();
    b && (clearTimeout(b), s(null));
  }, z = () => {
    if (a(!1), m()) {
      const b = setTimeout(() => {
        n((y) => ({ ...y, isVisible: !1 }));
      }, 800);
      s(b);
    }
  };
  return Ae(() => {
    const b = l();
    b && clearTimeout(b);
  }), {
    state: r,
    setState: n,
    isHovered: i,
    setIsHovered: a,
    hideTimeout: l,
    setHideTimeout: s,
    direction: c,
    theme: d,
    autoHide: m,
    minThumbSize: v,
    engineIntegration: S,
    showArrows: o,
    handleMouseEnter: w,
    handleMouseLeave: z
  };
}
var At = /* @__PURE__ */ F('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z">'), It = /* @__PURE__ */ F('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z">'), Pt = /* @__PURE__ */ F('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">'), Mt = /* @__PURE__ */ F('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z">');
const $t = (e) => {
  const t = (o, r) => {
    o.stopPropagation(), e.onScrollBy(r);
  };
  return ee(() => ee(() => e.direction === "vertical")() ? [(() => {
    var o = At();
    return o.$$click = (r) => t(r, -50), _((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-up ${e.canScrollUp ? "" : "disabled"}`, i = !e.canScrollUp;
      return n !== r.e && R(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })(), (() => {
    var o = It();
    return o.$$click = (r) => t(r, 50), _((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-down ${e.canScrollDown ? "" : "disabled"}`, i = !e.canScrollDown;
      return n !== r.e && R(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })()] : [(() => {
    var o = Pt();
    return o.$$click = (r) => t(r, -50), _((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-left ${e.canScrollUp ? "" : "disabled"}`, i = !e.canScrollUp;
      return n !== r.e && R(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })(), (() => {
    var o = Mt();
    return o.$$click = (r) => t(r, 50), _((r) => {
      var n = `scrollbar-arrow scrollbar-arrow-right ${e.canScrollDown ? "" : "disabled"}`, i = !e.canScrollDown;
      return n !== r.e && R(o, r.e = n), i !== r.t && (o.disabled = r.t = i), r;
    }, {
      e: void 0,
      t: void 0
    }), o;
  })()]);
};
se(["click"]);
var Lt = /* @__PURE__ */ F("<div>");
const jt = (e) => (() => {
  var t = Lt();
  return t.$$mousedown = (o) => e.onMouseDown(o), _((o) => {
    var r = `scrollbar-thumb ${e.isDragging ? "dragging" : ""}`, n = e.direction === "horizontal" ? `${Math.max(1, e.thumbSize)}px` : "4px", i = e.direction === "horizontal" ? "4px" : `${Math.max(1, e.thumbSize)}px`, a = e.direction === "horizontal" ? `${e.thumbPosition}px` : "auto", l = e.direction === "horizontal" ? "50%" : `${e.thumbPosition}px`, s = e.direction === "horizontal" ? "auto" : "4px", c = e.direction === "horizontal" ? "translateY(-50%)" : "none";
    return r !== o.e && R(t, o.e = r), n !== o.t && V(t, "width", o.t = n), i !== o.a && V(t, "height", o.a = i), a !== o.o && V(t, "left", o.o = a), l !== o.i && V(t, "top", o.i = l), s !== o.n && V(t, "right", o.n = s), c !== o.s && V(t, "transform", o.s = c), o;
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
se(["mousedown"]);
var Ot = /* @__PURE__ */ F("<style>"), Dt = /* @__PURE__ */ F("<div><div class=scrollbar-content style=overflow-y:hidden;overflow-x:hidden>"), Ft = /* @__PURE__ */ F("<div>");
const Nt = (e) => {
  const [t, o] = X(), [r, n] = X(), [i, a] = X(), [l] = X(), {
    state: s,
    setState: c,
    isHovered: d,
    direction: m,
    autoHide: v,
    engineIntegration: S,
    handleMouseEnter: w,
    handleMouseLeave: z
  } = Et(e), {
    updateScrollbar: b,
    handleScroll: y
  } = _t(s, c, m, t, r, i), {
    scrollBy: k,
    handleWheel: T,
    handleThumbMouseDown: P,
    handleMouseMove: C,
    handleMouseUp: L,
    handleTrackClick: M
  } = Tt(s, c, m, t, r, i, l, S, b), {
    setupObservers: g
  } = Ct(t, r, b), A = () => s().isVisible && (d() || !v() || s().isDragging);
  return He(() => {
    const x = () => {
      b();
    };
    x(), setTimeout(x, 0), setTimeout(x, 50), setTimeout(x, 100), setTimeout(x, 200), setTimeout(x, 500), setTimeout(x, 1e3), setTimeout(x, 2e3), r() && r().addEventListener("scroll", y);
    const U = g();
    document.addEventListener("mousemove", C), document.addEventListener("mouseup", L), Ae(() => {
      U?.(), r() && r().removeEventListener("scroll", y), document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", L);
    });
  }), [(() => {
    var x = Ot();
    return D(x, vt), x;
  })(), (() => {
    var x = Dt(), U = x.firstChild;
    return we(x, "wheel", T), we(x, "mouseleave", z), x.addEventListener("mouseenter", () => {
      w(), b();
    }), xe(o, x), xe(n, U), D(U, () => e.children), D(x, (() => {
      var $ = ee(() => !!A());
      return () => $() && (() => {
        var j = Ft();
        return we(j, "click", M, !0), xe(a, j), D(j, (() => {
          var B = ee(() => !!s().showArrows);
          return () => B() && Z($t, {
            get direction() {
              return m();
            },
            get canScrollUp() {
              return s().canScrollUp;
            },
            get canScrollDown() {
              return s().canScrollDown;
            },
            onScrollBy: k
          });
        })(), null), D(j, Z(jt, {
          get direction() {
            return m();
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
          onMouseDown: P
        }), null), _(() => R(j, `scrollbar-track ${m() === "horizontal" ? "scrollbar-track-horizontal" : "scrollbar-track-vertical"} visible`)), j;
      })();
    })(), null), _(($) => {
      var j = `scrollbar-container ${e.class || ""}`, B = e.style;
      return j !== $.e && R(x, $.e = j), $.t = ht(x, B, $.t), $;
    }, {
      e: void 0,
      t: void 0
    }), x;
  })()];
}, Io = (e) => Z(yt, {
  get children() {
    return Z(Nt, e);
  }
});
se(["click"]);
var Bt = /* @__PURE__ */ F(`<div><button class=scrollbar-controls-toggle title="Scrollbar Settings"><svg width=14 height=14 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=3></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button><style>
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
      `), Gt = /* @__PURE__ */ F("<div class=scrollbar-controls-panel><h3 class=scrollbar-controls-title>Scrollbar Settings</h3><div class=control-group><label><input type=checkbox>Enable Engine</label></div><div class=control-group><label>Theme:</label><select><option value=default>Default</option><option value=minimal>Minimal</option><option value=modern>Modern</option></select></div><div class=control-group><label><input type=checkbox>Auto-detect Engine</label></div><div class=control-group><label><input type=checkbox>Keyboard Navigation");
const Po = (e) => {
  const t = Ye(), [o, r] = X(!1), n = () => {
    t.setEngineEnabled(!t.config.engine.enabled);
  }, i = (a) => {
    t.setTheme({
      name: a
    });
  };
  return (() => {
    var a = Bt(), l = a.firstChild, s = l.nextSibling;
    return l.$$click = () => r(!o()), D(a, (() => {
      var c = ee(() => !!o());
      return () => c() && (() => {
        var d = Gt(), m = d.firstChild, v = m.nextSibling, S = v.firstChild, w = S.firstChild, z = v.nextSibling, b = z.firstChild, y = b.nextSibling, k = z.nextSibling, T = k.firstChild, P = T.firstChild, C = k.nextSibling, L = C.firstChild, M = L.firstChild;
        return w.addEventListener("change", n), y.addEventListener("change", (g) => {
          const A = g.currentTarget.value;
          i(A);
        }), P.addEventListener("change", (g) => t.updateConfig({
          engine: {
            ...t.config.engine,
            autoDetect: g.currentTarget.checked
          }
        })), M.addEventListener("change", (g) => t.updateConfig({
          accessibility: {
            ...t.config.accessibility,
            keyboardNavigation: g.currentTarget.checked
          }
        })), _(() => w.checked = t.config.engine.enabled), _(() => y.value = t.config.theme.name), _(() => P.checked = t.config.engine.autoDetect), _(() => M.checked = t.config.accessibility.keyboardNavigation), d;
      })();
    })(), s), _(() => R(a, `scrollbar-controls ${e.class || ""}`)), a;
  })();
};
se(["click"]);
const Mo = {
  base: `
		display: inline-flex
		align-items: center
		gap: 4px
		height: 24px
		padding: 0 8px
		background: transparent
		color: white
		font-size: 12px
		line-height: 1
		vertical-align: middle
	`,
  text: `
		color: white
		font-size: 12px
		line-height: 1
	`,
  variants: {
    frontend: `
			color: white
		`,
    backend: `
			color: white
		`,
    engine: `
			color: white
		`
  },
  hover: `
		opacity: 0.8
	`,
  indicator: `
		width: 6px
		height: 6px
		border-radius: 50%
		flex-shrink: 0
	`,
  icon: `
		color: white
		font-size: 12px
		line-height: 1
		width: 12px
		height: 12px
		display: flex
		align-items: center
		justify-content: center
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
}, $o = `
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
var Rt = /* @__PURE__ */ F('<span role=status style="display:inline-flex;align-items:center;gap:4px;height:40px;padding:0 8px;background:transparent;color:white;font-size:14px;line-height:1;vertical-align:middle"><span class=material-symbols-rounded aria-hidden=true style=color:white;font-size:16px;line-height:1;width:16px;height:16px;display:flex;align-items:center;justify-content:center></span><span style=color:white;font-size:14px;line-height:1>');
const Lo = (e) => (() => {
  var t = Rt(), o = t.firstChild, r = o.nextSibling;
  return t.$$click = () => e.onClick?.(), D(o, () => e.icon), D(r, () => e.label), _((n) => {
    var i = e.class, a = e.onClick ? "pointer" : "default", l = e.status, s = e.variant, c = `${e.label} status: ${e.status}`;
    return i !== n.e && R(t, n.e = i), a !== n.t && V(t, "cursor", n.t = a), l !== n.a && ie(t, "data-status", n.a = l), s !== n.o && ie(t, "data-variant", n.o = s), c !== n.i && ie(t, "aria-label", n.i = c), n;
  }, {
    e: void 0,
    t: void 0,
    a: void 0,
    o: void 0,
    i: void 0
  }), t;
})();
se(["click"]);
class Ze {
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
const Ut = new Ze(), Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TauriEngine: Ze,
  tauriEngine: Ut
}, Symbol.toStringTag, { value: "Module" }));
function Xe(e) {
  var t, o, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (o = Xe(e[t])) && (r && (r += " "), r += o);
  } else for (o in e) e[o] && (r && (r += " "), r += o);
  return r;
}
function Ht() {
  for (var e, t, o = 0, r = "", n = arguments.length; o < n; o++) (e = arguments[o]) && (t = Xe(e)) && (r && (r += " "), r += t);
  return r;
}
const Pe = "-", Wt = (e) => {
  const t = Zt(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const l = a.split(Pe);
      return l[0] === "" && l.length !== 1 && l.shift(), qe(l, t) || Yt(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const s = o[a] || [];
      return l && r[a] ? [...s, ...r[a]] : s;
    }
  };
}, qe = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const o = e[0], r = t.nextPart.get(o), n = r ? qe(e.slice(1), r) : void 0;
  if (n)
    return n;
  if (t.validators.length === 0)
    return;
  const i = e.join(Pe);
  return t.validators.find(({
    validator: a
  }) => a(i))?.classGroupId;
}, Ge = /^\[(.+)\]$/, Yt = (e) => {
  if (Ge.test(e)) {
    const t = Ge.exec(e)[1], o = t?.substring(0, t.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, Zt = (e) => {
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
      const i = n === "" ? t : Re(t, n);
      i.classGroupId = o;
      return;
    }
    if (typeof n == "function") {
      if (Xt(n)) {
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
      _e(a, Re(t, i), o, r);
    });
  });
}, Re = (e, t) => {
  let o = e;
  return t.split(Pe).forEach((r) => {
    o.nextPart.has(r) || o.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(r);
  }), o;
}, Xt = (e) => e.isThemeGetter, qt = (e) => {
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
}, Ce = "!", Ee = ":", Jt = Ee.length, Kt = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: o
  } = e;
  let r = (n) => {
    const i = [];
    let a = 0, l = 0, s = 0, c;
    for (let w = 0; w < n.length; w++) {
      let z = n[w];
      if (a === 0 && l === 0) {
        if (z === Ee) {
          i.push(n.slice(s, w)), s = w + Jt;
          continue;
        }
        if (z === "/") {
          c = w;
          continue;
        }
      }
      z === "[" ? a++ : z === "]" ? a-- : z === "(" ? l++ : z === ")" && l--;
    }
    const d = i.length === 0 ? n : n.substring(s), m = Qt(d), v = m !== d, S = c && c > s ? c - s : void 0;
    return {
      modifiers: i,
      hasImportantModifier: v,
      baseClassName: m,
      maybePostfixModifierPosition: S
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
}, Qt = (e) => e.endsWith(Ce) ? e.substring(0, e.length - 1) : e.startsWith(Ce) ? e.substring(1) : e, eo = (e) => {
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
}, to = (e) => ({
  cache: qt(e.cacheSize),
  parseClassName: Kt(e),
  sortModifiers: eo(e),
  ...Wt(e)
}), oo = /\s+/, ro = (e, t) => {
  const {
    parseClassName: o,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: i
  } = t, a = [], l = e.trim().split(oo);
  let s = "";
  for (let c = l.length - 1; c >= 0; c -= 1) {
    const d = l[c], {
      isExternal: m,
      modifiers: v,
      hasImportantModifier: S,
      baseClassName: w,
      maybePostfixModifierPosition: z
    } = o(d);
    if (m) {
      s = d + (s.length > 0 ? " " + s : s);
      continue;
    }
    let b = !!z, y = r(b ? w.substring(0, z) : w);
    if (!y) {
      if (!b) {
        s = d + (s.length > 0 ? " " + s : s);
        continue;
      }
      if (y = r(w), !y) {
        s = d + (s.length > 0 ? " " + s : s);
        continue;
      }
      b = !1;
    }
    const k = i(v).join(":"), T = S ? k + Ce : k, P = T + y;
    if (a.includes(P))
      continue;
    a.push(P);
    const C = n(y, b);
    for (let L = 0; L < C.length; ++L) {
      const M = C[L];
      a.push(T + M);
    }
    s = d + (s.length > 0 ? " " + s : s);
  }
  return s;
};
function no() {
  let e = 0, t, o, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (o = Je(t)) && (r && (r += " "), r += o);
  return r;
}
const Je = (e) => {
  if (typeof e == "string")
    return e;
  let t, o = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Je(e[r])) && (o && (o += " "), o += t);
  return o;
};
function io(e, ...t) {
  let o, r, n, i = a;
  function a(s) {
    const c = t.reduce((d, m) => m(d), e());
    return o = to(c), r = o.cache.get, n = o.cache.set, i = l, l(s);
  }
  function l(s) {
    const c = r(s);
    if (c)
      return c;
    const d = ro(s, o);
    return n(s, d), d;
  }
  return function() {
    return i(no.apply(null, arguments));
  };
}
const E = (e) => {
  const t = (o) => o[e] || [];
  return t.isThemeGetter = !0, t;
}, Ke = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Qe = /^\((?:(\w[\w-]*):)?(.+)\)$/i, so = /^\d+\/\d+$/, ao = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, lo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, co = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, uo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ho = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ne = (e) => so.test(e), p = (e) => !!e && !Number.isNaN(Number(e)), q = (e) => !!e && Number.isInteger(Number(e)), ze = (e) => e.endsWith("%") && p(e.slice(0, -1)), Y = (e) => ao.test(e), go = () => !0, bo = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lo.test(e) && !co.test(e)
), et = () => !1, fo = (e) => uo.test(e), mo = (e) => ho.test(e), po = (e) => !u(e) && !h(e), yo = (e) => ae(e, rt, et), u = (e) => Ke.test(e), K = (e) => ae(e, nt, bo), Se = (e) => ae(e, zo, p), Ue = (e) => ae(e, tt, et), vo = (e) => ae(e, ot, mo), fe = (e) => ae(e, it, fo), h = (e) => Qe.test(e), ce = (e) => le(e, nt), wo = (e) => le(e, So), Ve = (e) => le(e, tt), xo = (e) => le(e, rt), ko = (e) => le(e, ot), me = (e) => le(e, it, !0), ae = (e, t, o) => {
  const r = Ke.exec(e);
  return r ? r[1] ? t(r[1]) : o(r[2]) : !1;
}, le = (e, t, o = !1) => {
  const r = Qe.exec(e);
  return r ? r[1] ? t(r[1]) : o : !1;
}, tt = (e) => e === "position" || e === "percentage", ot = (e) => e === "image" || e === "url", rt = (e) => e === "length" || e === "size" || e === "bg-size", nt = (e) => e === "length", zo = (e) => e === "number", So = (e) => e === "family-name", it = (e) => e === "shadow", To = () => {
  const e = E("color"), t = E("font"), o = E("text"), r = E("font-weight"), n = E("tracking"), i = E("leading"), a = E("breakpoint"), l = E("container"), s = E("spacing"), c = E("radius"), d = E("shadow"), m = E("inset-shadow"), v = E("text-shadow"), S = E("drop-shadow"), w = E("blur"), z = E("perspective"), b = E("aspect"), y = E("ease"), k = E("animate"), T = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], P = () => [
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
  ], C = () => [...P(), h, u], L = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], g = () => [h, u, s], A = () => [ne, "full", "auto", ...g()], x = () => [q, "none", "subgrid", h, u], U = () => ["auto", {
    span: ["full", q, h, u]
  }, q, h, u], $ = () => [q, "auto", h, u], j = () => ["auto", "min", "max", "fr", h, u], B = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], G = () => ["auto", ...g()], W = () => [ne, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...g()], f = () => [e, h, u], Me = () => [...P(), Ve, Ue, {
    position: [h, u]
  }], $e = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Le = () => ["auto", "cover", "contain", xo, yo, {
    size: [h, u]
  }], ye = () => [ze, ce, K], O = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    h,
    u
  ], N = () => ["", p, ce, K], de = () => ["solid", "dashed", "dotted", "double"], je = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], I = () => [p, ze, Ve, Ue], Oe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    h,
    u
  ], ue = () => ["none", p, h, u], he = () => ["none", p, h, u], ve = () => [p, h, u], ge = () => [ne, "full", ...g()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Y],
      breakpoint: [Y],
      color: [go],
      container: [Y],
      "drop-shadow": [Y],
      ease: ["in", "out", "in-out"],
      font: [po],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Y],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Y],
      shadow: [Y],
      spacing: ["px", p],
      text: [Y],
      "text-shadow": [Y],
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
        aspect: ["auto", "square", ne, u, h, b]
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
        columns: [p, u, h, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": T()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": T()
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
        inset: A()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": A()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": A()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: A()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: A()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: A()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: A()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: A()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: A()
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
        z: [q, "auto", h, u]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ne, "full", "auto", l, ...g()]
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
        flex: [p, ne, "auto", "initial", "none", u]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", p, h, u]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", p, h, u]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [q, "first", "last", "none", h, u]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": x()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: U()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": $()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": $()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": x()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: U()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": $()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": $()
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
        "auto-cols": j()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": j()
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
        justify: [...B(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...H(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...H()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...B()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": B()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...H(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...H()]
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
        size: W()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...W()]
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
          ...W()
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
          ...W()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...W()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...W()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...W()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", o, ce, K]
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
        font: [r, h, Se]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ze, u]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [wo, u, t]
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
        tracking: [n, h, u]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [p, "none", h, Se]
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
        "list-image": ["none", h, u]
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
        list: ["disc", "decimal", "none", h, u]
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
        placeholder: f()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: f()
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
        decoration: [p, "from-font", "auto", h, K]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: f()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [p, "auto", h, u]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", h, u]
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
        content: ["none", h, u]
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
        bg: Me()
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
          }, q, h, u],
          radial: ["", h, u],
          conic: [q, h, u]
        }, ko, vo]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: f()
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
        from: f()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: f()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: f()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: O()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": O()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": O()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": O()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": O()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": O()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": O()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": O()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": O()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": O()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": O()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": O()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": O()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": O()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": O()
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
        border: f()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": f()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": f()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": f()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": f()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": f()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": f()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": f()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": f()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: f()
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
        "outline-offset": [p, h, u]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", p, ce, K]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: f()
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
          d,
          me,
          fe
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: f()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", m, me, fe]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": f()
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
        ring: f()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [p, K]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": f()
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
        "inset-ring": f()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", v, me, fe]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": f()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [p, h, u]
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
        "mask-linear": [p]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": I()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": f()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": f()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": I()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": f()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": f()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": I()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": f()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": f()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": I()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": f()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": f()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": I()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": f()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": f()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": I()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": f()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": f()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": I()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": f()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": f()
      }],
      "mask-image-radial": [{
        "mask-radial": [h, u]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": I()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": I()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": f()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": f()
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
        "mask-conic": [p]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": I()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": I()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": f()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": f()
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
        mask: Me()
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
        mask: ["none", h, u]
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
          h,
          u
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
        brightness: [p, h, u]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [p, h, u]
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
          S,
          me,
          fe
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": f()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", p, h, u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [p, h, u]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", p, h, u]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [p, h, u]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", p, h, u]
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
          h,
          u
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
        "backdrop-brightness": [p, h, u]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [p, h, u]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", p, h, u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [p, h, u]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", p, h, u]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [p, h, u]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [p, h, u]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", p, h, u]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", h, u]
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
        duration: [p, "initial", h, u]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", y, h, u]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [p, h, u]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", k, h, u]
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
        perspective: [z, h, u]
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
        transform: [h, u, "", "none", "gpu", "cpu"]
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
        accent: f()
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
        caret: f()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", h, u]
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
        "will-change": ["auto", "scroll", "contents", "transform", h, u]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...f()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [p, ce, K, Se]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...f()]
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
}, _o = /* @__PURE__ */ io(To);
function jo(...e) {
  return _o(Ht(e));
}
export {
  Eo as Button,
  kt as EngineManager,
  xt as MockEngine,
  Io as Scrollbar,
  $t as ScrollbarArrows,
  Po as ScrollbarControls,
  yt as ScrollbarProvider,
  jt as ScrollbarThumb,
  Ze as TauriEngine,
  Lo as TechChip,
  $o as animations,
  Ao as buttonStyles,
  jo as cn,
  re as getCurrentEngine,
  zt as getEngineManager,
  Be as mockEngine,
  Q as scrollbarConfig,
  vt as scrollbarStyles,
  Ut as tauriEngine,
  Mo as techChipStyles,
  Ye as useScrollbarConfig,
  Tt as useScrollbarHandlers,
  _t as useScrollbarLogic,
  Ct as useScrollbarObservers,
  Et as useScrollbarState
};
//# sourceMappingURL=index.js.map
