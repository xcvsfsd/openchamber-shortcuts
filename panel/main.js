(()=>{var X="openchamber.sdk",I=1;var p_=`
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
`;function gT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(D)=>{let V=D.target===_?E:D.target;if(!(V instanceof Element))return;if(!V.hasAttribute("data-oc-scrolling"))V.setAttribute("data-oc-scrolling","");let W=O.get(V);if(W!==void 0)clearTimeout(W);O.set(V,setTimeout(()=>{O.delete(V),V.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var qS=`(${gT.toString()})(document);`;var v_=128,u_=65536;var f_=128;var N_=65536;var vT=/^[a-z][a-z0-9-]{0,39}$/;var cT=(_)=>Object(_)===_&&!Array.isArray(_),l_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),dT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,pT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,uT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!cT(O)||!vT.test(O.id)||!dT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!l_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!l_(O,["kind","id","label","value","options","disabled"]))return!1;if(!pT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let D=new Set;for(let V of O.options){if(!cT(V)||!l_(V,["value","label"])||!pT(V.value)||!dT(V.label)||D.has(V.value))return!1;D.add(V.value)}if(!D.has(O.value))return!1}return!0};var lT=["{id}","{segment}","{segments+}"];var VE=new Set(lT);var nT=["turn-finished","turn-failed","permission-asked","question-asked"];var NE=new Set(nT);var P_=20000000,W_=256;var n_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,oT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var aT=/^[A-Za-z0-9_-]{1,80}$/;var iT=["left","right","top","bottom"];var rT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let D=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let V of D)if(!rT(V,E+1,O))return!1;return!0},o_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(o_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(o_)}return String(_)===_||Number.isFinite(_)},a_=(_)=>{try{if(String(_.id)!==_.id||!aT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!iT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!rT(_.data)||!o_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var tT=["file","directory","other","missing"],r_=(_)=>Boolean(_&&"sessionId"in _),s_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var eT=/^[0-9a-f]{7,64}$/i,t_=(_)=>eT.test(_),$_=500,L_=32000,_S=16000,TS=128,SS=200,ES=2000,OS=16000,US=80,AS=200,MS=16000;var RS=2000;var e_=20000,k_=1024,Y_=2000000;var Q_=64000,z_=8000,_T=4000;var TT=960000;var CS=999,GS=1e4,A_=500,DS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],XS=["stopped","starting","ready","failed"],mS=new Set(DS),IS=(_)=>mS.has(_),VS=(_)=>_&&IS(_)?_:"HOST_REJECTED",a=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(a);if(Object(_)===_)return Object.values(_).every(a);return!1},fS=(_)=>a(_)&&JSON.stringify(_).length<=MS,sT=(_)=>_?.trim().slice(0,AS)??"",i=(_)=>{let E=_.id.trim().slice(0,TS),O=_.title.trim().slice(0,SS),D=_.url.trim().slice(0,ES),V=_.text?.trim().slice(0,OS),W=_.author?.trim().slice(0,US),H=_.kind==="pull"?"pull":"issue",j={providerId:_.providerId.trim(),id:E,title:O||E,url:D,kind:H};if(V)j.text=V;if(W)j.author=W;if(H==="pull"){let c=sT(_.branches?.head),d=sT(_.branches?.base);if(c&&d)j.branches={head:c,base:d}}if(fS(_.data))j.data=_.data;return j},ST=(_)=>{let E=i(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},ET=(_)=>{let E={text:_.text.trim().slice(0,_S)};if(_.send)E.send=!0;return E},OT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(CS,Math.max(0,Math.round(_)))},UT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(GS,Math.max(0,Math.ceil(_)))};var r=(_)=>_.length>0&&_.length<=k_&&!_.includes("\x00")&&!_.includes("\\");var Z_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>RS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},hS=new Set(XS),AT=(_)=>Boolean(_&&"status"in _&&hS.has(String(_.status))&&!("body"in _)),F_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),MT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),RT=(_)=>Boolean(_&&"written"in _&&_.written===!0),CT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),gS=new Set(tT),GT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&gS.has(String(_.kind))&&Number.isFinite(_.size)),DT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),cS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),dS=(_)=>Object(_)===_?_:null,i_=(_)=>String(_)===_&&_.length>0,pS=(_)=>{if(!i_(_.id))return null;if(_.ok===!0){let E={channel:X,v:I,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&i_(_.error))return{channel:X,v:I,type:"result",id:_.id,ok:!1,error:_.error,code:VS(i_(_.code)?_.code:void 0)};return null},XT=(_)=>{let E=dS(_);if(!E||E.channel!==X||E.v!==I)return null;if(E.type==="result")return pS(E);if(!cS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var NS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),vS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var PS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),J_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${k_} characters without NUL or backslash.`)),B_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},IT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),D=_.requestTimeoutMs??e_,V=new Set,W=new Set,H=new Set,j=new Set,c=new Set,d=new Set,e=new Set,R_=new Set,C_=new Set,u=new Set,m_=[],__=null,T_=null,G_=new Set,D_=new Set,S_=null,E_=null,h_=!1,l=new Map,n=new Map,o=new Map,q=!1,C={value:0},R=null,y=null,O_=!1,U_=!1,JT=null,BT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},x=(T)=>{E.parent.postMessage(T,"*")},KT=()=>{if(q||E.parent===E||u.size===0||R?.features?.lateGenerateResults!==!0)return;x({channel:X,v:I,type:"generate-late-listen"})},k=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},jT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=XT(T.data);if(!S)return;if(S.type==="workspace"){let A=n.get(S.payload.subscriptionId);if(A)k([A],S.payload.snapshot);return}if(S.type==="shells"){let A=o.get(S.payload.subscriptionId);if(A)k([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,y=BT(S.payload.session),k(V,S.payload),k(W,S.payload.directory),k(H,S.payload.session),y)k(j,y);k(c,S.payload.connection),k(d,S.payload.settings),k(e,S.payload.item),KT();return}if(S.type==="generate-late"){if(u.size===0)m_.push(S.payload);else k(u,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};k(W,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)y=null;else if(y?.sessionId!==S.payload.session.id)y=BT(S.payload.session);k(H,S.payload.session);return}if(S.type==="session-lifecycle"){y=S.payload,k(j,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};k(c,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};k(d,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};k(e,S.payload.item);return}if(S.type==="status-control-event"){k(R_,S.payload);return}if(S.type==="popover-closed"){k(C_,S.payload);return}if(S.type==="action"){let A=(f)=>{if(!q)x({channel:X,v:I,type:"action-result",id:S.id,payload:f})},N=T_;if(!N){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>N(S.payload)).then(()=>A({ok:!0}),(f)=>{let z=(f instanceof Error?f.message:String(f)).trim();A({ok:!1,error:(z||"Action failed.").slice(0,A_)})});return}if(S.type==="file-open"){let A=S.payload;if(E_&&oT(E_,A))return;E_=A,k(G_,S.payload);return}if(S.type==="file-saved"){k(D_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(z)=>{if(!q)x({channel:X,v:I,type:"file-snapshot-result",id:S.id,payload:z})},N=(z)=>A({error:(z.trim()||"Could not read the edited file.").slice(0,A_)}),f=S_;if(!f){N("This extension does not edit files.");return}Promise.resolve().then(()=>f(S.payload.purpose)).then((z)=>{if(n_(z)>P_){N(`The file is over ${P_} ${"bytes"in z?"bytes":"characters"}.`);return}if(z.version.length>W_){N(`The snapshot version is over ${W_} characters.`);return}A({snapshot:"bytes"in z?{bytes:z.bytes,version:z.version}:{content:z.content,version:z.version}})},(z)=>N(z instanceof Error?z.message:String(z)));return}if(S.type==="resolve"){let A=(f)=>{x({channel:X,v:I,type:"resolve-result",id:S.id,payload:f})},N=__;if(!N){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>N(S.payload)).then((f)=>A({item:f?i(f):null}),(f)=>{let z=(f instanceof Error?f.message:String(f)).trim();A({error:(z||"Command failed.").slice(0,A_)})});return}let U=l.get(S.id);if(!U)return;if(clearTimeout(U.timer),l.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",jT),x({channel:X,v:I,type:"hello"});let Z=(T,S=D)=>{if(q||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let N=setTimeout(()=>{l.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);l.set(T.id,{resolve:U,reject:A,timer:N}),x(T)})},Y=(T)=>Z(T).then(()=>{return}),Q={channel:X,v:I},g_=(T)=>{if(!q&&E.parent!==E)x(T)},xT=()=>g_({...Q,type:"file-save"}),wT=(T)=>{if(!NS(T)||!vS(T))return;T.preventDefault(),xT()},HT=(T)=>{if(!NS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),mT(R.popover.id,"escape").catch(()=>{return})},X_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=O_||U_;if(JT===S)return;JT=S,hT(T.id,S).catch(()=>{return})},I_=()=>{if(R?.surface!=="popover"||O_)return;O_=!0,X_()},bT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!O_)return;O_=!1,X_()},qT=()=>{if(R?.surface!=="popover"||U_)return;U_=!0,X_()},yT=()=>{if(R?.surface!=="popover"||!U_)return;U_=!1,X_()},b=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},c_=async(T)=>{if(T.kind!=="projects")b(T.projectId);let S=await Z({...Q,type:"workspace-read",id:G(C),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},d_=async(T,S)=>{if(T.kind!=="projects")b(T.projectId);let U=G(C);n.set(U,S);try{await Y({...Q,type:"workspace-subscribe",id:G(C),payload:{subscriptionId:U,query:T}})}catch(A){if(n.delete(U),!q)x({...Q,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!n.delete(U)||q)return;x({...Q,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},bS=async(T,S)=>{if(T.kind==="session")b(T.sessionId);if(T.kind==="project")b(T.projectId);let U=G(C);o.set(U,S);try{await Y({...Q,type:"shells-subscribe",id:G(C),payload:{subscriptionId:U,scope:T}})}catch(A){if(o.delete(U),!q)x({...Q,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!o.delete(U)||q)return;x({...Q,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},V_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>v_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!a(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>u_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await Z({...Q,type:"storage",id:G(C),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},mT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Y({...Q,type:"popover-close",id:G(C),payload:S?{id:T,reason:S}:{id:T}}),hT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Y({...Q,type:"popover-anchor",id:G(C),payload:{id:T,active:S}});return E.addEventListener("keydown",HT,!0),E.addEventListener("pointerover",I_),E.addEventListener("pointermove",I_),E.addEventListener("pointerout",bT),E.addEventListener("focus",qT),E.addEventListener("blur",yT),{onAction:(T)=>{return T_=T,()=>{if(T_===T)T_=null}},listProjects:async()=>{let T=await c_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await c_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await c_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>d_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>d_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>d_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>bS(T,S),readShellOutput:async(T,S)=>{b(T,f_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>N_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${N_}.`);let f=await Z({...Q,type:"shell-output",id:G(C),payload:{shellId:T,cursor:U,tailBytes:A}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(T)=>{if(b(T,f_),(await Z({...Q,type:"shell-stop",id:G(C),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{b(T),await Y({...Q,type:"open-session",id:G(C),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=B_(S),A={op:"get",key:T};if(U)A.scope=U;let N=await V_(A);return N.op==="get"&&N.found?N.value:void 0},set:async(T,S,U)=>{let A=B_(U),N={op:"set",key:T,value:S};if(A)N.scope=A;await V_(N)},delete:async(T,S)=>{let U=B_(S),A={op:"delete",key:T};if(U)A.scope=U;await V_(A)},keys:async(T)=>{let S=B_(T),U={op:"keys"};if(S)U.scope=S;let A=await V_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(V.add(T),R)T(R);return()=>{V.delete(T)}},onDirectory:(T)=>{if(W.add(T),R)T(R.directory);return()=>{W.delete(T)}},onSession:(T)=>{if(H.add(T),R)T(R.session);return()=>{H.delete(T)}},onSessionLifecycle:(T)=>{if(j.add(T),y)T(y);return()=>{j.delete(T)}},onConnection:(T)=>{if(c.add(T),R)T(R.connection);return()=>{c.delete(T)}},onSettings:(T)=>{if(d.add(T),R)T(R.settings);return()=>{d.delete(T)}},onItem:(T)=>{if(e.add(T),R)T(R.item);return()=>{e.delete(T)}},onStatusControl:(T)=>{return R_.add(T),()=>{R_.delete(T)}},onPopoverClosed:(T)=>{return C_.add(T),()=>{C_.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!uT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Y({...Q,type:"status-controls",id:G(C),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!a_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Y({...Q,type:"popover-open",id:G(C),payload:T})},closePopover:mT,setPopoverAnchorActive:hT,onResolve:(T)=>{return __=T,()=>{if(__===T)__=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>$_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${$_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>L_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${L_} characters.`));return Y({channel:X,v:I,type:"toast",id:G(C),payload:{...T,message:S}})},openUrl:(T)=>Y({channel:X,v:I,type:"open-url",id:G(C),payload:{url:T}}),openCommit:(T)=>t_(T)?Y({channel:X,v:I,type:"open-commit",id:G(C),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>Y({channel:X,v:I,type:"open-surface",id:G(C),payload:{surfaceId:T}}),writeClipboard:(T)=>Y({channel:X,v:I,type:"clipboard-write",id:G(C),payload:{text:T}}),compose:(T)=>Y({channel:X,v:I,type:"compose",id:G(C),payload:T}),attach:(T)=>Y({channel:X,v:I,type:"attach",id:G(C),payload:i(T)}),startSession:async(T)=>{if(T.projectId!==void 0)b(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")b(S.directory);else{if(S.name!==void 0)b(S.name,200);if(S.baseBranch!==void 0)b(S.baseBranch,200)}let U=await Z({channel:X,v:I,type:"start-session",id:G(C),payload:ST(T)},_.requestTimeoutMs??180000);if(!r_(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>Z({channel:X,v:I,type:"prompt",id:G(C),payload:ET(T)}).then((S)=>{if(!s_(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>Y({channel:X,v:I,type:"session-link",id:G(C),payload:i(T)}),close:()=>Y({channel:X,v:I,type:"close",id:G(C)}),oauthStart:()=>Y({channel:X,v:I,type:"oauth-start",id:G(C)}),oauthDisconnect:()=>Y({channel:X,v:I,type:"oauth-disconnect",id:G(C)}),request:(T)=>(Z_(T.path)?Z({channel:X,v:I,type:"request",id:G(C),payload:T}):PS()).then((S)=>{if(!F_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(Z_(T.path)?Z({channel:X,v:I,type:"service-request",id:G(C),payload:T}):PS()).then((S)=>{if(!F_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>Z({channel:X,v:I,type:"service-status",id:G(C)}).then((T)=>{if(!AT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(r(T)?Z({channel:X,v:I,type:"file-read",id:G(C),payload:{path:T}}):J_()).then((S)=>{if(!MT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!r(T))return J_();if(S.length>Y_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${Y_} characters.`));return Z({channel:X,v:I,type:"file-write",id:G(C),payload:{path:T,content:S}}).then((U)=>{if(!RT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(r(T)?Z({channel:X,v:I,type:"file-list",id:G(C),payload:{path:T}}):J_()).then((S)=>{if(!CT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(r(T)?Z({channel:X,v:I,type:"file-stat",id:G(C),payload:{path:T}}):J_()).then((S)=>{if(!GT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>Q_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${Q_} characters.`));if(U!==void 0&&(U.length===0||U.length>z_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${z_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(_T,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let N={prompt:S};if(U!==void 0)N.system=U;if(A!==void 0)N.maxOutputTokens=A;return Z({channel:X,v:I,type:"generate",id:G(C),payload:N},_.requestTimeoutMs??TT).then((f)=>{if(!DT(f))throw new M("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(T)=>{u.add(T);for(let S of m_.splice(0))k([T],S);return KT(),()=>{u.delete(T)}},setBadge:(T)=>Y({channel:X,v:I,type:"badge",id:G(C),payload:{count:OT(T)}}),setHeight:(T)=>Y({channel:X,v:I,type:"resize",id:G(C),payload:{height:UT(T)}}),onFileOpen:(T)=>{if(G_.add(T),!h_)h_=!0,E.addEventListener("keydown",wT,!0);if(E_)T(E_);return()=>{G_.delete(T)}},onFileSnapshot:(T)=>{return S_=T,()=>{if(S_===T)S_=null}},onFileSaved:(T)=>{return D_.add(T),()=>{D_.delete(T)}},reportFileChange:(T)=>g_({...Q,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:xT,reportFileUnsupported:()=>g_({...Q,type:"file-unsupported"}),dispose:()=>{for(let T of n.keys())x({...Q,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:T}});n.clear();for(let T of o.keys())x({...Q,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:T}});if(o.clear(),q=!0,__=null,T_=null,S_=null,G_.clear(),D_.clear(),h_)E.removeEventListener("keydown",wT,!0);E.removeEventListener("message",jT),E.removeEventListener("keydown",HT,!0),E.removeEventListener("pointerover",I_),E.removeEventListener("pointermove",I_),E.removeEventListener("pointerout",bT),E.removeEventListener("focus",qT),E.removeEventListener("blur",yT);for(let T of l.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));l.clear(),V.clear(),W.clear(),H.clear(),j.clear(),c.clear(),d.clear(),e.clear(),R_.clear(),C_.clear(),u.clear(),m_.length=0}}};var WS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var jE=new Set(WS);var $S=["none","agent","user"];var wE=new Set($S);var uS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],lS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],LS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,D]of uS)E.style.setProperty(O,_.tokens[D]);for(let[O,D,V]of lS){let W=_.tokens[V]??"";E.style.setProperty(O,W),E.style.setProperty(D,W)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},VT=(_,E)=>{if(LS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var nS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(_,E)=>`var(--${_}, var(--oc-${nS[_]}, ${E}))`,h=P("surface-background","transparent"),j_=P("surface-elevated","transparent"),s=P("surface-elevated-foreground","inherit"),w=P("surface-foreground","inherit"),$=P("surface-muted-foreground","gray"),oS=P("surface-muted","transparent"),p=P("interactive-border","currentColor"),J=P("interactive-hover","transparent"),v=P("interactive-active","transparent"),fT=P("interactive-selection","transparent"),NT=P("interactive-selection-foreground","inherit"),m=P("primary","currentColor"),PT=P("primary-text","inherit"),WT=P("error-text","inherit"),aS=P("font-sans","inherit"),$T=P("font-mono","monospace"),zS=P("radius","9px"),LT=`calc(${zS} - 2px)`,kS=`calc(${zS} - 4px)`,L=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,YS=`background-image: linear-gradient(${J}, ${J});`,kT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,YT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",QS="box-shadow: var(--oc-sdk-lit);",QT=`inset 0 0.5px 0 0 ${L(w,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,iS=`
:root {
  --oc-sdk-edge: ${L(w,16)};
  --oc-sdk-field-bg: ${j_};
  --oc-sdk-raised-bg: ${h};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${L(w,14)};
  --oc-sdk-field-bg: ${L(h,50,j_)};
  --oc-sdk-raised-bg: ${j_};
  --oc-sdk-field-lift: ${QT};
  --oc-sdk-raised-lift: ${QT};
  --oc-sdk-lit: ${QT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,K_=(_)=>{let E=P(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${P(`${_}-text`,"inherit")}; }`},rS=`
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
`,ZS=`${iS}
.oc-sdk { color: ${w}; font-family: ${aS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${YS} }
.oc-sdk-mono { font-family: ${$T}; }
.oc-sdk-muted { color: ${$}; }
${K_("success")}${K_("warning")}${K_("error")}${K_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${m}; --oc-sdk-tone-text: ${PT}; }

.oc-sdk-btn { border-radius: ${LT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${kS}; }
.oc-sdk-btn[data-variant="default"] { color: ${PT}; background: ${L(m,10,h)}; border-color: ${L(m,12)}; ${QS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(m,16,h)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(m,22,h)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${oS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${s}; ${YT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${v}, ${v}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${J}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${v}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${WT}; background: ${L("var(--oc-sdk-tone)",7,h)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${QS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,h)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,h)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${WT}; }
.oc-sdk-input { border-radius: ${LT}; background: var(--oc-sdk-field-bg); color: ${s}; ${kT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${kT(L(w,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${kT(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${$T}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${m}; }
.oc-sdk-search-clear { border-radius: ${kS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${J}; color: ${w}; }

.oc-sdk-trigger { border-radius: ${LT}; background: var(--oc-sdk-raised-bg); color: ${s}; ${YT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${s}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${j_}; background-clip: padding-box; color: ${s}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${J}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${fT}; color: ${NT}; }
.oc-sdk-option-check { color: ${w}; }
.oc-sdk-option[data-destructive="true"] { color: ${WT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${L(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${p}; border-radius: 4px; color: ${w}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${L(w,60,p)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${p}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${h}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${m}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${YS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(w,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${w}; }
.oc-sdk-tab[aria-selected="true"] { color: ${NT}; background: ${fT}; border-color: ${p}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${s}; background: var(--oc-sdk-raised-bg); ${YT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${L(w,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${L("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${J}; }
.oc-sdk-row[aria-selected="true"] { background: ${fT}; color: ${NT}; }
.oc-sdk-row-lead { font-family: ${$T}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${p}; border-top-color: ${m}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${L("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${L(p,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${L(w,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${m}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${PT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${L(p,60)}; }
`,F=`
${p_}
${rS}
${ZS}`;var TE=[{label:"/news",text:"/news"},{label:"/ci",text:"/ci"},{label:"/cd",text:"/cd"},{label:"/tag",text:"/tag"}],FS={label:"分支⇄Tag对比",text:"",dialog:"compare"},JS=async(_,E)=>{if(E)try{let{content:O}=await _.readFile(".openchamber/project.json"),D=JSON.parse(O);if(Array.isArray(D.draftStarters)&&D.draftStarters.length>0){let V=D.draftStarters.filter((W)=>typeof W?.name==="string"&&W.name.length>0).slice(0,30).map((W)=>({label:`/${W.name}`,text:`/${W.name}`}));if(V.length>0)return{list:V,fromConfig:!0}}}catch{}return{list:TE,fromConfig:!1}},ZT=async(_,E,O)=>{try{let D=await _.prompt({text:E,send:!0});if(O(D.sent==="sent"?"已提交到会话":`未直接发出（${D.sent}），已填入输入框`),D.sent!=="sent")await _.prompt({text:E}).catch(()=>{return})}catch(D){if(D instanceof M&&(D.code==="NO_SESSION"||D.code==="SESSION_BUSY"))O(D.code==="NO_SESSION"?"无会话已填入输入框":"会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});else O(D instanceof M?`${D.code}`:"发送失败")}};var BS=(_,E)=>{let O=_.ownerDocument.createElement("div");O.style.cssText="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);z-index:30;padding:16px;",O.innerHTML=`
    <div style="background:var(--oc-elevated,#1c1c1e);border:1px solid var(--oc-border,#8888);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px;width:100%;max-width:320px;">
      <div style="font-size:14px;font-weight:700">分支 ⇄ Tag 对比</div>
      <input id="cmp-branch" placeholder="分支如 develop_3c空=当前分支" style="padding:7px 9px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:inherit;color:inherit" />
      <input id="cmp-tag" placeholder="Tag 如 v1.2.0空=最新tag" style="padding:7px 9px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:inherit;color:inherit" />
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button id="cmp-cancel" style="padding:6px 12px;border-radius:8px;border:1px solid var(--oc-border,#8888);background:inherit;color:inherit;cursor:pointer">取消</button>
        <button id="cmp-ok" style="padding:6px 12px;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer">对比</button>
      </div>
    </div>`;let D=()=>O.remove(),V=O.querySelector("#cmp-branch"),W=O.querySelector("#cmp-tag");O.querySelector("#cmp-cancel").onclick=D,O.addEventListener("click",(H)=>{if(H.target===O)D()}),O.querySelector("#cmp-ok").onclick=()=>{let H=V.value.trim(),j=W.value.trim();D(),E(H,j)},_.appendChild(O),V.focus()},KS=(_,E)=>{return`对比${_&&E?`分支 ${_} 与 tag ${E}`:_?`分支 ${_} 与最新 tag`:E?`当前分支与 tag ${E}`:"当前分支与最新 tag"}：用 git log 和 git diff 列出提交差异和文件变更，最后总结变化点`};var q_=IT(),FT=document.querySelector("#root");if(!FT)throw Error("Missing #root");FT.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:14px/1.6 system-ui,sans-serif}
#root{padding:10px;display:flex;position:relative;flex-direction:column;gap:10px;min-height:100%;max-width:100%;overflow-x:hidden}
h3{margin:4px 0 0;font-size:13px;opacity:.65;font-weight:600}
.grid{display:flex;flex-wrap:wrap;gap:8px}
button{padding:8px 14px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0);font-weight:700}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6;font-weight:700}
button:disabled{opacity:.5}
.mut{font-size:13px;opacity:.7}
</style>
<h3>快捷命令</h3>
<div class="grid" id="cmds"></div>
<h3>代码片段</h3>
<div class="grid" id="snips"></div>
<div class="mut" id="out">点按钮直接发到当前会话</div>
<div class="mut" id="src"></div>
`;var y_=(_)=>document.querySelector(`#${_}`),jS=y_("cmds"),xS=y_("snips"),SE=y_("out"),EE=y_("src"),wS=(_)=>{SE.textContent=_},HS=(_,E)=>{let O=document.createElement("button");return O.className=E,O.textContent=_.label,O.title=_.dialog==="compare"?"输入分支与 tag 后对比":_.text,O.onclick=()=>{if(_.dialog==="compare"){BS(FT,(D,V)=>void ZT(q_,KS(D,V),wS));return}ZT(q_,_.text,wS)},O},OE=async(_)=>{let{list:E,fromConfig:O}=await JS(q_,_);jS.innerHTML="";for(let D of E)jS.appendChild(HS(D,"cmd"));xS.innerHTML="",xS.appendChild(HS(FS,"snip")),EE.textContent=O?"来自本仓 .openchamber/project.json draftStarters，去设置→项目→起草器管理":"本仓无 draftStarters显示兜底去设置→项目→起草器添加（可移入仓库）"};q_.onReady((_)=>{VT(_,document.documentElement),OE(_.directory??null)});})();
