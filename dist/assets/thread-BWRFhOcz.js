import{g as v,d as m,a as u,q as y,l as B,c as l,e as D,f as p,u as E,o as I,h as w}from"./utilities-Do-zljoa.js";import{getUserObject as L}from"./authentication-DCrq2YVr.js";function d(t,a){t.classList.toggle("d-none",!a)}async function g(t,a){const c=y(l(t,a),B(1));(await D(c)).empty&&(await p(l(t,a),{time:Date.now()}),console.log("seed succesfully ran"))}async function f(t,a,c){const i=document.getElementById("header-container"),s=(await v(t)).data();let e=E(c,a);i.innerHTML+=`
    <img
      src=${e}
      class="header-icon-custom me-3"
    />
    <button id="thread-information-btn" class="thread-info-btn">
      <div class="fw-bold fs-5">${s.name}</div>
      <small>${s.date}</small>
      <small>${s.time}</small>
    </button>
    `,document.getElementById("back-btn")?.addEventListener("click",r=>{location.href="other-threads.html"})}function b(t,a,c){const i=document.getElementById("chatbox-container");I(y(l(t,a),w("time","asc")),n=>{n.docChanges().forEach(s=>{const e=s.doc.data();s.type==="added"&&e.message!=null&&(c.uid==e.user?i.innerHTML+=`
                            <div class="d-flex flex-row-reverse gap-3 align-items-center">
                                <img src="/images/account.png" class="chat-icon" />
                                <p class="chat-bubble">${e.message}</p>
                            </div>
                            `:i.innerHTML+=`
                            <div class="d-flex justify-content-start gap-3 align-items-center">
                                <img src="/images/account.png" class="chat-icon" />
                                <div class="chat-bubble">
                                <small>${e.name}</small>
                                <p class="mb-0">${e.message}</p>
                                </div>
                            </div>
                            `)})})}function h(t,a,c,i){const n=document.getElementById("camera-btn"),s=document.getElementById("mic-btn"),e=document.getElementById("send-btn"),o=document.getElementById("messageInput");o?.addEventListener("focus",r=>{d(n,!1),d(s,!1)}),o?.addEventListener("blur",r=>{d(n,!0),d(s,!0)}),e?.addEventListener("click",async r=>{await p(l(t,a),{message:o.value,time:Date.now(),user:i.uid,name:c}),o.value="",o.focus()})}async function $(){const t=await L(),c=(await v(m(u,"users",t.uid))).data(),i=c.name,n=c.region,s=c.games;if(s.length===1){const e=m(u,"events",s[0]);g(e,n),f(e,s[0],n),b(e,n,t),h(e,n,i,t)}else{const e=localStorage.getItem("selectedThread"),o=m(u,"events",e);g(o,n),f(o,e,n),b(o,n,t),h(o,n,i,t)}}$();
