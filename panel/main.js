(()=>{var I="openchamber.sdk",V=1;var d_=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function mT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(X)=>{let D=X.target===_?E:X.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let z=O.get(D);if(z!==void 0)clearTimeout(z);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var bS=`(${mT.toString()})(document);`;var p_=128,v_=65536;var N_=128;var W_=65536;var vT=/^[a-z][a-z0-9-]{0,39}$/;var cT=(_)=>Object(_)===_&&!Array.isArray(_),u_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),dT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,pT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,uT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!cT(O)||!vT.test(O.id)||!dT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!u_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!u_(O,["kind","id","label","value","options","disabled"]))return!1;if(!pT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let X=new Set;for(let D of O.options){if(!cT(D)||!u_(D,["value","label"])||!pT(D.value)||!dT(D.label)||X.has(D.value))return!1;X.add(D.value)}if(!X.has(O.value))return!1}return!0};var lT=["{id}","{segment}","{segments+}"];var VE=new Set(lT);var nT=["turn-finished","turn-failed","permission-asked","question-asked"];var NE=new Set(nT);var P_=20000000,$_=256;var l_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,oT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var aT=/^[A-Za-z0-9_-]{1,80}$/;var iT=["left","right","top","bottom"];var rT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let X=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of X)if(!rT(D,E+1,O))return!1;return!0},n_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(n_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(n_)}return String(_)===_||Number.isFinite(_)},o_=(_)=>{try{if(String(_.id)!==_.id||!aT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!iT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!rT(_.data)||!n_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var tT=["file","directory","other","missing"],i_=(_)=>Boolean(_&&"sessionId"in _),r_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var eT=/^[0-9a-f]{7,64}$/i,s_=(_)=>eT.test(_),L_=500,Y_=32000,_S=16000,TS=128,SS=200,ES=2000,OS=16000,US=80,AS=200,MS=16000;var RS=2000;var t_=20000,k_=1024,Q_=2000000;var z_=64000,Z_=8000,e_=4000;var _T=960000;var CS=999,GS=1e4,C_=500,XS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],DS=["stopped","starting","ready","failed"],yS=new Set(XS),IS=(_)=>yS.has(_),VS=(_)=>_&&IS(_)?_:"HOST_REJECTED",t=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(t);if(Object(_)===_)return Object.values(_).every(t);return!1},fS=(_)=>t(_)&&JSON.stringify(_).length<=MS,sT=(_)=>_?.trim().slice(0,AS)??"",e=(_)=>{let E=_.id.trim().slice(0,TS),O=_.title.trim().slice(0,SS),X=_.url.trim().slice(0,ES),D=_.text?.trim().slice(0,OS),z=_.author?.trim().slice(0,US),d=_.kind==="pull"?"pull":"issue",b={providerId:_.providerId.trim(),id:E,title:O||E,url:X,kind:d};if(D)b.text=D;if(z)b.author=z;if(d==="pull"){let m=sT(_.branches?.head),F=sT(_.branches?.base);if(m&&F)b.branches={head:m,base:F}}if(fS(_.data))b.data=_.data;return b},TT=(_)=>{let E=e(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},ST=(_)=>{let E={text:_.text.trim().slice(0,_S)};if(_.send)E.send=!0;return E},ET=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(CS,Math.max(0,Math.round(_)))},OT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(GS,Math.max(0,Math.ceil(_)))};var __=(_)=>_.length>0&&_.length<=k_&&!_.includes("\x00")&&!_.includes("\\");var F_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>RS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},hS=new Set(DS),UT=(_)=>Boolean(_&&"status"in _&&hS.has(String(_.status))&&!("body"in _)),J_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),AT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),MT=(_)=>Boolean(_&&"written"in _&&_.written===!0),RT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),gS=new Set(tT),CT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&gS.has(String(_.kind))&&Number.isFinite(_.size)),GT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),mS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),cS=(_)=>Object(_)===_?_:null,a_=(_)=>String(_)===_&&_.length>0,dS=(_)=>{if(!a_(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&a_(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:VS(a_(_.code)?_.code:void 0)};return null},XT=(_)=>{let E=cS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return dS(E);if(!mS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var NS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),pS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var WS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),B_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${k_} characters without NUL or backslash.`)),K_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},DT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),X=_.requestTimeoutMs??t_,D=new Set,z=new Set,d=new Set,b=new Set,m=new Set,F=new Set,J=new Set,Z=new Set,B=new Set,h=new Set,p=[],E_=null,O_=null,X_=new Set,D_=new Set,U_=null,A_=null,h_=!1,i=new Map,r=new Map,s=new Map,c=!1,C={value:0},R=null,v=null,M_=!1,R_=!1,JT=null,BT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},q=(T)=>{E.parent.postMessage(T,"*")},KT=()=>{if(c||E.parent===E||h.size===0||R?.features?.lateGenerateResults!==!0)return;q({channel:I,v:V,type:"generate-late-listen"})},L=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},jT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=XT(T.data);if(!S)return;if(S.type==="workspace"){let A=r.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="shells"){let A=s.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,v=BT(S.payload.session),L(D,S.payload),L(z,S.payload.directory),L(d,S.payload.session),v)L(b,v);L(m,S.payload.connection),L(F,S.payload.settings),L(J,S.payload.item),KT();return}if(S.type==="generate-late"){if(h.size===0)p.push(S.payload);else L(h,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};L(z,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)v=null;else if(v?.sessionId!==S.payload.session.id)v=BT(S.payload.session);L(d,S.payload.session);return}if(S.type==="session-lifecycle"){v=S.payload,L(b,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};L(m,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};L(F,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};L(J,S.payload.item);return}if(S.type==="status-control-event"){L(Z,S.payload);return}if(S.type==="popover-closed"){L(B,S.payload);return}if(S.type==="action"){let A=(f)=>{if(!c)q({channel:I,v:V,type:"action-result",id:S.id,payload:f})},N=O_;if(!N){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>N(S.payload)).then(()=>A({ok:!0}),(f)=>{let Q=(f instanceof Error?f.message:String(f)).trim();A({ok:!1,error:(Q||"Action failed.").slice(0,C_)})});return}if(S.type==="file-open"){let A=S.payload;if(A_&&oT(A_,A))return;A_=A,L(X_,S.payload);return}if(S.type==="file-saved"){L(D_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(Q)=>{if(!c)q({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:Q})},N=(Q)=>A({error:(Q.trim()||"Could not read the edited file.").slice(0,C_)}),f=U_;if(!f){N("This extension does not edit files.");return}Promise.resolve().then(()=>f(S.payload.purpose)).then((Q)=>{if(l_(Q)>P_){N(`The file is over ${P_} ${"bytes"in Q?"bytes":"characters"}.`);return}if(Q.version.length>$_){N(`The snapshot version is over ${$_} characters.`);return}A({snapshot:"bytes"in Q?{bytes:Q.bytes,version:Q.version}:{content:Q.content,version:Q.version}})},(Q)=>N(Q instanceof Error?Q.message:String(Q)));return}if(S.type==="resolve"){let A=(f)=>{q({channel:I,v:V,type:"resolve-result",id:S.id,payload:f})},N=E_;if(!N){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>N(S.payload)).then((f)=>A({item:f?e(f):null}),(f)=>{let Q=(f instanceof Error?f.message:String(f)).trim();A({error:(Q||"Command failed.").slice(0,C_)})});return}let U=i.get(S.id);if(!U)return;if(clearTimeout(U.timer),i.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",jT),q({channel:I,v:V,type:"hello"});let K=(T,S=X)=>{if(c||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let N=setTimeout(()=>{i.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);i.set(T.id,{resolve:U,reject:A,timer:N}),q(T)})},Y=(T)=>K(T).then(()=>{return}),k={channel:I,v:V},g_=(T)=>{if(!c&&E.parent!==E)q(T)},xT=()=>g_({...k,type:"file-save"}),wT=(T)=>{if(!NS(T)||!pS(T))return;T.preventDefault(),xT()},HT=(T)=>{if(!NS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),hT(R.popover.id,"escape").catch(()=>{return})},I_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=M_||R_;if(JT===S)return;JT=S,gT(T.id,S).catch(()=>{return})},V_=()=>{if(R?.surface!=="popover"||M_)return;M_=!0,I_()},bT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!M_)return;M_=!1,I_()},qT=()=>{if(R?.surface!=="popover"||R_)return;R_=!0,I_()},yT=()=>{if(R?.surface!=="popover"||!R_)return;R_=!1,I_()},g=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},m_=async(T)=>{if(T.kind!=="projects")g(T.projectId);let S=await K({...k,type:"workspace-read",id:G(C),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},c_=async(T,S)=>{if(T.kind!=="projects")g(T.projectId);let U=G(C);r.set(U,S);try{await Y({...k,type:"workspace-subscribe",id:G(C),payload:{subscriptionId:U,query:T}})}catch(A){if(r.delete(U),!c)q({...k,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!r.delete(U)||c)return;q({...k,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},HS=async(T,S)=>{if(T.kind==="session")g(T.sessionId);if(T.kind==="project")g(T.projectId);let U=G(C);s.set(U,S);try{await Y({...k,type:"shells-subscribe",id:G(C),payload:{subscriptionId:U,scope:T}})}catch(A){if(s.delete(U),!c)q({...k,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!s.delete(U)||c)return;q({...k,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},f_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>p_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!t(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>v_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await K({...k,type:"storage",id:G(C),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},hT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Y({...k,type:"popover-close",id:G(C),payload:S?{id:T,reason:S}:{id:T}}),gT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Y({...k,type:"popover-anchor",id:G(C),payload:{id:T,active:S}});return E.addEventListener("keydown",HT,!0),E.addEventListener("pointerover",V_),E.addEventListener("pointermove",V_),E.addEventListener("pointerout",bT),E.addEventListener("focus",qT),E.addEventListener("blur",yT),{onAction:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},listProjects:async()=>{let T=await m_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await m_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await m_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>c_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>c_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>c_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>HS(T,S),readShellOutput:async(T,S)=>{g(T,N_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>W_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${W_}.`);let f=await K({...k,type:"shell-output",id:G(C),payload:{shellId:T,cursor:U,tailBytes:A}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(T)=>{if(g(T,N_),(await K({...k,type:"shell-stop",id:G(C),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{g(T),await Y({...k,type:"open-session",id:G(C),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=K_(S),A={op:"get",key:T};if(U)A.scope=U;let N=await f_(A);return N.op==="get"&&N.found?N.value:void 0},set:async(T,S,U)=>{let A=K_(U),N={op:"set",key:T,value:S};if(A)N.scope=A;await f_(N)},delete:async(T,S)=>{let U=K_(S),A={op:"delete",key:T};if(U)A.scope=U;await f_(A)},keys:async(T)=>{let S=K_(T),U={op:"keys"};if(S)U.scope=S;let A=await f_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(D.add(T),R)T(R);return()=>{D.delete(T)}},onDirectory:(T)=>{if(z.add(T),R)T(R.directory);return()=>{z.delete(T)}},onSession:(T)=>{if(d.add(T),R)T(R.session);return()=>{d.delete(T)}},onSessionLifecycle:(T)=>{if(b.add(T),v)T(v);return()=>{b.delete(T)}},onConnection:(T)=>{if(m.add(T),R)T(R.connection);return()=>{m.delete(T)}},onSettings:(T)=>{if(F.add(T),R)T(R.settings);return()=>{F.delete(T)}},onItem:(T)=>{if(J.add(T),R)T(R.item);return()=>{J.delete(T)}},onStatusControl:(T)=>{return Z.add(T),()=>{Z.delete(T)}},onPopoverClosed:(T)=>{return B.add(T),()=>{B.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!uT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Y({...k,type:"status-controls",id:G(C),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!o_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Y({...k,type:"popover-open",id:G(C),payload:T})},closePopover:hT,setPopoverAnchorActive:gT,onResolve:(T)=>{return E_=T,()=>{if(E_===T)E_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>L_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${L_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>Y_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${Y_} characters.`));return Y({channel:I,v:V,type:"toast",id:G(C),payload:{...T,message:S}})},openUrl:(T)=>Y({channel:I,v:V,type:"open-url",id:G(C),payload:{url:T}}),openCommit:(T)=>s_(T)?Y({channel:I,v:V,type:"open-commit",id:G(C),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>Y({channel:I,v:V,type:"open-surface",id:G(C),payload:{surfaceId:T}}),writeClipboard:(T)=>Y({channel:I,v:V,type:"clipboard-write",id:G(C),payload:{text:T}}),compose:(T)=>Y({channel:I,v:V,type:"compose",id:G(C),payload:T}),attach:(T)=>Y({channel:I,v:V,type:"attach",id:G(C),payload:e(T)}),startSession:async(T)=>{if(T.projectId!==void 0)g(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")g(S.directory);else{if(S.name!==void 0)g(S.name,200);if(S.baseBranch!==void 0)g(S.baseBranch,200)}let U=await K({channel:I,v:V,type:"start-session",id:G(C),payload:TT(T)},_.requestTimeoutMs??180000);if(!i_(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>K({channel:I,v:V,type:"prompt",id:G(C),payload:ST(T)}).then((S)=>{if(!r_(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>Y({channel:I,v:V,type:"session-link",id:G(C),payload:e(T)}),close:()=>Y({channel:I,v:V,type:"close",id:G(C)}),oauthStart:()=>Y({channel:I,v:V,type:"oauth-start",id:G(C)}),oauthDisconnect:()=>Y({channel:I,v:V,type:"oauth-disconnect",id:G(C)}),request:(T)=>(F_(T.path)?K({channel:I,v:V,type:"request",id:G(C),payload:T}):WS()).then((S)=>{if(!J_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(F_(T.path)?K({channel:I,v:V,type:"service-request",id:G(C),payload:T}):WS()).then((S)=>{if(!J_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>K({channel:I,v:V,type:"service-status",id:G(C)}).then((T)=>{if(!UT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(__(T)?K({channel:I,v:V,type:"file-read",id:G(C),payload:{path:T}}):B_()).then((S)=>{if(!AT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!__(T))return B_();if(S.length>Q_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${Q_} characters.`));return K({channel:I,v:V,type:"file-write",id:G(C),payload:{path:T,content:S}}).then((U)=>{if(!MT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(__(T)?K({channel:I,v:V,type:"file-list",id:G(C),payload:{path:T}}):B_()).then((S)=>{if(!RT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(__(T)?K({channel:I,v:V,type:"file-stat",id:G(C),payload:{path:T}}):B_()).then((S)=>{if(!CT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>z_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${z_} characters.`));if(U!==void 0&&(U.length===0||U.length>Z_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${Z_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(e_,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let N={prompt:S};if(U!==void 0)N.system=U;if(A!==void 0)N.maxOutputTokens=A;return K({channel:I,v:V,type:"generate",id:G(C),payload:N},_.requestTimeoutMs??_T).then((f)=>{if(!GT(f))throw new M("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(T)=>{h.add(T);for(let S of p.splice(0))L([T],S);return KT(),()=>{h.delete(T)}},setBadge:(T)=>Y({channel:I,v:V,type:"badge",id:G(C),payload:{count:ET(T)}}),setHeight:(T)=>Y({channel:I,v:V,type:"resize",id:G(C),payload:{height:OT(T)}}),onFileOpen:(T)=>{if(X_.add(T),!h_)h_=!0,E.addEventListener("keydown",wT,!0);if(A_)T(A_);return()=>{X_.delete(T)}},onFileSnapshot:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},onFileSaved:(T)=>{return D_.add(T),()=>{D_.delete(T)}},reportFileChange:(T)=>g_({...k,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:xT,reportFileUnsupported:()=>g_({...k,type:"file-unsupported"}),dispose:()=>{for(let T of r.keys())q({...k,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:T}});r.clear();for(let T of s.keys())q({...k,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:T}});if(s.clear(),c=!0,E_=null,O_=null,U_=null,X_.clear(),D_.clear(),h_)E.removeEventListener("keydown",wT,!0);E.removeEventListener("message",jT),E.removeEventListener("keydown",HT,!0),E.removeEventListener("pointerover",V_),E.removeEventListener("pointermove",V_),E.removeEventListener("pointerout",bT),E.removeEventListener("focus",qT),E.removeEventListener("blur",yT);for(let T of i.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));i.clear(),D.clear(),z.clear(),d.clear(),b.clear(),m.clear(),F.clear(),J.clear(),Z.clear(),B.clear(),h.clear(),p.length=0}}};var PS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var jE=new Set(PS);var $S=["none","agent","user"];var wE=new Set($S);var vS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],uS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],LS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,X]of vS)E.style.setProperty(O,_.tokens[X]);for(let[O,X,D]of uS){let z=_.tokens[D]??"";E.style.setProperty(O,z),E.style.setProperty(X,z)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},IT=(_,E)=>{if(LS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var lS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},W=(_,E)=>`var(--${_}, var(--oc-${lS[_]}, ${E}))`,l=W("surface-background","transparent"),x_=W("surface-elevated","transparent"),T_=W("surface-elevated-foreground","inherit"),y=W("surface-foreground","inherit"),P=W("surface-muted-foreground","gray"),nS=W("surface-muted","transparent"),o=W("interactive-border","currentColor"),x=W("interactive-hover","transparent"),a=W("interactive-active","transparent"),VT=W("interactive-selection","transparent"),fT=W("interactive-selection-foreground","inherit"),u=W("primary","currentColor"),NT=W("primary-text","inherit"),WT=W("error-text","inherit"),oS=W("font-sans","inherit"),PT=W("font-mono","monospace"),zS=W("radius","9px"),$T=`calc(${zS} - 2px)`,YS=`calc(${zS} - 4px)`,$=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,kS=`background-image: linear-gradient(${x}, ${x});`,LT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,YT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",QS="box-shadow: var(--oc-sdk-lit);",kT=`inset 0 0.5px 0 0 ${$(y,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,aS=`
:root {
  --oc-sdk-edge: ${$(y,16)};
  --oc-sdk-field-bg: ${x_};
  --oc-sdk-raised-bg: ${l};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${$(y,14)};
  --oc-sdk-field-bg: ${$(l,50,x_)};
  --oc-sdk-raised-bg: ${x_};
  --oc-sdk-field-lift: ${kT};
  --oc-sdk-raised-lift: ${kT};
  --oc-sdk-lit: ${kT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,j_=(_)=>{let E=W(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${W(`${_}-text`,"inherit")}; }`},iS=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,ZS=`${aS}
.oc-sdk { color: ${y}; font-family: ${oS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${kS} }
.oc-sdk-mono { font-family: ${PT}; }
.oc-sdk-muted { color: ${P}; }
${j_("success")}${j_("warning")}${j_("error")}${j_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${u}; --oc-sdk-tone-text: ${NT}; }

.oc-sdk-btn { border-radius: ${$T}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${YS}; }
.oc-sdk-btn[data-variant="default"] { color: ${NT}; background: ${$(u,10,l)}; border-color: ${$(u,12)}; ${QS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${$(u,16,l)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${$(u,22,l)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${nS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${a}, ${a}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${T_}; ${YT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${a}, ${a}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${x}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${a}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${W("status-error","red")}; color: ${WT}; background: ${$("var(--oc-sdk-tone)",7,l)}; border-color: ${$("var(--oc-sdk-tone)",12)}; ${QS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${$("var(--oc-sdk-tone)",9,l)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${$("var(--oc-sdk-tone)",11,l)}; box-shadow: none; }

.oc-sdk-field-note { color: ${P}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${WT}; }
.oc-sdk-input { border-radius: ${$T}; background: var(--oc-sdk-field-bg); color: ${T_}; ${LT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${P}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${LT($(y,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${LT(W("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${PT}; }

.oc-sdk-search-icon { color: ${P}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${u}; }
.oc-sdk-search-clear { border-radius: ${YS}; color: ${P}; }
.oc-sdk-search-clear:hover { background: ${x}; color: ${y}; }

.oc-sdk-trigger { border-radius: ${$T}; background: var(--oc-sdk-raised-bg); color: ${T_}; ${YT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${a}, ${a}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${P}; }
.oc-sdk-trigger-chevron { color: ${P}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${T_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${x_}; background-clip: padding-box; color: ${T_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${x}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${VT}; color: ${fT}; }
.oc-sdk-option-check { color: ${y}; }
.oc-sdk-option[data-destructive="true"] { color: ${WT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${$(W("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${P}; }
.oc-sdk-popup-empty { color: ${P}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${o}; border-radius: 4px; color: ${y}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${$(y,60,o)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${o}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${l}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${u}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${kS} }
.oc-sdk-check-desc { color: ${P}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${$(y,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${P}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${y}; }
.oc-sdk-tab[aria-selected="true"] { color: ${fT}; background: ${VT}; border-color: ${o}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${T_}; background: var(--oc-sdk-raised-bg); ${YT} }
.oc-sdk-tab-count { color: ${P}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${$(y,6)}; color: ${P}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${$("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${x}; }
.oc-sdk-row[aria-selected="true"] { background: ${VT}; color: ${fT}; }
.oc-sdk-row-lead { font-family: ${PT}; color: ${P}; }
.oc-sdk-row-sub { color: ${P}; }
.oc-sdk-row-meta { color: ${P}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${P}; }

.oc-sdk-empty-body { color: ${P}; }

.oc-sdk-spinner { color: ${P}; }
.oc-sdk-spinner-ring { border-color: ${o}; border-top-color: ${u}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${$("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${P}; }

.oc-sdk-separator { color: ${P}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${$(o,40)}; }

.oc-sdk-progress-label { color: ${P}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${$(y,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${u}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${W("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${W("success-text","inherit")}; }

.oc-sdk-text a { color: ${NT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${$(o,60)}; }
`,j=`
${d_}
${iS}
${ZS}`;var FS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((X)=>/^\s*description\s*:/.test(X));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},_E=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),JS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((X)=>X.kind==="file"&&X.name.endsWith(".md")).map((X)=>X.name)}catch{return[]}},BS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},KS=async(_,E)=>{let O=[],X=[],D=new Set,z=new Map,d="~/.config/opencode/snippet";for(let F of await JS(_,"~/.config/opencode/snippet")){let J=await BS(_,`~/.config/opencode/snippet/${F}`);if(J===null)continue;let Z=_E(J);if(!Z)continue;let B=F.replace(/\.md$/,""),h=FS(J)??B,p=`snip:${Z}`;if(D.has(p))continue;D.add(p),O.push({label:h,text:Z}),z.set(B,h)}let b=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let F of b)for(let J of await JS(_,F)){let Z=await BS(_,`${F}/${J}`);if(Z===null)continue;let B=J.replace(/\.md$/,""),h=FS(Z)??B;z.set(B,h);let p=`cmd:/${B}`;if(D.has(p))continue;D.add(p),X.push({label:h,text:`/${B}`})}if(E)try{let{content:F}=await _.readFile(".openchamber/project.json"),J=JSON.parse(F);if(Array.isArray(J.draftStarters))for(let Z of J.draftStarters.slice(0,30)){if(typeof Z?.name!=="string"||!Z.name)continue;let B=`cmd:/${Z.name}`;if(D.has(B))continue;D.add(B),X.unshift({label:z.get(Z.name)??Z.name,text:`/${Z.name}`})}}catch{}let m=O.length+X.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:X,hint:m}},jS=async(_,E,O)=>{try{let X=await _.prompt({text:E,send:!0});if(O(X.sent==="sent"?"已提交到会话":`未直接发出（${X.sent}），已填入输入框`),X.sent!=="sent")await _.prompt({text:E}).catch(()=>{return})}catch(X){if(X instanceof M&&(X.code==="NO_SESSION"||X.code==="SESSION_BUSY"))O(X.code==="NO_SESSION"?"无会话已填入输入框":"会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});else O(X instanceof M?`${X.code}`:"发送失败")}};var FT=DT(),wS=document.querySelector("#root");if(!wS)throw Error("Missing #root");wS.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:14px/1.6 system-ui,sans-serif}
#root{padding:10px;display:flex;flex-direction:column;gap:10px;min-height:100%;max-width:100%;overflow-x:hidden}
h3{margin:4px 0 0;font-size:13px;opacity:.65;font-weight:600}
.grid{display:flex;flex-wrap:wrap;gap:8px}
button{padding:8px 14px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0);font-weight:700}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6;font-weight:700}
button:disabled{opacity:.5}
.mut{font-size:13px;opacity:.7}
</style>
<h3>命令</h3>
<div class="grid" id="cmds"></div>
<h3>代码片段</h3>
<div class="grid" id="snips"></div>
<div class="mut" id="out">点按钮直接发到当前会话</div>
<div class="mut" id="src"></div>
`;var y_=(_)=>document.querySelector(`#${_}`),zT=y_("cmds"),ZT=y_("snips"),TE=y_("out"),SE=y_("src"),EE=(_)=>{TE.textContent=_},xS=(_,E)=>{let O=document.createElement("button");return O.className=E,O.textContent=_.label,O.title=_.text.length>200?_.text.slice(0,200):_.text,O.onclick=()=>void jS(FT,_.text,EE),O},OE=async(_)=>{let{snippets:E,commands:O,hint:X}=await KS(FT,_);zT.innerHTML="";for(let D of O)zT.appendChild(xS(D,"cmd"));if(O.length===0)zT.innerHTML='<span class="mut">暂无</span>';ZT.innerHTML="";for(let D of E)ZT.appendChild(xS(D,"snip"));if(E.length===0)ZT.innerHTML='<span class="mut">暂无</span>';SE.textContent=X};FT.onReady((_)=>{IT(_,document.documentElement),OE(_.directory??null)});})();
