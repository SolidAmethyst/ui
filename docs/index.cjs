"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const f=require("solid-js"),ie=e=>f.createMemo(()=>e());function ht(e,t,o){let r=o.length,n=t.length,i=r,s=0,l=0,a=t[n-1].nextSibling,c=null;for(;s<n||l<i;){if(t[s]===o[l]){s++,l++;continue}for(;t[n-1]===o[i-1];)n--,i--;if(n===s){const h=i<r?l?o[l-1].nextSibling:o[i-l]:a;for(;l<i;)e.insertBefore(o[l++],h)}else if(i===l)for(;s<n;)(!c||!c.has(t[s]))&&t[s].remove(),s++;else if(t[s]===o[i-1]&&o[l]===t[n-1]){const h=t[--n].nextSibling;e.insertBefore(o[l++],t[s++].nextSibling),e.insertBefore(o[--i],h),t[n]=o[i]}else{if(!c){c=new Map;let w=l;for(;w<i;)c.set(o[w],w++)}const h=c.get(t[s]);if(h!=null)if(l<h&&h<i){let w=s,S=1,P;for(;++w<n&&w<i&&!((P=c.get(t[w]))==null||P!==h+S);)S++;if(S>h-l){const z=t[s];for(;l<h;)e.insertBefore(o[l++],z)}else e.replaceChild(o[l++],t[s++])}else s++;else t[s++].remove()}}}const Oe="_$DX_DELEGATE";function G(e,t,o,r){let n;const i=()=>{const l=document.createElement("template");return l.innerHTML=e,l.content.firstChild},s=()=>(n||(n=i())).cloneNode(!0);return s.cloneNode=s,s}function se(e,t=window.document){const o=t[Oe]||(t[Oe]=new Set);for(let r=0,n=e.length;r<n;r++){const i=e[r];o.has(i)||(o.add(i),t.addEventListener(i,bt))}}function ge(e,t,o){Ce(e)||(o==null?e.removeAttribute(t):e.setAttribute(t,o))}function N(e,t){Ce(e)||(t==null?e.removeAttribute("class"):e.className=t)}function be(e,t,o,r){if(r)Array.isArray(o)?(e[`$$${t}`]=o[0],e[`$$${t}Data`]=o[1]):e[`$$${t}`]=o;else if(Array.isArray(o)){const n=o[0];e.addEventListener(t,o[0]=i=>n.call(e,o[1],i))}else e.addEventListener(t,o,typeof o!="function"&&o)}function gt(e,t,o){if(!t)return o?ge(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof o=="string"&&(r.cssText=o=void 0),o||(o={}),t||(t={});let n,i;for(i in o)t[i]==null&&r.removeProperty(i),delete o[i];for(i in t)n=t[i],n!==o[i]&&(r.setProperty(i,n),o[i]=n);return o}function K(e,t,o){o!=null?e.style.setProperty(t,o):e.style.removeProperty(t)}function ye(e,t,o){return f.untrack(()=>e(t,o))}function Y(e,t,o,r){if(o!==void 0&&!r&&(r=[]),typeof t!="function")return fe(e,t,r,o);f.createRenderEffect(n=>fe(e,t(),n,o),r)}function Ce(e){return!!f.sharedConfig.context&&!f.sharedConfig.done&&(!e||e.isConnected)}function bt(e){if(f.sharedConfig.registry&&f.sharedConfig.events&&f.sharedConfig.events.find(([a,c])=>c===e))return;let t=e.target;const o=`$$${e.type}`,r=e.target,n=e.currentTarget,i=a=>Object.defineProperty(e,"target",{configurable:!0,value:a}),s=()=>{const a=t[o];if(a&&!t.disabled){const c=t[`${o}Data`];if(c!==void 0?a.call(t,c,e):a.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&i(t.host),!0},l=()=>{for(;s()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),f.sharedConfig.registry&&!f.sharedConfig.done&&(f.sharedConfig.done=_$HY.done=!0),e.composedPath){const a=e.composedPath();i(a[0]);for(let c=0;c<a.length-2&&(t=a[c],!!s());c++){if(t._$host){t=t._$host,l();break}if(t.parentNode===n)break}}else l();i(r)}function fe(e,t,o,r,n){const i=Ce(e);if(i){!o&&(o=[...e.childNodes]);let a=[];for(let c=0;c<o.length;c++){const h=o[c];h.nodeType===8&&h.data.slice(0,2)==="!$"?h.remove():a.push(h)}o=a}for(;typeof o=="function";)o=o();if(t===o)return o;const s=typeof t,l=r!==void 0;if(e=l&&o[0]&&o[0].parentNode||e,s==="string"||s==="number"){if(i||s==="number"&&(t=t.toString(),t===o))return o;if(l){let a=o[0];a&&a.nodeType===3?a.data!==t&&(a.data=t):a=document.createTextNode(t),o=Q(e,o,r,a)}else o!==""&&typeof o=="string"?o=e.firstChild.data=t:o=e.textContent=t}else if(t==null||s==="boolean"){if(i)return o;o=Q(e,o,r)}else{if(s==="function")return f.createRenderEffect(()=>{let a=t();for(;typeof a=="function";)a=a();o=fe(e,a,o,r)}),()=>o;if(Array.isArray(t)){const a=[],c=o&&Array.isArray(o);if(ke(a,t,o,n))return f.createRenderEffect(()=>o=fe(e,a,o,r,!0)),()=>o;if(i){if(!a.length)return o;if(r===void 0)return o=[...e.childNodes];let h=a[0];if(h.parentNode!==e)return o;const w=[h];for(;(h=h.nextSibling)!==r;)w.push(h);return o=w}if(a.length===0){if(o=Q(e,o,r),l)return o}else c?o.length===0?Re(e,a,r):ht(e,o,a):(o&&Q(e),Re(e,a));o=a}else if(t.nodeType){if(i&&t.parentNode)return o=l?[t]:t;if(Array.isArray(o)){if(l)return o=Q(e,o,r,t);Q(e,o,null,t)}else o==null||o===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);o=t}}return o}function ke(e,t,o,r){let n=!1;for(let i=0,s=t.length;i<s;i++){let l=t[i],a=o&&o[e.length],c;if(!(l==null||l===!0||l===!1))if((c=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))n=ke(e,l,a)||n;else if(c==="function")if(r){for(;typeof l=="function";)l=l();n=ke(e,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||n}else e.push(l),n=!0;else{const h=String(l);a&&a.nodeType===3&&a.data===h?e.push(a):e.push(document.createTextNode(h))}}return n}function Re(e,t,o=null){for(let r=0,n=t.length;r<n;r++)e.insertBefore(t[r],o)}function Q(e,t,o,r){if(o===void 0)return e.textContent="";const n=r||document.createTextNode("");if(t.length){let i=!1;for(let s=t.length-1;s>=0;s--){const l=t[s];if(n!==l){const a=l.parentNode===e;!i&&!s?a?e.replaceChild(n,l):e.insertBefore(n,o):a&&l.remove()}else i=!0}}else e.insertBefore(n,o);return[n]}const ft={engine:{enabled:!0,autoDetect:!0,fallbackToJS:!0},theme:{name:"default"},performance:{useRequestAnimationFrame:!0,debounceMs:16,throttleMs:8},accessibility:{keyboardNavigation:!0,screenReaderSupport:!0,highContrast:!1}};class mt{config=ft;listeners=new Set;getConfig(){return{...this.config}}updateConfig(t){this.config={...this.config,...t},this.notifyListeners()}setEngineEnabled(t){this.updateConfig({engine:{...this.config.engine,enabled:t}})}setTheme(t){this.updateConfig({theme:t})}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notifyListeners(){this.listeners.forEach(t=>t(this.config))}async detectEngineAvailability(){return!1}async initialize(){if(this.config.engine.autoDetect){const t=await this.detectEngineAvailability();this.setEngineEnabled(t)}}}const W=new mt;W.initialize();const Ue=f.createContext(),Be=e=>{const[t,o]=f.createSignal(W.getConfig());f.onMount(()=>{const n=W.subscribe(o);e.config&&W.updateConfig(e.config),f.onCleanup(n)});const r={get config(){return t()},setEngineEnabled:n=>{W.setEngineEnabled(n)},setTheme:n=>{W.setTheme(n)},updateConfig:n=>{W.updateConfig(n)}};return f.createComponent(Ue.Provider,{value:r,get children(){return e.children}})},_e=()=>{const e=f.useContext(Ue);if(!e)throw new Error("useScrollbarConfig must be used within ScrollbarProvider");return e},Ve=`
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
`;function pt(){return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--zoom-level")||"1")}function ee(e){return e/pt()}class He{physicsObjectId=null;velocity=0;acceleration=0;zoomLevel=1;isInitialized=!1;async createPhysicsObject(t,o){const r=Math.random()*1e3;return this.physicsObjectId=r,r}async updatePhysicsObject(t,o,r){this.physicsObjectId===t&&(this.velocity=Math.random()*.1)}async destroyPhysicsObject(t){this.physicsObjectId===t&&(this.physicsObjectId=null)}async updateZoomLevel(t){this.zoomLevel=t}async screenToWorld(t,o){return{x:t,y:o}}async worldToScreen(t,o){return{x:t,y:o}}async getEngineState(){return{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration,zoomLevel:this.zoomLevel,isInitialized:this.isInitialized}}async isAvailable(){return this.isInitialized=!0,!0}}const Se=new He;class We{currentEngine=null;config;isInitialized=!1;constructor(t){this.config=t}async initialize(){if(!this.isInitialized)try{this.config.enabled&&this.config.autoDetect&&await this.detectTauriEngine()&&(this.currentEngine=await this.loadTauriEngine()),this.currentEngine||(this.currentEngine=Se),this.isInitialized=!0}catch(t){console.warn("Failed to initialize engine, falling back to mock:",t),this.currentEngine=Se,this.isInitialized=!0}}async getEngine(){return this.isInitialized||await this.initialize(),this.currentEngine}async detectTauriEngine(){if(typeof window>"u"||!window.__TAURI__||typeof window.__TAURI__.invoke!="function")return!1;try{return await(await this.loadTauriEngine()).isAvailable()}catch{return!1}}async loadTauriEngine(){try{const{tauriEngine:t}=await Promise.resolve().then(()=>jt);if(this.config.physicsEnabled)try{const o=t;o.initPhysicsEngine&&(await o.initPhysicsEngine(),console.log("Physics engine DLL initialized successfully"))}catch(o){console.warn("Failed to initialize physics engine DLL:",o)}return t}catch(t){throw console.warn("Failed to load Tauri engine:",t),t}}updateConfig(t){this.config={...this.config,...t},this.isInitialized=!1}getConfig(){return{...this.config}}}let we=null;function Ye(e){return we||(we=new We(e||{enabled:!0,autoDetect:!0,fallbackToJS:!0,physicsEnabled:!0,zoomEnabled:!0})),we}async function J(){return await Ye().getEngine()}class yt{physicsObjectId=null;velocity=0;acceleration=0;async createPhysicsObject(t,o){try{const n=await(await J()).createPhysicsObject(t,o);return this.physicsObjectId=n,n}catch(r){console.warn("Failed to create physics object, using fallback:",r);const n=Math.random()*1e3;return this.physicsObjectId=n,n}}async updatePhysicsObject(t,o){if(this.physicsObjectId)try{await(await J()).updatePhysicsObject(this.physicsObjectId,t,o)}catch(r){console.warn("Failed to update physics object:",r)}}async updateZoomLevel(t){try{await(await J()).updateZoomLevel(t)}catch(o){console.warn("Failed to update zoom level:",o)}}async getEngineState(){try{const o=await(await J()).getEngineState();return{physicsObjectId:o.physicsObjectId,velocity:o.velocity,acceleration:o.acceleration}}catch(t){return console.warn("Failed to get engine state, using local state:",t),{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration}}}setVelocity(t){this.velocity=t}setAcceleration(t){this.acceleration=t}async calculateScrollbarPhysics(t,o,r,n){try{const i=await J();return"calculateScrollbarPhysics"in i?await i.calculateScrollbarPhysics(t,o,r,n):this.simplePhysicsCalculation(t,o,r,n)}catch(i){return console.warn("Failed to calculate scrollbar physics, using fallback:",i),this.simplePhysicsCalculation(t,o,r,n)}}simplePhysicsCalculation(t,o,r,n){const i={...o},s=-t.stiffness*(i.position-r),l=-t.damping*i.velocity,a=s+l;return i.acceleration=a/t.mass,i.velocity+=i.acceleration*n,i.velocity=Math.max(-t.max_velocity,Math.min(t.max_velocity,i.velocity)),i.position+=i.velocity*n,i}async getPhysicsEngineInfo(){try{const t=await J();return"getPhysicsEngineInfo"in t?await t.getPhysicsEngineInfo():"Mock Physics Engine - No DLL available"}catch(t){return console.warn("Failed to get physics engine info:",t),"Mock Physics Engine - Error occurred"}}}function Ze(e,t,o,r,n,i,s,l,a){const c=new yt;return{scrollBy:m=>{if(!n())return;const y=m*3;o()==="horizontal"?n().scrollLeft+=y:n().scrollTop+=y},handleWheel:m=>{if(!n())return;m.preventDefault();let y,T;o()==="horizontal"?(y=m.deltaY,T=!0):(y=(m.shiftKey,m.deltaY),T=m.shiftKey);const x=y*.5;T?n().scrollLeft+=x:n().scrollTop+=x,a&&setTimeout(a,0)},handleThumbMouseDown:async m=>{m.preventDefault(),m.stopPropagation();const y=i().getBoundingClientRect(),T=o()==="horizontal"?ee(m.clientX-y.left):ee(m.clientY-y.top),x=e().thumbPosition+e().thumbSize/2,_=T-x;t(A=>({...A,isDragging:!0,dragOffset:_})),l()&&await c.createPhysicsObject(T,0),document.body.style.userSelect="none"},handleMouseMove:async m=>{if(!e().isDragging||!i()||!n())return;m.preventDefault();const y=i().getBoundingClientRect(),T=o()==="horizontal"?ee(m.clientX-y.left):ee(m.clientY-y.top);l()&&await c.updatePhysicsObject(T,0);const _=T-e().dragOffset-e().thumbSize/2,A=e().showArrows?12:0,L=(o()==="horizontal"?i().clientWidth:i().clientHeight)-A*2,g=L-e().thumbSize,I=Math.max(A,Math.min(_,g+A));t(D=>({...D,thumbPosition:I}));const Z=o()==="horizontal"?i().clientWidth:i().clientHeight,U=(o()==="horizontal"?n().scrollWidth:n().scrollHeight)-Z,k=I-A,R=L-e().thumbSize,E=Math.max(0,Math.min(1,k/R))*U;o()==="horizontal"?n().scrollLeft=E:n().scrollTop=E},handleMouseUp:()=>{t(m=>({...m,isDragging:!1,dragOffset:0})),document.body.style.userSelect=""},handleTrackClick:m=>{if(!i()||!n()||!s()||m.target===s())return;const y=i().getBoundingClientRect(),T=o()==="horizontal"?ee(m.clientX-y.left):ee(m.clientY-y.top),x=e().showArrows?12:0,_=(o()==="horizontal"?i().clientWidth:i().clientHeight)-x*2,O=T-x-e().thumbSize/2,L=_-e().thumbSize,g=Math.max(0,Math.min(O,L))+x;t($=>({...$,thumbPosition:g}));const I=o()==="horizontal"?i().clientWidth:i().clientHeight,q=(o()==="horizontal"?n().scrollWidth:n().scrollHeight)-I,U=g-x,R=Math.max(0,Math.min(1,U/L))*q;o()==="horizontal"?n().scrollLeft=R:n().scrollTop=R}}}function qe(e,t,o,r,n,i,s){const l=()=>{if(!r()||!n())return;const c=o()==="horizontal"?r().clientWidth:r().clientHeight,h=o()==="horizontal"?n().scrollWidth:n().scrollHeight;if(!(h>c)){t(x=>({...x,isVisible:!1}));return}const S=o()==="horizontal"?n().scrollLeft:n().scrollTop,P=h-c,z=o()==="horizontal"?i()?.clientWidth??0:i()?.clientHeight??0,v=e().showArrows?12:0,m=z-v*2,y=Math.max(20,m*c/h),T=e().isDragging?e().thumbPosition:Math.max(v,Math.min(v+S/P*(m-y),m-y+v));t(x=>({...x,isVisible:!0,thumbSize:y,thumbPosition:T,canScrollUp:S>0,canScrollDown:S<P}))};return{updateScrollbar:l,handleScroll:()=>{e().isDragging||l()}}}function Xe(e,t,o){return{setupObservers:()=>{if(!e()||!t())return;const n=new ResizeObserver(()=>{o()});n.observe(t()),n.observe(e());const i=new MutationObserver(()=>{o(),setTimeout(o,10)});return i.observe(t(),{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style","class"]}),()=>{n.disconnect(),i.disconnect()}}}}function Je(e){const t=_e(),[o,r]=f.createSignal({thumbSize:20,thumbPosition:0,isVisible:!1,isDragging:!1,dragOffset:0,showArrows:e.showArrows??!0,canScrollUp:!1,canScrollDown:!1}),[n,i]=f.createSignal(!1),[s,l]=f.createSignal(null),a=()=>e.direction??"vertical",c=()=>e.theme??t.config.theme.name,h=()=>e.autoHide??!0,w=()=>e.minThumbSize??4,S=()=>e.engineIntegration!==void 0?e.engineIntegration&&t.config.engine.enabled:t.config.engine.enabled,P=()=>{i(!0);const v=s();v&&(clearTimeout(v),l(null))},z=()=>{if(i(!1),h()){const v=setTimeout(()=>{r(m=>({...m,isVisible:!1}))},800);l(v)}};return f.onCleanup(()=>{const v=s();v&&clearTimeout(v)}),{state:o,setState:r,isHovered:n,setIsHovered:i,hideTimeout:s,setHideTimeout:l,direction:a,theme:c,autoHide:h,minThumbSize:w,engineIntegration:S,handleMouseEnter:P,handleMouseLeave:z}}var wt=G('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z">'),vt=G('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z">'),xt=G('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">'),kt=G('<button><svg width=12 height=12 viewBox="0 0 24 24"fill=currentColor><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z">');const Ke=e=>{const t=(o,r)=>{o.stopPropagation(),e.onScrollBy(r)};return ie(()=>ie(()=>e.direction==="vertical")()?[(()=>{var o=wt();return o.$$click=r=>t(r,-50),f.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-up ${e.canScrollUp?"":"disabled"}`,i=!e.canScrollUp;return n!==r.e&&N(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})(),(()=>{var o=vt();return o.$$click=r=>t(r,50),f.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-down ${e.canScrollDown?"":"disabled"}`,i=!e.canScrollDown;return n!==r.e&&N(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})()]:[(()=>{var o=xt();return o.$$click=r=>t(r,-50),f.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-left ${e.canScrollUp?"":"disabled"}`,i=!e.canScrollUp;return n!==r.e&&N(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})(),(()=>{var o=kt();return o.$$click=r=>t(r,50),f.createRenderEffect(r=>{var n=`scrollbar-arrow scrollbar-arrow-right ${e.canScrollDown?"":"disabled"}`,i=!e.canScrollDown;return n!==r.e&&N(o,r.e=n),i!==r.t&&(o.disabled=r.t=i),r},{e:void 0,t:void 0}),o})()])};se(["click"]);var St=G("<div>");const Qe=e=>(()=>{var t=St();return be(t,"mousedown",e.onMouseDown,!0),f.createRenderEffect(o=>{var r=`scrollbar-thumb ${e.isDragging?"dragging":""}`,n=e.direction==="horizontal"?`${Math.max(1,e.thumbSize)}px`:"4px",i=e.direction==="horizontal"?"4px":`${Math.max(1,e.thumbSize)}px`,s=e.direction==="horizontal"?`${e.thumbPosition}px`:"auto",l=e.direction==="horizontal"?"50%":`${e.thumbPosition}px`,a=e.direction==="horizontal"?"auto":"4px",c=e.direction==="horizontal"?"translateY(-50%)":"none";return r!==o.e&&N(t,o.e=r),n!==o.t&&K(t,"width",o.t=n),i!==o.a&&K(t,"height",o.a=i),s!==o.o&&K(t,"left",o.o=s),l!==o.i&&K(t,"top",o.i=l),a!==o.n&&K(t,"right",o.n=a),c!==o.s&&K(t,"transform",o.s=c),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),t})();se(["mousedown"]);var zt=G("<style>"),Tt=G("<div><div class=scrollbar-content style=overflow-y:hidden;overflow-x:hidden>"),Et=G("<div>");const Ct=e=>{const[t,o]=f.createSignal(),[r,n]=f.createSignal(),[i,s]=f.createSignal(),[l,a]=f.createSignal(),{state:c,setState:h,isHovered:w,direction:S,theme:P,autoHide:z,minThumbSize:v,engineIntegration:m,handleMouseEnter:y,handleMouseLeave:T}=Je(e),{updateScrollbar:x,handleScroll:_}=qe(c,h,S,t,r,i),{scrollBy:A,handleWheel:O,handleThumbMouseDown:L,handleMouseMove:g,handleMouseUp:I,handleTrackClick:Z}=Ze(c,h,S,t,r,i,l,m,x),{setupObservers:q}=Xe(t,r,x),U=()=>c().isVisible&&(w()||!z()||c().isDragging);return f.onMount(()=>{const k=()=>{x()};k(),setTimeout(k,0),setTimeout(k,50),setTimeout(k,100),setTimeout(k,200),setTimeout(k,500),setTimeout(k,1e3),setTimeout(k,2e3),r()&&r().addEventListener("scroll",_);const R=q();document.addEventListener("mousemove",g),document.addEventListener("mouseup",I),f.onCleanup(()=>{R?.(),r()&&r().removeEventListener("scroll",_),document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",I)})}),[(()=>{var k=zt();return Y(k,Ve),k})(),(()=>{var k=Tt(),R=k.firstChild;return be(k,"wheel",O),be(k,"mouseleave",T),k.addEventListener("mouseenter",()=>{y(),x()}),ye(o,k),ye(n,R),Y(R,()=>e.children),Y(k,(()=>{var $=ie(()=>!!U());return()=>$()&&(()=>{var E=Et();return be(E,"click",Z,!0),ye(s,E),Y(E,(()=>{var D=ie(()=>!!c().showArrows);return()=>D()&&f.createComponent(Ke,{get direction(){return S()},get canScrollUp(){return c().canScrollUp},get canScrollDown(){return c().canScrollDown},onScrollBy:A})})(),null),Y(E,f.createComponent(Qe,{get direction(){return S()},get thumbSize(){return c().thumbSize},get thumbPosition(){return c().thumbPosition},get isDragging(){return c().isDragging},onMouseDown:L}),null),f.createRenderEffect(()=>N(E,`scrollbar-track ${S()==="horizontal"?"scrollbar-track-horizontal":"scrollbar-track-vertical"} visible`)),E})()})(),null),f.createRenderEffect($=>{var E=`scrollbar-container ${e.class||""}`,D=e.style;return E!==$.e&&N(k,$.e=E),$.t=gt(k,D,$.t),$},{e:void 0,t:void 0}),k})()]},_t=e=>f.createComponent(Be,{get children(){return f.createComponent(Ct,e)}});se(["click"]);var At=G(`<div><button class=scrollbar-controls-toggle title="Scrollbar Settings"><svg width=14 height=14 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=3></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button><style>
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
      `),Mt=G("<div class=scrollbar-controls-panel><h3 class=scrollbar-controls-title>Scrollbar Settings</h3><div class=control-group><label><input type=checkbox>Enable Engine</label></div><div class=control-group><label>Theme:</label><select><option value=default>Default</option><option value=minimal>Minimal</option><option value=modern>Modern</option></select></div><div class=control-group><label><input type=checkbox>Auto-detect Engine</label></div><div class=control-group><label><input type=checkbox>Keyboard Navigation");const Pt=e=>{const t=_e(),[o,r]=f.createSignal(!1),n=()=>{t.setEngineEnabled(!t.config.engine.enabled)},i=s=>{t.setTheme({name:s})};return(()=>{var s=At(),l=s.firstChild,a=l.nextSibling;return l.$$click=()=>r(!o()),Y(s,(()=>{var c=ie(()=>!!o());return()=>c()&&(()=>{var h=Mt(),w=h.firstChild,S=w.nextSibling,P=S.firstChild,z=P.firstChild,v=S.nextSibling,m=v.firstChild,y=m.nextSibling,T=v.nextSibling,x=T.firstChild,_=x.firstChild,A=T.nextSibling,O=A.firstChild,L=O.firstChild;return z.addEventListener("change",n),y.addEventListener("change",g=>i(g.currentTarget.value)),_.addEventListener("change",g=>t.updateConfig({engine:{...t.config.engine,autoDetect:g.currentTarget.checked}})),L.addEventListener("change",g=>t.updateConfig({accessibility:{...t.config.accessibility,keyboardNavigation:g.currentTarget.checked}})),f.createRenderEffect(()=>z.checked=t.config.engine.enabled),f.createRenderEffect(()=>y.value=t.config.theme.name),f.createRenderEffect(()=>_.checked=t.config.engine.autoDetect),f.createRenderEffect(()=>L.checked=t.config.accessibility.keyboardNavigation),h})()})(),a),f.createRenderEffect(()=>N(s,`scrollbar-controls ${e.class||""}`)),s})()};se(["click"]);const B={base:`
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
`;var $t=G("<span role=status><span aria-hidden=true></span><span aria-hidden=true></span><span>");const Lt=e=>(()=>{var t=$t(),o=t.firstChild,r=o.nextSibling,n=r.nextSibling;return t.$$click=()=>e.onClick?e.onClick():void 0,Y(r,()=>e.icon),Y(n,()=>e.label),f.createRenderEffect(i=>{var s=e.class?`${B.base} ${B.variants[e.variant]} ${B.hover} ${e.class}`:`${B.base} ${B.variants[e.variant]} ${B.hover}`,l=e.status,a=e.variant,c=`${e.label} status: ${e.status}`,h=`${B.indicator} ${B.status[e.status]}`.trim(),w=`material-symbols-rounded ${B.icon}`;return s!==i.e&&N(t,i.e=s),l!==i.t&&ge(t,"data-status",i.t=l),a!==i.a&&ge(t,"data-variant",i.a=a),c!==i.o&&ge(t,"aria-label",i.o=c),h!==i.i&&N(o,i.i=h),w!==i.n&&N(r,i.n=w),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),t})();se(["click"]);class Ae{physicsObjectId=null;velocity=0;acceleration=0;zoomLevel=1;isInitialized=!1;async createPhysicsObject(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("create_physics_object",{x:t,y:o});return this.physicsObjectId=r,r}catch(r){throw console.error("Failed to create physics object:",r),r}}async updatePhysicsObject(t,o,r){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("update_physics_object",{id:t,x:o,y:r})}catch(n){throw console.error("Failed to update physics object:",n),n}}async destroyPhysicsObject(t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("destroy_physics_object",{id:t}),this.physicsObjectId===t&&(this.physicsObjectId=null)}catch(o){throw console.error("Failed to destroy physics object:",o),o}}async updateZoomLevel(t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("update_zoom_level",{zoom:t}),this.zoomLevel=t}catch(o){throw console.error("Failed to update zoom level:",o),o}}async screenToWorld(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("screen_to_world",{screenX:t,screenY:o});return{x:r.x,y:r.y}}catch(r){throw console.error("Failed to convert screen to world:",r),r}}async worldToScreen(t,o){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const r=await window.__TAURI__.invoke("world_to_screen",{worldX:t,worldY:o});return{x:r.x,y:r.y}}catch(r){throw console.error("Failed to convert world to screen:",r),r}}async getEngineState(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{const t=await window.__TAURI__.invoke("get_engine_state");return{physicsObjectId:t.physicsObjectId,velocity:t.velocity||this.velocity,acceleration:t.acceleration||this.acceleration,zoomLevel:t.zoomLevel||this.zoomLevel,isInitialized:t.isInitialized||this.isInitialized}}catch(t){return console.error("Failed to get engine state:",t),{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration,zoomLevel:this.zoomLevel,isInitialized:this.isInitialized}}}async isAvailable(){const t=this.isTauriAvailable();return t&&(this.isInitialized=!0),t}async initPhysicsEngine(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("init_physics_engine"),this.isInitialized=!0}catch(t){throw console.error("Failed to initialize physics engine:",t),t}}async calculateScrollbarPhysics(t,o,r,n){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{return await window.__TAURI__.invoke("calculate_scrollbar_physics",{config:t,currentState:o,targetPosition:r,deltaTime:n})}catch(i){throw console.error("Failed to calculate scrollbar physics:",i),i}}async getPhysicsEngineInfo(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{return await window.__TAURI__.invoke("get_physics_engine_info")}catch(t){throw console.error("Failed to get physics engine info:",t),t}}isTauriAvailable(){return typeof window<"u"&&window.__TAURI__!==void 0&&typeof window.__TAURI__.invoke=="function"}}const et=new Ae,jt=Object.freeze(Object.defineProperty({__proto__:null,TauriEngine:Ae,tauriEngine:et},Symbol.toStringTag,{value:"Module"}));function tt(e){var t,o,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(t=0;t<n;t++)e[t]&&(o=tt(e[t]))&&(r&&(r+=" "),r+=o)}else for(o in e)e[o]&&(r&&(r+=" "),r+=o);return r}function Ot(){for(var e,t,o=0,r="",n=arguments.length;o<n;o++)(e=arguments[o])&&(t=tt(e))&&(r&&(r+=" "),r+=t);return r}const Me="-",Rt=e=>{const t=Ft(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:s=>{const l=s.split(Me);return l[0]===""&&l.length!==1&&l.shift(),ot(l,t)||Dt(s)},getConflictingClassGroupIds:(s,l)=>{const a=o[s]||[];return l&&r[s]?[...a,...r[s]]:a}}},ot=(e,t)=>{if(e.length===0)return t.classGroupId;const o=e[0],r=t.nextPart.get(o),n=r?ot(e.slice(1),r):void 0;if(n)return n;if(t.validators.length===0)return;const i=e.join(Me);return t.validators.find(({validator:s})=>s(i))?.classGroupId},De=/^\[(.+)\]$/,Dt=e=>{if(De.test(e)){const t=De.exec(e)[1],o=t?.substring(0,t.indexOf(":"));if(o)return"arbitrary.."+o}},Ft=e=>{const{theme:t,classGroups:o}=e,r={nextPart:new Map,validators:[]};for(const n in o)ze(o[n],r,n,t);return r},ze=(e,t,o,r)=>{e.forEach(n=>{if(typeof n=="string"){const i=n===""?t:Fe(t,n);i.classGroupId=o;return}if(typeof n=="function"){if(Nt(n)){ze(n(r),t,o,r);return}t.validators.push({validator:n,classGroupId:o});return}Object.entries(n).forEach(([i,s])=>{ze(s,Fe(t,i),o,r)})})},Fe=(e,t)=>{let o=e;return t.split(Me).forEach(r=>{o.nextPart.has(r)||o.nextPart.set(r,{nextPart:new Map,validators:[]}),o=o.nextPart.get(r)}),o},Nt=e=>e.isThemeGetter,Gt=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,o=new Map,r=new Map;const n=(i,s)=>{o.set(i,s),t++,t>e&&(t=0,r=o,o=new Map)};return{get(i){let s=o.get(i);if(s!==void 0)return s;if((s=r.get(i))!==void 0)return n(i,s),s},set(i,s){o.has(i)?o.set(i,s):n(i,s)}}},Te="!",Ee=":",Ut=Ee.length,Bt=e=>{const{prefix:t,experimentalParseClassName:o}=e;let r=n=>{const i=[];let s=0,l=0,a=0,c;for(let z=0;z<n.length;z++){let v=n[z];if(s===0&&l===0){if(v===Ee){i.push(n.slice(a,z)),a=z+Ut;continue}if(v==="/"){c=z;continue}}v==="["?s++:v==="]"?s--:v==="("?l++:v===")"&&l--}const h=i.length===0?n:n.substring(a),w=Vt(h),S=w!==h,P=c&&c>a?c-a:void 0;return{modifiers:i,hasImportantModifier:S,baseClassName:w,maybePostfixModifierPosition:P}};if(t){const n=t+Ee,i=r;r=s=>s.startsWith(n)?i(s.substring(n.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:s,maybePostfixModifierPosition:void 0}}if(o){const n=r;r=i=>o({className:i,parseClassName:n})}return r},Vt=e=>e.endsWith(Te)?e.substring(0,e.length-1):e.startsWith(Te)?e.substring(1):e,Ht=e=>{const t=Object.fromEntries(e.orderSensitiveModifiers.map(r=>[r,!0]));return r=>{if(r.length<=1)return r;const n=[];let i=[];return r.forEach(s=>{s[0]==="["||t[s]?(n.push(...i.sort(),s),i=[]):i.push(s)}),n.push(...i.sort()),n}},Wt=e=>({cache:Gt(e.cacheSize),parseClassName:Bt(e),sortModifiers:Ht(e),...Rt(e)}),Yt=/\s+/,Zt=(e,t)=>{const{parseClassName:o,getClassGroupId:r,getConflictingClassGroupIds:n,sortModifiers:i}=t,s=[],l=e.trim().split(Yt);let a="";for(let c=l.length-1;c>=0;c-=1){const h=l[c],{isExternal:w,modifiers:S,hasImportantModifier:P,baseClassName:z,maybePostfixModifierPosition:v}=o(h);if(w){a=h+(a.length>0?" "+a:a);continue}let m=!!v,y=r(m?z.substring(0,v):z);if(!y){if(!m){a=h+(a.length>0?" "+a:a);continue}if(y=r(z),!y){a=h+(a.length>0?" "+a:a);continue}m=!1}const T=i(S).join(":"),x=P?T+Te:T,_=x+y;if(s.includes(_))continue;s.push(_);const A=n(y,m);for(let O=0;O<A.length;++O){const L=A[O];s.push(x+L)}a=h+(a.length>0?" "+a:a)}return a};function qt(){let e=0,t,o,r="";for(;e<arguments.length;)(t=arguments[e++])&&(o=rt(t))&&(r&&(r+=" "),r+=o);return r}const rt=e=>{if(typeof e=="string")return e;let t,o="";for(let r=0;r<e.length;r++)e[r]&&(t=rt(e[r]))&&(o&&(o+=" "),o+=t);return o};function Xt(e,...t){let o,r,n,i=s;function s(a){const c=t.reduce((h,w)=>w(h),e());return o=Wt(c),r=o.cache.get,n=o.cache.set,i=l,l(a)}function l(a){const c=r(a);if(c)return c;const h=Zt(a,o);return n(a,h),h}return function(){return i(qt.apply(null,arguments))}}const C=e=>{const t=o=>o[e]||[];return t.isThemeGetter=!0,t},nt=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,it=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Jt=/^\d+\/\d+$/,Kt=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Qt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,eo=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,to=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,oo=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,te=e=>Jt.test(e),p=e=>!!e&&!Number.isNaN(Number(e)),H=e=>!!e&&Number.isInteger(Number(e)),ve=e=>e.endsWith("%")&&p(e.slice(0,-1)),V=e=>Kt.test(e),ro=()=>!0,no=e=>Qt.test(e)&&!eo.test(e),st=()=>!1,io=e=>to.test(e),so=e=>oo.test(e),ao=e=>!d(e)&&!u(e),lo=e=>oe(e,ct,st),d=e=>nt.test(e),X=e=>oe(e,dt,no),xe=e=>oe(e,bo,p),Ne=e=>oe(e,at,st),co=e=>oe(e,lt,so),ue=e=>oe(e,ut,io),u=e=>it.test(e),ne=e=>re(e,dt),uo=e=>re(e,fo),Ge=e=>re(e,at),ho=e=>re(e,ct),go=e=>re(e,lt),he=e=>re(e,ut,!0),oe=(e,t,o)=>{const r=nt.exec(e);return r?r[1]?t(r[1]):o(r[2]):!1},re=(e,t,o=!1)=>{const r=it.exec(e);return r?r[1]?t(r[1]):o:!1},at=e=>e==="position"||e==="percentage",lt=e=>e==="image"||e==="url",ct=e=>e==="length"||e==="size"||e==="bg-size",dt=e=>e==="length",bo=e=>e==="number",fo=e=>e==="family-name",ut=e=>e==="shadow",mo=()=>{const e=C("color"),t=C("font"),o=C("text"),r=C("font-weight"),n=C("tracking"),i=C("leading"),s=C("breakpoint"),l=C("container"),a=C("spacing"),c=C("radius"),h=C("shadow"),w=C("inset-shadow"),S=C("text-shadow"),P=C("drop-shadow"),z=C("blur"),v=C("perspective"),m=C("aspect"),y=C("ease"),T=C("animate"),x=()=>["auto","avoid","all","avoid-page","page","left","right","column"],_=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],A=()=>[..._(),u,d],O=()=>["auto","hidden","clip","visible","scroll"],L=()=>["auto","contain","none"],g=()=>[u,d,a],I=()=>[te,"full","auto",...g()],Z=()=>[H,"none","subgrid",u,d],q=()=>["auto",{span:["full",H,u,d]},H,u,d],U=()=>[H,"auto",u,d],k=()=>["auto","min","max","fr",u,d],R=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],$=()=>["start","end","center","stretch","center-safe","end-safe"],E=()=>["auto",...g()],D=()=>[te,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...g()],b=()=>[e,u,d],Pe=()=>[..._(),Ge,Ne,{position:[u,d]}],Ie=()=>["no-repeat",{repeat:["","x","y","space","round"]}],$e=()=>["auto","cover","contain",ho,lo,{size:[u,d]}],me=()=>[ve,ne,X],j=()=>["","none","full",c,u,d],F=()=>["",p,ne,X],ae=()=>["solid","dashed","dotted","double"],Le=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],M=()=>[p,ve,Ge,Ne],je=()=>["","none",z,u,d],le=()=>["none",p,u,d],ce=()=>["none",p,u,d],pe=()=>[p,u,d],de=()=>[te,"full",...g()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[V],breakpoint:[V],color:[ro],container:[V],"drop-shadow":[V],ease:["in","out","in-out"],font:[ao],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[V],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[V],shadow:[V],spacing:["px",p],text:[V],"text-shadow":[V],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",te,d,u,m]}],container:["container"],columns:[{columns:[p,d,u,l]}],"break-after":[{"break-after":x()}],"break-before":[{"break-before":x()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:A()}],overflow:[{overflow:O()}],"overflow-x":[{"overflow-x":O()}],"overflow-y":[{"overflow-y":O()}],overscroll:[{overscroll:L()}],"overscroll-x":[{"overscroll-x":L()}],"overscroll-y":[{"overscroll-y":L()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:I()}],"inset-x":[{"inset-x":I()}],"inset-y":[{"inset-y":I()}],start:[{start:I()}],end:[{end:I()}],top:[{top:I()}],right:[{right:I()}],bottom:[{bottom:I()}],left:[{left:I()}],visibility:["visible","invisible","collapse"],z:[{z:[H,"auto",u,d]}],basis:[{basis:[te,"full","auto",l,...g()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[p,te,"auto","initial","none",d]}],grow:[{grow:["",p,u,d]}],shrink:[{shrink:["",p,u,d]}],order:[{order:[H,"first","last","none",u,d]}],"grid-cols":[{"grid-cols":Z()}],"col-start-end":[{col:q()}],"col-start":[{"col-start":U()}],"col-end":[{"col-end":U()}],"grid-rows":[{"grid-rows":Z()}],"row-start-end":[{row:q()}],"row-start":[{"row-start":U()}],"row-end":[{"row-end":U()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":k()}],"auto-rows":[{"auto-rows":k()}],gap:[{gap:g()}],"gap-x":[{"gap-x":g()}],"gap-y":[{"gap-y":g()}],"justify-content":[{justify:[...R(),"normal"]}],"justify-items":[{"justify-items":[...$(),"normal"]}],"justify-self":[{"justify-self":["auto",...$()]}],"align-content":[{content:["normal",...R()]}],"align-items":[{items:[...$(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...$(),{baseline:["","last"]}]}],"place-content":[{"place-content":R()}],"place-items":[{"place-items":[...$(),"baseline"]}],"place-self":[{"place-self":["auto",...$()]}],p:[{p:g()}],px:[{px:g()}],py:[{py:g()}],ps:[{ps:g()}],pe:[{pe:g()}],pt:[{pt:g()}],pr:[{pr:g()}],pb:[{pb:g()}],pl:[{pl:g()}],m:[{m:E()}],mx:[{mx:E()}],my:[{my:E()}],ms:[{ms:E()}],me:[{me:E()}],mt:[{mt:E()}],mr:[{mr:E()}],mb:[{mb:E()}],ml:[{ml:E()}],"space-x":[{"space-x":g()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":g()}],"space-y-reverse":["space-y-reverse"],size:[{size:D()}],w:[{w:[l,"screen",...D()]}],"min-w":[{"min-w":[l,"screen","none",...D()]}],"max-w":[{"max-w":[l,"screen","none","prose",{screen:[s]},...D()]}],h:[{h:["screen","lh",...D()]}],"min-h":[{"min-h":["screen","lh","none",...D()]}],"max-h":[{"max-h":["screen","lh",...D()]}],"font-size":[{text:["base",o,ne,X]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,u,xe]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",ve,d]}],"font-family":[{font:[uo,d,t]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,u,d]}],"line-clamp":[{"line-clamp":[p,"none",u,xe]}],leading:[{leading:[i,...g()]}],"list-image":[{"list-image":["none",u,d]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",u,d]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:b()}],"text-color":[{text:b()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...ae(),"wavy"]}],"text-decoration-thickness":[{decoration:[p,"from-font","auto",u,X]}],"text-decoration-color":[{decoration:b()}],"underline-offset":[{"underline-offset":[p,"auto",u,d]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:g()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",u,d]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",u,d]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:Pe()}],"bg-repeat":[{bg:Ie()}],"bg-size":[{bg:$e()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},H,u,d],radial:["",u,d],conic:[H,u,d]},go,co]}],"bg-color":[{bg:b()}],"gradient-from-pos":[{from:me()}],"gradient-via-pos":[{via:me()}],"gradient-to-pos":[{to:me()}],"gradient-from":[{from:b()}],"gradient-via":[{via:b()}],"gradient-to":[{to:b()}],rounded:[{rounded:j()}],"rounded-s":[{"rounded-s":j()}],"rounded-e":[{"rounded-e":j()}],"rounded-t":[{"rounded-t":j()}],"rounded-r":[{"rounded-r":j()}],"rounded-b":[{"rounded-b":j()}],"rounded-l":[{"rounded-l":j()}],"rounded-ss":[{"rounded-ss":j()}],"rounded-se":[{"rounded-se":j()}],"rounded-ee":[{"rounded-ee":j()}],"rounded-es":[{"rounded-es":j()}],"rounded-tl":[{"rounded-tl":j()}],"rounded-tr":[{"rounded-tr":j()}],"rounded-br":[{"rounded-br":j()}],"rounded-bl":[{"rounded-bl":j()}],"border-w":[{border:F()}],"border-w-x":[{"border-x":F()}],"border-w-y":[{"border-y":F()}],"border-w-s":[{"border-s":F()}],"border-w-e":[{"border-e":F()}],"border-w-t":[{"border-t":F()}],"border-w-r":[{"border-r":F()}],"border-w-b":[{"border-b":F()}],"border-w-l":[{"border-l":F()}],"divide-x":[{"divide-x":F()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":F()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...ae(),"hidden","none"]}],"divide-style":[{divide:[...ae(),"hidden","none"]}],"border-color":[{border:b()}],"border-color-x":[{"border-x":b()}],"border-color-y":[{"border-y":b()}],"border-color-s":[{"border-s":b()}],"border-color-e":[{"border-e":b()}],"border-color-t":[{"border-t":b()}],"border-color-r":[{"border-r":b()}],"border-color-b":[{"border-b":b()}],"border-color-l":[{"border-l":b()}],"divide-color":[{divide:b()}],"outline-style":[{outline:[...ae(),"none","hidden"]}],"outline-offset":[{"outline-offset":[p,u,d]}],"outline-w":[{outline:["",p,ne,X]}],"outline-color":[{outline:b()}],shadow:[{shadow:["","none",h,he,ue]}],"shadow-color":[{shadow:b()}],"inset-shadow":[{"inset-shadow":["none",w,he,ue]}],"inset-shadow-color":[{"inset-shadow":b()}],"ring-w":[{ring:F()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:b()}],"ring-offset-w":[{"ring-offset":[p,X]}],"ring-offset-color":[{"ring-offset":b()}],"inset-ring-w":[{"inset-ring":F()}],"inset-ring-color":[{"inset-ring":b()}],"text-shadow":[{"text-shadow":["none",S,he,ue]}],"text-shadow-color":[{"text-shadow":b()}],opacity:[{opacity:[p,u,d]}],"mix-blend":[{"mix-blend":[...Le(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Le()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[p]}],"mask-image-linear-from-pos":[{"mask-linear-from":M()}],"mask-image-linear-to-pos":[{"mask-linear-to":M()}],"mask-image-linear-from-color":[{"mask-linear-from":b()}],"mask-image-linear-to-color":[{"mask-linear-to":b()}],"mask-image-t-from-pos":[{"mask-t-from":M()}],"mask-image-t-to-pos":[{"mask-t-to":M()}],"mask-image-t-from-color":[{"mask-t-from":b()}],"mask-image-t-to-color":[{"mask-t-to":b()}],"mask-image-r-from-pos":[{"mask-r-from":M()}],"mask-image-r-to-pos":[{"mask-r-to":M()}],"mask-image-r-from-color":[{"mask-r-from":b()}],"mask-image-r-to-color":[{"mask-r-to":b()}],"mask-image-b-from-pos":[{"mask-b-from":M()}],"mask-image-b-to-pos":[{"mask-b-to":M()}],"mask-image-b-from-color":[{"mask-b-from":b()}],"mask-image-b-to-color":[{"mask-b-to":b()}],"mask-image-l-from-pos":[{"mask-l-from":M()}],"mask-image-l-to-pos":[{"mask-l-to":M()}],"mask-image-l-from-color":[{"mask-l-from":b()}],"mask-image-l-to-color":[{"mask-l-to":b()}],"mask-image-x-from-pos":[{"mask-x-from":M()}],"mask-image-x-to-pos":[{"mask-x-to":M()}],"mask-image-x-from-color":[{"mask-x-from":b()}],"mask-image-x-to-color":[{"mask-x-to":b()}],"mask-image-y-from-pos":[{"mask-y-from":M()}],"mask-image-y-to-pos":[{"mask-y-to":M()}],"mask-image-y-from-color":[{"mask-y-from":b()}],"mask-image-y-to-color":[{"mask-y-to":b()}],"mask-image-radial":[{"mask-radial":[u,d]}],"mask-image-radial-from-pos":[{"mask-radial-from":M()}],"mask-image-radial-to-pos":[{"mask-radial-to":M()}],"mask-image-radial-from-color":[{"mask-radial-from":b()}],"mask-image-radial-to-color":[{"mask-radial-to":b()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":_()}],"mask-image-conic-pos":[{"mask-conic":[p]}],"mask-image-conic-from-pos":[{"mask-conic-from":M()}],"mask-image-conic-to-pos":[{"mask-conic-to":M()}],"mask-image-conic-from-color":[{"mask-conic-from":b()}],"mask-image-conic-to-color":[{"mask-conic-to":b()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:Pe()}],"mask-repeat":[{mask:Ie()}],"mask-size":[{mask:$e()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",u,d]}],filter:[{filter:["","none",u,d]}],blur:[{blur:je()}],brightness:[{brightness:[p,u,d]}],contrast:[{contrast:[p,u,d]}],"drop-shadow":[{"drop-shadow":["","none",P,he,ue]}],"drop-shadow-color":[{"drop-shadow":b()}],grayscale:[{grayscale:["",p,u,d]}],"hue-rotate":[{"hue-rotate":[p,u,d]}],invert:[{invert:["",p,u,d]}],saturate:[{saturate:[p,u,d]}],sepia:[{sepia:["",p,u,d]}],"backdrop-filter":[{"backdrop-filter":["","none",u,d]}],"backdrop-blur":[{"backdrop-blur":je()}],"backdrop-brightness":[{"backdrop-brightness":[p,u,d]}],"backdrop-contrast":[{"backdrop-contrast":[p,u,d]}],"backdrop-grayscale":[{"backdrop-grayscale":["",p,u,d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[p,u,d]}],"backdrop-invert":[{"backdrop-invert":["",p,u,d]}],"backdrop-opacity":[{"backdrop-opacity":[p,u,d]}],"backdrop-saturate":[{"backdrop-saturate":[p,u,d]}],"backdrop-sepia":[{"backdrop-sepia":["",p,u,d]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":g()}],"border-spacing-x":[{"border-spacing-x":g()}],"border-spacing-y":[{"border-spacing-y":g()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",u,d]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[p,"initial",u,d]}],ease:[{ease:["linear","initial",y,u,d]}],delay:[{delay:[p,u,d]}],animate:[{animate:["none",T,u,d]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[v,u,d]}],"perspective-origin":[{"perspective-origin":A()}],rotate:[{rotate:le()}],"rotate-x":[{"rotate-x":le()}],"rotate-y":[{"rotate-y":le()}],"rotate-z":[{"rotate-z":le()}],scale:[{scale:ce()}],"scale-x":[{"scale-x":ce()}],"scale-y":[{"scale-y":ce()}],"scale-z":[{"scale-z":ce()}],"scale-3d":["scale-3d"],skew:[{skew:pe()}],"skew-x":[{"skew-x":pe()}],"skew-y":[{"skew-y":pe()}],transform:[{transform:[u,d,"","none","gpu","cpu"]}],"transform-origin":[{origin:A()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:de()}],"translate-x":[{"translate-x":de()}],"translate-y":[{"translate-y":de()}],"translate-z":[{"translate-z":de()}],"translate-none":["translate-none"],accent:[{accent:b()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:b()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",u,d]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":g()}],"scroll-mx":[{"scroll-mx":g()}],"scroll-my":[{"scroll-my":g()}],"scroll-ms":[{"scroll-ms":g()}],"scroll-me":[{"scroll-me":g()}],"scroll-mt":[{"scroll-mt":g()}],"scroll-mr":[{"scroll-mr":g()}],"scroll-mb":[{"scroll-mb":g()}],"scroll-ml":[{"scroll-ml":g()}],"scroll-p":[{"scroll-p":g()}],"scroll-px":[{"scroll-px":g()}],"scroll-py":[{"scroll-py":g()}],"scroll-ps":[{"scroll-ps":g()}],"scroll-pe":[{"scroll-pe":g()}],"scroll-pt":[{"scroll-pt":g()}],"scroll-pr":[{"scroll-pr":g()}],"scroll-pb":[{"scroll-pb":g()}],"scroll-pl":[{"scroll-pl":g()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",u,d]}],fill:[{fill:["none",...b()]}],"stroke-w":[{stroke:[p,ne,X,xe]}],stroke:[{stroke:["none",...b()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},po=Xt(mo);function yo(...e){return po(Ot(e))}exports.EngineManager=We;exports.MockEngine=He;exports.Scrollbar=_t;exports.ScrollbarArrows=Ke;exports.ScrollbarControls=Pt;exports.ScrollbarProvider=Be;exports.ScrollbarThumb=Qe;exports.TauriEngine=Ae;exports.TechChip=Lt;exports.animations=It;exports.cn=yo;exports.getCurrentEngine=J;exports.getEngineManager=Ye;exports.mockEngine=Se;exports.scrollbarConfig=W;exports.scrollbarStyles=Ve;exports.tauriEngine=et;exports.techChipStyles=B;exports.useScrollbarConfig=_e;exports.useScrollbarHandlers=Ze;exports.useScrollbarLogic=qe;exports.useScrollbarObservers=Xe;exports.useScrollbarState=Je;
//# sourceMappingURL=index.cjs.map
