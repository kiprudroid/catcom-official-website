import{A as c}from"./apiClient-rp6effnY.js";import{r as f}from"./index-VxYy2mX_.js";const m=()=>{const e=localStorage.getItem("attendance_token");return e?{Authorization:`Bearer ${e}`}:{}},b=()=>{const e=localStorage.getItem("token");return e?{Authorization:`Bearer ${e}`}:{}},$e=async()=>{const e=await fetch(`${c}/attendance/groups`);if(!e.ok)throw new Error("Failed to fetch groups");return e.json()},ve=async({email:e,password:t})=>{const a=await fetch(`${c}/attendance/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})});if(!a.ok){const r=await a.json();throw new Error(r.message||"Login failed")}return a.json()},Ee=async e=>{const t=await fetch(`${c}/attendance/groups`,{method:"POST",headers:{"Content-Type":"application/json",...b()},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to create group");return t.json()},xe=async(e,t)=>{const a=await fetch(`${c}/attendance/groups/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",...b()},body:JSON.stringify(t)});if(!a.ok)throw new Error("Failed to update group");return a.json()},je=async e=>{const t=await fetch(`${c}/attendance/groups/${e}`,{method:"DELETE",headers:b()});if(!t.ok)throw new Error("Failed to delete group");return t.json()},ke=async e=>{const t=await fetch(`${c}/attendance/groups/${e}/admin`,{headers:b()});if(!t.ok)throw new Error("Failed to fetch admin");return t.json()},Te=async(e,t)=>{const a=await fetch(`${c}/attendance/groups/${e}/admin`,{method:"POST",headers:{"Content-Type":"application/json",...b()},body:JSON.stringify(t)});if(!a.ok)throw new Error("Failed to create admin account");return a.json()},Fe=async(e,t)=>{const a=await fetch(`${c}/attendance/groups/${e}/admin`,{method:"PUT",headers:{"Content-Type":"application/json",...b()},body:JSON.stringify({password:t})});if(!a.ok)throw new Error("Failed to update password");return a.json()},Se=async e=>{const t=await fetch(`${c}/attendance/groups/${e}/admin`,{method:"DELETE",headers:b()});if(!t.ok)throw new Error("Failed to delete admin account");return t.json()},Oe=async()=>{const e=await fetch(`${c}/attendance/members`,{headers:m()});if(!e.ok)throw new Error("Failed to fetch members");return(await e.json()).map(({created_at:a,...r})=>({...r,createdAt:a}))},Ae=async e=>{const t=await fetch(`${c}/attendance/members`,{method:"POST",headers:{"Content-Type":"application/json",...m()},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to create member");return t.json()},Pe=async(e,t)=>{const a=await fetch(`${c}/attendance/members/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",...m()},body:JSON.stringify(t)});if(!a.ok)throw new Error("Failed to update member");return a.json()},Ne=async(e,t)=>{const a=await fetch(`${c}/attendance/members/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",...m()},body:JSON.stringify({in_session:t})});if(!a.ok)throw new Error("Failed to update session status");return a.json()},Ce=async e=>{const t=await fetch(`${c}/attendance/members/${e}`,{method:"DELETE",headers:m()});if(!t.ok)throw new Error("Failed to remove member");return t.json()},ze=async e=>{const t=await fetch(`${c}/attendance/records/${e}`,{headers:m()});if(!t.ok)throw new Error("Failed to fetch attendance");return t.json()},Je=async e=>{const t=await fetch(`${c}/attendance/records`,{method:"POST",headers:{"Content-Type":"application/json",...m()},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to mark attendance");return t.json()},De=async(e,t)=>{const a=await fetch(`${c}/attendance/members/${e}/follow-up`,{method:"PUT",headers:{"Content-Type":"application/json",...m()},body:JSON.stringify({meetingDate:t})});if(!a.ok)throw new Error("Failed to mark follow up");return a.json()},Ie=async(e,t)=>{const a=await fetch(`${c}/attendance/records/range?start=${e}&end=${t}`,{headers:m()});if(!a.ok)throw new Error("Failed to fetch range report");return a.json()},Le=async e=>{const t=await fetch(`${c}/attendance/meetings/${e}`,{headers:m()});if(!t.ok)throw new Error("Failed to fetch meeting purpose");return t.json()},Me=async({date:e,purpose:t,activities:a})=>{const r=await fetch(`${c}/attendance/meetings`,{method:"POST",headers:{"Content-Type":"application/json",...m()},body:JSON.stringify({date:e,purpose:t,activities:a})});if(!r.ok)throw new Error("Failed to save meeting purpose");return r.json()},_e=async e=>{const t=await fetch(`${c}/attendance/visitors/${e}`,{headers:m()});if(!t.ok)throw new Error("Failed to fetch visitors");return t.json()},Ge=async e=>{const t=await fetch(`${c}/attendance/visitors`,{method:"POST",headers:{"Content-Type":"application/json",...m()},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to add visitor");return t.json()},Be=async e=>{const t=await fetch(`${c}/attendance/visitors/${e}`,{method:"DELETE",headers:m()});if(!t.ok)throw new Error("Failed to remove visitor");return t.json()};let D={data:""},I=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||D},L=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,M=/\/\*[^]*?\*\/|  +/g,O=/\n+/g,g=(e,t)=>{let a="",r="",n="";for(let s in e){let o=e[s];s[0]=="@"?s[1]=="i"?a=s+" "+o+";":r+=s[1]=="f"?g(o,s):s+"{"+g(o,s[1]=="k"?"":t)+"}":typeof o=="object"?r+=g(o,t?t.replace(/([^,])+/g,i=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,i):i?i+" "+d:d)):s):o!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=g.p?g.p(s,o):s+":"+o+";")}return a+(t&&n?t+"{"+n+"}":n)+r},h={},A=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+A(e[a]);return t}return e},_=(e,t,a,r,n)=>{let s=A(e),o=h[s]||(h[s]=(d=>{let p=0,u=11;for(;p<d.length;)u=101*u+d.charCodeAt(p++)>>>0;return"go"+u})(s));if(!h[o]){let d=s!==e?e:(p=>{let u,$,v=[{}];for(;u=L.exec(p.replace(M,""));)u[4]?v.shift():u[3]?($=u[3].replace(O," ").trim(),v.unshift(v[0][$]=v[0][$]||{})):v[0][u[1]]=u[2].replace(O," ").trim();return v[0]})(e);h[o]=g(n?{["@keyframes "+o]:d}:d,a?"":"."+o)}let i=a&&h.g?h.g:null;return a&&(h.g=h[o]),((d,p,u,$)=>{$?p.data=p.data.replace($,d):p.data.indexOf(d)===-1&&(p.data=u?d+p.data:p.data+d)})(h[o],t,r,i),o},G=(e,t,a)=>e.reduce((r,n,s)=>{let o=t[s];if(o&&o.call){let i=o(a),d=i&&i.props&&i.props.className||/^go/.test(i)&&i;o=d?"."+d:i&&typeof i=="object"?i.props?"":g(i,""):i===!1?"":i}return r+n+(o??"")},"");function j(e){let t=this||{},a=e.call?e(t.p):e;return _(a.unshift?a.raw?G(a,[].slice.call(arguments,1),t.p):a.reduce((r,n)=>Object.assign(r,n&&n.call?n(t.p):n),{}):a,I(t.target),t.g,t.o,t.k)}let P,k,T;j.bind({g:1});let y=j.bind({k:1});function B(e,t,a,r){g.p=t,P=e,k=a,T=r}function w(e,t){let a=this||{};return function(){let r=arguments;function n(s,o){let i=Object.assign({},s),d=i.className||n.className;a.p=Object.assign({theme:k&&k()},i),a.o=/ *go\d+/.test(d),i.className=j.apply(a,r)+(d?" "+d:"");let p=e;return e[0]&&(p=i.as||e,delete i.as),T&&p[0]&&T(i),P(p,i)}return n}}var U=e=>typeof e=="function",F=(e,t)=>U(e)?e(t):e,H=(()=>{let e=0;return()=>(++e).toString()})(),V=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),q=20,N="default",C=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:r}=t;return C(e,{type:e.toasts.find(o=>o.id===r.id)?1:0,toast:r});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(o=>o.id===n||n===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+s}))}}},R=[],Z={toasts:[],pausedAt:void 0,settings:{toastLimit:q}},E={},z=(e,t=N)=>{E[t]=C(E[t]||Z,e),R.forEach(([a,r])=>{a===t&&r(E[t])})},J=e=>Object.keys(E).forEach(t=>z(e,t)),Q=e=>Object.keys(E).find(t=>E[t].toasts.some(a=>a.id===e)),S=(e=N)=>t=>{z(t,e)},W=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||H()}),x=e=>(t,a)=>{let r=W(t,e,a);return S(r.toasterId||Q(r.id))({type:2,toast:r}),r.id},l=(e,t)=>x("blank")(e,t);l.error=x("error");l.success=x("success");l.loading=x("loading");l.custom=x("custom");l.dismiss=(e,t)=>{let a={type:3,toastId:e};t?S(t)(a):J(a)};l.dismissAll=e=>l.dismiss(void 0,e);l.remove=(e,t)=>{let a={type:4,toastId:e};t?S(t)(a):J(a)};l.removeAll=e=>l.remove(void 0,e);l.promise=(e,t,a)=>{let r=l.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let s=t.success?F(t.success,n):void 0;return s?l.success(s,{id:r,...a,...a==null?void 0:a.success}):l.dismiss(r),n}).catch(n=>{let s=t.error?F(t.error,n):void 0;s?l.error(s,{id:r,...a,...a==null?void 0:a.error}):l.dismiss(r)}),e};var Y=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,K=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ee=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${K} 0.15s ease-out forwards;
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
    animation: ${X} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,te=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ae=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${te} 1s linear infinite;
`,re=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,oe=y`
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
}`,se=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${re} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${oe} 0.2s ease-out forwards;
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
`,ne=w("div")`
  position: absolute;
`,ie=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ce=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,de=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ce} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,le=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return t!==void 0?typeof t=="string"?f.createElement(de,null,t):t:a==="blank"?null:f.createElement(ie,null,f.createElement(ae,{...r}),a!=="loading"&&f.createElement(ne,null,a==="error"?f.createElement(ee,{...r}):f.createElement(se,{...r})))},pe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,me=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,fe="0%{opacity:0;} 100%{opacity:1;}",ue="0%{opacity:1;} 100%{opacity:0;}",he=w("div")`
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
`,ye=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ge=(e,t)=>{let a=e.includes("top")?1:-1,[r,n]=V()?[fe,ue]:[pe(a),me(a)];return{animation:t?`${y(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};f.memo(({toast:e,position:t,style:a,children:r})=>{let n=e.height?ge(e.position||t||"top-center",e.visible):{opacity:0},s=f.createElement(le,{toast:e}),o=f.createElement(ye,{...e.ariaProps},F(e.message,e));return f.createElement(he,{className:e.className,style:{...n,...a,...e.style}},typeof r=="function"?r({icon:s,message:o}):f.createElement(f.Fragment,null,s,o))});B(f.createElement);j`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var Ue=l;export{Le as a,_e as b,Ge as c,Be as d,Oe as e,Ie as f,ze as g,De as h,Ce as i,Ae as j,$e as k,ve as l,Je as m,xe as n,Ee as o,Se as p,Fe as q,Te as r,Me as s,Ne as t,Pe as u,je as v,ke as w,Ue as z};
