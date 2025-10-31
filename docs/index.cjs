"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const g=require("solid-js"),K=e=>g.createMemo(()=>e());function ht(e,t,o){let r=o.length,n=t.length,i=r,a=0,l=0,s=t[n-1].nextSibling,c=null;for(;a<n||l<i;){if(t[a]===o[l]){a++,l++;continue}for(;t[n-1]===o[i-1];)n--,i--;if(n===a){const d=i<r?l?o[l-1].nextSibling:o[i-l]:s;for(;l<i;)e.insertBefore(o[l++],d)}else if(i===l)for(;a<n;)(!c||!c.has(t[a]))&&t[a].remove(),a++;else if(t[a]===o[i-1]&&o[l]===t[n-1]){const d=t[--n].nextSibling;e.insertBefore(o[l++],t[a++].nextSibling),e.insertBefore(o[--i],d),t[n]=o[i]}else{if(!c){c=new Map;let p=l;for(;p<i;)c.set(o[p],p++)}const d=c.get(t[a]);if(d!=null)if(l<d&&d<i){let p=a,w=1,C;for(;++p<n&&p<i&&!((C=c.get(t[p]))==null||C!==d+w);)w++;if(w>d-l){const x=t[a];for(;l<d;)e.insertBefore(o[l++],x)}else e.replaceChild(o[l++],t[a++])}else a++;else t[a++].remove()}}}const je="_$DX_DELEGATE";function D(e,t,o,r){let n;const i=()=>{const l=document.createElement("template");return l.innerHTML=e,l.content.firstChild},a=()=>(n||(n=i())).cloneNode(!0);return a.cloneNode=a,a}function re(e,t=window.document){const o=t[je]||(t[je]=new Set);for(let r=0,n=e.length;r<n;r++){const i=e[r];o.has(i)||(o.add(i),t.addEventListener(i,ft))}}function oe(e,t,o){Ee(e)||(o==null?e.removeAttribute(t):e.setAttribute(t,o))}function G(e,t){Ee(e)||(t==null?e.removeAttribute("class"):e.className=t)}function me(e,t,o,r){if(r)Array.isArray(o)?(e[`$$${t}`]=o[0],e[`$$${t}Data`]=o[1]):e[`$$${t}`]=o;else if(Array.isArray(o)){const n=o[0];e.addEventListener(t,o[0]=i=>n.call(e,o[1],i))}else e.addEventListener(t,o,typeof o!="function"&&o)}function gt(e,t,o){if(!t)return o?oe(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof o=="string"&&(r.cssText=o=void 0),o||(o={}),t||(t={});let n,i;for(i in o)t[i]==null&&r.removeProperty(i),delete o[i];for(i in t)n=t[i],n!==o[i]&&(r.setProperty(i,n),o[i]=n);return o}function V(e,t,o){o!=null?e.style.setProperty(t,o):e.style.removeProperty(t)}function pe(e,t,o){return g.untrack(()=>e(t,o))}function R(e,t,o,r){if(o!==void 0&&!r&&(r=[]),typeof t!="function")return ge(e,t,r,o);g.createRenderEffect(n=>ge(e,t(),n,o),r)}function Ee(e){return!!g.sharedConfig.context&&!g.sharedConfig.done&&(!e||e.isConnected)}function ft(e){if(g.sharedConfig.registry&&g.sharedConfig.events&&g.sharedConfig.events.find(([s,c])=>c===e))return;let t=e.target;const o=`$$${e.type}`,r=e.target,n=e.currentTarget,i=s=>Object.defineProperty(e,"target",{configurable:!0,value:s}),a=()=>{const s=t[o];if(s&&!t.disabled){const c=t[`${o}Data`];if(c!==void 0?s.call(t,c,e):s.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&i(t.host),!0},l=()=>{for(;a()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),g.sharedConfig.registry&&!g.sharedConfig.done&&(g.sharedConfig.done=_$HY.done=!0),e.composedPath){const s=e.composedPath();i(s[0]);for(let c=0;c<s.length-2&&(t=s[c],!!a());c++){if(t._$host){t=t._$host,l();break}if(t.parentNode===n)break}}else l();i(r)}function ge(e,t,o,r,n){const i=Ee(e);if(i){!o&&(o=[...e.childNodes]);let s=[];for(let c=0;c<o.length;c++){const d=o[c];d.nodeType===8&&d.data.slice(0,2)==="!$"?d.remove():s.push(d)}o=s}for(;typeof o=="function";)o=o();if(t===o)return o;const a=typeof t,l=r!==void 0;if(e=l&&o[0]&&o[0].parentNode||e,a==="string"||a==="number"){if(i||a==="number"&&(t=t.toString(),t===o))return o;if(l){let s=o[0];s&&s.nodeType===3?s.data!==t&&(s.data=t):s=document.createTextNode(t),o=Q(e,o,r,s)}else o!==""&&typeof o=="string"?o=e.firstChild.data=t:o=e.textContent=t}else if(t==null||a==="boolean"){if(i)return o;o=Q(e,o,r)}else{if(a==="function")return g.createRenderEffect(()=>{let s=t();for(;typeof s=="function";)s=s();o=ge(e,s,o,r)}),()=>o;if(Array.isArray(t)){const s=[],c=o&&Array.isArray(o);if(xe(s,t,o,n))return g.createRenderEffect(()=>o=ge(e,s,o,r,!0)),()=>o;if(i){if(!s.length)return o;if(r===void 0)return o=[...e.childNodes];let d=s[0];if(d.parentNode!==e)return o;const p=[d];for(;(d=d.nextSibling)!==r;)p.push(d);return o=p}if(s.length===0){if(o=Q(e,o,r),l)return o}else c?o.length===0?Oe(e,s,r):ht(e,o,s):(o&&Q(e),Oe(e,s));o=s}else if(t.nodeType){if(i&&t.parentNode)return o=l?[t]:t;if(Array.isArray(o)){if(l)return o=Q(e,o,r,t);Q(e,o,null,t)}else o==null||o===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);o=t}}return o}function xe(e,t,o,r){let n=!1;for(let i=0,a=t.length;i<a;i++){let l=t[i],s=o&&o[e.length],c;if(!(l==null||l===!0||l===!1))if((c=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))n=xe(e,l,s)||n;else if(c==="function")if(r){for(;typeof l=="function";)l=l();n=xe(e,Array.isArray(l)?l:[l],Array.isArray(s)?s:[s])||n}else e.push(l),n=!0;else{const d=String(l);s&&s.nodeType===3&&s.data===d?e.push(s):e.push(document.createTextNode(d))}}return n}function Oe(e,t,o=null){for(let r=0,n=t.length;r<n;r++)e.insertBefore(t[r],o)}function Q(e,t,o,r){if(o===void 0)return e.textContent="";const n=r||document.createTextNode("");if(t.length){let i=!1;for(let a=t.length-1;a>=0;a--){const l=t[a];if(n!==l){const s=l.parentNode===e;!i&&!a?s?e.replaceChild(n,l):e.insertBefore(n,o):s&&l.remove()}else i=!0}}else e.insertBefore(n,o);return[n]}var bt=D('<span class=material-symbols-rounded style="animation:spin 1s linear infinite">refresh'),Re=D("<span aria-hidden=true>"),mt=D("<button>");const pt=e=>{const t=()=>{let s="control-btn";return e.variant==="play-pause"?s="play-pause-btn":e.variant==="small"?s="control-btn small-btn":e.variant==="close"?s="control-btn close-btn":e.variant==="minimize"?s="control-btn minimize-btn":e.variant==="maximize"?s="control-btn maximize-btn":e.variant==="pin"?s="control-btn pin-btn":e.variant==="expand"?s="control-btn expand-btn":e.variant==="copy"?s="control-btn copy-btn":e.variant==="attach"&&(s="control-btn attach-btn"),e.active&&(s+=" active"),e.pinned&&(s+=" pinned"),e.maximized&&(s+=" maximized"),`${s} ${e.class||""}`},o=()=>e.variant==="small"?"12px":e.variant==="play-pause"?"20px":e.variant==="expand"||e.variant==="copy"||e.variant==="attach"?"16px":"14px",r=()=>e.variant==="pin"&&!e.icon?"push_pin":e.variant==="expand"&&!e.icon?"open_in_full":e.variant==="copy"&&!e.icon?"content_copy":e.variant==="attach"&&!e.icon?"attach_file":e.icon,n=()=>{if(e.iconPosition==="only")return!0;const c=r()||e.icon,d=e.variant==="pin"||e.variant==="expand"||e.variant==="copy"||e.variant==="attach"||e.variant==="close"||e.variant==="minimize"||e.variant==="maximize"||e.variant==="play-pause";return c&&!e.children||d&&!e.children},i=()=>(r()||e.icon)&&e.iconPosition!=="only",a=()=>i()&&(e.iconPosition==="left"||!e.iconPosition),l=()=>i()&&e.iconPosition==="right";return(()=>{var s=mt();return s.$$click=()=>e.onClick?.(),R(s,g.createComponent(g.Show,{get when(){return e.loading},get children(){var c=bt();return g.createRenderEffect(d=>V(c,"font-size",o())),c}}),null),R(s,g.createComponent(g.Show,{get when(){return K(()=>!e.loading)()&&(a()||n())},get children(){var c=Re();return R(c,r),g.createRenderEffect(d=>{var p=`material-symbols-rounded ${e.iconFilled?"filled":""}`,w=o();return p!==d.e&&G(c,d.e=p),w!==d.t&&V(c,"font-size",d.t=w),d},{e:void 0,t:void 0}),c}}),null),R(s,g.createComponent(g.Show,{get when(){return!n()},get children(){return e.children}}),null),R(s,g.createComponent(g.Show,{get when(){return K(()=>!e.loading)()&&l()},get children(){var c=Re();return R(c,r),g.createRenderEffect(d=>{var p=`material-symbols-rounded ${e.iconFilled?"filled":""}`,w=o();return p!==d.e&&G(c,d.e=p),w!==d.t&&V(c,"font-size",d.t=w),d},{e:void 0,t:void 0}),c}}),null),g.createRenderEffect(c=>{var d=e.type||"button",p=t(),w=e.disabled||e.loading,C=e.title;return d!==c.e&&oe(s,"type",c.e=d),p!==c.t&&G(s,c.t=p),w!==c.a&&(s.disabled=c.a=w),C!==c.o&&oe(s,"title",c.o=C),c},{e:void 0,t:void 0,a:void 0,o:void 0}),s})()};re(["click"]);const yt={control:`
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
  `,playPause:`
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
  `,small:`
    width: var(--small-btn-size);
    height: var(--small-btn-size);
    padding: 0;
    margin: 0 2px;
    align-self: center;
    pointer-events: auto;
  `,hover:`
    background: transparent;
    color: #3b82f6;
    box-shadow: none;
  `,active:`
    color: #3b82f6;
  `,closeHover:`
    background: transparent;
    color: #e81123;
  `,closeActive:`
    background: #c50e1f;
  `,disabled:`
    opacity: 0.3;
    cursor: not-allowed;
  `,iconSizes:{small:"12px",normal:"14px",large:"20px"}},vt={engine:{enabled:!0,autoDetect:!0,fallbackToJS:!0},theme:{name:"default"},performance:{useRequestAnimationFrame:!0,debounceMs:16,throttleMs:8},accessibility:{keyboardNavigation:!0,screenReaderSupport:!0,highContrast:!1}};class wt{config=vt;listeners=new Set;getConfig(){return{...this.config}}updateConfig(t){this.config={...this.config,...t},this.notifyListeners()}setEngineEnabled(t){this.updateConfig({engine:{...this.config.engine,enabled:t}})}setTheme(t){this.updateConfig({theme:t})}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notifyListeners(){this.listeners.forEach(t=>t(this.config))}async detectEngineAvailability(){return!1}async initialize(){if(this.config.engine.autoDetect){const t=await this.detectEngineAvailability();this.setEngineEnabled(t)}}}const q=new wt;q.initialize();const Ge=g.createContext(),Ue=e=>{const[t,o]=g.createSignal(q.getConfig());g.onMount(()=>{const n=q.subscribe(o);e.config&&q.updateConfig(e.config),g.onCleanup(n)});const r={get config(){return t()},setEngineEnabled:n=>{q.setEngineEnabled(n)},setTheme:n=>{q.setTheme(n)},updateConfig:n=>{q.updateConfig(n)}};return g.createComponent(Ge.Provider,{value:r,get children(){return e.children}})},Te=()=>{const e=g.useContext(Ge);if(!e)throw new Error("useScrollbarConfig must be used within ScrollbarProvider");return e},Ve=`
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
`;function xt(){return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--zoom-level")||"1")}function ee(e){return e/xt()}class He{physicsObjectId=null;velocity=0;acceleration=0;zoomLevel=1;isInitialized=!1;async createPhysicsObject(){const t=Math.random()*1e3;return this.physicsObjectId=t,t}async updatePhysicsObject(t){this.physicsObjectId===t&&(this.velocity=Math.random()*.1)}async destroyPhysicsObject(t){this.physicsObjectId===t&&(this.physicsObjectId=null)}async updateZoomLevel(t){this.zoomLevel=t}async screenToWorld(t,o){return{x:t,y:o}}async worldToScreen(t,o){return{x:t,y:o}}async getEngineState(){return{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration,zoomLevel:this.zoomLevel,isInitialized:this.isInitialized}}async isAvailable(){return this.isInitialized=!0,!0}}const ke=new He;class We{currentEngine=null;config;isInitialized=!1;constructor(t){this.config=t}async initialize(){if(!this.isInitialized)try{this.config.enabled&&this.config.autoDetect&&await this.detectTauriEngine()&&(this.currentEngine=await this.loadTauriEngine()),this.currentEngine||(this.currentEngine=ke),this.isInitialized=!0}catch(t){console.warn("Failed to initialize engine, falling back to mock:",t),this.currentEngine=ke,this.isInitialized=!0}}async getEngine(){return this.isInitialized||await this.initialize(),this.currentEngine}async detectTauriEngine(){if(typeof window>"u"||!window.__TAURI__||typeof window.__TAURI__.invoke!="function")return!1;try{return await(await this.loadTauriEngine()).isAvailable()}catch{return!1}}async loadTauriEngine(){try{const{tauriEngine:t}=await Promise.resolve().then(()=>Nt);if(this.config.physicsEnabled)try{const o=t;o.initPhysicsEngine&&(await o.initPhysicsEngine(),console.log("Physics engine DLL initialized successfully"))}catch(o){console.warn("Failed to initialize physics engine DLL:",o)}return t}catch(t){throw console.warn("Failed to load Tauri engine:",t),t}}updateConfig(t){this.config={...this.config,...t},this.isInitialized=!1}getConfig(){return{...this.config}}}let ye=null;function Ye(e){return ye||(ye=new We(e||{enabled:!0,autoDetect:!0,fallbackToJS:!0,physicsEnabled:!0,zoomEnabled:!0})),ye}async function J(){return await Ye().getEngine()}class kt{physicsObjectId=null;velocity=0;acceleration=0;async createPhysicsObject(t,o){try{const n=await(await J()).createPhysicsObject(t,o);return this.physicsObjectId=n,n}catch(r){console.warn("Failed to create physics object, using fallback:",r);const n=Math.random()*1e3;return this.physicsObjectId=n,n}}async updatePhysicsObject(t,o){if(this.physicsObjectId)try{await(await J()).updatePhysicsObject(this.physicsObjectId,t,o)}catch(r){console.warn("Failed to update physics object:",r)}}async updateZoomLevel(t){try{await(await J()).updateZoomLevel(t)}catch(o){console.warn("Failed to update zoom level:",o)}}async getEngineState(){try{const o=await(await J()).getEngineState();return{physicsObjectId:o.physicsObjectId,velocity:o.velocity,acceleration:o.acceleration}}catch(t){return console.warn("Failed to get engine state, using local state:",t),{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration}}}setVelocity(t){this.velocity=t}setAcceleration(t){this.acceleration=t}async calculateScrollbarPhysics(t,o,r,n){try{const a=await J();return a.calculateScrollbarPhysics?await a.calculateScrollbarPhysics(t,o,r,n):this.simplePhysicsCalculation(t,o,r,n)}catch(i){return console.warn("Failed to calculate scrollbar physics, using fallback:",i),this.simplePhysicsCalculation(t,o,r,n)}}simplePhysicsCalculation(t,o,r,n){const i={...o},a=-t.stiffness*(i.position-r),l=-t.damping*i.velocity,s=a+l;return i.acceleration=s/t.mass,i.velocity+=i.acceleration*n,i.velocity=Math.max(-t.max_velocity,Math.min(t.max_velocity,i.velocity)),i.position+=i.velocity*n,i}async getPhysicsEngineInfo(){try{const o=await J();return o.getPhysicsEngineInfo?await o.getPhysicsEngineInfo():"Mock Physics Engine - No DLL available"}catch(t){return console.warn("Failed to get physics engine info:",t),"Mock Physics Engine - Error occurred"}}}function Ze(e,t,o,r,n,i,a,l,s){const c=new kt;return{scrollBy:b=>{if(!n())return;const v=b*3;o()==="horizontal"?n().scrollLeft+=v:n().scrollTop+=v},handleWheel:b=>{if(!n())return;b.preventDefault();let v,z;o()==="horizontal"?(v=b.deltaY,z=!0):(v=(b.shiftKey,b.deltaY),z=b.shiftKey);const E=v*.5;z?n().scrollLeft+=E:n().scrollTop+=E,s&&setTimeout(s,0)},handleThumbMouseDown:async b=>{b.preventDefault(),b.stopPropagation();const v=i().getBoundingClientRect(),z=o()==="horizontal"?ee(b.clientX-v.left):ee(b.clientY-v.top),E=e().thumbPosition+e().thumbSize/2,I=z-E;t(T=>({...T,isDragging:!0,dragOffset:I})),l()&&await c.createPhysicsObject(z,0),document.body.style.userSelect="none"},handleMouseMove:async b=>{if(!e().isDragging||!i()||!n())return;b.preventDefault();const v=i().getBoundingClientRect(),z=o()==="horizontal"?ee(b.clientX-v.left):ee(b.clientY-v.top);l()&&await c.updatePhysicsObject(z,0);const I=z-e().dragOffset-e().thumbSize/2,T=e().showArrows?12:0,M=(o()==="horizontal"?i().clientWidth:i().clientHeight)-T*2,f=M-e().thumbSize,A=Math.max(T,Math.min(I,f+T));t(W=>({...W,thumbPosition:A}));const k=o()==="horizontal"?i().clientWidth:i().clientHeight,$=(o()==="horizontal"?n().scrollWidth:n().scrollHeight)-k,j=A-T,N=M-e().thumbSize,B=Math.max(0,Math.min(1,j/N))*$;o()==="horizontal"?n().scrollLeft=B:n().scrollTop=B},handleMouseUp:()=>{t(b=>({...b,isDragging:!1,dragOffset:0})),document.body.style.userSelect=""},handleTrackClick:b=>{if(!i()||!n()||!a()||b.target===a())return;const v=i().getBoundingClientRect(),z=o()==="horizontal"?ee(b.clientX-v.left):ee(b.clientY-v.top),E=e().showArrows?12:0,I=(o()==="horizontal"?i().clientWidth:i().clientHeight)-E*2,L=z-E-e().thumbSize/2,M=I-e().thumbSize,f=Math.max(0,Math.min(L,M))+E;t(H=>({...H,thumbPosition:f}));const A=o()==="horizontal"?i().clientWidth:i().clientHeight,U=(o()==="horizontal"?n().scrollWidth:n().scrollHeight)-A,$=f-E,N=Math.max(0,Math.min(1,$/M))*U;o()==="horizontal"?n().scrollLeft=N:n().scrollTop=N}}}function qe(e,t,o,r,n,i){const a=()=>{if(!r()||!n())return;const s=o()==="horizontal"?r().clientWidth:r().clientHeight,c=o()==="horizontal"?n().scrollWidth:n().scrollHeight;if(!(c>s)){t(z=>({...z,isVisible:!1}));return}const p=o()==="horizontal"?n().scrollLeft:n().scrollTop,w=c-s,C=o()==="horizontal"?i()?.clientWidth??0:i()?.clientHeight??0,x=e().showArrows?12:0,S=C-x*2,b=Math.max(20,S*s/c),v=e().isDragging?e().thumbPosition:Math.max(x,Math.min(x+p/w*(S-b),S-b+x));t(z=>({...z,isVisible:!0,thumbSize:b,thumbPosition:v,canScrollUp:p>0,canScrollDown:p<w}))};return{updateScrollbar:a,handleScroll:()=>{e().isDragging||a()}}}function Xe(e,t,o){return{setupObservers:()=>{if(!e()||!t())return;const n=new ResizeObserver(()=>{o()});n.observe(t()),n.observe(e());const i=new MutationObserver(()=>{o(),setTimeout(o,10)});return i.observe(t(),{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style","class"]}),()=>{n.disconnect(),i.disconnect()}}}}function Je(e){const t=Te(),o=()=>e.showArrows??!0,[r,n]=g.createSignal({thumbSize:20,thumbPosition:0,isVisible:!1,isDragging:!1,dragOffset:0,showArrows:o(),canScrollUp:!1,canScrollDown:!1});g.createEffect(()=>{n(b=>({...b,showArrows:o()}))});const[i,a]=g.createSignal(!1),[l,s]=g.createSignal(null),c=()=>e.direction??"vertical",d=()=>e.theme??t.config.theme.name,p=()=>e.autoHide??!0,w=()=>e.minThumbSize??4,C=()=>e.engineIntegration!==void 0?e.engineIntegration&&t.config.engine.enabled:t.config.engine.enabled,x=()=>{a(!0);const b=l();b&&(clearTimeout(b),s(null))},S=()=>{if(a(!1),p()){const b=setTimeout(()=>{n(v=>({...v,isVisible:!1}))},800);s(b)}};return g.onCleanup(()=>{const b=l();b&&clearTimeout(b)}),{state:r,setState:n,isHovered:i,setIsHovered:a,hideTimeout:l,setHideTimeout:s,direction:c,theme:d,autoHide:p,minThumbSize:w,engineIntegration:C,showArrows:o,handleMouseEnter:x,handleMouseLeave:S}}var zt=D('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z">'),St=D('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z">'),Ct=D('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">'),Et=D('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z">');const Ke=e=>{const t=(o,r)=>{o.stopPropagation(),e.onScrollBy(r)};return K(()=>K(()=>e.direction==="vertical")()?[(()=>{var o=zt();return o.$$click=r=>t(r,-50),g.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-up ${e.canScrollUp?"":"disabled"}`,i=!e.canScrollUp;return n!==r.e&&G(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})(),(()=>{var o=St();return o.$$click=r=>t(r,50),g.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-down ${e.canScrollDown?"":"disabled"}`,i=!e.canScrollDown;return n!==r.e&&G(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})()]:[(()=>{var o=Ct();return o.$$click=r=>t(r,-50),g.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-left ${e.canScrollUp?"":"disabled"}`,i=!e.canScrollUp;return n!==r.e&&G(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})(),(()=>{var o=Et();return o.$$click=r=>t(r,50),g.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-right ${e.canScrollDown?"":"disabled"}`,i=!e.canScrollDown;return n!==r.e&&G(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})()])};re(["click"]);var Tt=D("<div>");const Qe=e=>(()=>{var t=Tt();return t.$$mousedown=o=>e.onMouseDown(o),g.createRenderEffect(o=>{var r=`scrollbar-thumb ${e.isDragging?"dragging":""}`,n=e.direction==="horizontal"?`${Math.max(1,e.thumbSize)}px`:"4px",i=e.direction==="horizontal"?"4px":`${Math.max(1,e.thumbSize)}px`,a=e.direction==="horizontal"?`${e.thumbPosition}px`:"auto",l=e.direction==="horizontal"?"50%":`${e.thumbPosition}px`,s=e.direction==="horizontal"?"auto":"4px",c=e.direction==="horizontal"?"translateY(-50%)":"none";return r!==o.e&&G(t,o.e=r),n!==o.t&&V(t,"width",o.t=n),i!==o.a&&V(t,"height",o.a=i),a!==o.o&&V(t,"left",o.o=a),l!==o.i&&V(t,"top",o.i=l),s!==o.n&&V(t,"right",o.n=s),c!==o.s&&V(t,"transform",o.s=c),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),t})();re(["mousedown"]);var _t=D("<style>"),At=D("<div><div class=scrollbar-content style=overflow-y:hidden;overflow-x:hidden>"),Pt=D("<div>");const It=e=>{const[t,o]=g.createSignal(),[r,n]=g.createSignal(),[i,a]=g.createSignal(),[l]=g.createSignal(),{state:s,setState:c,isHovered:d,direction:p,autoHide:w,engineIntegration:C,handleMouseEnter:x,handleMouseLeave:S}=Je(e),{updateScrollbar:b,handleScroll:v}=qe(s,c,p,t,r,i),{scrollBy:z,handleWheel:E,handleThumbMouseDown:I,handleMouseMove:T,handleMouseUp:L,handleTrackClick:M}=Ze(s,c,p,t,r,i,l,C,b),{setupObservers:f}=Xe(t,r,b),A=()=>s().isVisible&&(d()||!w()||s().isDragging);return g.onMount(()=>{const k=()=>{b()};k(),setTimeout(k,0),setTimeout(k,50),setTimeout(k,100),setTimeout(k,200),setTimeout(k,500),setTimeout(k,1e3),setTimeout(k,2e3),r()&&r().addEventListener("scroll",v);const U=f();document.addEventListener("mousemove",T),document.addEventListener("mouseup",L),g.onCleanup(()=>{U?.(),r()&&r().removeEventListener("scroll",v),document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",L)})}),[(()=>{var k=_t();return R(k,Ve),k})(),(()=>{var k=At(),U=k.firstChild;return me(k,"wheel",E),me(k,"mouseleave",S),k.addEventListener("mouseenter",()=>{x(),b()}),pe(o,k),pe(n,U),R(U,()=>e.children),R(k,(()=>{var $=K(()=>!!A());return()=>$()&&(()=>{var j=Pt();return me(j,"click",M,!0),pe(a,j),R(j,(()=>{var N=K(()=>!!s().showArrows);return()=>N()&&g.createComponent(Ke,{get direction(){return p()},get canScrollUp(){return s().canScrollUp},get canScrollDown(){return s().canScrollDown},onScrollBy:z})})(),null),R(j,g.createComponent(Qe,{get direction(){return p()},get thumbSize(){return s().thumbSize},get thumbPosition(){return s().thumbPosition},get isDragging(){return s().isDragging},onMouseDown:I}),null),g.createRenderEffect(()=>G(j,`scrollbar-track ${p()==="horizontal"?"scrollbar-track-horizontal":"scrollbar-track-vertical"} visible`)),j})()})(),null),g.createRenderEffect($=>{var j=`scrollbar-container ${e.class||""}`,N=e.style;return j!==$.e&&G(k,$.e=j),$.t=gt(k,N,$.t),$},{e:void 0,t:void 0}),k})()]},Mt=e=>g.createComponent(Ue,{get children(){return g.createComponent(It,e)}});re(["click"]);var $t=D(`<div><button class=scrollbar-controls-toggle title="Scrollbar Settings"><svg width=14 height=14 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=3></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button><style>
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
      `),Lt=D("<div class=scrollbar-controls-panel><h3 class=scrollbar-controls-title>Scrollbar Settings</h3><div class=control-group><label><input type=checkbox>Enable Engine</label></div><div class=control-group><label>Theme:</label><select><option value=default>Default</option><option value=minimal>Minimal</option><option value=modern>Modern</option></select></div><div class=control-group><label><input type=checkbox>Auto-detect Engine</label></div><div class=control-group><label><input type=checkbox>Keyboard Navigation");const jt=e=>{const t=Te(),[o,r]=g.createSignal(!1),n=()=>{t.setEngineEnabled(!t.config.engine.enabled)},i=a=>{t.setTheme({name:a})};return(()=>{var a=$t(),l=a.firstChild,s=l.nextSibling;return l.$$click=()=>r(!o()),R(a,(()=>{var c=K(()=>!!o());return()=>c()&&(()=>{var d=Lt(),p=d.firstChild,w=p.nextSibling,C=w.firstChild,x=C.firstChild,S=w.nextSibling,b=S.firstChild,v=b.nextSibling,z=S.nextSibling,E=z.firstChild,I=E.firstChild,T=z.nextSibling,L=T.firstChild,M=L.firstChild;return x.addEventListener("change",n),v.addEventListener("change",f=>{const A=f.currentTarget.value;i(A)}),I.addEventListener("change",f=>t.updateConfig({engine:{...t.config.engine,autoDetect:f.currentTarget.checked}})),M.addEventListener("change",f=>t.updateConfig({accessibility:{...t.config.accessibility,keyboardNavigation:f.currentTarget.checked}})),g.createRenderEffect(()=>x.checked=t.config.engine.enabled),g.createRenderEffect(()=>v.value=t.config.theme.name),g.createRenderEffect(()=>I.checked=t.config.engine.autoDetect),g.createRenderEffect(()=>M.checked=t.config.accessibility.keyboardNavigation),d})()})(),s),g.createRenderEffect(()=>G(a,`scrollbar-controls ${e.class||""}`)),a})()};re(["click"]);const Ot={base:`
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
	`,text:`
		color: white
		font-size: 12px
		line-height: 1
	`,variants:{frontend:`
			color: white
		`,backend:`
			color: white
		`,engine:`
			color: white
		`},hover:`
		opacity: 0.8
	`,indicator:`
		width: 6px
		height: 6px
		border-radius: 50%
		flex-shrink: 0
	`,icon:`
		color: white
		font-size: 12px
		line-height: 1
		width: 12px
		height: 12px
		display: flex
		align-items: center
		justify-content: center
	`,status:{loading:`
			bg-[#ff9800]
			animate-pulse
		`,ready:`
			bg-[#4caf50]
			shadow-[0_0_8px_rgba(76,175,80,0.5)]
		`,error:`
			bg-[#f44336]
			animate-pulse
		`}},Rt=`
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
`;var Dt=D('<span role=status style="display:inline-flex;align-items:center;gap:4px;height:40px;padding:0 8px;background:transparent;color:white;font-size:14px;line-height:1;vertical-align:middle"><span class=material-symbols-rounded aria-hidden=true style=color:white;font-size:16px;line-height:1;width:16px;height:16px;display:flex;align-items:center;justify-content:center></span><span style=color:white;font-size:14px;line-height:1>');const Ft=e=>(()=>{var t=Dt(),o=t.firstChild,r=o.nextSibling;return t.$$click=()=>e.onClick?.(),R(o,()=>e.icon),R(r,()=>e.label),g.createRenderEffect(n=>{var i=e.class,a=e.onClick?"pointer":"default",l=e.status,s=e.variant,c=`${e.label} status: ${e.status}`;return i!==n.e&&G(t,n.e=i),a!==n.t&&V(t,"cursor",n.t=a),l!==n.a&&oe(t,"data-status",n.a=l),s!==n.o&&oe(t,"data-variant",n.o=s),c!==n.i&&oe(t,"aria-label",n.i=c),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),t})();re(["click"]);class _e{physicsObjectId=null;velocity=0;acceleration=0;zoomLevel=1;isInitialized=!1;async createPhysicsObject(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("create_physics_object",{x:t,y:o});return this.physicsObjectId=r,r}catch(r){throw console.error("Failed to create physics object:",r),r}}async updatePhysicsObject(t,o,r){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("update_physics_object",{id:t,x:o,y:r})}catch(n){throw console.error("Failed to update physics object:",n),n}}async destroyPhysicsObject(t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("destroy_physics_object",{id:t}),this.physicsObjectId===t&&(this.physicsObjectId=null)}catch(o){throw console.error("Failed to destroy physics object:",o),o}}async updateZoomLevel(t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("update_zoom_level",{zoom:t}),this.zoomLevel=t}catch(o){throw console.error("Failed to update zoom level:",o),o}}async screenToWorld(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("screen_to_world",{screenX:t,screenY:o});return{x:r.x,y:r.y}}catch(r){throw console.error("Failed to convert screen to world:",r),r}}async worldToScreen(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("world_to_screen",{worldX:t,worldY:o});return{x:r.x,y:r.y}}catch(r){throw console.error("Failed to convert world to screen:",r),r}}async getEngineState(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const t=await window.__TAURI__.invoke("get_engine_state");return{physicsObjectId:t.physicsObjectId,velocity:t.velocity||this.velocity,acceleration:t.acceleration||this.acceleration,zoomLevel:t.zoomLevel||this.zoomLevel,isInitialized:t.isInitialized||this.isInitialized}}catch(t){return console.error("Failed to get engine state:",t),{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration,zoomLevel:this.zoomLevel,isInitialized:this.isInitialized}}}async isAvailable(){const t=this.isTauriAvailable();return t&&(this.isInitialized=!0),t}async initPhysicsEngine(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("init_physics_engine"),this.isInitialized=!0}catch(t){throw console.error("Failed to initialize physics engine:",t),t}}async calculateScrollbarPhysics(t,o,r,n){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{return await window.__TAURI__.invoke("calculate_scrollbar_physics",{config:t,currentState:o,targetPosition:r,deltaTime:n})}catch(i){throw console.error("Failed to calculate scrollbar physics:",i),i}}async getPhysicsEngineInfo(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{return await window.__TAURI__.invoke("get_physics_engine_info")}catch(t){throw console.error("Failed to get physics engine info:",t),t}}isTauriAvailable(){return typeof window<"u"&&window.__TAURI__!==void 0&&typeof window.__TAURI__.invoke=="function"}}const et=new _e,Nt=Object.freeze(Object.defineProperty({__proto__:null,TauriEngine:_e,tauriEngine:et},Symbol.toStringTag,{value:"Module"}));function tt(e){var t,o,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(t=0;t<n;t++)e[t]&&(o=tt(e[t]))&&(r&&(r+=" "),r+=o)}else for(o in e)e[o]&&(r&&(r+=" "),r+=o);return r}function Bt(){for(var e,t,o=0,r="",n=arguments.length;o<n;o++)(e=arguments[o])&&(t=tt(e))&&(r&&(r+=" "),r+=t);return r}const Ae="-",Gt=e=>{const t=Vt(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:a=>{const l=a.split(Ae);return l[0]===""&&l.length!==1&&l.shift(),ot(l,t)||Ut(a)},getConflictingClassGroupIds:(a,l)=>{const s=o[a]||[];return l&&r[a]?[...s,...r[a]]:s}}},ot=(e,t)=>{if(e.length===0)return t.classGroupId;const o=e[0],r=t.nextPart.get(o),n=r?ot(e.slice(1),r):void 0;if(n)return n;if(t.validators.length===0)return;const i=e.join(Ae);return t.validators.find(({validator:a})=>a(i))?.classGroupId},De=/^\[(.+)\]$/,Ut=e=>{if(De.test(e)){const t=De.exec(e)[1],o=t?.substring(0,t.indexOf(":"));if(o)return"arbitrary.."+o}},Vt=e=>{const{theme:t,classGroups:o}=e,r={nextPart:new Map,validators:[]};for(const n in o)ze(o[n],r,n,t);return r},ze=(e,t,o,r)=>{e.forEach(n=>{if(typeof n=="string"){const i=n===""?t:Fe(t,n);i.classGroupId=o;return}if(typeof n=="function"){if(Ht(n)){ze(n(r),t,o,r);return}t.validators.push({validator:n,classGroupId:o});return}Object.entries(n).forEach(([i,a])=>{ze(a,Fe(t,i),o,r)})})},Fe=(e,t)=>{let o=e;return t.split(Ae).forEach(r=>{o.nextPart.has(r)||o.nextPart.set(r,{nextPart:new Map,validators:[]}),o=o.nextPart.get(r)}),o},Ht=e=>e.isThemeGetter,Wt=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,o=new Map,r=new Map;const n=(i,a)=>{o.set(i,a),t++,t>e&&(t=0,r=o,o=new Map)};return{get(i){let a=o.get(i);if(a!==void 0)return a;if((a=r.get(i))!==void 0)return n(i,a),a},set(i,a){o.has(i)?o.set(i,a):n(i,a)}}},Se="!",Ce=":",Yt=Ce.length,Zt=e=>{const{prefix:t,experimentalParseClassName:o}=e;let r=n=>{const i=[];let a=0,l=0,s=0,c;for(let x=0;x<n.length;x++){let S=n[x];if(a===0&&l===0){if(S===Ce){i.push(n.slice(s,x)),s=x+Yt;continue}if(S==="/"){c=x;continue}}S==="["?a++:S==="]"?a--:S==="("?l++:S===")"&&l--}const d=i.length===0?n:n.substring(s),p=qt(d),w=p!==d,C=c&&c>s?c-s:void 0;return{modifiers:i,hasImportantModifier:w,baseClassName:p,maybePostfixModifierPosition:C}};if(t){const n=t+Ce,i=r;r=a=>a.startsWith(n)?i(a.substring(n.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:a,maybePostfixModifierPosition:void 0}}if(o){const n=r;r=i=>o({className:i,parseClassName:n})}return r},qt=e=>e.endsWith(Se)?e.substring(0,e.length-1):e.startsWith(Se)?e.substring(1):e,Xt=e=>{const t=Object.fromEntries(e.orderSensitiveModifiers.map(r=>[r,!0]));return r=>{if(r.length<=1)return r;const n=[];let i=[];return r.forEach(a=>{a[0]==="["||t[a]?(n.push(...i.sort(),a),i=[]):i.push(a)}),n.push(...i.sort()),n}},Jt=e=>({cache:Wt(e.cacheSize),parseClassName:Zt(e),sortModifiers:Xt(e),...Gt(e)}),Kt=/\s+/,Qt=(e,t)=>{const{parseClassName:o,getClassGroupId:r,getConflictingClassGroupIds:n,sortModifiers:i}=t,a=[],l=e.trim().split(Kt);let s="";for(let c=l.length-1;c>=0;c-=1){const d=l[c],{isExternal:p,modifiers:w,hasImportantModifier:C,baseClassName:x,maybePostfixModifierPosition:S}=o(d);if(p){s=d+(s.length>0?" "+s:s);continue}let b=!!S,v=r(b?x.substring(0,S):x);if(!v){if(!b){s=d+(s.length>0?" "+s:s);continue}if(v=r(x),!v){s=d+(s.length>0?" "+s:s);continue}b=!1}const z=i(w).join(":"),E=C?z+Se:z,I=E+v;if(a.includes(I))continue;a.push(I);const T=n(v,b);for(let L=0;L<T.length;++L){const M=T[L];a.push(E+M)}s=d+(s.length>0?" "+s:s)}return s};function eo(){let e=0,t,o,r="";for(;e<arguments.length;)(t=arguments[e++])&&(o=rt(t))&&(r&&(r+=" "),r+=o);return r}const rt=e=>{if(typeof e=="string")return e;let t,o="";for(let r=0;r<e.length;r++)e[r]&&(t=rt(e[r]))&&(o&&(o+=" "),o+=t);return o};function to(e,...t){let o,r,n,i=a;function a(s){const c=t.reduce((d,p)=>p(d),e());return o=Jt(c),r=o.cache.get,n=o.cache.set,i=l,l(s)}function l(s){const c=r(s);if(c)return c;const d=Qt(s,o);return n(s,d),d}return function(){return i(eo.apply(null,arguments))}}const _=e=>{const t=o=>o[e]||[];return t.isThemeGetter=!0,t},nt=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,it=/^\((?:(\w[\w-]*):)?(.+)\)$/i,oo=/^\d+\/\d+$/,ro=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,no=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,io=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,so=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,ao=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,te=e=>oo.test(e),y=e=>!!e&&!Number.isNaN(Number(e)),Z=e=>!!e&&Number.isInteger(Number(e)),ve=e=>e.endsWith("%")&&y(e.slice(0,-1)),Y=e=>ro.test(e),lo=()=>!0,co=e=>no.test(e)&&!io.test(e),st=()=>!1,uo=e=>so.test(e),ho=e=>ao.test(e),go=e=>!u(e)&&!h(e),fo=e=>ne(e,ct,st),u=e=>nt.test(e),X=e=>ne(e,dt,co),we=e=>ne(e,vo,y),Ne=e=>ne(e,at,st),bo=e=>ne(e,lt,ho),ue=e=>ne(e,ut,uo),h=e=>it.test(e),se=e=>ie(e,dt),mo=e=>ie(e,wo),Be=e=>ie(e,at),po=e=>ie(e,ct),yo=e=>ie(e,lt),he=e=>ie(e,ut,!0),ne=(e,t,o)=>{const r=nt.exec(e);return r?r[1]?t(r[1]):o(r[2]):!1},ie=(e,t,o=!1)=>{const r=it.exec(e);return r?r[1]?t(r[1]):o:!1},at=e=>e==="position"||e==="percentage",lt=e=>e==="image"||e==="url",ct=e=>e==="length"||e==="size"||e==="bg-size",dt=e=>e==="length",vo=e=>e==="number",wo=e=>e==="family-name",ut=e=>e==="shadow",xo=()=>{const e=_("color"),t=_("font"),o=_("text"),r=_("font-weight"),n=_("tracking"),i=_("leading"),a=_("breakpoint"),l=_("container"),s=_("spacing"),c=_("radius"),d=_("shadow"),p=_("inset-shadow"),w=_("text-shadow"),C=_("drop-shadow"),x=_("blur"),S=_("perspective"),b=_("aspect"),v=_("ease"),z=_("animate"),E=()=>["auto","avoid","all","avoid-page","page","left","right","column"],I=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],T=()=>[...I(),h,u],L=()=>["auto","hidden","clip","visible","scroll"],M=()=>["auto","contain","none"],f=()=>[h,u,s],A=()=>[te,"full","auto",...f()],k=()=>[Z,"none","subgrid",h,u],U=()=>["auto",{span:["full",Z,h,u]},Z,h,u],$=()=>[Z,"auto",h,u],j=()=>["auto","min","max","fr",h,u],N=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],H=()=>["start","end","center","stretch","center-safe","end-safe"],B=()=>["auto",...f()],W=()=>[te,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...f()],m=()=>[e,h,u],Pe=()=>[...I(),Be,Ne,{position:[h,u]}],Ie=()=>["no-repeat",{repeat:["","x","y","space","round"]}],Me=()=>["auto","cover","contain",po,fo,{size:[h,u]}],fe=()=>[ve,se,X],O=()=>["","none","full",c,h,u],F=()=>["",y,se,X],ae=()=>["solid","dashed","dotted","double"],$e=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],P=()=>[y,ve,Be,Ne],Le=()=>["","none",x,h,u],le=()=>["none",y,h,u],ce=()=>["none",y,h,u],be=()=>[y,h,u],de=()=>[te,"full",...f()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Y],breakpoint:[Y],color:[lo],container:[Y],"drop-shadow":[Y],ease:["in","out","in-out"],font:[go],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Y],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Y],shadow:[Y],spacing:["px",y],text:[Y],"text-shadow":[Y],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",te,u,h,b]}],container:["container"],columns:[{columns:[y,u,h,l]}],"break-after":[{"break-after":E()}],"break-before":[{"break-before":E()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:T()}],overflow:[{overflow:L()}],"overflow-x":[{"overflow-x":L()}],"overflow-y":[{"overflow-y":L()}],overscroll:[{overscroll:M()}],"overscroll-x":[{"overscroll-x":M()}],"overscroll-y":[{"overscroll-y":M()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:A()}],"inset-x":[{"inset-x":A()}],"inset-y":[{"inset-y":A()}],start:[{start:A()}],end:[{end:A()}],top:[{top:A()}],right:[{right:A()}],bottom:[{bottom:A()}],left:[{left:A()}],visibility:["visible","invisible","collapse"],z:[{z:[Z,"auto",h,u]}],basis:[{basis:[te,"full","auto",l,...f()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[y,te,"auto","initial","none",u]}],grow:[{grow:["",y,h,u]}],shrink:[{shrink:["",y,h,u]}],order:[{order:[Z,"first","last","none",h,u]}],"grid-cols":[{"grid-cols":k()}],"col-start-end":[{col:U()}],"col-start":[{"col-start":$()}],"col-end":[{"col-end":$()}],"grid-rows":[{"grid-rows":k()}],"row-start-end":[{row:U()}],"row-start":[{"row-start":$()}],"row-end":[{"row-end":$()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":j()}],"auto-rows":[{"auto-rows":j()}],gap:[{gap:f()}],"gap-x":[{"gap-x":f()}],"gap-y":[{"gap-y":f()}],"justify-content":[{justify:[...N(),"normal"]}],"justify-items":[{"justify-items":[...H(),"normal"]}],"justify-self":[{"justify-self":["auto",...H()]}],"align-content":[{content:["normal",...N()]}],"align-items":[{items:[...H(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...H(),{baseline:["","last"]}]}],"place-content":[{"place-content":N()}],"place-items":[{"place-items":[...H(),"baseline"]}],"place-self":[{"place-self":["auto",...H()]}],p:[{p:f()}],px:[{px:f()}],py:[{py:f()}],ps:[{ps:f()}],pe:[{pe:f()}],pt:[{pt:f()}],pr:[{pr:f()}],pb:[{pb:f()}],pl:[{pl:f()}],m:[{m:B()}],mx:[{mx:B()}],my:[{my:B()}],ms:[{ms:B()}],me:[{me:B()}],mt:[{mt:B()}],mr:[{mr:B()}],mb:[{mb:B()}],ml:[{ml:B()}],"space-x":[{"space-x":f()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":f()}],"space-y-reverse":["space-y-reverse"],size:[{size:W()}],w:[{w:[l,"screen",...W()]}],"min-w":[{"min-w":[l,"screen","none",...W()]}],"max-w":[{"max-w":[l,"screen","none","prose",{screen:[a]},...W()]}],h:[{h:["screen","lh",...W()]}],"min-h":[{"min-h":["screen","lh","none",...W()]}],"max-h":[{"max-h":["screen","lh",...W()]}],"font-size":[{text:["base",o,se,X]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,h,we]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",ve,u]}],"font-family":[{font:[mo,u,t]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,h,u]}],"line-clamp":[{"line-clamp":[y,"none",h,we]}],leading:[{leading:[i,...f()]}],"list-image":[{"list-image":["none",h,u]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",h,u]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:m()}],"text-color":[{text:m()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...ae(),"wavy"]}],"text-decoration-thickness":[{decoration:[y,"from-font","auto",h,X]}],"text-decoration-color":[{decoration:m()}],"underline-offset":[{"underline-offset":[y,"auto",h,u]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:f()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",h,u]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",h,u]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:Pe()}],"bg-repeat":[{bg:Ie()}],"bg-size":[{bg:Me()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},Z,h,u],radial:["",h,u],conic:[Z,h,u]},yo,bo]}],"bg-color":[{bg:m()}],"gradient-from-pos":[{from:fe()}],"gradient-via-pos":[{via:fe()}],"gradient-to-pos":[{to:fe()}],"gradient-from":[{from:m()}],"gradient-via":[{via:m()}],"gradient-to":[{to:m()}],rounded:[{rounded:O()}],"rounded-s":[{"rounded-s":O()}],"rounded-e":[{"rounded-e":O()}],"rounded-t":[{"rounded-t":O()}],"rounded-r":[{"rounded-r":O()}],"rounded-b":[{"rounded-b":O()}],"rounded-l":[{"rounded-l":O()}],"rounded-ss":[{"rounded-ss":O()}],"rounded-se":[{"rounded-se":O()}],"rounded-ee":[{"rounded-ee":O()}],"rounded-es":[{"rounded-es":O()}],"rounded-tl":[{"rounded-tl":O()}],"rounded-tr":[{"rounded-tr":O()}],"rounded-br":[{"rounded-br":O()}],"rounded-bl":[{"rounded-bl":O()}],"border-w":[{border:F()}],"border-w-x":[{"border-x":F()}],"border-w-y":[{"border-y":F()}],"border-w-s":[{"border-s":F()}],"border-w-e":[{"border-e":F()}],"border-w-t":[{"border-t":F()}],"border-w-r":[{"border-r":F()}],"border-w-b":[{"border-b":F()}],"border-w-l":[{"border-l":F()}],"divide-x":[{"divide-x":F()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":F()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...ae(),"hidden","none"]}],"divide-style":[{divide:[...ae(),"hidden","none"]}],"border-color":[{border:m()}],"border-color-x":[{"border-x":m()}],"border-color-y":[{"border-y":m()}],"border-color-s":[{"border-s":m()}],"border-color-e":[{"border-e":m()}],"border-color-t":[{"border-t":m()}],"border-color-r":[{"border-r":m()}],"border-color-b":[{"border-b":m()}],"border-color-l":[{"border-l":m()}],"divide-color":[{divide:m()}],"outline-style":[{outline:[...ae(),"none","hidden"]}],"outline-offset":[{"outline-offset":[y,h,u]}],"outline-w":[{outline:["",y,se,X]}],"outline-color":[{outline:m()}],shadow:[{shadow:["","none",d,he,ue]}],"shadow-color":[{shadow:m()}],"inset-shadow":[{"inset-shadow":["none",p,he,ue]}],"inset-shadow-color":[{"inset-shadow":m()}],"ring-w":[{ring:F()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:m()}],"ring-offset-w":[{"ring-offset":[y,X]}],"ring-offset-color":[{"ring-offset":m()}],"inset-ring-w":[{"inset-ring":F()}],"inset-ring-color":[{"inset-ring":m()}],"text-shadow":[{"text-shadow":["none",w,he,ue]}],"text-shadow-color":[{"text-shadow":m()}],opacity:[{opacity:[y,h,u]}],"mix-blend":[{"mix-blend":[...$e(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":$e()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[y]}],"mask-image-linear-from-pos":[{"mask-linear-from":P()}],"mask-image-linear-to-pos":[{"mask-linear-to":P()}],"mask-image-linear-from-color":[{"mask-linear-from":m()}],"mask-image-linear-to-color":[{"mask-linear-to":m()}],"mask-image-t-from-pos":[{"mask-t-from":P()}],"mask-image-t-to-pos":[{"mask-t-to":P()}],"mask-image-t-from-color":[{"mask-t-from":m()}],"mask-image-t-to-color":[{"mask-t-to":m()}],"mask-image-r-from-pos":[{"mask-r-from":P()}],"mask-image-r-to-pos":[{"mask-r-to":P()}],"mask-image-r-from-color":[{"mask-r-from":m()}],"mask-image-r-to-color":[{"mask-r-to":m()}],"mask-image-b-from-pos":[{"mask-b-from":P()}],"mask-image-b-to-pos":[{"mask-b-to":P()}],"mask-image-b-from-color":[{"mask-b-from":m()}],"mask-image-b-to-color":[{"mask-b-to":m()}],"mask-image-l-from-pos":[{"mask-l-from":P()}],"mask-image-l-to-pos":[{"mask-l-to":P()}],"mask-image-l-from-color":[{"mask-l-from":m()}],"mask-image-l-to-color":[{"mask-l-to":m()}],"mask-image-x-from-pos":[{"mask-x-from":P()}],"mask-image-x-to-pos":[{"mask-x-to":P()}],"mask-image-x-from-color":[{"mask-x-from":m()}],"mask-image-x-to-color":[{"mask-x-to":m()}],"mask-image-y-from-pos":[{"mask-y-from":P()}],"mask-image-y-to-pos":[{"mask-y-to":P()}],"mask-image-y-from-color":[{"mask-y-from":m()}],"mask-image-y-to-color":[{"mask-y-to":m()}],"mask-image-radial":[{"mask-radial":[h,u]}],"mask-image-radial-from-pos":[{"mask-radial-from":P()}],"mask-image-radial-to-pos":[{"mask-radial-to":P()}],"mask-image-radial-from-color":[{"mask-radial-from":m()}],"mask-image-radial-to-color":[{"mask-radial-to":m()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":I()}],"mask-image-conic-pos":[{"mask-conic":[y]}],"mask-image-conic-from-pos":[{"mask-conic-from":P()}],"mask-image-conic-to-pos":[{"mask-conic-to":P()}],"mask-image-conic-from-color":[{"mask-conic-from":m()}],"mask-image-conic-to-color":[{"mask-conic-to":m()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:Pe()}],"mask-repeat":[{mask:Ie()}],"mask-size":[{mask:Me()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",h,u]}],filter:[{filter:["","none",h,u]}],blur:[{blur:Le()}],brightness:[{brightness:[y,h,u]}],contrast:[{contrast:[y,h,u]}],"drop-shadow":[{"drop-shadow":["","none",C,he,ue]}],"drop-shadow-color":[{"drop-shadow":m()}],grayscale:[{grayscale:["",y,h,u]}],"hue-rotate":[{"hue-rotate":[y,h,u]}],invert:[{invert:["",y,h,u]}],saturate:[{saturate:[y,h,u]}],sepia:[{sepia:["",y,h,u]}],"backdrop-filter":[{"backdrop-filter":["","none",h,u]}],"backdrop-blur":[{"backdrop-blur":Le()}],"backdrop-brightness":[{"backdrop-brightness":[y,h,u]}],"backdrop-contrast":[{"backdrop-contrast":[y,h,u]}],"backdrop-grayscale":[{"backdrop-grayscale":["",y,h,u]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[y,h,u]}],"backdrop-invert":[{"backdrop-invert":["",y,h,u]}],"backdrop-opacity":[{"backdrop-opacity":[y,h,u]}],"backdrop-saturate":[{"backdrop-saturate":[y,h,u]}],"backdrop-sepia":[{"backdrop-sepia":["",y,h,u]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":f()}],"border-spacing-x":[{"border-spacing-x":f()}],"border-spacing-y":[{"border-spacing-y":f()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",h,u]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[y,"initial",h,u]}],ease:[{ease:["linear","initial",v,h,u]}],delay:[{delay:[y,h,u]}],animate:[{animate:["none",z,h,u]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[S,h,u]}],"perspective-origin":[{"perspective-origin":T()}],rotate:[{rotate:le()}],"rotate-x":[{"rotate-x":le()}],"rotate-y":[{"rotate-y":le()}],"rotate-z":[{"rotate-z":le()}],scale:[{scale:ce()}],"scale-x":[{"scale-x":ce()}],"scale-y":[{"scale-y":ce()}],"scale-z":[{"scale-z":ce()}],"scale-3d":["scale-3d"],skew:[{skew:be()}],"skew-x":[{"skew-x":be()}],"skew-y":[{"skew-y":be()}],transform:[{transform:[h,u,"","none","gpu","cpu"]}],"transform-origin":[{origin:T()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:de()}],"translate-x":[{"translate-x":de()}],"translate-y":[{"translate-y":de()}],"translate-z":[{"translate-z":de()}],"translate-none":["translate-none"],accent:[{accent:m()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:m()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",h,u]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":f()}],"scroll-mx":[{"scroll-mx":f()}],"scroll-my":[{"scroll-my":f()}],"scroll-ms":[{"scroll-ms":f()}],"scroll-me":[{"scroll-me":f()}],"scroll-mt":[{"scroll-mt":f()}],"scroll-mr":[{"scroll-mr":f()}],"scroll-mb":[{"scroll-mb":f()}],"scroll-ml":[{"scroll-ml":f()}],"scroll-p":[{"scroll-p":f()}],"scroll-px":[{"scroll-px":f()}],"scroll-py":[{"scroll-py":f()}],"scroll-ps":[{"scroll-ps":f()}],"scroll-pe":[{"scroll-pe":f()}],"scroll-pt":[{"scroll-pt":f()}],"scroll-pr":[{"scroll-pr":f()}],"scroll-pb":[{"scroll-pb":f()}],"scroll-pl":[{"scroll-pl":f()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",h,u]}],fill:[{fill:["none",...m()]}],"stroke-w":[{stroke:[y,se,X,we]}],stroke:[{stroke:["none",...m()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},ko=to(xo);function zo(...e){return ko(Bt(e))}exports.Button=pt;exports.EngineManager=We;exports.MockEngine=He;exports.Scrollbar=Mt;exports.ScrollbarArrows=Ke;exports.ScrollbarControls=jt;exports.ScrollbarProvider=Ue;exports.ScrollbarThumb=Qe;exports.TauriEngine=_e;exports.TechChip=Ft;exports.animations=Rt;exports.buttonStyles=yt;exports.cn=zo;exports.getCurrentEngine=J;exports.getEngineManager=Ye;exports.mockEngine=ke;exports.scrollbarConfig=q;exports.scrollbarStyles=Ve;exports.tauriEngine=et;exports.techChipStyles=Ot;exports.useScrollbarConfig=Te;exports.useScrollbarHandlers=Ze;exports.useScrollbarLogic=qe;exports.useScrollbarObservers=Xe;exports.useScrollbarState=Je;
//# sourceMappingURL=index.cjs.map
