!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const o=e=>({addTask:e=>{(void 0).toDos.push(e)},setTitle:e=>{(void 0).title=e},getTasks:()=>(void 0).tasks,getTitle:()=>e,title:e});let n={getTitle(){return this.title}};const l={storeProjects:()=>{localStorage.setItem("projects",JSON.stringify(c.getProjectsArray()))},getProjects:()=>localStorage.getItem("projects")?JSON.parse(localStorage.getItem("projects")):c.getProjectsArray()},c=(()=>{let e=[o("Daily")];return{addProject:t=>{e=l.getProjects();let r=o(t);e.push(r),l.storeProjects()},getProjectsArray:()=>e,getProjects:()=>l.getProjects()}})();(()=>{let e=document.querySelector("#add-project-but"),t=document.querySelector("#project-title-input"),r=document.querySelector("#projects-container");const o=e=>{let t=document.createElement("div");t.classList.add("row","pb-1");let o=document.createElement("div");o.classList.add("col-8","pr-0");let n=document.createElement("div");n.classList.add("col-4","pl-1");let l=document.createElement("button");l.textContent=e,l.classList.add("btn","btn-outline-info","btn-block");let c=document.createElement("button");c.textContent="Delete",c.classList.add("btn","btn-outline-danger","btn-block"),o.appendChild(l),n.appendChild(c),t.appendChild(o),t.appendChild(n),r.append(t)};return{render:()=>{console.log(JSON.parse(localStorage.getItem("projects"))),console.log(c.getProjects()),c.getProjects().forEach(e=>{Object.assign(e,n),o(e.getTitle())}),e.addEventListener("click",()=>{t.value?(c.addProject(t.value),o(t.value),t.value="",console.log(JSON.parse(localStorage.getItem("projects")))):alert("warning")})}}})().render()}]);