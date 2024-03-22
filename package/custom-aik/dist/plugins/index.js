var s=t=>t;import{readFileSync as J}from"node:fs";import"astro";import{fileURLToPath as B}from"node:url";import{dirname as q,resolve as Y}from"pathe";var k=t=>{let o=t;return o.startsWith("file://")&&(o=q(B(o))),{resolve:(...e)=>Y(o,...e)}};import{AstroError as I}from"astro/errors";function v(t){let o=[];if(t){for(let e of t)if(e){if(Array.isArray(e)){o.push(...v(e));continue}e instanceof Promise||o.push(e.name)}}return o}var c=({plugin:t,config:o})=>{if(!t||t instanceof Promise)return!1;let e=new Set(v(o?.vite?.plugins)),r=new Set;if(typeof t=="string"&&r.add(t),typeof t=="object")if(Array.isArray(t)){let n=new Set(v(t));for(let i of n)r.add(i)}else r.add(t.name);return[...r].some(n=>e.has(n))};var g=({warnDuplicated:t=!0,plugin:o,config:e,logger:r,updateConfig:n})=>{t&&e&&r&&c({plugin:o,config:e})&&r.warn(`The Vite plugin "${o.name}" is already present in your Vite configuration, this plugin may not behave correctly.`),n({vite:{plugins:[o]}})};var z=t=>{let o=1;return`${t.replace(/-(\d+)$/,(e,r)=>(o=parseInt(r)+1,""))}-${o}`},A=t=>`\0${t}`,G=(t,o)=>{let e=Array.isArray(o)?o:Object.entries(o).map(([i,a])=>({id:i,content:a,context:void 0})),r={};for(let{id:i,context:a}of e)r[i]??=[],r[i]?.push(...a===void 0?["server","client"]:[a]);for(let[i,a]of Object.entries(r))if(a.length!==[...new Set(a)].length)throw new I(`Virtual import with id "${i}" has been registered several times with conflicting contexts.`);let n=Object.fromEntries(e.map(({id:i})=>{if(i.startsWith("astro:"))throw new I(`Virtual import name prefix can't be "astro:" (for "${i}") because it's reserved for Astro core.`);return[A(i),i]}));return{name:t,resolveId(i){if(e.find(a=>a.id===i))return A(i)},load(i,a){let p=n[i];if(p){let P=a?.ssr?"server":"client",f=e.find(m=>m.id===p&&m.context===void 0?!0:m.context===P);if(f)return f.content}}}},l=({name:t,imports:o,config:e,updateConfig:r})=>{let n=`vite-plugin-${t}`;for(;c({plugin:n,config:e});)n=z(n);g({warnDuplicated:!1,plugin:G(n,o),updateConfig:r})};var w=({id:t,name:o,icon:e,framework:r,src:n,style:i,config:a,addDevToolbarApp:p,updateConfig:P,injectScript:f})=>{let m=`virtual:astro-devtoolbar-app-${t}`,{resolve:N}=k(import.meta.url),y=J(N(`../stubs/add-devtoolbar-framework-app/${r}.js`),"utf-8"),M=e.replace("`",'${"`"}');y=y.replace("@@COMPONENT_SRC@@",n).replace("@@ID@@",t).replace("@@NAME@@",o).replace("@@ICON@@",M).replace("@@STYLE@@",i??""),l({name:t,imports:{[m]:y},config:a,updateConfig:P}),r==="react"&&import("@vitejs/plugin-react").then(_=>{let W=_.default.preambleCode.replace("__BASE__","/");f("page",W)}),p(m)};var x=s({name:"addDevToolbarFrameworkApp",hook:"astro:config:setup",implementation:({config:t,addDevToolbarApp:o,updateConfig:e,injectScript:r})=>n=>w({...n,addDevToolbarApp:o,updateConfig:e,injectScript:r,config:t})});import{mkdirSync as K,readFileSync as Q,writeFileSync as b}from"node:fs";import{dirname as X,relative as Z}from"node:path";import{fileURLToPath as u}from"node:url";import{parse as tt,prettyPrint as et}from"recast";import ot from"recast/parsers/typescript.js";var rt=({srcDir:t,logger:o,specifier:e})=>{let r=u(new URL("env.d.ts",t));e instanceof URL&&(e=u(e),e=Z(u(t),e),e=e.replaceAll("\\","/"));let n=Q(r,"utf8");if(n.includes(`/// <reference types='${e}' />`)||n.includes(`/// <reference types="${e}" />`))return;let i=n.replace("/// <reference types='astro/client' />",`/// <reference types='astro/client' />
/// <reference types='${e}' />`).replace('/// <reference types="astro/client" />',`/// <reference types="astro/client" />
/// <reference types="${e}" />`);i!==n&&(b(r,i),o.info("Updated env.d.ts types"))},H=({name:t,content:o,root:e,srcDir:r,logger:n})=>{let i=new URL(`.astro/${t}.d.ts`,e),a=u(i);rt({srcDir:r,logger:n,specifier:i}),K(X(a),{recursive:!0}),b(a,et(tt(o,{parser:ot}),{tabWidth:4}).code,"utf-8")};var T=s({name:"addDts",hook:"astro:config:setup",implementation:({logger:t,config:{root:o,srcDir:e}})=>({name:r,content:n})=>H({name:r,content:n,logger:t,root:o,srcDir:e})});import"astro";import{AstroError as R}from"astro/errors";var d=({name:t,position:o,relativeTo:e,config:r})=>{let n=r.integrations.findIndex(a=>a.name===t);if(n===-1)return!1;if(o===void 0)return!0;if(e===void 0)throw new R("Cannot perform a relative integration check without a relative reference.","Pass `relativeTo` on your call to `hasIntegration` or remove the `position` option.");let i=r.integrations.findIndex(a=>a.name===e);if(i===-1)throw new R("Cannot check relative position against an absent integration.");return o==="before"?n<i:n>i};var D=({integration:t,options:o,updateConfig:e,config:r,logger:n})=>{if(o?.ensureUnique&&d({name:t.name,config:r})){n.warn(`Integration "${t.name}" has already been added by the user or another integration. Skipping.`);return}e({integrations:[t]})};var V=s({name:"addIntegration",hook:"astro:config:setup",implementation:({updateConfig:t,config:o,logger:e})=>(r,n)=>D({integration:r,options:n,updateConfig:t,config:o,logger:e})});var S=s({name:"addVirtualImports",hook:"astro:config:setup",implementation:({config:t,updateConfig:o},{name:e})=>r=>{l({name:e,imports:r,config:t,updateConfig:o})}});var C=s({name:"addVitePlugin",hook:"astro:config:setup",implementation:({config:t,logger:o,updateConfig:e})=>r=>g({plugin:r,config:t,logger:o,updateConfig:e})});var j=s({name:"hasIntegration",hook:"astro:config:setup",implementation:({config:t},{name:o})=>(e,r,n)=>d({name:e,relativeTo:n??o,position:r,config:t})});function h(t,o){if(o){for(let e of o)if(e){if(Array.isArray(e)){h(t,e);continue}e instanceof Promise||t.add(e)}}return t}var F=s({name:"hasVitePlugin",hook:"astro:config:setup",implementation:t=>{let o=h(new Set,t.config.vite?.plugins),{updateConfig:e,config:r}=t;return t.updateConfig=n=>(r.vite.plugins=Array.from(h(o,n.vite?.plugins)),e(n)),n=>c({plugin:n,config:r})}});var O=({command:t,injectRoute:o,injectedRoute:e})=>{t==="dev"&&o(e)};var $=s({name:"injectDevRoute",hook:"astro:config:setup",implementation:({command:t,injectRoute:o})=>e=>O({command:t,injectRoute:o,injectedRoute:e})});import{readdirSync as nt,statSync as it}from"node:fs";import{join as at,relative as st,resolve as pt}from"pathe";var E=(t,o=t)=>{let e=nt(t),r=[];for(let n of e){let i=at(t,n);if(it(i).isDirectory()){let p=E(i,o);r=r.concat(p)}else{let p=st(o,i);r.push(p)}}return r},L=({addWatchFile:t,command:o,dir:e,updateConfig:r})=>{if(o!=="dev")return;let n=E(e).map(i=>pt(e,i));for(let i of n)t(i);r({vite:{plugins:[{name:"rollup-plugin-astro-tailwind-config-viewer",buildStart(){for(let i of n)this.addWatchFile(i)}}]}})};var U=s({name:"watchIntegration",hook:"astro:config:setup",implementation:({addWatchFile:t,command:o,updateConfig:e})=>r=>L({dir:r,command:o,addWatchFile:t,updateConfig:e})});var we=[F,T,S,C,j,$,U,x,V];export{x as addDevToolbarFrameworkAppPlugin,T as addDtsPlugin,V as addIntegrationPlugin,S as addVirtualImportsPlugin,C as addVitePluginPlugin,we as corePlugins,j as hasIntegrationPlugin,F as hasVitePluginPlugin,$ as injectDevRoutePlugin,U as watchIntegrationPlugin};
//# sourceMappingURL=index.js.map