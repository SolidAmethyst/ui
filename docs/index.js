import {createSignal,onMount,onCleanup}from'solid-js';import {clsx}from'clsx';import {twMerge}from'tailwind-merge';var M=Object.defineProperty;var B=(i,e,t)=>e in i?M(i,e,{enumerable:true,configurable:true,writable:true,value:t}):i[e]=t;var J=(i,e)=>()=>(i&&(e=i(i=0)),e);var Y=(i,e)=>{for(var t in e)M(i,t,{get:e[t],enumerable:true});};var s=(i,e,t)=>B(i,typeof e!="symbol"?e+"":e,t);var D={};Y(D,{TauriEngine:()=>y,tauriEngine:()=>ee});var y,ee,T=J(()=>{y=class{constructor(){s(this,"physicsObjectId",null);s(this,"velocity",0);s(this,"acceleration",0);s(this,"zoomLevel",1);s(this,"isInitialized",false);}async createPhysicsObject(e,t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{let n=await window.__TAURI__.invoke("create_physics_object",{x:e,y:t});return this.physicsObjectId=n,n}catch(n){throw console.error("Failed to create physics object:",n),n}}async updatePhysicsObject(e,t,n){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("update_physics_object",{id:e,x:t,y:n});}catch(r){throw console.error("Failed to update physics object:",r),r}}async destroyPhysicsObject(e){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("destroy_physics_object",{id:e}),this.physicsObjectId===e&&(this.physicsObjectId=null);}catch(t){throw console.error("Failed to destroy physics object:",t),t}}async updateZoomLevel(e){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("update_zoom_level",{zoom:e}),this.zoomLevel=e;}catch(t){throw console.error("Failed to update zoom level:",t),t}}async screenToWorld(e,t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{let n=await window.__TAURI__.invoke("screen_to_world",{screenX:e,screenY:t});return {x:n.x,y:n.y}}catch(n){throw console.error("Failed to convert screen to world:",n),n}}async worldToScreen(e,t){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{let n=await window.__TAURI__.invoke("world_to_screen",{worldX:e,worldY:t});return {x:n.x,y:n.y}}catch(n){throw console.error("Failed to convert world to screen:",n),n}}async getEngineState(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{let e=await window.__TAURI__.invoke("get_engine_state");return {physicsObjectId:e.physicsObjectId,velocity:e.velocity||this.velocity,acceleration:e.acceleration||this.acceleration,zoomLevel:e.zoomLevel||this.zoomLevel,isInitialized:e.isInitialized||this.isInitialized}}catch(e){return console.error("Failed to get engine state:",e),{physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration,zoomLevel:this.zoomLevel,isInitialized:this.isInitialized}}}async isAvailable(){let e=this.isTauriAvailable();return e&&(this.isInitialized=true),e}async initPhysicsEngine(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{await window.__TAURI__.invoke("init_physics_engine"),this.isInitialized=!0;}catch(e){throw console.error("Failed to initialize physics engine:",e),e}}async calculateScrollbarPhysics(e,t,n,r){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{return await window.__TAURI__.invoke("calculate_scrollbar_physics",{config:e,currentState:t,targetPosition:n,deltaTime:r})}catch(l){throw console.error("Failed to calculate scrollbar physics:",l),l}}async getPhysicsEngineInfo(){if(!this.isTauriAvailable())throw new Error("Tauri is not available");try{return await window.__TAURI__.invoke("get_physics_engine_info")}catch(e){throw console.error("Failed to get physics engine info:",e),e}}isTauriAvailable(){return typeof window<"u"&&window.__TAURI__!==void 0&&typeof window.__TAURI__.invoke=="function"}},ee=new y;});var K=i=>{let e,t,n,r,[l,W]=createSignal(50),[v,p]=createSignal(0),[H,S]=createSignal(false),[w,L]=createSignal(false),[V,$]=createSignal(0),[ie,ne]=createSignal(null),[oe,re]=createSignal(0),c=()=>{return;},X=async o=>{return;},A=async o=>{if(!w()||!r)return;},R=()=>{L(false),document.body.style.userSelect="";},Z=o=>{return;};return onMount(()=>{setTimeout(c,0),setTimeout(c,50),setTimeout(c,100),setTimeout(c,250),setTimeout(c,500),setTimeout(c,1e3);let o=new ResizeObserver(c),a=new MutationObserver(c);document.addEventListener("mousemove",A),document.addEventListener("mouseup",R),onCleanup(()=>{o.disconnect(),a.disconnect(),document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",R);});}),_$createComponent(_$Fragment,null,_$createComponent("style",null,`
				.custom-scrollbar-container {
					position: relative;
					overflow: hidden;
				}
				.custom-scrollbar-content {
					height: 100%;
					width: 100%;
					overflow-y: auto;
					overflow-x: auto;
					scrollbar-width: none !important;
					-ms-overflow-style: none !important;
				}
				.custom-scrollbar-content::-webkit-scrollbar {
					display: none !important;
					width: 0 !important;
					height: 0 !important;
				}
				.custom-scrollbar-track {
					position: absolute;
					z-index: 999;
					background: transparent;
				}
				.custom-scrollbar-track-vertical {
					top: 0;
					right: 0;
					width: 10px;
					height: 100%;
				}
				.custom-scrollbar-track-horizontal {
					bottom: 0;
					left: 0;
					width: 100%;
					height: 12px;
				}
				.custom-scrollbar-thumb {
					position: absolute;
					background: rgba(59, 130, 246, 0.6);
					border-radius: 2px;
					cursor: grab;
					transition: background 150ms;
					z-index: 99999;
				}
				.custom-scrollbar-thumb:hover {
					background: rgba(59, 130, 246, 0.8);
				}
				.custom-scrollbar-thumb:active,
				.custom-scrollbar-thumb.dragging {
					background: rgba(59, 130, 246, 1);
					cursor: grabbing;
				}
			`),_$createComponent("div",{ref:e,class:`custom-scrollbar-container ${i.class||""}`,style:i.style},_$createComponent("div",{ref:t,class:"custom-scrollbar-content",style:{"overflow-y":i.horizontal?"hidden":"auto","overflow-x":i.horizontal?"auto":"hidden"}},i.children),H()&&_$createComponent("div",{ref:r,class:`custom-scrollbar-track ${i.horizontal?"custom-scrollbar-track-horizontal":"custom-scrollbar-track-vertical"}`,onClick:Z},_$createComponent("div",{ref:n,class:`custom-scrollbar-thumb ${w()?"dragging":""}`,style:{width:i.horizontal?`${l()}px`:"4px",height:i.horizontal?"4px":`${l()}px`,left:i.horizontal?`${v()}px`:"auto",top:i.horizontal?"4px":`${v()}px`,right:i.horizontal?"auto":"2px"},onMouseDown:X}))))};function fe(...i){return twMerge(clsx(i))}var z=class{constructor(){s(this,"physicsObjectId",null);s(this,"velocity",0);s(this,"acceleration",0);s(this,"zoomLevel",1);s(this,"isInitialized",false);}async createPhysicsObject(e,t){let n=Math.random()*1e3;return this.physicsObjectId=n,n}async updatePhysicsObject(e,t,n){this.physicsObjectId===e&&(this.velocity=Math.random()*.1);}async destroyPhysicsObject(e){this.physicsObjectId===e&&(this.physicsObjectId=null);}async updateZoomLevel(e){this.zoomLevel=e;}async screenToWorld(e,t){return {x:e,y:t}}async worldToScreen(e,t){return {x:e,y:t}}async getEngineState(){return {physicsObjectId:this.physicsObjectId||void 0,velocity:this.velocity,acceleration:this.acceleration,zoomLevel:this.zoomLevel,isInitialized:this.isInitialized}}async isAvailable(){return this.isInitialized=true,true}},P=new z;var I=class{constructor(e){s(this,"currentEngine",null);s(this,"config");s(this,"isInitialized",false);this.config=e;}async initialize(){if(!this.isInitialized)try{this.config.enabled&&this.config.autoDetect&&await this.detectTauriEngine()&&(this.currentEngine=await this.loadTauriEngine()),this.currentEngine||(this.currentEngine=P),this.isInitialized=!0;}catch(e){console.warn("Failed to initialize engine, falling back to mock:",e),this.currentEngine=P,this.isInitialized=true;}}async getEngine(){return this.isInitialized||await this.initialize(),this.currentEngine}async detectTauriEngine(){if(typeof window>"u"||!window.__TAURI__||typeof window.__TAURI__.invoke!="function")return  false;try{return await(await this.loadTauriEngine()).isAvailable()}catch{return  false}}async loadTauriEngine(){try{let{tauriEngine:e}=await Promise.resolve().then(()=>(T(),D));if(this.config.physicsEnabled)try{let t=e;t.initPhysicsEngine&&(await t.initPhysicsEngine(),console.log("Physics engine DLL initialized successfully"));}catch(t){console.warn("Failed to initialize physics engine DLL:",t);}return e}catch(e){throw console.warn("Failed to load Tauri engine:",e),e}}updateConfig(e){this.config={...this.config,...e},this.isInitialized=false;}getConfig(){return {...this.config}}},x=null;function F(i){return x||(x=new I(i||{enabled:true,autoDetect:true,fallbackToJS:true,physicsEnabled:true,zoomEnabled:true})),x}async function te(){return await F().getEngine()}T();export{I as EngineManager,z as MockEngine,K as Scrollbar,y as TauriEngine,fe as cn,te as getCurrentEngine,F as getEngineManager,P as mockEngine,ee as tauriEngine};//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map