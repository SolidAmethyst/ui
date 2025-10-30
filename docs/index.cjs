"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const f=require("solid-js"),ie=e=>f.createMemo(()=>e());function ht(e,t,o){let r=o.length,n=t.length,i=r,a=0,l=0,s=t[n-1].nextSibling,u=null;for(;a<n||l<i;){if(t[a]===o[l]){a++,l++;continue}for(;t[n-1]===o[i-1];)n--,i--;if(n===a){const h=i<r?l?o[l-1].nextSibling:o[i-l]:s;for(;l<i;)e.insertBefore(o[l++],h)}else if(i===l)for(;a<n;)(!u||!u.has(t[a]))&&t[a].remove(),a++;else if(t[a]===o[i-1]&&o[l]===t[n-1]){const h=t[--n].nextSibling;e.insertBefore(o[l++],t[a++].nextSibling),e.insertBefore(o[--i],h),t[n]=o[i]}else{if(!u){u=new Map;let w=l;for(;w<i;)u.set(o[w],w++)}const h=u.get(t[a]);if(h!=null)if(l<h&&h<i){let w=a,E=1,C;for(;++w<n&&w<i&&!((C=u.get(t[w]))==null||C!==h+E);)E++;if(E>h-l){const x=t[a];for(;l<h;)e.insertBefore(o[l++],x)}else e.replaceChild(o[l++],t[a++])}else a++;else t[a++].remove()}}}const Oe="_$DX_DELEGATE";function U(e,t,o,r){let n;const i=()=>{const l=document.createElement("template");return l.innerHTML=e,l.content.firstChild},a=()=>(n||(n=i())).cloneNode(!0);return a.cloneNode=a,a}function se(e,t=window.document){const o=t[Oe]||(t[Oe]=new Set);for(let r=0,n=e.length;r<n;r++){const i=e[r];o.has(i)||(o.add(i),t.addEventListener(i,bt))}}function ge(e,t,o){Ce(e)||(o==null?e.removeAttribute(t):e.setAttribute(t,o))}function G(e,t){Ce(e)||(t==null?e.removeAttribute("class"):e.className=t)}function pe(e,t,o,r){if(r)Array.isArray(o)?(e[`$$${t}`]=o[0],e[`$$${t}Data`]=o[1]):e[`$$${t}`]=o;else if(Array.isArray(o)){const n=o[0];e.addEventListener(t,o[0]=i=>n.call(e,o[1],i))}else e.addEventListener(t,o,typeof o!="function"&&o)}function gt(e,t,o){if(!t)return o?ge(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof o=="string"&&(r.cssText=o=void 0),o||(o={}),t||(t={});let n,i;for(i in o)t[i]==null&&r.removeProperty(i),delete o[i];for(i in t)n=t[i],n!==o[i]&&(r.setProperty(i,n),o[i]=n);return o}function K(e,t,o){o!=null?e.style.setProperty(t,o):e.style.removeProperty(t)}function ye(e,t,o){return f.untrack(()=>e(t,o))}function Z(e,t,o,r){if(o!==void 0&&!r&&(r=[]),typeof t!="function")return be(e,t,r,o);f.createRenderEffect(n=>be(e,t(),n,o),r)}function Ce(e){return!!f.sharedConfig.context&&!f.sharedConfig.done&&(!e||e.isConnected)}function bt(e){if(f.sharedConfig.registry&&f.sharedConfig.events&&f.sharedConfig.events.find(([s,u])=>u===e))return;let t=e.target;const o=`$$${e.type}`,r=e.target,n=e.currentTarget,i=s=>Object.defineProperty(e,"target",{configurable:!0,value:s}),a=()=>{const s=t[o];if(s&&!t.disabled){const u=t[`${o}Data`];if(u!==void 0?s.call(t,u,e):s.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&i(t.host),!0},l=()=>{for(;a()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),f.sharedConfig.registry&&!f.sharedConfig.done&&(f.sharedConfig.done=_$HY.done=!0),e.composedPath){const s=e.composedPath();i(s[0]);for(let u=0;u<s.length-2&&(t=s[u],!!a());u++){if(t._$host){t=t._$host,l();break}if(t.parentNode===n)break}}else l();i(r)}function be(e,t,o,r,n){const i=Ce(e);if(i){!o&&(o=[...e.childNodes]);let s=[];for(let u=0;u<o.length;u++){const h=o[u];h.nodeType===8&&h.data.slice(0,2)==="!$"?h.remove():s.push(h)}o=s}for(;typeof o=="function";)o=o();if(t===o)return o;const a=typeof t,l=r!==void 0;if(e=l&&o[0]&&o[0].parentNode||e,a==="string"||a==="number"){if(i||a==="number"&&(t=t.toString(),t===o))return o;if(l){let s=o[0];s&&s.nodeType===3?s.data!==t&&(s.data=t):s=document.createTextNode(t),o=Q(e,o,r,s)}else o!==""&&typeof o=="string"?o=e.firstChild.data=t:o=e.textContent=t}else if(t==null||a==="boolean"){if(i)return o;o=Q(e,o,r)}else{if(a==="function")return f.createRenderEffect(()=>{let s=t();for(;typeof s=="function";)s=s();o=be(e,s,o,r)}),()=>o;if(Array.isArray(t)){const s=[],u=o&&Array.isArray(o);if(ke(s,t,o,n))return f.createRenderEffect(()=>o=be(e,s,o,r,!0)),()=>o;if(i){if(!s.length)return o;if(r===void 0)return o=[...e.childNodes];let h=s[0];if(h.parentNode!==e)return o;const w=[h];for(;(h=h.nextSibling)!==r;)w.push(h);return o=w}if(s.length===0){if(o=Q(e,o,r),l)return o}else u?o.length===0?Re(e,s,r):ht(e,o,s):(o&&Q(e),Re(e,s));o=s}else if(t.nodeType){if(i&&t.parentNode)return o=l?[t]:t;if(Array.isArray(o)){if(l)return o=Q(e,o,r,t);Q(e,o,null,t)}else o==null||o===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);o=t}}return o}function ke(e,t,o,r){let n=!1;for(let i=0,a=t.length;i<a;i++){let l=t[i],s=o&&o[e.length],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))n=ke(e,l,s)||n;else if(u==="function")if(r){for(;typeof l=="function";)l=l();n=ke(e,Array.isArray(l)?l:[l],Array.isArray(s)?s:[s])||n}else e.push(l),n=!0;else{const h=String(l);s&&s.nodeType===3&&s.data===h?e.push(s):e.push(document.createTextNode(h))}}return n}function Re(e,t,o=null){for(let r=0,n=t.length;r<n;r++)e.insertBefore(t[r],o)}function Q(e,t,o,r){if(o===void 0)return e.textContent="";const n=r||document.createTextNode("");if(t.length){let i=!1;for(let a=t.length-1;a>=0;a--){const l=t[a];if(n!==l){const s=l.parentNode===e;!i&&!a?s?e.replaceChild(n,l):e.insertBefore(n,o):s&&l.remove()}else i=!0}}else e.insertBefore(n,o);return[n]}const ft={engine:{enabled:!0,autoDetect:!0,fallbackToJS:!0},theme:{name:"default"},performance:{useRequestAnimationFrame:!0,debounceMs:16,throttleMs:8},accessibility:{keyboardNavigation:!0,screenReaderSupport:!0,highContrast:!1}};class mt{config=ft;listeners=new Set;getConfig(){return{...this.config}}updateConfig(t){this.config={...this.config,...t},this.notifyListeners()}setEngineEnabled(t){this.updateConfig({engine:{...this.config.engine,enabled:t}})}setTheme(t){this.updateConfig({theme:t})}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notifyListeners(){this.listeners.forEach(t=>t(this.config))}async detectEngineAvailability(){return!1}async initialize(){if(this.config.engine.autoDetect){const t=await this.detectEngineAvailability();this.setEngineEnabled(t)}}}const Y=new mt;Y.initialize();const Ue=f.createContext(),Be=e=>{const[t,o]=f.createSignal(Y.getConfig());f.onMount(()=>{const n=Y.subscribe(o);e.config&&Y.updateConfig(e.config),f.onCleanup(n)});const r={get config(){return t()},setEngineEnabled:n=>{Y.setEngineEnabled(n)},setTheme:n=>{Y.setTheme(n)},updateConfig:n=>{Y.updateConfig(n)}};return f.createComponent(Ue.Provider,{value:r,get children(){return e.children}})},_e=()=>{const e=f.useContext(Ue);if(!e)throw new Error("useScrollbarConfig must be used within ScrollbarProvider");return e},Ve=`
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
`;function pt(){return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--zoom-level")||"1")}function ee(e){return e/pt()}class He{physicsObjectId=null;velocity=0;acceleration=0;zoomLevel=1;isInitialized=!1;async createPhysicsObject(t,o){console.debug("Mock createPhysicsObject:",t,o);const r=Math.random()*1e3;return this.physicsObjectId=r,r}async updatePhysicsObject(t,o,r){console.debug("Mock updatePhysicsObject:",t,o,r),this.physicsObjectId===t&&(this.velocity=Math.random()*.1)}async destroyPhysicsObject(t){this.physicsObjectId===t&&(this.physicsObjectId=null)}async updateZoomLevel(t){this.zoomLevel=t}async screenToWorld(t,o){return{x:t,y:o}}async worldToScreen(t,o){return{x:t,y:o}}async getEngineState(){return{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration,zoomLevel:this.zoomLevel,isInitialized:this.isInitialized}}async isAvailable(){return this.isInitialized=!0,!0}}const Se=new He;class We{currentEngine=null;config;isInitialized=!1;constructor(t){this.config=t}async initialize(){if(!this.isInitialized)try{this.config.enabled&&this.config.autoDetect&&await this.detectTauriEngine()&&(this.currentEngine=await this.loadTauriEngine()),this.currentEngine||(this.currentEngine=Se),this.isInitialized=!0}catch(t){console.warn("Failed to initialize engine, falling back to mock:",t),this.currentEngine=Se,this.isInitialized=!0}}async getEngine(){return this.isInitialized||await this.initialize(),this.currentEngine}async detectTauriEngine(){if(typeof window>"u"||!window.__TAURI__||typeof window.__TAURI__.invoke!="function")return!1;try{return await(await this.loadTauriEngine()).isAvailable()}catch{return!1}}async loadTauriEngine(){try{const{tauriEngine:t}=await Promise.resolve().then(()=>jt);if(this.config.physicsEnabled)try{const o=t;o.initPhysicsEngine&&(await o.initPhysicsEngine(),console.log("Physics engine DLL initialized successfully"))}catch(o){console.warn("Failed to initialize physics engine DLL:",o)}return t}catch(t){throw console.warn("Failed to load Tauri engine:",t),t}}updateConfig(t){this.config={...this.config,...t},this.isInitialized=!1}getConfig(){return{...this.config}}}let we=null;function Ye(e){return we||(we=new We(e||{enabled:!0,autoDetect:!0,fallbackToJS:!0,physicsEnabled:!0,zoomEnabled:!0})),we}async function J(){return await Ye().getEngine()}class yt{physicsObjectId=null;velocity=0;acceleration=0;async createPhysicsObject(t,o){try{const n=await(await J()).createPhysicsObject(t,o);return this.physicsObjectId=n,n}catch(r){console.warn("Failed to create physics object, using fallback:",r);const n=Math.random()*1e3;return this.physicsObjectId=n,n}}async updatePhysicsObject(t,o){if(this.physicsObjectId)try{await(await J()).updatePhysicsObject(this.physicsObjectId,t,o)}catch(r){console.warn("Failed to update physics object:",r)}}async updateZoomLevel(t){try{await(await J()).updateZoomLevel(t)}catch(o){console.warn("Failed to update zoom level:",o)}}async getEngineState(){try{const o=await(await J()).getEngineState();return{physicsObjectId:o.physicsObjectId,velocity:o.velocity,acceleration:o.acceleration}}catch(t){return console.warn("Failed to get engine state, using local state:",t),{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration}}}setVelocity(t){this.velocity=t}setAcceleration(t){this.acceleration=t}async calculateScrollbarPhysics(t,o,r,n){try{const i=await J();return"calculateScrollbarPhysics"in i?await i.calculateScrollbarPhysics(t,o,r,n):this.simplePhysicsCalculation(t,o,r,n)}catch(i){return console.warn("Failed to calculate scrollbar physics, using fallback:",i),this.simplePhysicsCalculation(t,o,r,n)}}simplePhysicsCalculation(t,o,r,n){const i={...o},a=-t.stiffness*(i.position-r),l=-t.friction*i.velocity,s=a+l,u=1,h=1e3;return i.acceleration=s/u,i.velocity+=i.acceleration*n,i.velocity=Math.max(-h,Math.min(h,i.velocity)),i.position+=i.velocity*n,i}async getPhysicsEngineInfo(){try{const t=await J();return"getPhysicsEngineInfo"in t?await t.getPhysicsEngineInfo():"Mock Physics Engine - No DLL available"}catch(t){return console.warn("Failed to get physics engine info:",t),"Mock Physics Engine - Error occurred"}}}function Ze(e,t,o,r,n,i,a,l,s){const u=new yt;return{scrollBy:m=>{if(!n())return;const y=m*3;o()==="horizontal"?n().scrollLeft+=y:n().scrollTop+=y},handleWheel:m=>{if(!n())return;m.preventDefault();let y,S;o()==="horizontal"?(y=m.deltaY,S=!0):(y=(m.shiftKey,m.deltaY),S=m.shiftKey);const z=y*.5;S?n().scrollLeft+=z:n().scrollTop+=z,s&&setTimeout(s,0)},handleThumbMouseDown:async m=>{m.preventDefault(),m.stopPropagation();const y=i().getBoundingClientRect(),S=o()==="horizontal"?ee(m.clientX-y.left):ee(m.clientY-y.top),z=e().thumbPosition+e().thumbSize/2,P=S-z;t(_=>({..._,isDragging:!0,dragOffset:P})),l()&&await u.createPhysicsObject(S,0),document.body.style.userSelect="none"},handleMouseMove:async m=>{if(!e().isDragging||!i()||!n())return;m.preventDefault();const y=i().getBoundingClientRect(),S=o()==="horizontal"?ee(m.clientX-y.left):ee(m.clientY-y.top);l()&&await u.updatePhysicsObject(S,0);const P=S-e().dragOffset-e().thumbSize/2,_=e().showArrows?12:0,I=(o()==="horizontal"?i().clientWidth:i().clientHeight)-_*2,g=I-e().thumbSize,$=Math.max(_,Math.min(P,g+_));t(V=>({...V,thumbPosition:$}));const q=o()==="horizontal"?i().clientWidth:i().clientHeight,O=(o()==="horizontal"?n().scrollWidth:n().scrollHeight)-q,R=$-_,A=I-e().thumbSize,N=Math.max(0,Math.min(1,R/A))*O;o()==="horizontal"?n().scrollLeft=N:n().scrollTop=N},handleMouseUp:()=>{t(m=>({...m,isDragging:!1,dragOffset:0})),document.body.style.userSelect=""},handleTrackClick:m=>{if(!i()||!n()||!a()||m.target===a())return;const y=i().getBoundingClientRect(),S=o()==="horizontal"?ee(m.clientX-y.left):ee(m.clientY-y.top),z=e().showArrows?12:0,P=(o()==="horizontal"?i().clientWidth:i().clientHeight)-z*2,L=S-z-e().thumbSize/2,I=P-e().thumbSize,g=Math.max(0,Math.min(L,I))+z;t(D=>({...D,thumbPosition:g}));const $=o()==="horizontal"?i().clientWidth:i().clientHeight,v=(o()==="horizontal"?n().scrollWidth:n().scrollHeight)-$,O=g-z,A=Math.max(0,Math.min(1,O/I))*v;o()==="horizontal"?n().scrollLeft=A:n().scrollTop=A}}}function qe(e,t,o,r,n,i,a){const l=()=>{if(!r()||!n())return;const u=o()==="horizontal"?r().clientWidth:r().clientHeight,h=o()==="horizontal"?n().scrollWidth:n().scrollHeight;if(!(h>u)){t(z=>({...z,isVisible:!1}));return}const E=o()==="horizontal"?n().scrollLeft:n().scrollTop,C=h-u,x=o()==="horizontal"?i()?.clientWidth??0:i()?.clientHeight??0,k=e().showArrows?12:0,m=x-k*2,y=Math.max(a(),m*u/h),S=e().isDragging?e().thumbPosition:Math.max(k,Math.min(k+E/C*(m-y),m-y+k));t(z=>({...z,isVisible:!0,thumbSize:y,thumbPosition:S,canScrollUp:E>0,canScrollDown:E<C}))};return{updateScrollbar:l,handleScroll:()=>{e().isDragging||l()}}}function Xe(e,t,o){return{setupObservers:()=>{if(!e()||!t())return;const n=new ResizeObserver(()=>{o()});n.observe(t()),n.observe(e());const i=new MutationObserver(()=>{o(),setTimeout(o,10)});return i.observe(t(),{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style","class"]}),()=>{n.disconnect(),i.disconnect()}}}}function Je(e){const t=_e(),o=()=>e.showArrows??!0,[r,n]=f.createSignal({thumbSize:20,thumbPosition:0,isVisible:!1,isDragging:!1,dragOffset:0,showArrows:o(),canScrollUp:!1,canScrollDown:!1}),[i,a]=f.createSignal(!1),[l,s]=f.createSignal(null),u=()=>e.direction??"vertical",h=()=>e.theme??t.config.theme.name,w=()=>e.autoHide??!0,E=()=>e.minThumbSize??4,C=()=>e.engineIntegration!==void 0?e.engineIntegration&&t.config.engine.enabled:t.config.engine.enabled,x=()=>{a(!0);const m=l();m&&(clearTimeout(m),s(null))},k=()=>{if(a(!1),w()){const m=setTimeout(()=>{n(y=>({...y,isVisible:!1}))},800);s(m)}};return f.onCleanup(()=>{const m=l();m&&clearTimeout(m)}),{state:r,setState:n,isHovered:i,setIsHovered:a,hideTimeout:l,setHideTimeout:s,direction:u,theme:h,autoHide:w,minThumbSize:E,engineIntegration:C,handleMouseEnter:x,handleMouseLeave:k}}var wt=U('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z">'),vt=U('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z">'),xt=U('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">'),kt=U('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z">');const Ke=e=>{const t=(o,r)=>{o.stopPropagation(),e.onScrollBy(r)};return ie(()=>ie(()=>e.direction==="vertical")()?[(()=>{var o=wt();return o.$$click=r=>t(r,-50),f.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-up ${e.canScrollUp?"":"disabled"}`,i=!e.canScrollUp;return n!==r.e&&G(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})(),(()=>{var o=vt();return o.$$click=r=>t(r,50),f.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-down ${e.canScrollDown?"":"disabled"}`,i=!e.canScrollDown;return n!==r.e&&G(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})()]:[(()=>{var o=xt();return o.$$click=r=>t(r,-50),f.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-left ${e.canScrollUp?"":"disabled"}`,i=!e.canScrollUp;return n!==r.e&&G(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})(),(()=>{var o=kt();return o.$$click=r=>t(r,50),f.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-right ${e.canScrollDown?"":"disabled"}`,i=!e.canScrollDown;return n!==r.e&&G(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})()])};se(["click"]);var St=U("<div>");const Qe=e=>(()=>{var t=St();return t.$$mousedown=o=>e.onMouseDown(o),f.createRenderEffect(o=>{var r=`scrollbar-thumb ${e.isDragging?"dragging":""}`,n=e.direction==="horizontal"?`${Math.max(1,e.thumbSize)}px`:"4px",i=e.direction==="horizontal"?"4px":`${Math.max(1,e.thumbSize)}px`,a=e.direction==="horizontal"?`${e.thumbPosition}px`:"auto",l=e.direction==="horizontal"?"50%":`${e.thumbPosition}px`,s=e.direction==="horizontal"?"auto":"4px",u=e.direction==="horizontal"?"translateY(-50%)":"none";return r!==o.e&&G(t,o.e=r),n!==o.t&&K(t,"width",o.t=n),i!==o.a&&K(t,"height",o.a=i),a!==o.o&&K(t,"left",o.o=a),l!==o.i&&K(t,"top",o.i=l),s!==o.n&&K(t,"right",o.n=s),u!==o.s&&K(t,"transform",o.s=u),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),t})();se(["mousedown"]);var zt=U("<style>"),Et=U("<div><div class=scrollbar-content style=overflow-y:hidden;overflow-x:hidden>"),Tt=U("<div>");const Ct=e=>{const[t,o]=f.createSignal(),[r,n]=f.createSignal(),[i,a]=f.createSignal(),[l]=f.createSignal(),{state:s,setState:u,isHovered:h,direction:w,autoHide:E,minThumbSize:C,engineIntegration:x,handleMouseEnter:k,handleMouseLeave:m}=Je(e),{updateScrollbar:y,handleScroll:S}=qe(s,u,w,t,r,i,C),{scrollBy:z,handleWheel:P,handleThumbMouseDown:_,handleMouseMove:L,handleMouseUp:I,handleTrackClick:g}=Ze(s,u,w,t,r,i,l,x,y),{setupObservers:$}=Xe(t,r,y),q=()=>s().isVisible&&(h()||!E()||s().isDragging);return f.onMount(()=>{const v=()=>{y()};v(),setTimeout(v,0),setTimeout(v,50),setTimeout(v,100),setTimeout(v,200),setTimeout(v,500),setTimeout(v,1e3),setTimeout(v,2e3),r()&&r().addEventListener("scroll",S);const O=$();document.addEventListener("mousemove",L),document.addEventListener("mouseup",I),f.onCleanup(()=>{O?.(),r()&&r().removeEventListener("scroll",S),document.removeEventListener("mousemove",L),document.removeEventListener("mouseup",I)})}),[(()=>{var v=zt();return Z(v,Ve),v})(),(()=>{var v=Et(),O=v.firstChild;return pe(v,"wheel",P),pe(v,"mouseleave",m),v.addEventListener("mouseenter",()=>{k(),y()}),ye(o,v),ye(n,O),Z(O,()=>e.children),Z(v,(()=>{var R=ie(()=>!!q());return()=>R()&&(()=>{var A=Tt();return pe(A,"click",g,!0),ye(a,A),Z(A,(()=>{var D=ie(()=>!!s().showArrows);return()=>D()&&f.createComponent(Ke,{get direction(){return w()},get canScrollUp(){return s().canScrollUp},get canScrollDown(){return s().canScrollDown},onScrollBy:z})})(),null),Z(A,f.createComponent(Qe,{get direction(){return w()},get thumbSize(){return s().thumbSize},get thumbPosition(){return s().thumbPosition},get isDragging(){return s().isDragging},onMouseDown:_}),null),f.createRenderEffect(()=>G(A,`scrollbar-track ${w()==="horizontal"?"scrollbar-track-horizontal":"scrollbar-track-vertical"} visible`)),A})()})(),null),f.createRenderEffect(R=>{var A=`scrollbar-container ${e.class||""}`,D=e.style;return A!==R.e&&G(v,R.e=A),R.t=gt(v,D,R.t),R},{e:void 0,t:void 0}),v})()]},_t=e=>f.createComponent(Be,{get children(){return f.createComponent(Ct,e)}});se(["click"]);var At=U(`<div><button class=scrollbar-controls-toggle title="Scrollbar Settings"><svg width=14 height=14 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=3></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button><style>
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
      `),Mt=U("<div class=scrollbar-controls-panel><h3 class=scrollbar-controls-title>Scrollbar Settings</h3><div class=control-group><label><input type=checkbox>Enable Engine</label></div><div class=control-group><label>Theme:</label><select><option value=default>Default</option><option value=minimal>Minimal</option><option value=modern>Modern</option></select></div><div class=control-group><label><input type=checkbox>Auto-detect Engine</label></div><div class=control-group><label><input type=checkbox>Keyboard Navigation");const Pt=e=>{const t=_e(),[o,r]=f.createSignal(!1),n=()=>{t.setEngineEnabled(!t.config.engine.enabled)},i=a=>{t.setTheme({name:a})};return(()=>{var a=At(),l=a.firstChild,s=l.nextSibling;return l.$$click=()=>r(!o()),Z(a,(()=>{var u=ie(()=>!!o());return()=>u()&&(()=>{var h=Mt(),w=h.firstChild,E=w.nextSibling,C=E.firstChild,x=C.firstChild,k=E.nextSibling,m=k.firstChild,y=m.nextSibling,S=k.nextSibling,z=S.firstChild,P=z.firstChild,_=S.nextSibling,L=_.firstChild,I=L.firstChild;return x.addEventListener("change",n),y.addEventListener("change",g=>i(g.currentTarget.value)),P.addEventListener("change",g=>t.updateConfig({engine:{...t.config.engine,autoDetect:g.currentTarget.checked}})),I.addEventListener("change",g=>t.updateConfig({accessibility:{...t.config.accessibility,keyboardNavigation:g.currentTarget.checked}})),f.createRenderEffect(()=>x.checked=t.config.engine.enabled),f.createRenderEffect(()=>y.value=t.config.theme.name),f.createRenderEffect(()=>P.checked=t.config.engine.autoDetect),f.createRenderEffect(()=>I.checked=t.config.accessibility.keyboardNavigation),h})()})(),s),f.createRenderEffect(()=>G(a,`scrollbar-controls ${e.class||""}`)),a})()};se(["click"]);const B={base:`
		inline-flex items-center gap-1.5 px-3 py-1
		text-xs font-medium
		backdrop-blur-md border border-solid
		transition-all duration-200 ease-in-out
		relative
	`,variants:{frontend:`
			bg-[rgba(49,120,198,0.15)]
			border-[rgba(49,120,198,0.3)]
			text-[#3178c6]
		`,backend:`
			bg-[rgba(206,66,43,0.15)]
			border-[rgba(206,66,43,0.3)]
			text-[#ce422b]
		`,engine:`
			bg-[rgba(206,66,43,0.15)]
			border-[rgba(206,66,43,0.3)]
			text-[#ce422b]
		`},hover:`
		hover:-translate-y-0.5
		hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
	`,indicator:`
		w-1.5 h-1.5 rounded-full flex-shrink-0 relative
	`,icon:`
		text-sm leading-none h-3.5 -mt-px
	`,status:{loading:`
			bg-[#ff9800]
			animate-pulse
		`,ready:`
			bg-[#4caf50]
			shadow-[0_0_8px_rgba(76,175,80,0.5)]
		`,error:`
			bg-[#f44336]
			animate-pulse
		`}},It=`
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
`;var $t=U("<span role=status><span aria-hidden=true></span><span aria-hidden=true></span><span>");const Lt=e=>(()=>{var t=$t(),o=t.firstChild,r=o.nextSibling,n=r.nextSibling;return t.$$click=()=>e.onClick?e.onClick():void 0,Z(r,()=>e.icon),Z(n,()=>e.label),f.createRenderEffect(i=>{var a=e.class?`${B.base} ${B.variants[e.variant]} ${B.hover} ${e.class}`:`${B.base} ${B.variants[e.variant]} ${B.hover}`,l=e.status,s=e.variant,u=`${e.label} status: ${e.status}`,h=`${B.indicator} ${B.status[e.status]}`.trim(),w=`material-symbols-rounded ${B.icon}`;return a!==i.e&&G(t,i.e=a),l!==i.t&&ge(t,"data-status",i.t=l),s!==i.a&&ge(t,"data-variant",i.a=s),u!==i.o&&ge(t,"aria-label",i.o=u),h!==i.i&&G(o,i.i=h),w!==i.n&&G(r,i.n=w),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),t})();se(["click"]);class Ae{physicsObjectId=null;velocity=0;acceleration=0;zoomLevel=1;isInitialized=!1;async createPhysicsObject(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("create_physics_object",{x:t,y:o});return this.physicsObjectId=r,r}catch(r){throw console.error("Failed to create physics object:",r),r}}async updatePhysicsObject(t,o,r){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("update_physics_object",{id:t,x:o,y:r})}catch(n){throw console.error("Failed to update physics object:",n),n}}async destroyPhysicsObject(t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("destroy_physics_object",{id:t}),this.physicsObjectId===t&&(this.physicsObjectId=null)}catch(o){throw console.error("Failed to destroy physics object:",o),o}}async updateZoomLevel(t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("update_zoom_level",{zoom:t}),this.zoomLevel=t}catch(o){throw console.error("Failed to update zoom level:",o),o}}async screenToWorld(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("screen_to_world",{screenX:t,screenY:o});return{x:r.x,y:r.y}}catch(r){throw console.error("Failed to convert screen to world:",r),r}}async worldToScreen(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("world_to_screen",{worldX:t,worldY:o});return{x:r.x,y:r.y}}catch(r){throw console.error("Failed to convert world to screen:",r),r}}async getEngineState(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const t=await window.__TAURI__.invoke("get_engine_state");return{physicsObjectId:t.physicsObjectId,velocity:t.velocity||this.velocity,acceleration:t.acceleration||this.acceleration,zoomLevel:t.zoomLevel||this.zoomLevel,isInitialized:t.isInitialized||this.isInitialized}}catch(t){return console.error("Failed to get engine state:",t),{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration,zoomLevel:this.zoomLevel,isInitialized:this.isInitialized}}}async isAvailable(){const t=this.isTauriAvailable();return t&&(this.isInitialized=!0),t}async initPhysicsEngine(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("init_physics_engine"),this.isInitialized=!0}catch(t){throw console.error("Failed to initialize physics engine:",t),t}}async calculateScrollbarPhysics(t,o,r,n){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{return await window.__TAURI__.invoke("calculate_scrollbar_physics",{config:t,currentState:o,targetPosition:r,deltaTime:n})}catch(i){throw console.error("Failed to calculate scrollbar physics:",i),i}}async getPhysicsEngineInfo(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{return await window.__TAURI__.invoke("get_physics_engine_info")}catch(t){throw console.error("Failed to get physics engine info:",t),t}}isTauriAvailable(){return typeof window<"u"&&window.__TAURI__!==void 0&&typeof window.__TAURI__.invoke=="function"}}const et=new Ae,jt=Object.freeze(Object.defineProperty({__proto__:null,TauriEngine:Ae,tauriEngine:et},Symbol.toStringTag,{value:"Module"}));function tt(e){var t,o,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(t=0;t<n;t++)e[t]&&(o=tt(e[t]))&&(r&&(r+=" "),r+=o)}else for(o in e)e[o]&&(r&&(r+=" "),r+=o);return r}function Ot(){for(var e,t,o=0,r="",n=arguments.length;o<n;o++)(e=arguments[o])&&(t=tt(e))&&(r&&(r+=" "),r+=t);return r}const Me="-",Rt=e=>{const t=Ft(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:a=>{const l=a.split(Me);return l[0]===""&&l.length!==1&&l.shift(),ot(l,t)||Dt(a)},getConflictingClassGroupIds:(a,l)=>{const s=o[a]||[];return l&&r[a]?[...s,...r[a]]:s}}},ot=(e,t)=>{if(e.length===0)return t.classGroupId;const o=e[0],r=t.nextPart.get(o),n=r?ot(e.slice(1),r):void 0;if(n)return n;if(t.validators.length===0)return;const i=e.join(Me);return t.validators.find(({validator:a})=>a(i))?.classGroupId},De=/^\[(.+)\]$/,Dt=e=>{if(De.test(e)){const t=De.exec(e)[1],o=t?.substring(0,t.indexOf(":"));if(o)return"arbitrary.."+o}},Ft=e=>{const{theme:t,classGroups:o}=e,r={nextPart:new Map,validators:[]};for(const n in o)ze(o[n],r,n,t);return r},ze=(e,t,o,r)=>{e.forEach(n=>{if(typeof n=="string"){const i=n===""?t:Fe(t,n);i.classGroupId=o;return}if(typeof n=="function"){if(Nt(n)){ze(n(r),t,o,r);return}t.validators.push({validator:n,classGroupId:o});return}Object.entries(n).forEach(([i,a])=>{ze(a,Fe(t,i),o,r)})})},Fe=(e,t)=>{let o=e;return t.split(Me).forEach(r=>{o.nextPart.has(r)||o.nextPart.set(r,{nextPart:new Map,validators:[]}),o=o.nextPart.get(r)}),o},Nt=e=>e.isThemeGetter,Gt=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,o=new Map,r=new Map;const n=(i,a)=>{o.set(i,a),t++,t>e&&(t=0,r=o,o=new Map)};return{get(i){let a=o.get(i);if(a!==void 0)return a;if((a=r.get(i))!==void 0)return n(i,a),a},set(i,a){o.has(i)?o.set(i,a):n(i,a)}}},Ee="!",Te=":",Ut=Te.length,Bt=e=>{const{prefix:t,experimentalParseClassName:o}=e;let r=n=>{const i=[];let a=0,l=0,s=0,u;for(let x=0;x<n.length;x++){let k=n[x];if(a===0&&l===0){if(k===Te){i.push(n.slice(s,x)),s=x+Ut;continue}if(k==="/"){u=x;continue}}k==="["?a++:k==="]"?a--:k==="("?l++:k===")"&&l--}const h=i.length===0?n:n.substring(s),w=Vt(h),E=w!==h,C=u&&u>s?u-s:void 0;return{modifiers:i,hasImportantModifier:E,baseClassName:w,maybePostfixModifierPosition:C}};if(t){const n=t+Te,i=r;r=a=>a.startsWith(n)?i(a.substring(n.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:a,maybePostfixModifierPosition:void 0}}if(o){const n=r;r=i=>o({className:i,parseClassName:n})}return r},Vt=e=>e.endsWith(Ee)?e.substring(0,e.length-1):e.startsWith(Ee)?e.substring(1):e,Ht=e=>{const t=Object.fromEntries(e.orderSensitiveModifiers.map(r=>[r,!0]));return r=>{if(r.length<=1)return r;const n=[];let i=[];return r.forEach(a=>{a[0]==="["||t[a]?(n.push(...i.sort(),a),i=[]):i.push(a)}),n.push(...i.sort()),n}},Wt=e=>({cache:Gt(e.cacheSize),parseClassName:Bt(e),sortModifiers:Ht(e),...Rt(e)}),Yt=/\s+/,Zt=(e,t)=>{const{parseClassName:o,getClassGroupId:r,getConflictingClassGroupIds:n,sortModifiers:i}=t,a=[],l=e.trim().split(Yt);let s="";for(let u=l.length-1;u>=0;u-=1){const h=l[u],{isExternal:w,modifiers:E,hasImportantModifier:C,baseClassName:x,maybePostfixModifierPosition:k}=o(h);if(w){s=h+(s.length>0?" "+s:s);continue}let m=!!k,y=r(m?x.substring(0,k):x);if(!y){if(!m){s=h+(s.length>0?" "+s:s);continue}if(y=r(x),!y){s=h+(s.length>0?" "+s:s);continue}m=!1}const S=i(E).join(":"),z=C?S+Ee:S,P=z+y;if(a.includes(P))continue;a.push(P);const _=n(y,m);for(let L=0;L<_.length;++L){const I=_[L];a.push(z+I)}s=h+(s.length>0?" "+s:s)}return s};function qt(){let e=0,t,o,r="";for(;e<arguments.length;)(t=arguments[e++])&&(o=rt(t))&&(r&&(r+=" "),r+=o);return r}const rt=e=>{if(typeof e=="string")return e;let t,o="";for(let r=0;r<e.length;r++)e[r]&&(t=rt(e[r]))&&(o&&(o+=" "),o+=t);return o};function Xt(e,...t){let o,r,n,i=a;function a(s){const u=t.reduce((h,w)=>w(h),e());return o=Wt(u),r=o.cache.get,n=o.cache.set,i=l,l(s)}function l(s){const u=r(s);if(u)return u;const h=Zt(s,o);return n(s,h),h}return function(){return i(qt.apply(null,arguments))}}const T=e=>{const t=o=>o[e]||[];return t.isThemeGetter=!0,t},nt=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,it=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Jt=/^\d+\/\d+$/,Kt=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Qt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,eo=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,to=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,oo=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,te=e=>Jt.test(e),p=e=>!!e&&!Number.isNaN(Number(e)),W=e=>!!e&&Number.isInteger(Number(e)),ve=e=>e.endsWith("%")&&p(e.slice(0,-1)),H=e=>Kt.test(e),ro=()=>!0,no=e=>Qt.test(e)&&!eo.test(e),st=()=>!1,io=e=>to.test(e),so=e=>oo.test(e),ao=e=>!c(e)&&!d(e),lo=e=>oe(e,ct,st),c=e=>nt.test(e),X=e=>oe(e,dt,no),xe=e=>oe(e,bo,p),Ne=e=>oe(e,at,st),co=e=>oe(e,lt,so),ue=e=>oe(e,ut,io),d=e=>it.test(e),ne=e=>re(e,dt),uo=e=>re(e,fo),Ge=e=>re(e,at),ho=e=>re(e,ct),go=e=>re(e,lt),he=e=>re(e,ut,!0),oe=(e,t,o)=>{const r=nt.exec(e);return r?r[1]?t(r[1]):o(r[2]):!1},re=(e,t,o=!1)=>{const r=it.exec(e);return r?r[1]?t(r[1]):o:!1},at=e=>e==="position"||e==="percentage",lt=e=>e==="image"||e==="url",ct=e=>e==="length"||e==="size"||e==="bg-size",dt=e=>e==="length",bo=e=>e==="number",fo=e=>e==="family-name",ut=e=>e==="shadow",mo=()=>{const e=T("color"),t=T("font"),o=T("text"),r=T("font-weight"),n=T("tracking"),i=T("leading"),a=T("breakpoint"),l=T("container"),s=T("spacing"),u=T("radius"),h=T("shadow"),w=T("inset-shadow"),E=T("text-shadow"),C=T("drop-shadow"),x=T("blur"),k=T("perspective"),m=T("aspect"),y=T("ease"),S=T("animate"),z=()=>["auto","avoid","all","avoid-page","page","left","right","column"],P=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],_=()=>[...P(),d,c],L=()=>["auto","hidden","clip","visible","scroll"],I=()=>["auto","contain","none"],g=()=>[d,c,s],$=()=>[te,"full","auto",...g()],q=()=>[W,"none","subgrid",d,c],v=()=>["auto",{span:["full",W,d,c]},W,d,c],O=()=>[W,"auto",d,c],R=()=>["auto","min","max","fr",d,c],A=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],D=()=>["start","end","center","stretch","center-safe","end-safe"],N=()=>["auto",...g()],V=()=>[te,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...g()],b=()=>[e,d,c],Pe=()=>[...P(),Ge,Ne,{position:[d,c]}],Ie=()=>["no-repeat",{repeat:["","x","y","space","round"]}],$e=()=>["auto","cover","contain",ho,lo,{size:[d,c]}],fe=()=>[ve,ne,X],j=()=>["","none","full",u,d,c],F=()=>["",p,ne,X],ae=()=>["solid","dashed","dotted","double"],Le=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],M=()=>[p,ve,Ge,Ne],je=()=>["","none",x,d,c],le=()=>["none",p,d,c],ce=()=>["none",p,d,c],me=()=>[p,d,c],de=()=>[te,"full",...g()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[H],breakpoint:[H],color:[ro],container:[H],"drop-shadow":[H],ease:["in","out","in-out"],font:[ao],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[H],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[H],shadow:[H],spacing:["px",p],text:[H],"text-shadow":[H],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",te,c,d,m]}],container:["container"],columns:[{columns:[p,c,d,l]}],"break-after":[{"break-after":z()}],"break-before":[{"break-before":z()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:_()}],overflow:[{overflow:L()}],"overflow-x":[{"overflow-x":L()}],"overflow-y":[{"overflow-y":L()}],overscroll:[{overscroll:I()}],"overscroll-x":[{"overscroll-x":I()}],"overscroll-y":[{"overscroll-y":I()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:$()}],"inset-x":[{"inset-x":$()}],"inset-y":[{"inset-y":$()}],start:[{start:$()}],end:[{end:$()}],top:[{top:$()}],right:[{right:$()}],bottom:[{bottom:$()}],left:[{left:$()}],visibility:["visible","invisible","collapse"],z:[{z:[W,"auto",d,c]}],basis:[{basis:[te,"full","auto",l,...g()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[p,te,"auto","initial","none",c]}],grow:[{grow:["",p,d,c]}],shrink:[{shrink:["",p,d,c]}],order:[{order:[W,"first","last","none",d,c]}],"grid-cols":[{"grid-cols":q()}],"col-start-end":[{col:v()}],"col-start":[{"col-start":O()}],"col-end":[{"col-end":O()}],"grid-rows":[{"grid-rows":q()}],"row-start-end":[{row:v()}],"row-start":[{"row-start":O()}],"row-end":[{"row-end":O()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":R()}],"auto-rows":[{"auto-rows":R()}],gap:[{gap:g()}],"gap-x":[{"gap-x":g()}],"gap-y":[{"gap-y":g()}],"justify-content":[{justify:[...A(),"normal"]}],"justify-items":[{"justify-items":[...D(),"normal"]}],"justify-self":[{"justify-self":["auto",...D()]}],"align-content":[{content:["normal",...A()]}],"align-items":[{items:[...D(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...D(),{baseline:["","last"]}]}],"place-content":[{"place-content":A()}],"place-items":[{"place-items":[...D(),"baseline"]}],"place-self":[{"place-self":["auto",...D()]}],p:[{p:g()}],px:[{px:g()}],py:[{py:g()}],ps:[{ps:g()}],pe:[{pe:g()}],pt:[{pt:g()}],pr:[{pr:g()}],pb:[{pb:g()}],pl:[{pl:g()}],m:[{m:N()}],mx:[{mx:N()}],my:[{my:N()}],ms:[{ms:N()}],me:[{me:N()}],mt:[{mt:N()}],mr:[{mr:N()}],mb:[{mb:N()}],ml:[{ml:N()}],"space-x":[{"space-x":g()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":g()}],"space-y-reverse":["space-y-reverse"],size:[{size:V()}],w:[{w:[l,"screen",...V()]}],"min-w":[{"min-w":[l,"screen","none",...V()]}],"max-w":[{"max-w":[l,"screen","none","prose",{screen:[a]},...V()]}],h:[{h:["screen","lh",...V()]}],"min-h":[{"min-h":["screen","lh","none",...V()]}],"max-h":[{"max-h":["screen","lh",...V()]}],"font-size":[{text:["base",o,ne,X]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,d,xe]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",ve,c]}],"font-family":[{font:[uo,c,t]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,d,c]}],"line-clamp":[{"line-clamp":[p,"none",d,xe]}],leading:[{leading:[i,...g()]}],"list-image":[{"list-image":["none",d,c]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",d,c]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:b()}],"text-color":[{text:b()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...ae(),"wavy"]}],"text-decoration-thickness":[{decoration:[p,"from-font","auto",d,X]}],"text-decoration-color":[{decoration:b()}],"underline-offset":[{"underline-offset":[p,"auto",d,c]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:g()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",d,c]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",d,c]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:Pe()}],"bg-repeat":[{bg:Ie()}],"bg-size":[{bg:$e()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},W,d,c],radial:["",d,c],conic:[W,d,c]},go,co]}],"bg-color":[{bg:b()}],"gradient-from-pos":[{from:fe()}],"gradient-via-pos":[{via:fe()}],"gradient-to-pos":[{to:fe()}],"gradient-from":[{from:b()}],"gradient-via":[{via:b()}],"gradient-to":[{to:b()}],rounded:[{rounded:j()}],"rounded-s":[{"rounded-s":j()}],"rounded-e":[{"rounded-e":j()}],"rounded-t":[{"rounded-t":j()}],"rounded-r":[{"rounded-r":j()}],"rounded-b":[{"rounded-b":j()}],"rounded-l":[{"rounded-l":j()}],"rounded-ss":[{"rounded-ss":j()}],"rounded-se":[{"rounded-se":j()}],"rounded-ee":[{"rounded-ee":j()}],"rounded-es":[{"rounded-es":j()}],"rounded-tl":[{"rounded-tl":j()}],"rounded-tr":[{"rounded-tr":j()}],"rounded-br":[{"rounded-br":j()}],"rounded-bl":[{"rounded-bl":j()}],"border-w":[{border:F()}],"border-w-x":[{"border-x":F()}],"border-w-y":[{"border-y":F()}],"border-w-s":[{"border-s":F()}],"border-w-e":[{"border-e":F()}],"border-w-t":[{"border-t":F()}],"border-w-r":[{"border-r":F()}],"border-w-b":[{"border-b":F()}],"border-w-l":[{"border-l":F()}],"divide-x":[{"divide-x":F()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":F()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...ae(),"hidden","none"]}],"divide-style":[{divide:[...ae(),"hidden","none"]}],"border-color":[{border:b()}],"border-color-x":[{"border-x":b()}],"border-color-y":[{"border-y":b()}],"border-color-s":[{"border-s":b()}],"border-color-e":[{"border-e":b()}],"border-color-t":[{"border-t":b()}],"border-color-r":[{"border-r":b()}],"border-color-b":[{"border-b":b()}],"border-color-l":[{"border-l":b()}],"divide-color":[{divide:b()}],"outline-style":[{outline:[...ae(),"none","hidden"]}],"outline-offset":[{"outline-offset":[p,d,c]}],"outline-w":[{outline:["",p,ne,X]}],"outline-color":[{outline:b()}],shadow:[{shadow:["","none",h,he,ue]}],"shadow-color":[{shadow:b()}],"inset-shadow":[{"inset-shadow":["none",w,he,ue]}],"inset-shadow-color":[{"inset-shadow":b()}],"ring-w":[{ring:F()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:b()}],"ring-offset-w":[{"ring-offset":[p,X]}],"ring-offset-color":[{"ring-offset":b()}],"inset-ring-w":[{"inset-ring":F()}],"inset-ring-color":[{"inset-ring":b()}],"text-shadow":[{"text-shadow":["none",E,he,ue]}],"text-shadow-color":[{"text-shadow":b()}],opacity:[{opacity:[p,d,c]}],"mix-blend":[{"mix-blend":[...Le(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Le()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[p]}],"mask-image-linear-from-pos":[{"mask-linear-from":M()}],"mask-image-linear-to-pos":[{"mask-linear-to":M()}],"mask-image-linear-from-color":[{"mask-linear-from":b()}],"mask-image-linear-to-color":[{"mask-linear-to":b()}],"mask-image-t-from-pos":[{"mask-t-from":M()}],"mask-image-t-to-pos":[{"mask-t-to":M()}],"mask-image-t-from-color":[{"mask-t-from":b()}],"mask-image-t-to-color":[{"mask-t-to":b()}],"mask-image-r-from-pos":[{"mask-r-from":M()}],"mask-image-r-to-pos":[{"mask-r-to":M()}],"mask-image-r-from-color":[{"mask-r-from":b()}],"mask-image-r-to-color":[{"mask-r-to":b()}],"mask-image-b-from-pos":[{"mask-b-from":M()}],"mask-image-b-to-pos":[{"mask-b-to":M()}],"mask-image-b-from-color":[{"mask-b-from":b()}],"mask-image-b-to-color":[{"mask-b-to":b()}],"mask-image-l-from-pos":[{"mask-l-from":M()}],"mask-image-l-to-pos":[{"mask-l-to":M()}],"mask-image-l-from-color":[{"mask-l-from":b()}],"mask-image-l-to-color":[{"mask-l-to":b()}],"mask-image-x-from-pos":[{"mask-x-from":M()}],"mask-image-x-to-pos":[{"mask-x-to":M()}],"mask-image-x-from-color":[{"mask-x-from":b()}],"mask-image-x-to-color":[{"mask-x-to":b()}],"mask-image-y-from-pos":[{"mask-y-from":M()}],"mask-image-y-to-pos":[{"mask-y-to":M()}],"mask-image-y-from-color":[{"mask-y-from":b()}],"mask-image-y-to-color":[{"mask-y-to":b()}],"mask-image-radial":[{"mask-radial":[d,c]}],"mask-image-radial-from-pos":[{"mask-radial-from":M()}],"mask-image-radial-to-pos":[{"mask-radial-to":M()}],"mask-image-radial-from-color":[{"mask-radial-from":b()}],"mask-image-radial-to-color":[{"mask-radial-to":b()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":P()}],"mask-image-conic-pos":[{"mask-conic":[p]}],"mask-image-conic-from-pos":[{"mask-conic-from":M()}],"mask-image-conic-to-pos":[{"mask-conic-to":M()}],"mask-image-conic-from-color":[{"mask-conic-from":b()}],"mask-image-conic-to-color":[{"mask-conic-to":b()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:Pe()}],"mask-repeat":[{mask:Ie()}],"mask-size":[{mask:$e()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",d,c]}],filter:[{filter:["","none",d,c]}],blur:[{blur:je()}],brightness:[{brightness:[p,d,c]}],contrast:[{contrast:[p,d,c]}],"drop-shadow":[{"drop-shadow":["","none",C,he,ue]}],"drop-shadow-color":[{"drop-shadow":b()}],grayscale:[{grayscale:["",p,d,c]}],"hue-rotate":[{"hue-rotate":[p,d,c]}],invert:[{invert:["",p,d,c]}],saturate:[{saturate:[p,d,c]}],sepia:[{sepia:["",p,d,c]}],"backdrop-filter":[{"backdrop-filter":["","none",d,c]}],"backdrop-blur":[{"backdrop-blur":je()}],"backdrop-brightness":[{"backdrop-brightness":[p,d,c]}],"backdrop-contrast":[{"backdrop-contrast":[p,d,c]}],"backdrop-grayscale":[{"backdrop-grayscale":["",p,d,c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[p,d,c]}],"backdrop-invert":[{"backdrop-invert":["",p,d,c]}],"backdrop-opacity":[{"backdrop-opacity":[p,d,c]}],"backdrop-saturate":[{"backdrop-saturate":[p,d,c]}],"backdrop-sepia":[{"backdrop-sepia":["",p,d,c]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":g()}],"border-spacing-x":[{"border-spacing-x":g()}],"border-spacing-y":[{"border-spacing-y":g()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",d,c]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[p,"initial",d,c]}],ease:[{ease:["linear","initial",y,d,c]}],delay:[{delay:[p,d,c]}],animate:[{animate:["none",S,d,c]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[k,d,c]}],"perspective-origin":[{"perspective-origin":_()}],rotate:[{rotate:le()}],"rotate-x":[{"rotate-x":le()}],"rotate-y":[{"rotate-y":le()}],"rotate-z":[{"rotate-z":le()}],scale:[{scale:ce()}],"scale-x":[{"scale-x":ce()}],"scale-y":[{"scale-y":ce()}],"scale-z":[{"scale-z":ce()}],"scale-3d":["scale-3d"],skew:[{skew:me()}],"skew-x":[{"skew-x":me()}],"skew-y":[{"skew-y":me()}],transform:[{transform:[d,c,"","none","gpu","cpu"]}],"transform-origin":[{origin:_()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:de()}],"translate-x":[{"translate-x":de()}],"translate-y":[{"translate-y":de()}],"translate-z":[{"translate-z":de()}],"translate-none":["translate-none"],accent:[{accent:b()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:b()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",d,c]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":g()}],"scroll-mx":[{"scroll-mx":g()}],"scroll-my":[{"scroll-my":g()}],"scroll-ms":[{"scroll-ms":g()}],"scroll-me":[{"scroll-me":g()}],"scroll-mt":[{"scroll-mt":g()}],"scroll-mr":[{"scroll-mr":g()}],"scroll-mb":[{"scroll-mb":g()}],"scroll-ml":[{"scroll-ml":g()}],"scroll-p":[{"scroll-p":g()}],"scroll-px":[{"scroll-px":g()}],"scroll-py":[{"scroll-py":g()}],"scroll-ps":[{"scroll-ps":g()}],"scroll-pe":[{"scroll-pe":g()}],"scroll-pt":[{"scroll-pt":g()}],"scroll-pr":[{"scroll-pr":g()}],"scroll-pb":[{"scroll-pb":g()}],"scroll-pl":[{"scroll-pl":g()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",d,c]}],fill:[{fill:["none",...b()]}],"stroke-w":[{stroke:[p,ne,X,xe]}],stroke:[{stroke:["none",...b()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},po=Xt(mo);function yo(...e){return po(Ot(e))}exports.EngineManager=We;exports.MockEngine=He;exports.Scrollbar=_t;exports.ScrollbarArrows=Ke;exports.ScrollbarControls=Pt;exports.ScrollbarProvider=Be;exports.ScrollbarThumb=Qe;exports.TauriEngine=Ae;exports.TechChip=Lt;exports.animations=It;exports.cn=yo;exports.getCurrentEngine=J;exports.getEngineManager=Ye;exports.mockEngine=Se;exports.scrollbarConfig=Y;exports.scrollbarStyles=Ve;exports.tauriEngine=et;exports.techChipStyles=B;exports.useScrollbarConfig=_e;exports.useScrollbarHandlers=Ze;exports.useScrollbarLogic=qe;exports.useScrollbarObservers=Xe;exports.useScrollbarState=Je;
//# sourceMappingURL=index.cjs.map
