(()=>{var e={};e.id=138,e.ids=[138],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},85158:e=>{"use strict";e.exports=require("http2")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},15139:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>f,tree:()=>d});var a=r(50482),s=r(69108),n=r(62563),o=r.n(n),i=r(68300),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);r.d(t,l);let d=["",{children:["[lang]",{children:["candidates",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,75490)),"/workspace/app/[lang]/candidates/[id]/page.tsx"]}]},{loading:[()=>Promise.resolve().then(r.bind(r,42017)),"/workspace/app/[lang]/candidates/[id]/loading.tsx"]}]},{loading:[()=>Promise.resolve().then(r.bind(r,28953)),"/workspace/app/[lang]/candidates/loading.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,84090)),"/workspace/app/[lang]/layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,57685)),"/workspace/app/[lang]/loading.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,48381)),"/workspace/app/[lang]/not-found.tsx"]}]},{error:[()=>Promise.resolve().then(r.bind(r,20429)),"/workspace/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],c=["/workspace/app/[lang]/candidates/[id]/page.tsx"],u="/[lang]/candidates/[id]/page",p={require:r,loadChunk:()=>Promise.resolve()},f=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/[lang]/candidates/[id]/page",pathname:"/[lang]/candidates/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},30988:(e,t,r)=>{Promise.resolve().then(r.bind(r,58826)),Promise.resolve().then(r.t.bind(r,31900,23))},58826:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>ef});var a,s=r(95344),n=r(15739),o=r(3729);let i={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",a="",s="";for(let n in e){let o=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+o+";":a+="f"==n[1]?p(o,n):n+"{"+p(o,"k"==n[1]?"":t)+"}":"object"==typeof o?a+=p(o,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=o&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=p.p?p.p(n,o):n+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},f={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},g=(e,t,r,a,s)=>{let n=m(e),o=f[n]||(f[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!f[o]){let t=n!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);f[o]=p(s?{["@keyframes "+o]:t}:t,r?"":"."+o)}let i=r&&f.g?f.g:null;return r&&(f.g=f[o]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(f[o],t,a,i),o},x=(e,t,r)=>e.reduce((e,a,s)=>{let n=t[s];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==n?"":n)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?x(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let y,b,v,j=h.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function s(n,o){let i=Object.assign({},n),l=i.className||s.className;r.p=Object.assign({theme:b&&b()},i),r.o=/ *go\d+/.test(l),i.className=h.apply(r,a)+(l?" "+l:""),t&&(i.ref=o);let d=e;return e[0]&&(d=i.as||e,delete i.as),v&&d[0]&&v(i),y(d,i)}return t?t(s):s}}var _=e=>"function"==typeof e,N=(e,t)=>_(e)?e(t):e,E=(()=>{let e=0;return()=>(++e).toString()})(),P=(()=>{let e;return()=>e})(),S="default",k=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return k(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+n}))}}},C=[],O={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},R={},M=(e,t=S)=>{R[t]=k(R[t]||O,e),C.forEach(([e,r])=>{e===t&&r(R[t])})},T=e=>Object.keys(R).forEach(t=>M(e,t)),A=e=>Object.keys(R).find(t=>R[t].toasts.some(t=>t.id===e)),$=(e=S)=>t=>{M(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},q=(e={},t=S)=>{let[r,a]=(0,o.useState)(R[t]||O),s=(0,o.useRef)(R[t]);(0,o.useEffect)(()=>(s.current!==R[t]&&a(R[t]),C.push([t,a]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:n}},L=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),Z=e=>(t,r)=>{let a=L(t,e,r);return $(a.toasterId||A(a.id))({type:2,toast:a}),a.id},D=(e,t)=>Z("blank")(e,t);D.error=Z("error"),D.success=Z("success"),D.loading=Z("loading"),D.custom=Z("custom"),D.dismiss=(e,t)=>{let r={type:3,toastId:e};t?$(t)(r):T(r)},D.dismissAll=e=>D.dismiss(void 0,e),D.remove=(e,t)=>{let r={type:4,toastId:e};t?$(t)(r):T(r)},D.removeAll=e=>D.remove(void 0,e),D.promise=(e,t,r)=>{let a=D.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?N(t.success,e):void 0;return s?D.success(s,{id:a,...r,...null==r?void 0:r.success}):D.dismiss(a),e}).catch(e=>{let s=t.error?N(t.error,e):void 0;s?D.error(s,{id:a,...r,...null==r?void 0:r.error}):D.dismiss(a)}),e};var F=1e3,H=(e,t="default")=>{let{toasts:r,pausedAt:a}=q(e,t),s=(0,o.useRef)(new Map).current,n=(0,o.useCallback)((e,t=F)=>{if(s.has(e))return;let r=setTimeout(()=>{s.delete(e),i({type:4,toastId:e})},t);s.set(e,r)},[]);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&D.dismiss(r.id);return}return setTimeout(()=>D.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let i=(0,o.useCallback)($(t),[t]),l=(0,o.useCallback)(()=>{i({type:5,time:Date.now()})},[i]),d=(0,o.useCallback)((e,t)=>{i({type:1,toast:{id:e,height:t}})},[i]),c=(0,o.useCallback)(()=>{a&&i({type:6,time:Date.now()})},[a,i]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:n}=t||{},o=r.filter(t=>(t.position||n)===(e.position||n)&&t.height),i=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<i&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},G=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Y=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,K=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,W=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,V=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${X} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Q=w("div")`
  position: absolute;
`,J=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===r?null:o.createElement(J,null,o.createElement(K,{...a}),"loading"!==r&&o.createElement(Q,null,"error"===r?o.createElement(B,{...a}):o.createElement(V,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,en=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=P()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(r),es(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=o.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=o.createElement(er,{toast:e}),i=o.createElement(eo,{...e.ariaProps},N(e.message,e));return o.createElement(en,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:n,message:i}):o.createElement(o.Fragment,null,n,i))});a=o.createElement,p.p=void 0,y=a,b=void 0,v=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let n=o.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:n,className:t,style:r},s)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:P()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},eu=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,toasterId:n,containerStyle:i,containerClassName:l})=>{let{toasts:d,handlers:c}=H(r,n);return o.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n=r.position||t,i=ec(n,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return o.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:i},"custom"===r.type?N(r.message,r):s?s(r):o.createElement(el,{toast:r,position:n}))}))};function ef({candidate:e,dictionary:t}){let r=async()=>{let r={title:`${t.page.profile.shareTitle} ${e.name}`,text:`${t.page.profile.shareText} ${e.name}, ${t.candidate.candidateIn} ${e.governorate}.`,url:window.location.href};try{navigator.share?await navigator.share(r):(await navigator.clipboard.writeText(window.location.href),D.success(t.page.profile.linkCopied))}catch(e){console.error("Error sharing:",e),D.error(t.page.profile.shareError)}};return(0,s.jsxs)(s.Fragment,{children:[s.jsx(ep,{position:"bottom-center"}),(0,s.jsxs)("div",{className:"flex flex-col gap-4 sm:flex-row sm:justify-center",children:[(0,s.jsxs)("button",{onClick:r,className:"flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700",children:[s.jsx(n.PPi,{}),s.jsx("span",{children:t.page.profile.share})]}),(0,s.jsxs)("button",{onClick:()=>{window.print()},className:"flex items-center justify-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700",children:[s.jsx(n.rcQ,{}),s.jsx("span",{children:t.page.profile.print})]})]})]})}},42017:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var a=r(25036),s=r(6590);function n(){return a.jsx("div",{className:"container mx-auto px-4 py-12 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"mx-auto max-w-4xl",children:[(0,a.jsxs)("div",{className:"overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800",children:[(0,a.jsxs)("div",{className:"p-6 md:flex md:items-start md:space-x-8",children:[a.jsx(s.Z,{className:"mx-auto h-32 w-32 flex-shrink-0 rounded-full md:mx-0"}),(0,a.jsxs)("div",{className:"mt-4 flex-grow text-center md:mt-0 md:text-start",children:[a.jsx(s.Z,{className:"h-8 w-3/4"}),a.jsx(s.Z,{className:"mt-2 h-5 w-1/2"}),a.jsx(s.Z,{className:"mt-1 h-5 w-1/3"}),(0,a.jsxs)("div",{className:"mt-4 space-y-2",children:[a.jsx(s.Z,{className:"h-4 w-full"}),a.jsx(s.Z,{className:"h-4 w-5/6"})]})]})]}),a.jsx("div",{className:"grid grid-cols-2 gap-px border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50 md:grid-cols-4",children:[void 0,void 0,void 0,void 0].map((e,t)=>(0,a.jsxs)("div",{className:"text-center",children:[a.jsx(s.Z,{className:"h-5 w-1/2"}),a.jsx(s.Z,{className:"mt-1 h-4 w-3/4"})]},t))})]}),(0,a.jsxs)("div",{className:"mt-12",children:[a.jsx(s.Z,{className:"h-8 w-1/3"}),(0,a.jsxs)("div",{className:"mt-6 space-y-4",children:[a.jsx(s.Z,{className:"h-20 w-full"}),a.jsx(s.Z,{className:"h-20 w-full"})]})]})]})})}},75490:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m,generateMetadata:()=>f});var a=r(25036),s=r(63969),n=r(34191),o=r(82179),i=r(2813);let l=(0,r(86843).createProxy)(String.raw`/workspace/components/ClientActions.tsx`),{__esModule:d,$$typeof:c}=l,u=l.default;var p=r(19738);async function f({params:e},t){let r=await (0,n.R)(e.lang);try{let t=await (0,s.oP)(e.id);return{title:`${t.name} | ${r.metadata.title}`,description:`${r.page.profile.profileOf} ${t.name}, ${r.page.profile.candidateIn} ${t.governorate}.`}}catch(e){return{title:`Candidate Not Found | ${r.metadata.title}`,description:"The requested candidate could not be found."}}}async function m({params:e}){let t=await (0,n.R)(e.lang);try{let r=await (0,s.oP)(e.id),n=[{icon:o.pmi,label:t.candidate.governorate,value:r.governorate},{icon:o.$yZ,label:t.candidate.party,value:r.party},{icon:o.qc7,label:t.candidate.ballotNumber,value:r.ballot_number},{icon:o.C55,label:t.candidate.gender,value:t.candidate[r.gender.toLowerCase()]}];return a.jsx("div",{className:"container mx-auto px-4 py-12 sm:px-6 lg:px-8",children:a.jsx("div",{className:"mx-auto max-w-4xl",children:(0,a.jsxs)("div",{className:"overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800",children:[a.jsx("div",{className:"relative h-48 w-full bg-gradient-to-r from-red-500 via-white to-green-500 dark:from-red-700 dark:via-gray-800 dark:to-green-700",children:a.jsx(i.default,{src:`https://avatar.iran.liara.run/public/${"Female"===r.gender?"girl":"boy"}?username=${r.id}`,alt:r.name,width:128,height:128,className:"absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-gray-800"})}),(0,a.jsxs)("div",{className:"pt-20 text-center",children:[a.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white",children:r.name}),a.jsx("p",{className:"mt-1 text-lg font-medium text-green-600 dark:text-green-400",children:t.page.profile.candidateForParliament})]}),a.jsx("div",{className:"grid grid-cols-2 gap-px border-y border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700/50 mt-6 sm:grid-cols-4",children:n.map((e,t)=>(0,a.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[a.jsx(e.icon,{className:"h-6 w-6 text-gray-500 dark:text-gray-400"}),(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("p",{className:"text-sm font-medium text-gray-500 dark:text-gray-400",children:e.label}),a.jsx("p",{className:"font-semibold text-gray-900 dark:text-white",children:e.value})]})]},t))}),a.jsx("div",{className:"p-6",children:a.jsx(u,{candidate:r,dictionary:t})})]})})})}catch(e){(0,p.notFound)()}}},28953:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(25036),s=r(6590);let n=()=>(0,a.jsxs)("div",{className:"flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800",children:[a.jsx(s.Z,{className:"h-16 w-16 rounded-full"}),(0,a.jsxs)("div",{className:"flex-1 space-y-2",children:[a.jsx(s.Z,{className:"h-5 w-3/4"}),a.jsx(s.Z,{className:"h-4 w-1/2"}),a.jsx(s.Z,{className:"h-4 w-1/3"})]})]});function o(){return(0,a.jsxs)("div",{className:"container mx-auto px-4 py-8 sm:px-6 lg:px-8",children:[a.jsx("div",{className:"mb-8",children:a.jsx(s.Z,{className:"h-10 w-1/3"})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-8 lg:grid-cols-4",children:[a.jsx("aside",{className:"lg:col-span-1",children:(0,a.jsxs)("div",{className:"space-y-6",children:[a.jsx(s.Z,{className:"h-10 w-full"}),a.jsx(s.Z,{className:"h-10 w-full"}),a.jsx(s.Z,{className:"h-10 w-full"})]})}),a.jsx("main",{className:"grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-3",children:[...Array(12)].map((e,t)=>a.jsx(n,{},t))})]})]})}},6590:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var a=r(25036),s=r(70990),n=r(81774);r(40002);let o=function({className:e,...t}){return a.jsx("div",{className:function(...e){return(0,n.m6)((0,s.W)(e))}("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",e),...t})}},63969:(e,t,r)=>{"use strict";r.d(t,{YP:()=>s,mP:()=>i,oP:()=>n,ow:()=>o});let a=r(68428).Z.create({baseURL:process.env.NEXT_PUBLIC_API_BASE_URL||"http://localhost:4001",headers:{"Content-Type":"application/json"}}),s=async e=>{let{data:t}=await a.get("/api/candidates",{params:e});return t},n=async e=>{let{data:t}=await a.get(`/api/candidates/${e}`);return t},o=async()=>{let{data:e}=await a.get("/api/governorates");return e},i=async()=>{let{data:e}=await a.get("/api/stats");return e}},34778:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"bailoutToClientRendering",{enumerable:!0,get:function(){return n}});let a=r(38675),s=r(45869);function n(e){let t=s.staticGenerationAsyncStorage.getStore();if((null==t||!t.forceStatic)&&(null==t?void 0:t.isStaticGeneration))throw new a.BailoutToCSRError(e)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},84552:(e,t,r)=>{"use strict";function a(e){}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"clientHookInServerComponentError",{enumerable:!0,get:function(){return a}}),r(46783),r(40002),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},19738:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return m},useSearchParams:function(){return g},usePathname:function(){return x},ServerInsertedHTMLContext:function(){return d.ServerInsertedHTMLContext},useServerInsertedHTML:function(){return d.useServerInsertedHTML},useRouter:function(){return h},useParams:function(){return y},useSelectedLayoutSegments:function(){return b},useSelectedLayoutSegment:function(){return v},redirect:function(){return c.redirect},permanentRedirect:function(){return c.permanentRedirect},RedirectType:function(){return c.RedirectType},notFound:function(){return u.notFound}});let a=r(40002),s=r(78726),n=r(57210),o=r(84552),i=r(83092),l=r(65458),d=r(80545),c=r(8010),u=r(1988),p=Symbol("internal for urlsearchparams readonly");function f(){return Error("ReadonlyURLSearchParams cannot be modified")}class m{[Symbol.iterator](){return this[p][Symbol.iterator]()}append(){throw f()}delete(){throw f()}set(){throw f()}sort(){throw f()}constructor(e){this[p]=e,this.entries=e.entries.bind(e),this.forEach=e.forEach.bind(e),this.get=e.get.bind(e),this.getAll=e.getAll.bind(e),this.has=e.has.bind(e),this.keys=e.keys.bind(e),this.values=e.values.bind(e),this.toString=e.toString.bind(e),this.size=e.size}}function g(){(0,o.clientHookInServerComponentError)("useSearchParams");let e=(0,a.useContext)(n.SearchParamsContext),t=(0,a.useMemo)(()=>e?new m(e):null,[e]);{let{bailoutToClientRendering:e}=r(34778);e("useSearchParams()")}return t}function x(){return(0,o.clientHookInServerComponentError)("usePathname"),(0,a.useContext)(n.PathnameContext)}function h(){(0,o.clientHookInServerComponentError)("useRouter");let e=(0,a.useContext)(s.AppRouterContext);if(null===e)throw Error("invariant expected app router to be mounted");return e}function y(){(0,o.clientHookInServerComponentError)("useParams");let e=(0,a.useContext)(s.GlobalLayoutRouterContext),t=(0,a.useContext)(n.PathParamsContext);return(0,a.useMemo)(()=>(null==e?void 0:e.tree)?function e(t,r){for(let a of(void 0===r&&(r={}),Object.values(t[1]))){let t=a[0],s=Array.isArray(t),n=s?t[1]:t;!n||n.startsWith(l.PAGE_SEGMENT_KEY)||(s&&("c"===t[2]||"oc"===t[2])?r[t[0]]=t[1].split("/"):s&&(r[t[0]]=t[1]),r=e(a,r))}return r}(e.tree):t,[null==e?void 0:e.tree,t])}function b(e){void 0===e&&(e="children"),(0,o.clientHookInServerComponentError)("useSelectedLayoutSegments");let{tree:t}=(0,a.useContext)(s.LayoutRouterContext);return function e(t,r,a,s){let n;if(void 0===a&&(a=!0),void 0===s&&(s=[]),a)n=t[1][r];else{var o;let e=t[1];n=null!=(o=e.children)?o:Object.values(e)[0]}if(!n)return s;let d=n[0],c=(0,i.getSegmentValue)(d);return!c||c.startsWith(l.PAGE_SEGMENT_KEY)?s:(s.push(c),e(n,r,!1,s))}(t,e)}function v(e){void 0===e&&(e="children"),(0,o.clientHookInServerComponentError)("useSelectedLayoutSegment");let t=b(e);return 0===t.length?null:t[0]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1988:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{notFound:function(){return a},isNotFoundError:function(){return s}});let r="NEXT_NOT_FOUND";function a(){let e=Error(r);throw e.digest=r,e}function s(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},45858:(e,t)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return r}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8010:(e,t,r)=>{"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RedirectType:function(){return a},getRedirectError:function(){return l},redirect:function(){return d},permanentRedirect:function(){return c},isRedirectError:function(){return u},getURLFromRedirectError:function(){return p},getRedirectTypeFromError:function(){return f},getRedirectStatusCodeFromError:function(){return m}});let s=r(54580),n=r(72934),o=r(45858),i="NEXT_REDIRECT";function l(e,t,r){void 0===r&&(r=o.RedirectStatusCode.TemporaryRedirect);let a=Error(i);a.digest=i+";"+t+";"+e+";"+r+";";let n=s.requestAsyncStorage.getStore();return n&&(a.mutableCookies=n.mutableCookies),a}function d(e,t){void 0===t&&(t="replace");let r=n.actionAsyncStorage.getStore();throw l(e,t,(null==r?void 0:r.isAction)?o.RedirectStatusCode.SeeOther:o.RedirectStatusCode.TemporaryRedirect)}function c(e,t){void 0===t&&(t="replace");let r=n.actionAsyncStorage.getStore();throw l(e,t,(null==r?void 0:r.isAction)?o.RedirectStatusCode.SeeOther:o.RedirectStatusCode.PermanentRedirect)}function u(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,r,a,s]=e.digest.split(";",4),n=Number(s);return t===i&&("replace"===r||"push"===r)&&"string"==typeof a&&!isNaN(n)&&n in o.RedirectStatusCode}function p(e){return u(e)?e.digest.split(";",3)[2]:null}function f(e){if(!u(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function m(e){if(!u(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(a||(a={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},83092:(e,t)=>{"use strict";function r(e){return Array.isArray(e)?e[1]:e}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSegmentValue",{enumerable:!0,get:function(){return r}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},78726:(e,t,r)=>{"use strict";e.exports=r(50482).vendored.contexts.AppRouterContext},57210:(e,t,r)=>{"use strict";e.exports=r(50482).vendored.contexts.HooksClientContext},80545:(e,t,r)=>{"use strict";e.exports=r(50482).vendored.contexts.ServerInsertedHtml},38675:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{BailoutToCSRError:function(){return a},isBailoutToCSRError:function(){return s}});let r="BAILOUT_TO_CLIENT_SIDE_RENDERING";class a extends Error{constructor(e){super("Bail out to client-side rendering: "+e),this.reason=e,this.digest=r}}function s(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}},65458:(e,t)=>{"use strict";function r(e){return"("===e[0]&&e.endsWith(")")}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isGroupSegment:function(){return r},PAGE_SEGMENT_KEY:function(){return a},DEFAULT_SEGMENT_KEY:function(){return s}});let a="__PAGE__",s="__DEFAULT__"}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[22,317,804,345,462],()=>r(15139));module.exports=a})();