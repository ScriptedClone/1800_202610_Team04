import{g as o,d as a,a as r,u as l}from"./utilities-Do-zljoa.js";import"./site-navbar-BEOYGqvY.js";import{getUserObject as u}from"./authentication-DCrq2YVr.js";async function m(s,n){for(const e of n){const t=a(r,"events",e),c=document.getElementById("threads-container"),i=(await o(t)).data();let d=l(s,e);c.innerHTML+=`
        <div class="threads-bg d-flex justify-content-between align-items-center my-2 px-3">
          <img 
            src=${d}
            class="icon-img" 
          />
          <div class="d-flex flex-column fw-bold text-white">          
            <p class="m-0">${i.name}</p>
            <p class="m-0">30 users</p>
          </div>
          <button id="${e}" class="chat-btn">ENTER</button>
        </div>
        `}}function g(){const s=document.getElementById("threads-container"),n="thread.html";s.addEventListener("click",async e=>{const t=e.target.closest("button");if(console.log(t.id),t)localStorage.setItem("selectedThread",t.id),location.href=n;else return})}async function f(){const s=await u(),e=(await o(a(r,"users",s.uid))).data(),t=e.region,c=e.games;m(t,c),g()}f();
