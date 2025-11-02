(()=>{var e={};e.id=138,e.ids=[138],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},35240:e=>{"use strict";e.exports=require("https")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},76162:e=>{"use strict";e.exports=require("stream")},74175:e=>{"use strict";e.exports=require("tty")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},6237:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d}),r(95889),r(25343),r(48402),r(76447),r(53956),r(6047),r(26083),r(35866);var a=r(23191),s=r(88716),i=r(37922),o=r.n(i),n=r(95231),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["[lang]",{children:["candidates",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,95889)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\candidates\\[id]\\page.tsx"]}]},{loading:[()=>Promise.resolve().then(r.bind(r,25343)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\candidates\\[id]\\loading.tsx"]}]},{loading:[()=>Promise.resolve().then(r.bind(r,48402)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\candidates\\loading.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,76447)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,53956)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,6047)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\not-found.tsx"]}]},{error:[()=>Promise.resolve().then(r.bind(r,26083)),"E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\error.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"]}],c=["E:\\HamletUnified\\Copy-of-Hamlet-social\\app\\[lang]\\candidates\\[id]\\page.tsx"],u="/[lang]/candidates/[id]/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/[lang]/candidates/[id]/page",pathname:"/[lang]/candidates/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},51983:(e,t,r)=>{Promise.resolve().then(r.bind(r,94807)),Promise.resolve().then(r.t.bind(r,92481,23))},94807:(e,t,r)=>{"use strict";r.d(t,{default:()=>em});var a,s=r(10326),i=r(90622),o=r(17577);let n={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?p(o,i):i+"{"+p(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=p(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=p.p?p.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},m={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},g=(e,t,r,a,s)=>{let i=f(e),o=m[i]||(m[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!m[o]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);m[o]=p(s?{["@keyframes "+o]:t}:t,r?"":"."+o)}let n=r&&m.g?m.g:null;return r&&(m.g=m[o]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(m[o],t,a,n),o},x=(e,t,r)=>e.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?x(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let y,b,v,j=h.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=h.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),y(d,n)}return t?t(s):s}}var N=e=>"function"==typeof e,E=(e,t)=>N(e)?e(t):e,P=(()=>{let e=0;return()=>(++e).toString()})(),_=(()=>{let e;return()=>e})(),k="default",C=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return C(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},R=[],O={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},S=(e,t=k)=>{$[t]=C($[t]||O,e),R.forEach(([e,r])=>{e===t&&r($[t])})},q=e=>Object.keys($).forEach(t=>S(e,t)),H=e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)),T=(e=k)=>t=>{S(t,e)},A={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},M=(e={},t=k)=>{let[r,a]=(0,o.useState)($[t]||O),s=(0,o.useRef)($[t]);(0,o.useEffect)(()=>(s.current!==$[t]&&a($[t]),R.push([t,a]),()=>{let e=R.findIndex(([e])=>e===t);e>-1&&R.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||A[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:i}},Z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||P()}),F=e=>(t,r)=>{let a=Z(t,e,r);return T(a.toasterId||H(a.id))({type:2,toast:a}),a.id},D=(e,t)=>F("blank")(e,t);D.error=F("error"),D.success=F("success"),D.loading=F("loading"),D.custom=F("custom"),D.dismiss=(e,t)=>{let r={type:3,toastId:e};t?T(t)(r):q(r)},D.dismissAll=e=>D.dismiss(void 0,e),D.remove=(e,t)=>{let r={type:4,toastId:e};t?T(t)(r):q(r)},D.removeAll=e=>D.remove(void 0,e),D.promise=(e,t,r)=>{let a=D.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?E(t.success,e):void 0;return s?D.success(s,{id:a,...r,...null==r?void 0:r.success}):D.dismiss(a),e}).catch(e=>{let s=t.error?E(t.error,e):void 0;s?D.error(s,{id:a,...r,...null==r?void 0:r.error}):D.dismiss(a)}),e};var U=1e3,I=(e,t="default")=>{let{toasts:r,pausedAt:a}=M(e,t),s=(0,o.useRef)(new Map).current,i=(0,o.useCallback)((e,t=U)=>{if(s.has(e))return;let r=setTimeout(()=>{s.delete(e),n({type:4,toastId:e})},t);s.set(e,r)},[]);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&D.dismiss(r.id);return}return setTimeout(()=>D.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,o.useCallback)(T(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,o.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},z=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,X=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
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
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Q=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,W=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Y=j`
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
}`,J=w("div")`
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
    animation: ${Y} 0.2s ease-out forwards;
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
`,K=w("div")`
  position: absolute;
`,V=w("div")`
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
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===r?null:o.createElement(V,null,o.createElement(Q,{...a}),"loading"!==r&&o.createElement(K,null,"error"===r?o.createElement(X,{...a}):o.createElement(J,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=w("div")`
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
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(r),es(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=o.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(er,{toast:e}),n=o.createElement(eo,{...e.ariaProps},E(e.message,e));return o.createElement(ei,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});a=o.createElement,p.p=void 0,y=a,b=void 0,v=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let i=o.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:i,className:t,style:r},s)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},eu=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=I(r,i);return o.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let i=r.position||t,n=ec(i,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return o.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:n},"custom"===r.type?E(r.message,r):s?s(r):o.createElement(el,{toast:r,position:i}))}))};function em({candidate:e,dictionary:t}){let r=async()=>{let r={title:`${t.page.profile.shareTitle} ${e.name}`,text:`${t.page.profile.shareText} ${e.name}, ${t.candidate.candidateIn} ${e.governorate}.`,url:window.location.href};try{navigator.share?await navigator.share(r):(await navigator.clipboard.writeText(window.location.href),D.success(t.page.profile.linkCopied))}catch(e){console.error("Error sharing:",e),D.error(t.page.profile.shareError)}};return(0,s.jsxs)(s.Fragment,{children:[s.jsx(ep,{position:"bottom-center"}),(0,s.jsxs)("div",{className:"flex flex-col gap-4 sm:flex-row sm:justify-center",children:[(0,s.jsxs)("button",{onClick:r,className:"flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700",children:[s.jsx(i.PPi,{}),s.jsx("span",{children:t.page.profile.share})]}),(0,s.jsxs)("button",{onClick:()=>{window.print()},className:"flex items-center justify-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700",children:[s.jsx(i.rcQ,{}),s.jsx("span",{children:t.page.profile.print})]})]})]})}},25343:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var a=r(19510),s=r(21920);function i(){return a.jsx("div",{className:"container mx-auto px-4 py-12 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"mx-auto max-w-4xl",children:[(0,a.jsxs)("div",{className:"overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800",children:[(0,a.jsxs)("div",{className:"p-6 md:flex md:items-start md:space-x-8",children:[a.jsx(s.Z,{className:"mx-auto h-32 w-32 flex-shrink-0 rounded-full md:mx-0"}),(0,a.jsxs)("div",{className:"mt-4 flex-grow text-center md:mt-0 md:text-start",children:[a.jsx(s.Z,{className:"h-8 w-3/4"}),a.jsx(s.Z,{className:"mt-2 h-5 w-1/2"}),a.jsx(s.Z,{className:"mt-1 h-5 w-1/3"}),(0,a.jsxs)("div",{className:"mt-4 space-y-2",children:[a.jsx(s.Z,{className:"h-4 w-full"}),a.jsx(s.Z,{className:"h-4 w-5/6"})]})]})]}),a.jsx("div",{className:"grid grid-cols-2 gap-px border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50 md:grid-cols-4",children:[void 0,void 0,void 0,void 0].map((e,t)=>(0,a.jsxs)("div",{className:"text-center",children:[a.jsx(s.Z,{className:"h-5 w-1/2"}),a.jsx(s.Z,{className:"mt-1 h-4 w-3/4"})]},t))})]}),(0,a.jsxs)("div",{className:"mt-12",children:[a.jsx(s.Z,{className:"h-8 w-1/3"}),(0,a.jsxs)("div",{className:"mt-6 space-y-4",children:[a.jsx(s.Z,{className:"h-20 w-full"}),a.jsx(s.Z,{className:"h-20 w-full"})]})]})]})})}},95889:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u,generateMetadata:()=>c});var a=r(19510),s=r(10687),i=r(88483),o=r(74665),n=r(17710);let l=(0,r(68570).createProxy)(String.raw`E:\HamletUnified\Copy-of-Hamlet-social\components\ClientActions.tsx#default`);var d=r(61085);async function c({params:e},t){let r=await (0,i.R)(e.lang);try{let t=await (0,s.oP)(e.id);return{title:`${t.name} | ${r.metadata.title}`,description:`${r.page.profile.profileOf} ${t.name}, ${r.page.profile.candidateIn} ${t.governorate}.`}}catch(e){return{title:`Candidate Not Found | ${r.metadata.title}`,description:"The requested candidate could not be found."}}}async function u({params:e}){let t=await (0,i.R)(e.lang);try{let r=await (0,s.oP)(e.id),i=[{icon:o.pmi,label:t.candidate.governorate,value:r.governorate},{icon:o.$yZ,label:t.candidate.party,value:r.party},{icon:o.qc7,label:t.candidate.ballotNumber,value:r.ballot_number},{icon:o.C55,label:t.candidate.gender,value:t.candidate[r.gender.toLowerCase()]}];return a.jsx("div",{className:"container mx-auto px-4 py-12 sm:px-6 lg:px-8",children:a.jsx("div",{className:"mx-auto max-w-4xl",children:(0,a.jsxs)("div",{className:"overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800",children:[a.jsx("div",{className:"relative h-48 w-full bg-gradient-to-r from-red-500 via-white to-green-500 dark:from-red-700 dark:via-gray-800 dark:to-green-700",children:a.jsx(n.default,{src:`https://avatar.iran.liara.run/public/${"Female"===r.gender?"girl":"boy"}?username=${r.id}`,alt:r.name,width:128,height:128,className:"absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-gray-800"})}),(0,a.jsxs)("div",{className:"pt-20 text-center",children:[a.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white",children:r.name}),a.jsx("p",{className:"mt-1 text-lg font-medium text-green-600 dark:text-green-400",children:t.page.profile.candidateForParliament})]}),a.jsx("div",{className:"grid grid-cols-2 gap-px border-y border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700/50 mt-6 sm:grid-cols-4",children:i.map((e,t)=>(0,a.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[a.jsx(e.icon,{className:"h-6 w-6 text-gray-500 dark:text-gray-400"}),(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("p",{className:"text-sm font-medium text-gray-500 dark:text-gray-400",children:e.label}),a.jsx("p",{className:"font-semibold text-gray-900 dark:text-white",children:e.value})]})]},t))}),a.jsx("div",{className:"p-6",children:a.jsx(l,{candidate:r,dictionary:t})})]})})})}catch(e){(0,d.notFound)()}}},48402:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(19510),s=r(21920);let i=()=>(0,a.jsxs)("div",{className:"flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800",children:[a.jsx(s.Z,{className:"h-16 w-16 rounded-full"}),(0,a.jsxs)("div",{className:"flex-1 space-y-2",children:[a.jsx(s.Z,{className:"h-5 w-3/4"}),a.jsx(s.Z,{className:"h-4 w-1/2"}),a.jsx(s.Z,{className:"h-4 w-1/3"})]})]});function o(){return(0,a.jsxs)("div",{className:"container mx-auto px-4 py-8 sm:px-6 lg:px-8",children:[a.jsx("div",{className:"mb-8",children:a.jsx(s.Z,{className:"h-10 w-1/3"})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-8 lg:grid-cols-4",children:[a.jsx("aside",{className:"lg:col-span-1",children:(0,a.jsxs)("div",{className:"space-y-6",children:[a.jsx(s.Z,{className:"h-10 w-full"}),a.jsx(s.Z,{className:"h-10 w-full"}),a.jsx(s.Z,{className:"h-10 w-full"})]})}),a.jsx("main",{className:"grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-3",children:[...Array(12)].map((e,t)=>a.jsx(i,{},t))})]})]})}},21920:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var a=r(19510),s=r(55761),i=r(62386);r(71159);let o=function({className:e,...t}){return a.jsx("div",{className:function(...e){return(0,i.m6)((0,s.W)(e))}("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",e),...t})}},61085:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return o},RedirectType:function(){return a.RedirectType},notFound:function(){return s.notFound},permanentRedirect:function(){return a.permanentRedirect},redirect:function(){return a.redirect}});let a=r(83953),s=r(16399);class i extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class o extends URLSearchParams{append(){throw new i}delete(){throw new i}set(){throw new i}sort(){throw new i}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},16399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isNotFoundError:function(){return s},notFound:function(){return a}});let r="NEXT_NOT_FOUND";function a(){let e=Error(r);throw e.digest=r,e}function s(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8586:(e,t)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return r}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},83953:(e,t,r)=>{"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RedirectType:function(){return a},getRedirectError:function(){return l},getRedirectStatusCodeFromError:function(){return f},getRedirectTypeFromError:function(){return m},getURLFromRedirectError:function(){return p},isRedirectError:function(){return u},permanentRedirect:function(){return c},redirect:function(){return d}});let s=r(54580),i=r(72934),o=r(8586),n="NEXT_REDIRECT";function l(e,t,r){void 0===r&&(r=o.RedirectStatusCode.TemporaryRedirect);let a=Error(n);a.digest=n+";"+t+";"+e+";"+r+";";let i=s.requestAsyncStorage.getStore();return i&&(a.mutableCookies=i.mutableCookies),a}function d(e,t){void 0===t&&(t="replace");let r=i.actionAsyncStorage.getStore();throw l(e,t,(null==r?void 0:r.isAction)?o.RedirectStatusCode.SeeOther:o.RedirectStatusCode.TemporaryRedirect)}function c(e,t){void 0===t&&(t="replace");let r=i.actionAsyncStorage.getStore();throw l(e,t,(null==r?void 0:r.isAction)?o.RedirectStatusCode.SeeOther:o.RedirectStatusCode.PermanentRedirect)}function u(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,r,a,s]=e.digest.split(";",4),i=Number(s);return t===n&&("replace"===r||"push"===r)&&"string"==typeof a&&!isNaN(i)&&i in o.RedirectStatusCode}function p(e){return u(e)?e.digest.split(";",3)[2]:null}function m(e){if(!u(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function f(e){if(!u(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(a||(a={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[740,155,545,86,993],()=>r(6237));module.exports=a})();