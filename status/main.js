(()=>{var I="openchamber.sdk",V=1;var u_=`
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
`;function cT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(C)=>{let D=C.target===_?E:C.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let Y=O.get(D);if(Y!==void 0)clearTimeout(Y);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var gS=`(${cT.toString()})(document);`;var l_=128,n_=65536;var P_=128;var $_=65536;var uT=/^[a-z][a-z0-9-]{0,39}$/;var dT=(_)=>Object(_)===_&&!Array.isArray(_),o_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),pT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,vT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,lT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!dT(O)||!uT.test(O.id)||!pT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!o_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!o_(O,["kind","id","label","value","options","disabled"]))return!1;if(!vT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let C=new Set;for(let D of O.options){if(!dT(D)||!o_(D,["value","label"])||!vT(D.value)||!pT(D.label)||C.has(D.value))return!1;C.add(D.value)}if(!C.has(O.value))return!1}return!0};var nT=["{id}","{segment}","{segments+}"];var VE=new Set(nT);var oT=["turn-finished","turn-failed","permission-asked","question-asked"];var NE=new Set(oT);var L_=20000000,Y_=256;var a_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,aT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var iT=/^[A-Za-z0-9_-]{1,80}$/;var rT=["left","right","top","bottom"];var sT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let C=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of C)if(!sT(D,E+1,O))return!1;return!0},i_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(i_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(i_)}return String(_)===_||Number.isFinite(_)},r_=(_)=>{try{if(String(_.id)!==_.id||!iT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!rT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!sT(_.data)||!i_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var eT=["file","directory","other","missing"],t_=(_)=>Boolean(_&&"sessionId"in _),e_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var _S=/^[0-9a-f]{7,64}$/i,_T=(_)=>_S.test(_),Q_=500,k_=32000,TS=16000,SS=128,ES=200,OS=2000,US=16000,AS=80,MS=200,RS=16000;var CS=2000;var TT=20000,Z_=1024,z_=2000000;var F_=64000,J_=8000,ST=4000;var ET=960000;var GS=999,XS=1e4,C_=500,DS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],IS=["stopped","starting","ready","failed"],mS=new Set(DS),VS=(_)=>mS.has(_),fS=(_)=>_&&VS(_)?_:"HOST_REJECTED",__=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(__);if(Object(_)===_)return Object.values(_).every(__);return!1},NS=(_)=>__(_)&&JSON.stringify(_).length<=RS,tT=(_)=>_?.trim().slice(0,MS)??"",T_=(_)=>{let E=_.id.trim().slice(0,SS),O=_.title.trim().slice(0,ES),C=_.url.trim().slice(0,OS),D=_.text?.trim().slice(0,US),Y=_.author?.trim().slice(0,AS),J=_.kind==="pull"?"pull":"issue",Q={providerId:_.providerId.trim(),id:E,title:O||E,url:C,kind:J};if(D)Q.text=D;if(Y)Q.author=Y;if(J==="pull"){let q=tT(_.branches?.head),h=tT(_.branches?.base);if(q&&h)Q.branches={head:q,base:h}}if(NS(_.data))Q.data=_.data;return Q},OT=(_)=>{let E=T_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},UT=(_)=>{let E={text:_.text.trim().slice(0,TS)};if(_.send)E.send=!0;return E},AT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(GS,Math.max(0,Math.round(_)))},MT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(XS,Math.max(0,Math.ceil(_)))};var S_=(_)=>_.length>0&&_.length<=Z_&&!_.includes("\x00")&&!_.includes("\\");var B_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>CS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},cS=new Set(IS),RT=(_)=>Boolean(_&&"status"in _&&cS.has(String(_.status))&&!("body"in _)),K_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),CT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),GT=(_)=>Boolean(_&&"written"in _&&_.written===!0),XT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),dS=new Set(eT),DT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&dS.has(String(_.kind))&&Number.isFinite(_.size)),IT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),pS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),vS=(_)=>Object(_)===_?_:null,s_=(_)=>String(_)===_&&_.length>0,uS=(_)=>{if(!s_(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&s_(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:fS(s_(_.code)?_.code:void 0)};return null},VT=(_)=>{let E=vS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return uS(E);if(!pS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var WS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),lS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var PS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),j_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${Z_} characters without NUL or backslash.`)),x_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},fT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),C=_.requestTimeoutMs??TT,D=new Set,Y=new Set,J=new Set,Q=new Set,q=new Set,h=new Set,a=new Set,m=new Set,j=new Set,k=new Set,x=[],c=null,d=null,I_=new Set,V_=new Set,U_=null,A_=null,c_=!1,s=new Map,t=new Map,e=new Map,v=!1,G={value:0},R=null,u=null,M_=!1,R_=!1,BT=null,KT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},y=(T)=>{E.parent.postMessage(T,"*")},jT=()=>{if(v||E.parent===E||k.size===0||R?.features?.lateGenerateResults!==!0)return;y({channel:I,v:V,type:"generate-late-listen"})},L=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},xT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=VT(T.data);if(!S)return;if(S.type==="workspace"){let A=t.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="shells"){let A=e.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,u=KT(S.payload.session),L(D,S.payload),L(Y,S.payload.directory),L(J,S.payload.session),u)L(Q,u);L(q,S.payload.connection),L(h,S.payload.settings),L(a,S.payload.item),jT();return}if(S.type==="generate-late"){if(k.size===0)x.push(S.payload);else L(k,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};L(Y,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)u=null;else if(u?.sessionId!==S.payload.session.id)u=KT(S.payload.session);L(J,S.payload.session);return}if(S.type==="session-lifecycle"){u=S.payload,L(Q,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};L(q,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};L(h,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};L(a,S.payload.item);return}if(S.type==="status-control-event"){L(m,S.payload);return}if(S.type==="popover-closed"){L(j,S.payload);return}if(S.type==="action"){let A=(f)=>{if(!v)y({channel:I,v:V,type:"action-result",id:S.id,payload:f})},N=d;if(!N){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>N(S.payload)).then(()=>A({ok:!0}),(f)=>{let F=(f instanceof Error?f.message:String(f)).trim();A({ok:!1,error:(F||"Action failed.").slice(0,C_)})});return}if(S.type==="file-open"){let A=S.payload;if(A_&&aT(A_,A))return;A_=A,L(I_,S.payload);return}if(S.type==="file-saved"){L(V_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(F)=>{if(!v)y({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:F})},N=(F)=>A({error:(F.trim()||"Could not read the edited file.").slice(0,C_)}),f=U_;if(!f){N("This extension does not edit files.");return}Promise.resolve().then(()=>f(S.payload.purpose)).then((F)=>{if(a_(F)>L_){N(`The file is over ${L_} ${"bytes"in F?"bytes":"characters"}.`);return}if(F.version.length>Y_){N(`The snapshot version is over ${Y_} characters.`);return}A({snapshot:"bytes"in F?{bytes:F.bytes,version:F.version}:{content:F.content,version:F.version}})},(F)=>N(F instanceof Error?F.message:String(F)));return}if(S.type==="resolve"){let A=(f)=>{y({channel:I,v:V,type:"resolve-result",id:S.id,payload:f})},N=c;if(!N){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>N(S.payload)).then((f)=>A({item:f?T_(f):null}),(f)=>{let F=(f instanceof Error?f.message:String(f)).trim();A({error:(F||"Command failed.").slice(0,C_)})});return}let U=s.get(S.id);if(!U)return;if(clearTimeout(U.timer),s.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",xT),y({channel:I,v:V,type:"hello"});let B=(T,S=C)=>{if(v||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let N=setTimeout(()=>{s.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);s.set(T.id,{resolve:U,reject:A,timer:N}),y(T)})},Z=(T)=>B(T).then(()=>{return}),z={channel:I,v:V},d_=(T)=>{if(!v&&E.parent!==E)y(T)},wT=()=>d_({...z,type:"file-save"}),HT=(T)=>{if(!WS(T)||!lS(T))return;T.preventDefault(),wT()},bT=(T)=>{if(!WS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),hT(R.popover.id,"escape").catch(()=>{return})},f_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=M_||R_;if(BT===S)return;BT=S,mT(T.id,S).catch(()=>{return})},N_=()=>{if(R?.surface!=="popover"||M_)return;M_=!0,f_()},qT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!M_)return;M_=!1,f_()},yT=()=>{if(R?.surface!=="popover"||R_)return;R_=!0,f_()},gT=()=>{if(R?.surface!=="popover"||!R_)return;R_=!1,f_()},p=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},p_=async(T)=>{if(T.kind!=="projects")p(T.projectId);let S=await B({...z,type:"workspace-read",id:X(G),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},v_=async(T,S)=>{if(T.kind!=="projects")p(T.projectId);let U=X(G);t.set(U,S);try{await Z({...z,type:"workspace-subscribe",id:X(G),payload:{subscriptionId:U,query:T}})}catch(A){if(t.delete(U),!v)y({...z,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!t.delete(U)||v)return;y({...z,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},yS=async(T,S)=>{if(T.kind==="session")p(T.sessionId);if(T.kind==="project")p(T.projectId);let U=X(G);e.set(U,S);try{await Z({...z,type:"shells-subscribe",id:X(G),payload:{subscriptionId:U,scope:T}})}catch(A){if(e.delete(U),!v)y({...z,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!e.delete(U)||v)return;y({...z,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},W_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>l_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!__(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>n_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await B({...z,type:"storage",id:X(G),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},hT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Z({...z,type:"popover-close",id:X(G),payload:S?{id:T,reason:S}:{id:T}}),mT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Z({...z,type:"popover-anchor",id:X(G),payload:{id:T,active:S}});return E.addEventListener("keydown",bT,!0),E.addEventListener("pointerover",N_),E.addEventListener("pointermove",N_),E.addEventListener("pointerout",qT),E.addEventListener("focus",yT),E.addEventListener("blur",gT),{onAction:(T)=>{return d=T,()=>{if(d===T)d=null}},listProjects:async()=>{let T=await p_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await p_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await p_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>v_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>v_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>v_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>yS(T,S),readShellOutput:async(T,S)=>{p(T,P_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>$_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${$_}.`);let f=await B({...z,type:"shell-output",id:X(G),payload:{shellId:T,cursor:U,tailBytes:A}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(T)=>{if(p(T,P_),(await B({...z,type:"shell-stop",id:X(G),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{p(T),await Z({...z,type:"open-session",id:X(G),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=x_(S),A={op:"get",key:T};if(U)A.scope=U;let N=await W_(A);return N.op==="get"&&N.found?N.value:void 0},set:async(T,S,U)=>{let A=x_(U),N={op:"set",key:T,value:S};if(A)N.scope=A;await W_(N)},delete:async(T,S)=>{let U=x_(S),A={op:"delete",key:T};if(U)A.scope=U;await W_(A)},keys:async(T)=>{let S=x_(T),U={op:"keys"};if(S)U.scope=S;let A=await W_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(D.add(T),R)T(R);return()=>{D.delete(T)}},onDirectory:(T)=>{if(Y.add(T),R)T(R.directory);return()=>{Y.delete(T)}},onSession:(T)=>{if(J.add(T),R)T(R.session);return()=>{J.delete(T)}},onSessionLifecycle:(T)=>{if(Q.add(T),u)T(u);return()=>{Q.delete(T)}},onConnection:(T)=>{if(q.add(T),R)T(R.connection);return()=>{q.delete(T)}},onSettings:(T)=>{if(h.add(T),R)T(R.settings);return()=>{h.delete(T)}},onItem:(T)=>{if(a.add(T),R)T(R.item);return()=>{a.delete(T)}},onStatusControl:(T)=>{return m.add(T),()=>{m.delete(T)}},onPopoverClosed:(T)=>{return j.add(T),()=>{j.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!lT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Z({...z,type:"status-controls",id:X(G),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!r_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Z({...z,type:"popover-open",id:X(G),payload:T})},closePopover:hT,setPopoverAnchorActive:mT,onResolve:(T)=>{return c=T,()=>{if(c===T)c=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>Q_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${Q_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>k_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${k_} characters.`));return Z({channel:I,v:V,type:"toast",id:X(G),payload:{...T,message:S}})},openUrl:(T)=>Z({channel:I,v:V,type:"open-url",id:X(G),payload:{url:T}}),openCommit:(T)=>_T(T)?Z({channel:I,v:V,type:"open-commit",id:X(G),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>Z({channel:I,v:V,type:"open-surface",id:X(G),payload:{surfaceId:T}}),writeClipboard:(T)=>Z({channel:I,v:V,type:"clipboard-write",id:X(G),payload:{text:T}}),compose:(T)=>Z({channel:I,v:V,type:"compose",id:X(G),payload:T}),attach:(T)=>Z({channel:I,v:V,type:"attach",id:X(G),payload:T_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)p(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")p(S.directory);else{if(S.name!==void 0)p(S.name,200);if(S.baseBranch!==void 0)p(S.baseBranch,200)}let U=await B({channel:I,v:V,type:"start-session",id:X(G),payload:OT(T)},_.requestTimeoutMs??180000);if(!t_(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>B({channel:I,v:V,type:"prompt",id:X(G),payload:UT(T)}).then((S)=>{if(!e_(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>Z({channel:I,v:V,type:"session-link",id:X(G),payload:T_(T)}),close:()=>Z({channel:I,v:V,type:"close",id:X(G)}),oauthStart:()=>Z({channel:I,v:V,type:"oauth-start",id:X(G)}),oauthDisconnect:()=>Z({channel:I,v:V,type:"oauth-disconnect",id:X(G)}),request:(T)=>(B_(T.path)?B({channel:I,v:V,type:"request",id:X(G),payload:T}):PS()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(B_(T.path)?B({channel:I,v:V,type:"service-request",id:X(G),payload:T}):PS()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>B({channel:I,v:V,type:"service-status",id:X(G)}).then((T)=>{if(!RT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(S_(T)?B({channel:I,v:V,type:"file-read",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!CT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!S_(T))return j_();if(S.length>z_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${z_} characters.`));return B({channel:I,v:V,type:"file-write",id:X(G),payload:{path:T,content:S}}).then((U)=>{if(!GT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(S_(T)?B({channel:I,v:V,type:"file-list",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!XT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(S_(T)?B({channel:I,v:V,type:"file-stat",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!DT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>F_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${F_} characters.`));if(U!==void 0&&(U.length===0||U.length>J_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${J_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(ST,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let N={prompt:S};if(U!==void 0)N.system=U;if(A!==void 0)N.maxOutputTokens=A;return B({channel:I,v:V,type:"generate",id:X(G),payload:N},_.requestTimeoutMs??ET).then((f)=>{if(!IT(f))throw new M("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(T)=>{k.add(T);for(let S of x.splice(0))L([T],S);return jT(),()=>{k.delete(T)}},setBadge:(T)=>Z({channel:I,v:V,type:"badge",id:X(G),payload:{count:AT(T)}}),setHeight:(T)=>Z({channel:I,v:V,type:"resize",id:X(G),payload:{height:MT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!c_)c_=!0,E.addEventListener("keydown",HT,!0);if(A_)T(A_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},onFileSaved:(T)=>{return V_.add(T),()=>{V_.delete(T)}},reportFileChange:(T)=>d_({...z,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:wT,reportFileUnsupported:()=>d_({...z,type:"file-unsupported"}),dispose:()=>{for(let T of t.keys())y({...z,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:T}});t.clear();for(let T of e.keys())y({...z,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:T}});if(e.clear(),v=!0,c=null,d=null,U_=null,I_.clear(),V_.clear(),c_)E.removeEventListener("keydown",HT,!0);E.removeEventListener("message",xT),E.removeEventListener("keydown",bT,!0),E.removeEventListener("pointerover",N_),E.removeEventListener("pointermove",N_),E.removeEventListener("pointerout",qT),E.removeEventListener("focus",yT),E.removeEventListener("blur",gT);for(let T of s.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));s.clear(),D.clear(),Y.clear(),J.clear(),Q.clear(),q.clear(),h.clear(),a.clear(),m.clear(),j.clear(),k.clear(),x.length=0}}};var $S=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var jE=new Set($S);var LS=["none","agent","user"];var wE=new Set(LS);var nS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],oS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],YS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,C]of nS)E.style.setProperty(O,_.tokens[C]);for(let[O,C,D]of oS){let Y=_.tokens[D]??"";E.style.setProperty(O,Y),E.style.setProperty(C,Y)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},NT=(_,E)=>{if(YS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var aS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},W=(_,E)=>`var(--${_}, var(--oc-${aS[_]}, ${E}))`,n=W("surface-background","transparent"),H_=W("surface-elevated","transparent"),E_=W("surface-elevated-foreground","inherit"),g=W("surface-foreground","inherit"),P=W("surface-muted-foreground","gray"),iS=W("surface-muted","transparent"),i=W("interactive-border","currentColor"),w=W("interactive-hover","transparent"),r=W("interactive-active","transparent"),WT=W("interactive-selection","transparent"),PT=W("interactive-selection-foreground","inherit"),l=W("primary","currentColor"),$T=W("primary-text","inherit"),LT=W("error-text","inherit"),rS=W("font-sans","inherit"),YT=W("font-mono","monospace"),zS=W("radius","9px"),QT=`calc(${zS} - 2px)`,QS=`calc(${zS} - 4px)`,$=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,kS=`background-image: linear-gradient(${w}, ${w});`,kT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,ZT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ZS="box-shadow: var(--oc-sdk-lit);",zT=`inset 0 0.5px 0 0 ${$(g,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,sS=`
:root {
  --oc-sdk-edge: ${$(g,16)};
  --oc-sdk-field-bg: ${H_};
  --oc-sdk-raised-bg: ${n};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${$(g,14)};
  --oc-sdk-field-bg: ${$(n,50,H_)};
  --oc-sdk-raised-bg: ${H_};
  --oc-sdk-field-lift: ${zT};
  --oc-sdk-raised-lift: ${zT};
  --oc-sdk-lit: ${zT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,w_=(_)=>{let E=W(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${W(`${_}-text`,"inherit")}; }`},tS=`
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
`,FS=`${sS}
.oc-sdk { color: ${g}; font-family: ${rS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${kS} }
.oc-sdk-mono { font-family: ${YT}; }
.oc-sdk-muted { color: ${P}; }
${w_("success")}${w_("warning")}${w_("error")}${w_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${l}; --oc-sdk-tone-text: ${$T}; }

.oc-sdk-btn { border-radius: ${QT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${QS}; }
.oc-sdk-btn[data-variant="default"] { color: ${$T}; background: ${$(l,10,n)}; border-color: ${$(l,12)}; ${ZS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${$(l,16,n)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${$(l,22,n)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${iS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${E_}; ${ZT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${r}, ${r}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${r}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${W("status-error","red")}; color: ${LT}; background: ${$("var(--oc-sdk-tone)",7,n)}; border-color: ${$("var(--oc-sdk-tone)",12)}; ${ZS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${$("var(--oc-sdk-tone)",9,n)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${$("var(--oc-sdk-tone)",11,n)}; box-shadow: none; }

.oc-sdk-field-note { color: ${P}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${LT}; }
.oc-sdk-input { border-radius: ${QT}; background: var(--oc-sdk-field-bg); color: ${E_}; ${kT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${P}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${kT($(g,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${kT(W("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${YT}; }

.oc-sdk-search-icon { color: ${P}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${l}; }
.oc-sdk-search-clear { border-radius: ${QS}; color: ${P}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${g}; }

.oc-sdk-trigger { border-radius: ${QT}; background: var(--oc-sdk-raised-bg); color: ${E_}; ${ZT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${P}; }
.oc-sdk-trigger-chevron { color: ${P}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${E_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${H_}; background-clip: padding-box; color: ${E_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${WT}; color: ${PT}; }
.oc-sdk-option-check { color: ${g}; }
.oc-sdk-option[data-destructive="true"] { color: ${LT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${$(W("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${P}; }
.oc-sdk-popup-empty { color: ${P}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${i}; border-radius: 4px; color: ${g}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${$(g,60,i)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${i}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${n}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${l}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${kS} }
.oc-sdk-check-desc { color: ${P}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${$(g,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${P}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${g}; }
.oc-sdk-tab[aria-selected="true"] { color: ${PT}; background: ${WT}; border-color: ${i}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${E_}; background: var(--oc-sdk-raised-bg); ${ZT} }
.oc-sdk-tab-count { color: ${P}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${$(g,6)}; color: ${P}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${$("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${WT}; color: ${PT}; }
.oc-sdk-row-lead { font-family: ${YT}; color: ${P}; }
.oc-sdk-row-sub { color: ${P}; }
.oc-sdk-row-meta { color: ${P}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${P}; }

.oc-sdk-empty-body { color: ${P}; }

.oc-sdk-spinner { color: ${P}; }
.oc-sdk-spinner-ring { border-color: ${i}; border-top-color: ${l}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${$("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${P}; }

.oc-sdk-separator { color: ${P}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${$(i,40)}; }

.oc-sdk-progress-label { color: ${P}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${$(g,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${l}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${W("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${W("success-text","inherit")}; }

.oc-sdk-text a { color: ${$T}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${$(i,60)}; }
`,K=`
${u_}
${tS}
${FS}`;var JS=["#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"],xS=(_)=>{let E=2166136261,O=new TextEncoder().encode(_);for(let C of O)E^=C,E=Math.imul(E,16777619)>>>0;return JS[E%JS.length]},h_=(_)=>[..._].sort((E,O)=>E.label.localeCompare(O.label,"zh-CN")),BS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((C)=>/^\s*description\s*:/.test(C));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},EE=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),KS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((C)=>C.kind==="file"&&C.name.endsWith(".md")).map((C)=>C.name)}catch{return[]}},jS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},wS=async(_,E)=>{let O=[],C=[],D=new Set,Y=new Map,J="~/.config/opencode/snippet";for(let m of await KS(_,"~/.config/opencode/snippet")){let j=await jS(_,`~/.config/opencode/snippet/${m}`);if(j===null)continue;let k=EE(j);if(!k)continue;let x=m.replace(/\.md$/,""),c=BS(j)??x,d=`snip:${k}`;if(D.has(d))continue;D.add(d),O.push({label:c,text:k}),Y.set(x,c)}let Q=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let m of Q)for(let j of await KS(_,m)){let k=await jS(_,`${m}/${j}`);if(k===null)continue;let x=j.replace(/\.md$/,""),c=BS(k)??x;Y.set(x,c);let d=`cmd:/${x}`;if(D.has(d))continue;D.add(d),C.push({label:c,text:`/${x}`})}if(E)try{let{content:m}=await _.readFile(".openchamber/project.json"),j=JSON.parse(m);if(Array.isArray(j.draftStarters))for(let k of j.draftStarters.slice(0,30)){if(typeof k?.name!=="string"||!k.name)continue;let x=`cmd:/${k.name}`;if(D.has(x))continue;D.add(x),C.unshift({label:Y.get(k.name)??k.name,text:`/${k.name}`})}}catch{}let q=h_(O),h=h_(C);O.length=0,O.push(...q),C.length=0,C.push(...h);let a=O.length+C.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:C,hint:a}},HS=async(_,E,O)=>{try{let C=await _.prompt({text:E,send:!0});if(O(C.sent==="sent"?"已提交到会话":`未直接发出（${C.sent}），已填入输入框`),C.sent!=="sent")await _.prompt({text:E}).catch(()=>{return})}catch(C){if(C instanceof M&&(C.code==="NO_SESSION"||C.code==="SESSION_BUSY"))O(C.code==="NO_SESSION"?"无会话已填入输入框":"会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});else O(C instanceof M?`${C.code}`:"发送失败")}};var X_=fT(),D_=document.querySelector("#root");if(!D_)throw Error("Missing #root");D_.innerHTML=`<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0)}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6}
.mut{font-size:12px;opacity:.7}
</style><div class="grid" id="g"></div><div class="mut" id="out"></div>`;var m_=document.querySelector("#g"),OE=document.querySelector("#out"),bS="",JT=null,qS=async(_)=>{let E=await wS(X_,_),O=JSON.stringify([E.snippets,E.commands]);if(O===bS)return;bS=O;let{snippets:C,commands:D}=E;m_.innerHTML="";for(let J of h_([...D,...C])){let Q=document.createElement("button"),q=xS(J.label);Q.style.borderColor=q,Q.style.background=`color-mix(in srgb, ${q} 16%, transparent)`,Q.textContent=J.label,Q.title=J.text.length>200?J.text.slice(0,200):J.text,Q.onclick=()=>void HS(X_,J.text,(h)=>{OE.textContent=h}),m_.appendChild(Q)}if(m_.children.length===0)m_.innerHTML='<span class="mut">暂无快捷</span>';let Y=Math.ceil(D_.getBoundingClientRect().height);X_.setHeight(Y).catch(()=>{return})};new ResizeObserver(()=>{let _=Math.ceil(D_.getBoundingClientRect().height);X_.setHeight(_).catch(()=>{return})}).observe(D_);setInterval(()=>{if(!document.hidden)qS(JT)},30000);X_.onReady((_)=>{NT(_,document.documentElement),JT=_.directory??null,qS(JT)});})();
