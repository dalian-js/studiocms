import{readFileSync as V}from"node:fs";import"astro";import{fileURLToPath as b}from"node:url";import{dirname as x,resolve as O}from"pathe";var g=e=>{let t=e;return t.startsWith("file://")&&(t=x(b(t))),{resolve:(...r)=>O(t,...r)}};import{AstroError as P}from"astro/errors";function u(e){let t=[];if(e){for(let r of e)if(r){if(Array.isArray(r)){t.push(...u(r));continue}r instanceof Promise||t.push(r.name)}}return t}var m=({plugin:e,config:t})=>{if(!e||e instanceof Promise)return!1;let r=new Set(u(t?.vite?.plugins)),n=new Set;if(typeof e=="string"&&n.add(e),typeof e=="object")if(Array.isArray(e)){let i=new Set(u(e));for(let o of i)n.add(o)}else n.add(e.name);return[...n].some(i=>r.has(i))};var d=({warnDuplicated:e=!0,plugin:t,config:r,logger:n,updateConfig:i})=>{e&&r&&n&&m({plugin:t,config:r})&&n.warn(`The Vite plugin "${t.name}" is already present in your Vite configuration, this plugin may not behave correctly.`),i({vite:{plugins:[t]}})};var S=e=>{let t=1;return`${e.replace(/-(\d+)$/,(r,n)=>(t=parseInt(n)+1,""))}-${t}`},v=e=>`\0${e}`,H=(e,t)=>{let r=Array.isArray(t)?t:Object.entries(t).map(([o,s])=>({id:o,content:s,context:void 0})),n={};for(let{id:o,context:s}of r)n[o]??=[],n[o]?.push(...s===void 0?["server","client"]:[s]);for(let[o,s]of Object.entries(n))if(s.length!==[...new Set(s)].length)throw new P(`Virtual import with id "${o}" has been registered several times with conflicting contexts.`);let i=Object.fromEntries(r.map(({id:o})=>{if(o.startsWith("astro:"))throw new P(`Virtual import name prefix can't be "astro:" (for "${o}") because it's reserved for Astro core.`);return[v(o),o]}));return{name:e,resolveId(o){if(r.find(s=>s.id===o))return v(o)},load(o,s){let p=i[o];if(p){let l=s?.ssr?"server":"client",c=r.find(a=>a.id===p&&a.context===void 0?!0:a.context===l);if(c)return c.content}}}},y=({name:e,imports:t,config:r,updateConfig:n})=>{let i=`vite-plugin-${e}`;for(;m({plugin:i,config:r});)i=S(i);d({warnDuplicated:!1,plugin:H(i,t),updateConfig:n})};var W=({id:e,name:t,icon:r,framework:n,src:i,style:o,config:s,addDevToolbarApp:p,updateConfig:l,injectScript:c})=>{let a=`virtual:astro-devtoolbar-app-${e}`,{resolve:A}=g(import.meta.url),f=V(A(`../stubs/add-devtoolbar-framework-app/${n}.js`),"utf-8"),h=r.replace("`",'${"`"}');f=f.replace("@@COMPONENT_SRC@@",i).replace("@@ID@@",e).replace("@@NAME@@",t).replace("@@ICON@@",h).replace("@@STYLE@@",o??""),y({name:e,imports:{[a]:f},config:s,updateConfig:l}),n==="react"&&import("@vitejs/plugin-react").then(k=>{let w=k.default.preambleCode.replace("__BASE__","/");c("page",w)}),p(a)};export{W as addDevToolbarFrameworkApp};
//# sourceMappingURL=add-devtoolbar-framework-app.js.map