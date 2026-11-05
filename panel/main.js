(()=>{var I="openchamber.sdk",V=1;var v_=`
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
`;function dT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(C)=>{let A=C.target===_?E:C.target;if(!(A instanceof Element))return;if(!A.hasAttribute("data-oc-scrolling"))A.setAttribute("data-oc-scrolling","");let L=O.get(A);if(L!==void 0)clearTimeout(L);O.set(A,setTimeout(()=>{O.delete(A),A.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var cS=`(${dT.toString()})(document);`;var u_=128,l_=65536;var $_=128;var Y_=65536;var lT=/^[a-z][a-z0-9-]{0,39}$/;var pT=(_)=>Object(_)===_&&!Array.isArray(_),n_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),vT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,uT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,nT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!pT(O)||!lT.test(O.id)||!vT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!n_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!n_(O,["kind","id","label","value","options","disabled"]))return!1;if(!uT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let C=new Set;for(let A of O.options){if(!pT(A)||!n_(A,["value","label"])||!uT(A.value)||!vT(A.label)||C.has(A.value))return!1;C.add(A.value)}if(!C.has(O.value))return!1}return!0};var aT=["{id}","{segment}","{segments+}"];var YE=new Set(aT);var iT=["turn-finished","turn-failed","permission-asked","question-asked"];var QE=new Set(iT);var L_=20000000,Q_=256;var a_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,oT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var rT=/^[A-Za-z0-9_-]{1,80}$/;var sT=["left","right","top","bottom"];var tT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let C=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let A of C)if(!tT(A,E+1,O))return!1;return!0},i_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(i_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(i_)}return String(_)===_||Number.isFinite(_)},o_=(_)=>{try{if(String(_.id)!==_.id||!rT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!sT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!tT(_.data)||!i_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var _S=["file","directory","other","missing"],s_=(_)=>Boolean(_&&"sessionId"in _),t_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var TS=/^[0-9a-f]{7,64}$/i,e_=(_)=>TS.test(_),Z_=500,z_=32000,SS=16000,ES=128,OS=200,US=2000,AS=16000,MS=80,RS=200,CS=16000;var GS=2000;var _T=20000,f_=1024,k_=2000000;var F_=64000,J_=8000,TT=4000;var ST=960000;var XS=999,DS=1e4,C_=500,IS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],VS=["stopped","starting","ready","failed"],pS=new Set(IS),NS=(_)=>pS.has(_),WS=(_)=>_&&NS(_)?_:"HOST_REJECTED",__=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(__);if(Object(_)===_)return Object.values(_).every(__);return!1},PS=(_)=>__(_)&&JSON.stringify(_).length<=CS,eT=(_)=>_?.trim().slice(0,RS)??"",T_=(_)=>{let E=_.id.trim().slice(0,ES),O=_.title.trim().slice(0,OS),C=_.url.trim().slice(0,US),A=_.text?.trim().slice(0,AS),L=_.author?.trim().slice(0,MS),g=_.kind==="pull"?"pull":"issue",F={providerId:_.providerId.trim(),id:E,title:O||E,url:C,kind:g};if(A)F.text=A;if(L)F.author=L;if(g==="pull"){let d=eT(_.branches?.head),p=eT(_.branches?.base);if(d&&p)F.branches={head:d,base:p}}if(PS(_.data))F.data=_.data;return F},ET=(_)=>{let E=T_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},OT=(_)=>{let E={text:_.text.trim().slice(0,SS)};if(_.send)E.send=!0;return E},UT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(XS,Math.max(0,Math.round(_)))},AT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(DS,Math.max(0,Math.ceil(_)))};var S_=(_)=>_.length>0&&_.length<=f_&&!_.includes("\x00")&&!_.includes("\\");var K_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>GS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},vS=new Set(VS),MT=(_)=>Boolean(_&&"status"in _&&vS.has(String(_.status))&&!("body"in _)),B_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),RT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),CT=(_)=>Boolean(_&&"written"in _&&_.written===!0),GT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),uS=new Set(_S),XT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&uS.has(String(_.kind))&&Number.isFinite(_.size)),DT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),lS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),nS=(_)=>Object(_)===_?_:null,r_=(_)=>String(_)===_&&_.length>0,aS=(_)=>{if(!r_(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&r_(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:WS(r_(_.code)?_.code:void 0)};return null},IT=(_)=>{let E=nS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return aS(E);if(!lS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var $S=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),iS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class R extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var YS=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),j_=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${f_} characters without NUL or backslash.`)),w_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},D=(_)=>{return _.value+=1,`oc-${_.value}`},VT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),C=_.requestTimeoutMs??_T,A=new Set,L=new Set,g=new Set,F=new Set,d=new Set,p=new Set,i=new Set,y=new Set,B=new Set,Z=new Set,j=[],h=null,m=null,I_=new Set,V_=new Set,U_=null,A_=null,m_=!1,s=new Map,t=new Map,e=new Map,v=!1,X={value:0},G=null,u=null,M_=!1,R_=!1,BT=null,jT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},b=(T)=>{E.parent.postMessage(T,"*")},wT=()=>{if(v||E.parent===E||Z.size===0||G?.features?.lateGenerateResults!==!0)return;b({channel:I,v:V,type:"generate-late-listen"})},Q=(T,S)=>{for(let U of T)try{U(S)}catch(M){console.error(M)}},HT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=IT(T.data);if(!S)return;if(S.type==="workspace"){let M=t.get(S.payload.subscriptionId);if(M)Q([M],S.payload.snapshot);return}if(S.type==="shells"){let M=e.get(S.payload.subscriptionId);if(M)Q([M],S.payload.snapshot);return}if(S.type==="ready"){if(G=S.payload,u=jT(S.payload.session),Q(A,S.payload),Q(L,S.payload.directory),Q(g,S.payload.session),u)Q(F,u);Q(d,S.payload.connection),Q(p,S.payload.settings),Q(i,S.payload.item),wT();return}if(S.type==="generate-late"){if(Z.size===0)j.push(S.payload);else Q(Z,S.payload);return}if(S.type==="directory"){if(G)G={...G,directory:S.payload.directory};Q(L,S.payload.directory);return}if(S.type==="session"){if(G)G={...G,session:S.payload.session};if(!S.payload.session)u=null;else if(u?.sessionId!==S.payload.session.id)u=jT(S.payload.session);Q(g,S.payload.session);return}if(S.type==="session-lifecycle"){u=S.payload,Q(F,S.payload);return}if(S.type==="connection"){if(G)G={...G,connection:S.payload.connection};Q(d,S.payload.connection);return}if(S.type==="settings"){if(G)G={...G,settings:S.payload.settings};Q(p,S.payload.settings);return}if(S.type==="item"){if(G)G={...G,item:S.payload.item};Q(i,S.payload.item);return}if(S.type==="status-control-event"){Q(y,S.payload);return}if(S.type==="popover-closed"){Q(B,S.payload);return}if(S.type==="action"){let M=(N)=>{if(!v)b({channel:I,v:V,type:"action-result",id:S.id,payload:N})},W=m;if(!W){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(S.payload)).then(()=>M({ok:!0}),(N)=>{let k=(N instanceof Error?N.message:String(N)).trim();M({ok:!1,error:(k||"Action failed.").slice(0,C_)})});return}if(S.type==="file-open"){let M=S.payload;if(A_&&oT(A_,M))return;A_=M,Q(I_,S.payload);return}if(S.type==="file-saved"){Q(V_,S.payload.version);return}if(S.type==="file-snapshot"){let M=(k)=>{if(!v)b({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:k})},W=(k)=>M({error:(k.trim()||"Could not read the edited file.").slice(0,C_)}),N=U_;if(!N){W("This extension does not edit files.");return}Promise.resolve().then(()=>N(S.payload.purpose)).then((k)=>{if(a_(k)>L_){W(`The file is over ${L_} ${"bytes"in k?"bytes":"characters"}.`);return}if(k.version.length>Q_){W(`The snapshot version is over ${Q_} characters.`);return}M({snapshot:"bytes"in k?{bytes:k.bytes,version:k.version}:{content:k.content,version:k.version}})},(k)=>W(k instanceof Error?k.message:String(k)));return}if(S.type==="resolve"){let M=(N)=>{b({channel:I,v:V,type:"resolve-result",id:S.id,payload:N})},W=h;if(!W){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(S.payload)).then((N)=>M({item:N?T_(N):null}),(N)=>{let k=(N instanceof Error?N.message:String(N)).trim();M({error:(k||"Command failed.").slice(0,C_)})});return}let U=s.get(S.id);if(!U)return;if(clearTimeout(U.timer),s.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new R(S.code,S.error))};E.addEventListener("message",HT),b({channel:I,v:V,type:"hello"});let J=(T,S=C)=>{if(v||E.parent===E)return Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,M)=>{let W=setTimeout(()=>{s.delete(T.id),M(new R("HOST_TIMEOUT","Host did not answer in time."))},S);s.set(T.id,{resolve:U,reject:M,timer:W}),b(T)})},z=(T)=>J(T).then(()=>{return}),f={channel:I,v:V},c_=(T)=>{if(!v&&E.parent!==E)b(T)},xT=()=>c_({...f,type:"file-save"}),bT=(T)=>{if(!$S(T)||!iS(T))return;T.preventDefault(),xT()},qT=(T)=>{if(!$S(T)||T.key!=="Escape"||G?.surface!=="popover"||!G.popover)return;T.preventDefault(),mT(G.popover.id,"escape").catch(()=>{return})},N_=()=>{let T=G?.surface==="popover"?G.popover:void 0;if(!T)return;let S=M_||R_;if(BT===S)return;BT=S,cT(T.id,S).catch(()=>{return})},W_=()=>{if(G?.surface!=="popover"||M_)return;M_=!0,N_()},yT=(T)=>{if(G?.surface!=="popover"||T.relatedTarget!==null||!M_)return;M_=!1,N_()},gT=()=>{if(G?.surface!=="popover"||R_)return;R_=!0,N_()},hT=()=>{if(G?.surface!=="popover"||!R_)return;R_=!1,N_()},c=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new R("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},d_=async(T)=>{if(T.kind!=="projects")c(T.projectId);let S=await J({...f,type:"workspace-read",id:D(X),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return S},p_=async(T,S)=>{if(T.kind!=="projects")c(T.projectId);let U=D(X);t.set(U,S);try{await z({...f,type:"workspace-subscribe",id:D(X),payload:{subscriptionId:U,query:T}})}catch(M){if(t.delete(U),!v)b({...f,type:"workspace-unsubscribe",id:D(X),payload:{subscriptionId:U}});throw M}return()=>{if(!t.delete(U)||v)return;b({...f,type:"workspace-unsubscribe",id:D(X),payload:{subscriptionId:U}})}},mS=async(T,S)=>{if(T.kind==="session")c(T.sessionId);if(T.kind==="project")c(T.projectId);let U=D(X);e.set(U,S);try{await z({...f,type:"shells-subscribe",id:D(X),payload:{subscriptionId:U,scope:T}})}catch(M){if(e.delete(U),!v)b({...f,type:"shells-unsubscribe",id:D(X),payload:{subscriptionId:U}});throw M}return()=>{if(!e.delete(U)||v)return;b({...f,type:"shells-unsubscribe",id:D(X),payload:{subscriptionId:U}})}},P_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>u_))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!__(T.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>l_)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&G?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let S=await J({...f,type:"storage",id:D(X),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new R("HOST_REJECTED","Host did not return storage data.");return S},mT=(T,S)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):z({...f,type:"popover-close",id:D(X),payload:S?{id:T,reason:S}:{id:T}}),cT=(T,S)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):z({...f,type:"popover-anchor",id:D(X),payload:{id:T,active:S}});return E.addEventListener("keydown",qT,!0),E.addEventListener("pointerover",W_),E.addEventListener("pointermove",W_),E.addEventListener("pointerout",yT),E.addEventListener("focus",gT),E.addEventListener("blur",hT),{onAction:(T)=>{return m=T,()=>{if(m===T)m=null}},listProjects:async()=>{let T=await d_({kind:"projects"});if(T.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await d_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await d_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>p_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>p_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>p_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>mS(T,S),readShellOutput:async(T,S)=>{c(T,$_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=S?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>Y_))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Y_}.`);let N=await J({...f,type:"shell-output",id:D(X),payload:{shellId:T,cursor:U,tailBytes:M}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(T)=>{if(c(T,$_),(await J({...f,type:"shell-stop",id:D(X),payload:{shellId:T}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{c(T),await z({...f,type:"open-session",id:D(X),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=w_(S),M={op:"get",key:T};if(U)M.scope=U;let W=await P_(M);return W.op==="get"&&W.found?W.value:void 0},set:async(T,S,U)=>{let M=w_(U),W={op:"set",key:T,value:S};if(M)W.scope=M;await P_(W)},delete:async(T,S)=>{let U=w_(S),M={op:"delete",key:T};if(U)M.scope=U;await P_(M)},keys:async(T)=>{let S=w_(T),U={op:"keys"};if(S)U.scope=S;let M=await P_(U);if(M.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(A.add(T),G)T(G);return()=>{A.delete(T)}},onDirectory:(T)=>{if(L.add(T),G)T(G.directory);return()=>{L.delete(T)}},onSession:(T)=>{if(g.add(T),G)T(G.session);return()=>{g.delete(T)}},onSessionLifecycle:(T)=>{if(F.add(T),u)T(u);return()=>{F.delete(T)}},onConnection:(T)=>{if(d.add(T),G)T(G.connection);return()=>{d.delete(T)}},onSettings:(T)=>{if(p.add(T),G)T(G.settings);return()=>{p.delete(T)}},onItem:(T)=>{if(i.add(T),G)T(G.item);return()=>{i.delete(T)}},onStatusControl:(T)=>{return y.add(T),()=>{y.delete(T)}},onPopoverClosed:(T)=>{return B.add(T),()=>{B.delete(T)}},setStatusControls:(T)=>{if(G?.features?.statusControls!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support status controls."));if(!nT(T))return Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return z({...f,type:"status-controls",id:D(X),payload:{controls:T}})},openPopover:(T)=>{if(G?.features?.popovers!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support popovers."));if(!o_(T))return Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return z({...f,type:"popover-open",id:D(X),payload:T})},closePopover:mT,setPopoverAnchorActive:cT,onResolve:(T)=>{return h=T,()=>{if(h===T)h=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>Z_)return Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${Z_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>z_))return Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${z_} characters.`));return z({channel:I,v:V,type:"toast",id:D(X),payload:{...T,message:S}})},openUrl:(T)=>z({channel:I,v:V,type:"open-url",id:D(X),payload:{url:T}}),openCommit:(T)=>e_(T)?z({channel:I,v:V,type:"open-commit",id:D(X),payload:{sha:T}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>z({channel:I,v:V,type:"open-surface",id:D(X),payload:{surfaceId:T}}),writeClipboard:(T)=>z({channel:I,v:V,type:"clipboard-write",id:D(X),payload:{text:T}}),compose:(T)=>z({channel:I,v:V,type:"compose",id:D(X),payload:T}),attach:(T)=>z({channel:I,v:V,type:"attach",id:D(X),payload:T_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)c(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")c(S.directory);else{if(S.name!==void 0)c(S.name,200);if(S.baseBranch!==void 0)c(S.baseBranch,200)}let U=await J({channel:I,v:V,type:"start-session",id:D(X),payload:ET(T)},_.requestTimeoutMs??180000);if(!s_(U))throw new R("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>J({channel:I,v:V,type:"prompt",id:D(X),payload:OT(T)}).then((S)=>{if(!t_(S))throw new R("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>z({channel:I,v:V,type:"session-link",id:D(X),payload:T_(T)}),close:()=>z({channel:I,v:V,type:"close",id:D(X)}),oauthStart:()=>z({channel:I,v:V,type:"oauth-start",id:D(X)}),oauthDisconnect:()=>z({channel:I,v:V,type:"oauth-disconnect",id:D(X)}),request:(T)=>(K_(T.path)?J({channel:I,v:V,type:"request",id:D(X),payload:T}):YS()).then((S)=>{if(!B_(S))throw new R("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(K_(T.path)?J({channel:I,v:V,type:"service-request",id:D(X),payload:T}):YS()).then((S)=>{if(!B_(S))throw new R("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>J({channel:I,v:V,type:"service-status",id:D(X)}).then((T)=>{if(!MT(T))throw new R("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(S_(T)?J({channel:I,v:V,type:"file-read",id:D(X),payload:{path:T}}):j_()).then((S)=>{if(!RT(S))throw new R("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!S_(T))return j_();if(S.length>k_)return Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${k_} characters.`));return J({channel:I,v:V,type:"file-write",id:D(X),payload:{path:T,content:S}}).then((U)=>{if(!CT(U))throw new R("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(S_(T)?J({channel:I,v:V,type:"file-list",id:D(X),payload:{path:T}}):j_()).then((S)=>{if(!GT(S))throw new R("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(S_(T)?J({channel:I,v:V,type:"file-stat",id:D(X),payload:{path:T}}):j_()).then((S)=>{if(!XT(S))throw new R("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>F_)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${F_} characters.`));if(U!==void 0&&(U.length===0||U.length>J_))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${J_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(TT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:S};if(U!==void 0)W.system=U;if(M!==void 0)W.maxOutputTokens=M;return J({channel:I,v:V,type:"generate",id:D(X),payload:W},_.requestTimeoutMs??ST).then((N)=>{if(!DT(N))throw new R("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(T)=>{Z.add(T);for(let S of j.splice(0))Q([T],S);return wT(),()=>{Z.delete(T)}},setBadge:(T)=>z({channel:I,v:V,type:"badge",id:D(X),payload:{count:UT(T)}}),setHeight:(T)=>z({channel:I,v:V,type:"resize",id:D(X),payload:{height:AT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!m_)m_=!0,E.addEventListener("keydown",bT,!0);if(A_)T(A_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},onFileSaved:(T)=>{return V_.add(T),()=>{V_.delete(T)}},reportFileChange:(T)=>c_({...f,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:xT,reportFileUnsupported:()=>c_({...f,type:"file-unsupported"}),dispose:()=>{for(let T of t.keys())b({...f,type:"workspace-unsubscribe",id:D(X),payload:{subscriptionId:T}});t.clear();for(let T of e.keys())b({...f,type:"shells-unsubscribe",id:D(X),payload:{subscriptionId:T}});if(e.clear(),v=!0,h=null,m=null,U_=null,I_.clear(),V_.clear(),m_)E.removeEventListener("keydown",bT,!0);E.removeEventListener("message",HT),E.removeEventListener("keydown",qT,!0),E.removeEventListener("pointerover",W_),E.removeEventListener("pointermove",W_),E.removeEventListener("pointerout",yT),E.removeEventListener("focus",gT),E.removeEventListener("blur",hT);for(let T of s.values())clearTimeout(T.timer),T.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));s.clear(),A.clear(),L.clear(),g.clear(),F.clear(),d.clear(),p.clear(),i.clear(),y.clear(),B.clear(),Z.clear(),j.length=0}}};var LS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var qE=new Set(LS);var QS=["none","agent","user"];var gE=new Set(QS);var oS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],rS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ZS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,C]of oS)E.style.setProperty(O,_.tokens[C]);for(let[O,C,A]of rS){let L=_.tokens[A]??"";E.style.setProperty(O,L),E.style.setProperty(C,L)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},NT=(_,E)=>{if(ZS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var sS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(_,E)=>`var(--${_}, var(--oc-${sS[_]}, ${E}))`,n=P("surface-background","transparent"),x_=P("surface-elevated","transparent"),E_=P("surface-elevated-foreground","inherit"),q=P("surface-foreground","inherit"),$=P("surface-muted-foreground","gray"),tS=P("surface-muted","transparent"),o=P("interactive-border","currentColor"),w=P("interactive-hover","transparent"),r=P("interactive-active","transparent"),WT=P("interactive-selection","transparent"),PT=P("interactive-selection-foreground","inherit"),l=P("primary","currentColor"),$T=P("primary-text","inherit"),YT=P("error-text","inherit"),eS=P("font-sans","inherit"),LT=P("font-mono","monospace"),FS=P("radius","9px"),QT=`calc(${FS} - 2px)`,zS=`calc(${FS} - 4px)`,Y=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,fS=`background-image: linear-gradient(${w}, ${w});`,ZT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,zT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",kS="box-shadow: var(--oc-sdk-lit);",fT=`inset 0 0.5px 0 0 ${Y(q,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,_E=`
:root {
  --oc-sdk-edge: ${Y(q,16)};
  --oc-sdk-field-bg: ${x_};
  --oc-sdk-raised-bg: ${n};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Y(q,14)};
  --oc-sdk-field-bg: ${Y(n,50,x_)};
  --oc-sdk-raised-bg: ${x_};
  --oc-sdk-field-lift: ${fT};
  --oc-sdk-raised-lift: ${fT};
  --oc-sdk-lit: ${fT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,H_=(_)=>{let E=P(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${P(`${_}-text`,"inherit")}; }`},TE=`
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
`,JS=`${_E}
.oc-sdk { color: ${q}; font-family: ${eS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${fS} }
.oc-sdk-mono { font-family: ${LT}; }
.oc-sdk-muted { color: ${$}; }
${H_("success")}${H_("warning")}${H_("error")}${H_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${l}; --oc-sdk-tone-text: ${$T}; }

.oc-sdk-btn { border-radius: ${QT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${zS}; }
.oc-sdk-btn[data-variant="default"] { color: ${$T}; background: ${Y(l,10,n)}; border-color: ${Y(l,12)}; ${kS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Y(l,16,n)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Y(l,22,n)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${tS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${E_}; ${zT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${r}, ${r}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${r}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${YT}; background: ${Y("var(--oc-sdk-tone)",7,n)}; border-color: ${Y("var(--oc-sdk-tone)",12)}; ${kS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Y("var(--oc-sdk-tone)",9,n)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Y("var(--oc-sdk-tone)",11,n)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${YT}; }
.oc-sdk-input { border-radius: ${QT}; background: var(--oc-sdk-field-bg); color: ${E_}; ${ZT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${ZT(Y(q,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${ZT(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${LT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${l}; }
.oc-sdk-search-clear { border-radius: ${zS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${q}; }

.oc-sdk-trigger { border-radius: ${QT}; background: var(--oc-sdk-raised-bg); color: ${E_}; ${zT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${E_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${x_}; background-clip: padding-box; color: ${E_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${WT}; color: ${PT}; }
.oc-sdk-option-check { color: ${q}; }
.oc-sdk-option[data-destructive="true"] { color: ${YT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Y(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${o}; border-radius: 4px; color: ${q}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Y(q,60,o)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${o}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${n}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${l}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${fS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Y(q,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${q}; }
.oc-sdk-tab[aria-selected="true"] { color: ${PT}; background: ${WT}; border-color: ${o}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${E_}; background: var(--oc-sdk-raised-bg); ${zT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Y(q,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${WT}; color: ${PT}; }
.oc-sdk-row-lead { font-family: ${LT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${o}; border-top-color: ${l}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Y(o,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y(q,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${l}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${$T}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Y(o,60)}; }
`,K=`
${v_}
${TE}
${JS}`;var KS=["#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"],xS=(_)=>{let E=2166136261,O=new TextEncoder().encode(_);for(let C of O)E^=C,E=Math.imul(E,16777619)>>>0;return KS[E%KS.length]},BS=(_)=>[..._].sort((E,O)=>E.label.localeCompare(O.label,"zh-CN")),jS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((C)=>/^\s*description\s*:/.test(C));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},AE=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),wS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((C)=>C.kind==="file"&&C.name.endsWith(".md")).map((C)=>C.name)}catch{return[]}},HS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},bS=async(_,E)=>{let O=[],C=[],A=new Set,L=new Map,g="~/.config/opencode/snippet";for(let y of await wS(_,"~/.config/opencode/snippet")){let B=await HS(_,`~/.config/opencode/snippet/${y}`);if(B===null)continue;let Z=AE(B);if(!Z)continue;let j=y.replace(/\.md$/,""),h=jS(B)??j,m=`snip:${Z}`;if(A.has(m))continue;A.add(m),O.push({label:h,text:Z}),L.set(j,h)}let F=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let y of F)for(let B of await wS(_,y)){let Z=await HS(_,`${y}/${B}`);if(Z===null)continue;let j=B.replace(/\.md$/,""),h=jS(Z)??j;L.set(j,h);let m=`cmd:/${j}`;if(A.has(m))continue;A.add(m),C.push({label:h,text:`/${j}`})}if(E)try{let{content:y}=await _.readFile(".openchamber/project.json"),B=JSON.parse(y);if(Array.isArray(B.draftStarters))for(let Z of B.draftStarters.slice(0,30)){if(typeof Z?.name!=="string"||!Z.name)continue;let j=`cmd:/${Z.name}`;if(A.has(j))continue;A.add(j),C.unshift({label:L.get(Z.name)??Z.name,text:`/${Z.name}`})}}catch{}let d=BS(O),p=BS(C);O.length=0,O.push(...d),C.length=0,C.push(...p);let i=O.length+C.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:C,hint:i}},qS=async(_,E,O,C)=>{try{let A=await _.prompt({text:O,send:!0});if(A.sent==="sent"){C("已提交到会话");return}C(`未直接发出（${A.sent}），已填入输入框`),await _.prompt({text:O}).catch(()=>{return});return}catch(A){if(!(A instanceof R)){C(String(A));return}if(A.code==="SESSION_BUSY"){C("会话忙已填入输入框稍后发送"),await _.prompt({text:O}).catch(()=>{return});return}if(A.code!=="NO_SESSION"){C(`${A.code}`);return}}C("无会话建新会话中…");try{let A=await _.startSession({providerId:"shortcuts",id:E.slice(0,100)||"shortcut",title:E.slice(0,180),url:"",text:O});C(A.sent==="sent"?"已建新会话并提交":`新会话已建发送状态：${A.sent}`)}catch(A){C(A instanceof R?`建会话失败：${A.code}`:"建会话失败")}};var KT=VT(),hS=document.querySelector("#root");if(!hS)throw Error("Missing #root");hS.innerHTML=`
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
<div class="row"><h3 style="flex:1">命令</h3><button id="btn-refresh" title="重读配置">↻</button></div>
<div class="grid" id="cmds"></div>
<h3>代码片段</h3>
<div class="grid" id="snips"></div>
<div class="mut" id="out">点按钮直接发到当前会话</div>
<div class="mut" id="src"></div>
`;var D_=(_)=>document.querySelector(`#${_}`),FT=D_("cmds"),JT=D_("snips"),ME=D_("out"),RE=D_("src"),CE=(_)=>{ME.textContent=_},yS=(_,E)=>{let O=document.createElement("button");O.className=E;let C=xS(_.label);return O.style.borderColor=C,O.style.background=`color-mix(in srgb, ${C} 16%, transparent)`,O.textContent=_.label,O.title=_.text.length>200?_.text.slice(0,200):_.text,O.onclick=()=>void qS(KT,_.label,_.text,CE),O},gS="",X_=null,h_=async(_,E=!1)=>{let O=await bS(KT,_),C=JSON.stringify([O.snippets,O.commands]);if(!E&&C===gS)return;gS=C;let{snippets:A,commands:L,hint:g}=O;FT.innerHTML="";for(let F of L)FT.appendChild(yS(F,"cmd"));if(L.length===0)FT.innerHTML='<span class="mut">暂无</span>';JT.innerHTML="";for(let F of A)JT.appendChild(yS(F,"snip"));if(A.length===0)JT.innerHTML='<span class="mut">暂无</span>';RE.textContent=g};D_("btn-refresh").onclick=()=>void h_(X_,!0);setInterval(()=>{if(!document.hidden)h_(X_)},30000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)h_(X_)});KT.onReady((_)=>{NT(_,document.documentElement),X_=_.directory??null,h_(X_,!0)});})();
