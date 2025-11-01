(()=>{var e={};e.id=138,e.ids=[138],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},85158:e=>{"use strict";e.exports=require("http2")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},57933:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>f,tree:()=>d});var a=r(50482),o=r(69108),s=r(62563),i=r.n(s),n=r(68300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["[lang]",{children:["candidates",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,75490)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\candidates\\[id]\\page.tsx"]}]},{loading:[()=>Promise.resolve().then(r.bind(r,42017)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\candidates\\[id]\\loading.tsx"]}]},{loading:[()=>Promise.resolve().then(r.bind(r,28953)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\candidates\\loading.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,84090)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,57685)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,48381)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\not-found.tsx"]}]},{error:[()=>Promise.resolve().then(r.bind(r,20429)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\error.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],c=["E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\candidates\\[id]\\page.tsx"],u="/[lang]/candidates/[id]/page",p={require:r,loadChunk:()=>Promise.resolve()},f=new a.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/[lang]/candidates/[id]/page",pathname:"/[lang]/candidates/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},58540:(e,t,r)=>{Promise.resolve().then(r.bind(r,58826)),Promise.resolve().then(r.t.bind(r,31900,23))},58826:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>ef});var a,o=r(95344),s=r(15739),i=r(3729);let n={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",a="",o="";for(let s in e){let i=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+i+";":a+="f"==s[1]?p(i,s):s+"{"+p(i,"k"==s[1]?"":t)+"}":"object"==typeof i?a+=p(i,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=i&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=p.p?p.p(s,i):s+":"+i+";")}return r+(t&&o?t+"{"+o+"}":o)+a},f={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},g=(e,t,r,a,o)=>{let s=m(e),i=f[s]||(f[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!f[i]){let t=s!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);f[i]=p(o?{["@keyframes "+i]:t}:t,r?"":"."+i)}let n=r&&f.g?f.g:null;return r&&(f.g=f[i]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(f[i],t,a,n),i},x=(e,t,r)=>e.reduce((e,a,o)=>{let s=t[o];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==s?"":s)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?x(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let y,b,v,j=h.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function o(s,i){let n=Object.assign({},s),l=n.className||o.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=h.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),y(d,n)}return t?t(o):o}}var _=e=>"function"==typeof e,E=(e,t)=>_(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),P=(()=>{let e;return()=>e})(),C="default",S=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return S(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},k=[],O={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},R={},M=(e,t=C)=>{R[t]=S(R[t]||O,e),k.forEach(([e,r])=>{e===t&&r(R[t])})},T=e=>Object.keys(R).forEach(t=>M(e,t)),A=e=>Object.keys(R).find(t=>R[t].toasts.some(t=>t.id===e)),H=(e=C)=>t=>{M(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},q=(e={},t=C)=>{let[r,a]=(0,i.useState)(R[t]||O),o=(0,i.useRef)(R[t]);(0,i.useEffect)(()=>(o.current!==R[t]&&a(R[t]),k.push([t,a]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let s=r.toasts.map(t=>{var r,a,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...r,toasts:s}},I=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),L=e=>(t,r)=>{let a=I(t,e,r);return H(a.toasterId||A(a.id))({type:2,toast:a}),a.id},Z=(e,t)=>L("blank")(e,t);Z.error=L("error"),Z.success=L("success"),Z.loading=L("loading"),Z.custom=L("custom"),Z.dismiss=(e,t)=>{let r={type:3,toastId:e};t?H(t)(r):T(r)},Z.dismissAll=e=>Z.dismiss(void 0,e),Z.remove=(e,t)=>{let r={type:4,toastId:e};t?H(t)(r):T(r)},Z.removeAll=e=>Z.remove(void 0,e),Z.promise=(e,t,r)=>{let a=Z.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?E(t.success,e):void 0;return o?Z.success(o,{id:a,...r,...null==r?void 0:r.success}):Z.dismiss(a),e}).catch(e=>{let o=t.error?E(t.error,e):void 0;o?Z.error(o,{id:a,...r,...null==r?void 0:r.error}):Z.dismiss(a)}),e};var U=1e3,D=(e,t="default")=>{let{toasts:r,pausedAt:a}=q(e,t),o=(0,i.useRef)(new Map).current,s=(0,i.useCallback)((e,t=U)=>{if(o.has(e))return;let r=setTimeout(()=>{o.delete(e),n({type:4,toastId:e})},t);o.set(e,r)},[]);(0,i.useEffect)(()=>{if(a)return;let e=Date.now(),o=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&Z.dismiss(r.id);return}return setTimeout(()=>Z.dismiss(r.id,t),a)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,i.useCallback)(H(t),[t]),l=(0,i.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,i.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,i.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:s}=t||{},i=r.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return(0,i.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},F=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,G=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=j`
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

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${G} 0.15s ease-out forwards;
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
    animation: ${z} 0.15s ease-out forwards;
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
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(et,null,t):t:"blank"===r?null:i.createElement(J,null,i.createElement(K,{...a}),"loading"!==r&&i.createElement(Q,null,"error"===r?i.createElement(B,{...a}):i.createElement(V,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,eo=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=w("div")`
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
`,ei=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=P()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(r),eo(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=i.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},s=i.createElement(er,{toast:e}),n=i.createElement(ei,{...e.ariaProps},E(e.message,e));return i.createElement(es,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:s,message:n}):i.createElement(i.Fragment,null,s,n))});a=i.createElement,p.p=void 0,y=a,b=void 0,v=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let s=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:s,className:t,style:r},o)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:P()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},eu=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,toasterId:s,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=D(r,s);return i.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let s=r.position||t,n=ec(s,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:n},"custom"===r.type?E(r.message,r):o?o(r):i.createElement(el,{toast:r,position:s}))}))};function ef({candidate:e,dictionary:t}){let r=async()=>{let r={title:`${t.page.profile.shareTitle} ${e.name}`,text:`${t.page.profile.shareText} ${e.name}, ${t.candidate.candidateIn} ${e.governorate}.`,url:window.location.href};try{navigator.share?await navigator.share(r):(await navigator.clipboard.writeText(window.location.href),Z.success(t.page.profile.linkCopied))}catch(e){console.error("Error sharing:",e),Z.error(t.page.profile.shareError)}};return(0,o.jsxs)(o.Fragment,{children:[o.jsx(ep,{position:"bottom-center"}),(0,o.jsxs)("div",{className:"flex flex-col gap-4 sm:flex-row sm:justify-center",children:[(0,o.jsxs)("button",{onClick:r,className:"flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700",children:[o.jsx(s.PPi,{}),o.jsx("span",{children:t.page.profile.share})]}),(0,o.jsxs)("button",{onClick:()=>{window.print()},className:"flex items-center justify-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700",children:[o.jsx(s.rcQ,{}),o.jsx("span",{children:t.page.profile.print})]})]})]})}},42017:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(25036),o=r(40763);function s(){return a.jsx("div",{className:"container mx-auto px-4 py-12 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"mx-auto max-w-4xl",children:[(0,a.jsxs)("div",{className:"overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800",children:[(0,a.jsxs)("div",{className:"p-6 md:flex md:items-start md:space-x-8",children:[a.jsx(o.Z,{className:"mx-auto h-32 w-32 flex-shrink-0 rounded-full md:mx-0"}),(0,a.jsxs)("div",{className:"mt-4 flex-grow text-center md:mt-0 md:text-start",children:[a.jsx(o.Z,{className:"h-8 w-3/4"}),a.jsx(o.Z,{className:"mt-2 h-5 w-1/2"}),a.jsx(o.Z,{className:"mt-1 h-5 w-1/3"}),(0,a.jsxs)("div",{className:"mt-4 space-y-2",children:[a.jsx(o.Z,{className:"h-4 w-full"}),a.jsx(o.Z,{className:"h-4 w-5/6"})]})]})]}),a.jsx("div",{className:"grid grid-cols-2 gap-px border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50 md:grid-cols-4",children:[void 0,void 0,void 0,void 0].map((e,t)=>(0,a.jsxs)("div",{className:"text-center",children:[a.jsx(o.Z,{className:"h-5 w-1/2"}),a.jsx(o.Z,{className:"mt-1 h-4 w-3/4"})]},t))})]}),(0,a.jsxs)("div",{className:"mt-12",children:[a.jsx(o.Z,{className:"h-8 w-1/3"}),(0,a.jsxs)("div",{className:"mt-6 space-y-4",children:[a.jsx(o.Z,{className:"h-20 w-full"}),a.jsx(o.Z,{className:"h-20 w-full"})]})]})]})})}},75490:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m,generateMetadata:()=>f});var a=r(25036),o=r(63969),s=r(34191),i=r(82179),n=r(2813);let l=(0,r(86843).createProxy)(String.raw`E:\HamletUnified\Copy-of-Hamlet-social\components\ClientActions.tsx`),{__esModule:d,$$typeof:c}=l,u=l.default;var p=r(19738);async function f({params:e},t){let r=await (0,s.R)(e.lang);try{let t=await (0,o.oP)(e.id);return{title:`${t.name} | ${r.metadata.title}`,description:`${r.page.profile.profileOf} ${t.name}, ${r.page.profile.candidateIn} ${t.governorate}.`}}catch(e){return{title:`Candidate Not Found | ${r.metadata.title}`,description:"The requested candidate could not be found."}}}async function m({params:e}){let t=await (0,s.R)(e.lang);try{let r=await (0,o.oP)(e.id),s=[{icon:i.pmi,label:t.candidate.governorate,value:r.governorate},{icon:i.$yZ,label:t.candidate.party,value:r.party},{icon:i.qc7,label:t.candidate.ballotNumber,value:r.ballot_number},{icon:i.C55,label:t.candidate.gender,value:t.candidate[r.gender.toLowerCase()]}];return a.jsx("div",{className:"container mx-auto px-4 py-12 sm:px-6 lg:px-8",children:a.jsx("div",{className:"mx-auto max-w-4xl",children:(0,a.jsxs)("div",{className:"overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800",children:[a.jsx("div",{className:"relative h-48 w-full bg-gradient-to-r from-red-500 via-white to-green-500 dark:from-red-700 dark:via-gray-800 dark:to-green-700",children:a.jsx(n.default,{src:`https://avatar.iran.liara.run/public/${"Female"===r.gender?"girl":"boy"}?username=${r.id}`,alt:r.name,width:128,height:128,className:"absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-gray-800"})}),(0,a.jsxs)("div",{className:"pt-20 text-center",children:[a.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white",children:r.name}),a.jsx("p",{className:"mt-1 text-lg font-medium text-green-600 dark:text-green-400",children:t.page.profile.candidateForParliament})]}),a.jsx("div",{className:"grid grid-cols-2 gap-px border-y border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700/50 mt-6 sm:grid-cols-4",children:s.map((e,t)=>(0,a.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[a.jsx(e.icon,{className:"h-6 w-6 text-gray-500 dark:text-gray-400"}),(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("p",{className:"text-sm font-medium text-gray-500 dark:text-gray-400",children:e.label}),a.jsx("p",{className:"font-semibold text-gray-900 dark:text-white",children:e.value})]})]},t))}),a.jsx("div",{className:"p-6",children:a.jsx(u,{candidate:r,dictionary:t})})]})})})}catch(e){(0,p.notFound)()}}},28953:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var a=r(25036),o=r(40763);let s=()=>(0,a.jsxs)("div",{className:"flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800",children:[a.jsx(o.Z,{className:"h-16 w-16 rounded-full"}),(0,a.jsxs)("div",{className:"flex-1 space-y-2",children:[a.jsx(o.Z,{className:"h-5 w-3/4"}),a.jsx(o.Z,{className:"h-4 w-1/2"}),a.jsx(o.Z,{className:"h-4 w-1/3"})]})]});function i(){return(0,a.jsxs)("div",{className:"container mx-auto px-4 py-8 sm:px-6 lg:px-8",children:[a.jsx("div",{className:"mb-8",children:a.jsx(o.Z,{className:"h-10 w-1/3"})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-8 lg:grid-cols-4",children:[a.jsx("aside",{className:"lg:col-span-1",children:(0,a.jsxs)("div",{className:"space-y-6",children:[a.jsx(o.Z,{className:"h-10 w-full"}),a.jsx(o.Z,{className:"h-10 w-full"}),a.jsx(o.Z,{className:"h-10 w-full"})]})}),a.jsx("main",{className:"grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-3",children:[...Array(12)].map((e,t)=>a.jsx(s,{},t))})]})]})}},40763:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var a=r(25036),o=r(70990),s=r(81774);r(40002);let i=function({className:e,...t}){return a.jsx("div",{className:function(...e){return(0,s.m6)((0,o.W)(e))}("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",e),...t})}},63969:(e,t,r)=>{"use strict";r.d(t,{YP:()=>o,mP:()=>n,oP:()=>s,ow:()=>i});let a=r(68428).Z.create({baseURL:"https://hamlet-unified-complete-2027-production.up.railway.app",headers:{"Content-Type":"application/json"},timeout:1e4});a.interceptors.response.use(e=>e,async e=>e.config&&!e.config._retry&&"https://hamlet-unified-complete-2027-production.up.railway.app"===e.config.baseURL?(e.config._retry=!0,e.config.baseURL="https://winter-leaf-f532.safaribosafar.workers.dev",a.request(e.config)):Promise.reject(e));let o=async e=>{let{data:t}=await a.get("/api/candidates",{params:e});return t},s=async e=>{let{data:t}=await a.get(`/api/candidates/${e}`);return t},i=async()=>{let{data:e}=await a.get("/api/governorates");return e},n=async()=>{let{data:e}=await a.get("/api/stats");return e}},34778:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"bailoutToClientRendering",{enumerable:!0,get:function(){return s}});let a=r(38675),o=r(45869);function s(e){let t=o.staticGenerationAsyncStorage.getStore();if((null==t||!t.forceStatic)&&(null==t?void 0:t.isStaticGeneration))throw new a.BailoutToCSRError(e)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},84552:(e,t,r)=>{"use strict";function a(e){}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"clientHookInServerComponentError",{enumerable:!0,get:function(){return a}}),r(46783),r(40002),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},19738:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return m},useSearchParams:function(){return g},usePathname:function(){return x},ServerInsertedHTMLContext:function(){return d.ServerInsertedHTMLContext},useServerInsertedHTML:function(){return d.useServerInsertedHTML},useRouter:function(){return h},useParams:function(){return y},useSelectedLayoutSegments:function(){return b},useSelectedLayoutSegment:function(){return v},redirect:function(){return c.redirect},permanentRedirect:function(){return c.permanentRedirect},RedirectType:function(){return c.RedirectType},notFound:function(){return u.notFound}});let a=r(40002),o=r(78726),s=r(57210),i=r(84552),n=r(83092),l=r(65458),d=r(80545),c=r(8010),u=r(1988),p=Symbol("internal for urlsearchparams readonly");function f(){return Error("ReadonlyURLSearchParams cannot be modified")}class m{[Symbol.iterator](){return this[p][Symbol.iterator]()}append(){throw f()}delete(){throw f()}set(){throw f()}sort(){throw f()}constructor(e){this[p]=e,this.entries=e.entries.bind(e),this.forEach=e.forEach.bind(e),this.get=e.get.bind(e),this.getAll=e.getAll.bind(e),this.has=e.has.bind(e),this.keys=e.keys.bind(e),this.values=e.values.bind(e),this.toString=e.toString.bind(e),this.size=e.size}}function g(){(0,i.clientHookInServerComponentError)("useSearchParams");let e=(0,a.useContext)(s.SearchParamsContext),t=(0,a.useMemo)(()=>e?new m(e):null,[e]);{let{bailoutToClientRendering:e}=r(34778);e("useSearchParams()")}return t}function x(){return(0,i.clientHookInServerComponentError)("usePathname"),(0,a.useContext)(s.PathnameContext)}function h(){(0,i.clientHookInServerComponentError)("useRouter");let e=(0,a.useContext)(o.AppRouterContext);if(null===e)throw Error("invariant expected app router to be mounted");return e}function y(){(0,i.clientHookInServerComponentError)("useParams");let e=(0,a.useContext)(o.GlobalLayoutRouterContext),t=(0,a.useContext)(s.PathParamsContext);return(0,a.useMemo)(()=>(null==e?void 0:e.tree)?function e(t,r){for(let a of(void 0===r&&(r={}),Object.values(t[1]))){let t=a[0],o=Array.isArray(t),s=o?t[1]:t;!s||s.startsWith(l.PAGE_SEGMENT_KEY)||(o&&("c"===t[2]||"oc"===t[2])?r[t[0]]=t[1].split("/"):o&&(r[t[0]]=t[1]),r=e(a,r))}return r}(e.tree):t,[null==e?void 0:e.tree,t])}function b(e){void 0===e&&(e="children"),(0,i.clientHookInServerComponentError)("useSelectedLayoutSegments");let{tree:t}=(0,a.useContext)(o.LayoutRouterContext);return function e(t,r,a,o){let s;if(void 0===a&&(a=!0),void 0===o&&(o=[]),a)s=t[1][r];else{var i;let e=t[1];s=null!=(i=e.children)?i:Object.values(e)[0]}if(!s)return o;let d=s[0],c=(0,n.getSegmentValue)(d);return!c||c.startsWith(l.PAGE_SEGMENT_KEY)?o:(o.push(c),e(s,r,!1,o))}(t,e)}function v(e){void 0===e&&(e="children"),(0,i.clientHookInServerComponentError)("useSelectedLayoutSegment");let t=b(e);return 0===t.length?null:t[0]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1988:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{notFound:function(){return a},isNotFoundError:function(){return o}});let r="NEXT_NOT_FOUND";function a(){let e=Error(r);throw e.digest=r,e}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},45858:(e,t)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return r}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8010:(e,t,r)=>{"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RedirectType:function(){return a},getRedirectError:function(){return l},redirect:function(){return d},permanentRedirect:function(){return c},isRedirectError:function(){return u},getURLFromRedirectError:function(){return p},getRedirectTypeFromError:function(){return f},getRedirectStatusCodeFromError:function(){return m}});let o=r(54580),s=r(72934),i=r(45858),n="NEXT_REDIRECT";function l(e,t,r){void 0===r&&(r=i.RedirectStatusCode.TemporaryRedirect);let a=Error(n);a.digest=n+";"+t+";"+e+";"+r+";";let s=o.requestAsyncStorage.getStore();return s&&(a.mutableCookies=s.mutableCookies),a}function d(e,t){void 0===t&&(t="replace");let r=s.actionAsyncStorage.getStore();throw l(e,t,(null==r?void 0:r.isAction)?i.RedirectStatusCode.SeeOther:i.RedirectStatusCode.TemporaryRedirect)}function c(e,t){void 0===t&&(t="replace");let r=s.actionAsyncStorage.getStore();throw l(e,t,(null==r?void 0:r.isAction)?i.RedirectStatusCode.SeeOther:i.RedirectStatusCode.PermanentRedirect)}function u(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,r,a,o]=e.digest.split(";",4),s=Number(o);return t===n&&("replace"===r||"push"===r)&&"string"==typeof a&&!isNaN(s)&&s in i.RedirectStatusCode}function p(e){return u(e)?e.digest.split(";",3)[2]:null}function f(e){if(!u(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function m(e){if(!u(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(a||(a={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},83092:(e,t)=>{"use strict";function r(e){return Array.isArray(e)?e[1]:e}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSegmentValue",{enumerable:!0,get:function(){return r}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},78726:(e,t,r)=>{"use strict";e.exports=r(50482).vendored.contexts.AppRouterContext},57210:(e,t,r)=>{"use strict";e.exports=r(50482).vendored.contexts.HooksClientContext},80545:(e,t,r)=>{"use strict";e.exports=r(50482).vendored.contexts.ServerInsertedHtml},38675:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{BailoutToCSRError:function(){return a},isBailoutToCSRError:function(){return o}});let r="BAILOUT_TO_CLIENT_SIDE_RENDERING";class a extends Error{constructor(e){super("Bail out to client-side rendering: "+e),this.reason=e,this.digest=r}}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}},65458:(e,t)=>{"use strict";function r(e){return"("===e[0]&&e.endsWith(")")}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isGroupSegment:function(){return r},PAGE_SEGMENT_KEY:function(){return a},DEFAULT_SEGMENT_KEY:function(){return o}});let a="__PAGE__",o="__DEFAULT__"}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[22,862,804,345,676],()=>r(57933));module.exports=a})();