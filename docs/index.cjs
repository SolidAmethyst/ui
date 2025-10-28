'use strict';var solidJs=require('solid-js'),clsx=require('clsx'),tailwindMerge=require('tailwind-merge');var O=t=>{let s,e,f,n,[a,C]=solidJs.createSignal(50),[g,v]=solidJs.createSignal(0),[R,y]=solidJs.createSignal(false),[z,S]=solidJs.createSignal(false),[D,H]=solidJs.createSignal(0),[B,Y]=solidJs.createSignal(null),[Z,J]=solidJs.createSignal(0),l=()=>{return;},V=async o=>{return;},T=async o=>{if(!z()||!n)return;},w=()=>{S(false),document.body.style.userSelect="";},W=o=>{return;};return solidJs.onMount(()=>{setTimeout(l,0),setTimeout(l,50),setTimeout(l,100),setTimeout(l,250),setTimeout(l,500),setTimeout(l,1e3);let o=new ResizeObserver(l),r=new MutationObserver(l);document.addEventListener("mousemove",T),document.addEventListener("mouseup",w),solidJs.onCleanup(()=>{o.disconnect(),r.disconnect(),document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",w);});}),React.createElement(React.Fragment,null,React.createElement("style",null,`
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
			`),React.createElement("div",{ref:s,class:`custom-scrollbar-container ${t.class||""}`,style:t.style},React.createElement("div",{ref:e,class:"custom-scrollbar-content",style:{"overflow-y":t.horizontal?"hidden":"auto","overflow-x":t.horizontal?"auto":"hidden"}},t.children),R()&&React.createElement("div",{ref:n,class:`custom-scrollbar-track ${t.horizontal?"custom-scrollbar-track-horizontal":"custom-scrollbar-track-vertical"}`,onClick:W},React.createElement("div",{ref:f,class:`custom-scrollbar-thumb ${z()?"dragging":""}`,style:{width:t.horizontal?`${a()}px`:"4px",height:t.horizontal?"4px":`${a()}px`,left:t.horizontal?`${g()}px`:"auto",top:t.horizontal?"4px":`${g()}px`,right:t.horizontal?"auto":"2px"},onMouseDown:V}))))};function tt(...t){return tailwindMerge.twMerge(clsx.clsx(t))}exports.Scrollbar=O;exports.cn=tt;//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map