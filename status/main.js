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
`;function mT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(C)=>{let D=C.target===_?E:C.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let Y=O.get(D);if(Y!==void 0)clearTimeout(Y);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var yS=`(${mT.toString()})(document);`;var u_=128,l_=65536;var P_=128;var $_=65536;var vT=/^[a-z][a-z0-9-]{0,39}$/;var cT=(_)=>Object(_)===_&&!Array.isArray(_),n_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),dT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,pT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,uT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!cT(O)||!vT.test(O.id)||!dT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!n_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!n_(O,["kind","id","label","value","options","disabled"]))return!1;if(!pT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let C=new Set;for(let D of O.options){if(!cT(D)||!n_(D,["value","label"])||!pT(D.value)||!dT(D.label)||C.has(D.value))return!1;C.add(D.value)}if(!C.has(O.value))return!1}return!0};var lT=["{id}","{segment}","{segments+}"];var IE=new Set(lT);var nT=["turn-finished","turn-failed","permission-asked","question-asked"];var fE=new Set(nT);var L_=20000000,Y_=256;var o_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,oT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var aT=/^[A-Za-z0-9_-]{1,80}$/;var iT=["left","right","top","bottom"];var rT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let C=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of C)if(!rT(D,E+1,O))return!1;return!0},a_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(a_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(a_)}return String(_)===_||Number.isFinite(_)},i_=(_)=>{try{if(String(_.id)!==_.id||!aT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!iT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!rT(_.data)||!a_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var tT=["file","directory","other","missing"],s_=(_)=>Boolean(_&&"sessionId"in _),t_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var eT=/^[0-9a-f]{7,64}$/i,e_=(_)=>eT.test(_),Q_=500,k_=32000,_S=16000,TS=128,SS=200,ES=2000,OS=16000,US=80,AS=200,MS=16000;var RS=2000;var _T=20000,Z_=1024,z_=2000000;var F_=64000,J_=8000,TT=4000;var ST=960000;var CS=999,GS=1e4,C_=500,XS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],DS=["stopped","starting","ready","failed"],hS=new Set(XS),IS=(_)=>hS.has(_),VS=(_)=>_&&IS(_)?_:"HOST_REJECTED",e=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(e);if(Object(_)===_)return Object.values(_).every(e);return!1},fS=(_)=>e(_)&&JSON.stringify(_).length<=MS,sT=(_)=>_?.trim().slice(0,AS)??"",__=(_)=>{let E=_.id.trim().slice(0,TS),O=_.title.trim().slice(0,SS),C=_.url.trim().slice(0,ES),D=_.text?.trim().slice(0,OS),Y=_.author?.trim().slice(0,US),B=_.kind==="pull"?"pull":"issue",Q={providerId:_.providerId.trim(),id:E,title:O||E,url:C,kind:B};if(D)Q.text=D;if(Y)Q.author=Y;if(B==="pull"){let H=sT(_.branches?.head),m=sT(_.branches?.base);if(H&&m)Q.branches={head:H,base:m}}if(fS(_.data))Q.data=_.data;return Q},ET=(_)=>{let E=__(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},OT=(_)=>{let E={text:_.text.trim().slice(0,_S)};if(_.send)E.send=!0;return E},UT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(CS,Math.max(0,Math.round(_)))},AT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(GS,Math.max(0,Math.ceil(_)))};var T_=(_)=>_.length>0&&_.length<=Z_&&!_.includes("\x00")&&!_.includes("\\");var B_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>RS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},mS=new Set(DS),MT=(_)=>Boolean(_&&"status"in _&&mS.has(String(_.status))&&!("body"in _)),K_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),RT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),CT=(_)=>Boolean(_&&"written"in _&&_.written===!0),GT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),cS=new Set(tT),XT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&cS.has(String(_.kind))&&Number.isFinite(_.size)),DT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),dS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),pS=(_)=>Object(_)===_?_:null,r_=(_)=>String(_)===_&&_.length>0,vS=(_)=>{if(!r_(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&r_(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:VS(r_(_.code)?_.code:void 0)};return null},IT=(_)=>{let E=pS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return vS(E);if(!dS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var NS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),uS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var WS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),j_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${Z_} characters without NUL or backslash.`)),x_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},VT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),C=_.requestTimeoutMs??_T,D=new Set,Y=new Set,B=new Set,Q=new Set,H=new Set,m=new Set,j=new Set,K=new Set,F=new Set,J=new Set,v=[],c=null,O_=null,I_=new Set,V_=new Set,U_=null,A_=null,m_=!1,r=new Map,s=new Map,t=new Map,p=!1,G={value:0},R=null,u=null,M_=!1,R_=!1,JT=null,BT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},g=(T)=>{E.parent.postMessage(T,"*")},KT=()=>{if(p||E.parent===E||J.size===0||R?.features?.lateGenerateResults!==!0)return;g({channel:I,v:V,type:"generate-late-listen"})},L=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},jT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=IT(T.data);if(!S)return;if(S.type==="workspace"){let A=s.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="shells"){let A=t.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,u=BT(S.payload.session),L(D,S.payload),L(Y,S.payload.directory),L(B,S.payload.session),u)L(Q,u);L(H,S.payload.connection),L(m,S.payload.settings),L(j,S.payload.item),KT();return}if(S.type==="generate-late"){if(J.size===0)v.push(S.payload);else L(J,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};L(Y,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)u=null;else if(u?.sessionId!==S.payload.session.id)u=BT(S.payload.session);L(B,S.payload.session);return}if(S.type==="session-lifecycle"){u=S.payload,L(Q,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};L(H,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};L(m,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};L(j,S.payload.item);return}if(S.type==="status-control-event"){L(K,S.payload);return}if(S.type==="popover-closed"){L(F,S.payload);return}if(S.type==="action"){let A=(f)=>{if(!p)g({channel:I,v:V,type:"action-result",id:S.id,payload:f})},N=O_;if(!N){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>N(S.payload)).then(()=>A({ok:!0}),(f)=>{let z=(f instanceof Error?f.message:String(f)).trim();A({ok:!1,error:(z||"Action failed.").slice(0,C_)})});return}if(S.type==="file-open"){let A=S.payload;if(A_&&oT(A_,A))return;A_=A,L(I_,S.payload);return}if(S.type==="file-saved"){L(V_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(z)=>{if(!p)g({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:z})},N=(z)=>A({error:(z.trim()||"Could not read the edited file.").slice(0,C_)}),f=U_;if(!f){N("This extension does not edit files.");return}Promise.resolve().then(()=>f(S.payload.purpose)).then((z)=>{if(o_(z)>L_){N(`The file is over ${L_} ${"bytes"in z?"bytes":"characters"}.`);return}if(z.version.length>Y_){N(`The snapshot version is over ${Y_} characters.`);return}A({snapshot:"bytes"in z?{bytes:z.bytes,version:z.version}:{content:z.content,version:z.version}})},(z)=>N(z instanceof Error?z.message:String(z)));return}if(S.type==="resolve"){let A=(f)=>{g({channel:I,v:V,type:"resolve-result",id:S.id,payload:f})},N=c;if(!N){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>N(S.payload)).then((f)=>A({item:f?__(f):null}),(f)=>{let z=(f instanceof Error?f.message:String(f)).trim();A({error:(z||"Command failed.").slice(0,C_)})});return}let U=r.get(S.id);if(!U)return;if(clearTimeout(U.timer),r.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",jT),g({channel:I,v:V,type:"hello"});let x=(T,S=C)=>{if(p||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let N=setTimeout(()=>{r.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);r.set(T.id,{resolve:U,reject:A,timer:N}),g(T)})},k=(T)=>x(T).then(()=>{return}),Z={channel:I,v:V},c_=(T)=>{if(!p&&E.parent!==E)g(T)},xT=()=>c_({...Z,type:"file-save"}),wT=(T)=>{if(!NS(T)||!uS(T))return;T.preventDefault(),xT()},HT=(T)=>{if(!NS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),gT(R.popover.id,"escape").catch(()=>{return})},f_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=M_||R_;if(JT===S)return;JT=S,hT(T.id,S).catch(()=>{return})},N_=()=>{if(R?.surface!=="popover"||M_)return;M_=!0,f_()},bT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!M_)return;M_=!1,f_()},qT=()=>{if(R?.surface!=="popover"||R_)return;R_=!0,f_()},yT=()=>{if(R?.surface!=="popover"||!R_)return;R_=!1,f_()},d=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},d_=async(T)=>{if(T.kind!=="projects")d(T.projectId);let S=await x({...Z,type:"workspace-read",id:X(G),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},p_=async(T,S)=>{if(T.kind!=="projects")d(T.projectId);let U=X(G);s.set(U,S);try{await k({...Z,type:"workspace-subscribe",id:X(G),payload:{subscriptionId:U,query:T}})}catch(A){if(s.delete(U),!p)g({...Z,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!s.delete(U)||p)return;g({...Z,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},qS=async(T,S)=>{if(T.kind==="session")d(T.sessionId);if(T.kind==="project")d(T.projectId);let U=X(G);t.set(U,S);try{await k({...Z,type:"shells-subscribe",id:X(G),payload:{subscriptionId:U,scope:T}})}catch(A){if(t.delete(U),!p)g({...Z,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!t.delete(U)||p)return;g({...Z,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},W_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>u_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!e(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>l_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await x({...Z,type:"storage",id:X(G),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},gT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...Z,type:"popover-close",id:X(G),payload:S?{id:T,reason:S}:{id:T}}),hT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...Z,type:"popover-anchor",id:X(G),payload:{id:T,active:S}});return E.addEventListener("keydown",HT,!0),E.addEventListener("pointerover",N_),E.addEventListener("pointermove",N_),E.addEventListener("pointerout",bT),E.addEventListener("focus",qT),E.addEventListener("blur",yT),{onAction:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},listProjects:async()=>{let T=await d_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await d_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await d_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>p_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>p_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>p_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>qS(T,S),readShellOutput:async(T,S)=>{d(T,P_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>$_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${$_}.`);let f=await x({...Z,type:"shell-output",id:X(G),payload:{shellId:T,cursor:U,tailBytes:A}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(T)=>{if(d(T,P_),(await x({...Z,type:"shell-stop",id:X(G),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{d(T),await k({...Z,type:"open-session",id:X(G),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=x_(S),A={op:"get",key:T};if(U)A.scope=U;let N=await W_(A);return N.op==="get"&&N.found?N.value:void 0},set:async(T,S,U)=>{let A=x_(U),N={op:"set",key:T,value:S};if(A)N.scope=A;await W_(N)},delete:async(T,S)=>{let U=x_(S),A={op:"delete",key:T};if(U)A.scope=U;await W_(A)},keys:async(T)=>{let S=x_(T),U={op:"keys"};if(S)U.scope=S;let A=await W_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(D.add(T),R)T(R);return()=>{D.delete(T)}},onDirectory:(T)=>{if(Y.add(T),R)T(R.directory);return()=>{Y.delete(T)}},onSession:(T)=>{if(B.add(T),R)T(R.session);return()=>{B.delete(T)}},onSessionLifecycle:(T)=>{if(Q.add(T),u)T(u);return()=>{Q.delete(T)}},onConnection:(T)=>{if(H.add(T),R)T(R.connection);return()=>{H.delete(T)}},onSettings:(T)=>{if(m.add(T),R)T(R.settings);return()=>{m.delete(T)}},onItem:(T)=>{if(j.add(T),R)T(R.item);return()=>{j.delete(T)}},onStatusControl:(T)=>{return K.add(T),()=>{K.delete(T)}},onPopoverClosed:(T)=>{return F.add(T),()=>{F.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!uT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...Z,type:"status-controls",id:X(G),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!i_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...Z,type:"popover-open",id:X(G),payload:T})},closePopover:gT,setPopoverAnchorActive:hT,onResolve:(T)=>{return c=T,()=>{if(c===T)c=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>Q_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${Q_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>k_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${k_} characters.`));return k({channel:I,v:V,type:"toast",id:X(G),payload:{...T,message:S}})},openUrl:(T)=>k({channel:I,v:V,type:"open-url",id:X(G),payload:{url:T}}),openCommit:(T)=>e_(T)?k({channel:I,v:V,type:"open-commit",id:X(G),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>k({channel:I,v:V,type:"open-surface",id:X(G),payload:{surfaceId:T}}),writeClipboard:(T)=>k({channel:I,v:V,type:"clipboard-write",id:X(G),payload:{text:T}}),compose:(T)=>k({channel:I,v:V,type:"compose",id:X(G),payload:T}),attach:(T)=>k({channel:I,v:V,type:"attach",id:X(G),payload:__(T)}),startSession:async(T)=>{if(T.projectId!==void 0)d(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")d(S.directory);else{if(S.name!==void 0)d(S.name,200);if(S.baseBranch!==void 0)d(S.baseBranch,200)}let U=await x({channel:I,v:V,type:"start-session",id:X(G),payload:ET(T)},_.requestTimeoutMs??180000);if(!s_(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>x({channel:I,v:V,type:"prompt",id:X(G),payload:OT(T)}).then((S)=>{if(!t_(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>k({channel:I,v:V,type:"session-link",id:X(G),payload:__(T)}),close:()=>k({channel:I,v:V,type:"close",id:X(G)}),oauthStart:()=>k({channel:I,v:V,type:"oauth-start",id:X(G)}),oauthDisconnect:()=>k({channel:I,v:V,type:"oauth-disconnect",id:X(G)}),request:(T)=>(B_(T.path)?x({channel:I,v:V,type:"request",id:X(G),payload:T}):WS()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(B_(T.path)?x({channel:I,v:V,type:"service-request",id:X(G),payload:T}):WS()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>x({channel:I,v:V,type:"service-status",id:X(G)}).then((T)=>{if(!MT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(T_(T)?x({channel:I,v:V,type:"file-read",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!RT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!T_(T))return j_();if(S.length>z_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${z_} characters.`));return x({channel:I,v:V,type:"file-write",id:X(G),payload:{path:T,content:S}}).then((U)=>{if(!CT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(T_(T)?x({channel:I,v:V,type:"file-list",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!GT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(T_(T)?x({channel:I,v:V,type:"file-stat",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!XT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>F_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${F_} characters.`));if(U!==void 0&&(U.length===0||U.length>J_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${J_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(TT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let N={prompt:S};if(U!==void 0)N.system=U;if(A!==void 0)N.maxOutputTokens=A;return x({channel:I,v:V,type:"generate",id:X(G),payload:N},_.requestTimeoutMs??ST).then((f)=>{if(!DT(f))throw new M("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(T)=>{J.add(T);for(let S of v.splice(0))L([T],S);return KT(),()=>{J.delete(T)}},setBadge:(T)=>k({channel:I,v:V,type:"badge",id:X(G),payload:{count:UT(T)}}),setHeight:(T)=>k({channel:I,v:V,type:"resize",id:X(G),payload:{height:AT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!m_)m_=!0,E.addEventListener("keydown",wT,!0);if(A_)T(A_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},onFileSaved:(T)=>{return V_.add(T),()=>{V_.delete(T)}},reportFileChange:(T)=>c_({...Z,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:xT,reportFileUnsupported:()=>c_({...Z,type:"file-unsupported"}),dispose:()=>{for(let T of s.keys())g({...Z,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:T}});s.clear();for(let T of t.keys())g({...Z,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:T}});if(t.clear(),p=!0,c=null,O_=null,U_=null,I_.clear(),V_.clear(),m_)E.removeEventListener("keydown",wT,!0);E.removeEventListener("message",jT),E.removeEventListener("keydown",HT,!0),E.removeEventListener("pointerover",N_),E.removeEventListener("pointermove",N_),E.removeEventListener("pointerout",bT),E.removeEventListener("focus",qT),E.removeEventListener("blur",yT);for(let T of r.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));r.clear(),D.clear(),Y.clear(),B.clear(),Q.clear(),H.clear(),m.clear(),j.clear(),K.clear(),F.clear(),J.clear(),v.length=0}}};var PS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var KE=new Set(PS);var $S=["none","agent","user"];var xE=new Set($S);var lS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],nS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],LS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,C]of lS)E.style.setProperty(O,_.tokens[C]);for(let[O,C,D]of nS){let Y=_.tokens[D]??"";E.style.setProperty(O,Y),E.style.setProperty(C,Y)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},fT=(_,E)=>{if(LS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var oS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},W=(_,E)=>`var(--${_}, var(--oc-${oS[_]}, ${E}))`,n=W("surface-background","transparent"),H_=W("surface-elevated","transparent"),S_=W("surface-elevated-foreground","inherit"),h=W("surface-foreground","inherit"),P=W("surface-muted-foreground","gray"),aS=W("surface-muted","transparent"),a=W("interactive-border","currentColor"),b=W("interactive-hover","transparent"),i=W("interactive-active","transparent"),NT=W("interactive-selection","transparent"),WT=W("interactive-selection-foreground","inherit"),l=W("primary","currentColor"),PT=W("primary-text","inherit"),$T=W("error-text","inherit"),iS=W("font-sans","inherit"),LT=W("font-mono","monospace"),ZS=W("radius","9px"),YT=`calc(${ZS} - 2px)`,YS=`calc(${ZS} - 4px)`,$=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,QS=`background-image: linear-gradient(${b}, ${b});`,QT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,kT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",kS="box-shadow: var(--oc-sdk-lit);",ZT=`inset 0 0.5px 0 0 ${$(h,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,rS=`
:root {
  --oc-sdk-edge: ${$(h,16)};
  --oc-sdk-field-bg: ${H_};
  --oc-sdk-raised-bg: ${n};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${$(h,14)};
  --oc-sdk-field-bg: ${$(n,50,H_)};
  --oc-sdk-raised-bg: ${H_};
  --oc-sdk-field-lift: ${ZT};
  --oc-sdk-raised-lift: ${ZT};
  --oc-sdk-lit: ${ZT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,w_=(_)=>{let E=W(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${W(`${_}-text`,"inherit")}; }`},sS=`
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
`,zS=`${rS}
.oc-sdk { color: ${h}; font-family: ${iS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${QS} }
.oc-sdk-mono { font-family: ${LT}; }
.oc-sdk-muted { color: ${P}; }
${w_("success")}${w_("warning")}${w_("error")}${w_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${l}; --oc-sdk-tone-text: ${PT}; }

.oc-sdk-btn { border-radius: ${YT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${YS}; }
.oc-sdk-btn[data-variant="default"] { color: ${PT}; background: ${$(l,10,n)}; border-color: ${$(l,12)}; ${kS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${$(l,16,n)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${$(l,22,n)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${aS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${i}, ${i}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${S_}; ${kT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${i}, ${i}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${b}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${i}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${W("status-error","red")}; color: ${$T}; background: ${$("var(--oc-sdk-tone)",7,n)}; border-color: ${$("var(--oc-sdk-tone)",12)}; ${kS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${$("var(--oc-sdk-tone)",9,n)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${$("var(--oc-sdk-tone)",11,n)}; box-shadow: none; }

.oc-sdk-field-note { color: ${P}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${$T}; }
.oc-sdk-input { border-radius: ${YT}; background: var(--oc-sdk-field-bg); color: ${S_}; ${QT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${P}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${QT($(h,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${QT(W("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${LT}; }

.oc-sdk-search-icon { color: ${P}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${l}; }
.oc-sdk-search-clear { border-radius: ${YS}; color: ${P}; }
.oc-sdk-search-clear:hover { background: ${b}; color: ${h}; }

.oc-sdk-trigger { border-radius: ${YT}; background: var(--oc-sdk-raised-bg); color: ${S_}; ${kT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${i}, ${i}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${P}; }
.oc-sdk-trigger-chevron { color: ${P}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${S_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${H_}; background-clip: padding-box; color: ${S_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${b}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${NT}; color: ${WT}; }
.oc-sdk-option-check { color: ${h}; }
.oc-sdk-option[data-destructive="true"] { color: ${$T}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${$(W("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${P}; }
.oc-sdk-popup-empty { color: ${P}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${a}; border-radius: 4px; color: ${h}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${$(h,60,a)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${a}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${n}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${l}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${QS} }
.oc-sdk-check-desc { color: ${P}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${$(h,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${P}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${h}; }
.oc-sdk-tab[aria-selected="true"] { color: ${WT}; background: ${NT}; border-color: ${a}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${S_}; background: var(--oc-sdk-raised-bg); ${kT} }
.oc-sdk-tab-count { color: ${P}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${$(h,6)}; color: ${P}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${$("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${b}; }
.oc-sdk-row[aria-selected="true"] { background: ${NT}; color: ${WT}; }
.oc-sdk-row-lead { font-family: ${LT}; color: ${P}; }
.oc-sdk-row-sub { color: ${P}; }
.oc-sdk-row-meta { color: ${P}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${P}; }

.oc-sdk-empty-body { color: ${P}; }

.oc-sdk-spinner { color: ${P}; }
.oc-sdk-spinner-ring { border-color: ${a}; border-top-color: ${l}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${$("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${P}; }

.oc-sdk-separator { color: ${P}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${$(a,40)}; }

.oc-sdk-progress-label { color: ${P}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${$(h,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${l}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${W("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${W("success-text","inherit")}; }

.oc-sdk-text a { color: ${PT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${$(a,60)}; }
`,w=`
${v_}
${sS}
${zS}`;var FS=["#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"],jS=(_)=>{let E=0;for(let O of _)E=E*31+O.codePointAt(0)>>>0;return FS[E%FS.length]},JS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((C)=>/^\s*description\s*:/.test(C));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},SE=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),BS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((C)=>C.kind==="file"&&C.name.endsWith(".md")).map((C)=>C.name)}catch{return[]}},KS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},xS=async(_,E)=>{let O=[],C=[],D=new Set,Y=new Map,B="~/.config/opencode/snippet";for(let j of await BS(_,"~/.config/opencode/snippet")){let K=await KS(_,`~/.config/opencode/snippet/${j}`);if(K===null)continue;let F=SE(K);if(!F)continue;let J=j.replace(/\.md$/,""),v=JS(K)??J,c=`snip:${F}`;if(D.has(c))continue;D.add(c),O.push({label:v,text:F}),Y.set(J,v)}let Q=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let j of Q)for(let K of await BS(_,j)){let F=await KS(_,`${j}/${K}`);if(F===null)continue;let J=K.replace(/\.md$/,""),v=JS(F)??J;Y.set(J,v);let c=`cmd:/${J}`;if(D.has(c))continue;D.add(c),C.push({label:v,text:`/${J}`})}if(E)try{let{content:j}=await _.readFile(".openchamber/project.json"),K=JSON.parse(j);if(Array.isArray(K.draftStarters))for(let F of K.draftStarters.slice(0,30)){if(typeof F?.name!=="string"||!F.name)continue;let J=`cmd:/${F.name}`;if(D.has(J))continue;D.add(J),C.unshift({label:Y.get(F.name)??F.name,text:`/${F.name}`})}}catch{}let H=(j,K)=>j.label.localeCompare(K.label,"zh-CN");O.sort(H),C.sort(H);let m=O.length+C.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:C,hint:m}},wS=async(_,E,O)=>{try{let C=await _.prompt({text:E,send:!0});if(O(C.sent==="sent"?"已提交到会话":`未直接发出（${C.sent}），已填入输入框`),C.sent!=="sent")await _.prompt({text:E}).catch(()=>{return})}catch(C){if(C instanceof M&&(C.code==="NO_SESSION"||C.code==="SESSION_BUSY"))O(C.code==="NO_SESSION"?"无会话已填入输入框":"会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});else O(C instanceof M?`${C.code}`:"发送失败")}};var X_=VT(),D_=document.querySelector("#root");if(!D_)throw Error("Missing #root");D_.innerHTML=`<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0)}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6}
.mut{font-size:12px;opacity:.7}
</style><div class="grid" id="g"></div><div class="mut" id="out"></div>`;var h_=document.querySelector("#g"),EE=document.querySelector("#out"),HS="",FT=null,bS=async(_)=>{let E=await xS(X_,_),O=JSON.stringify([E.snippets,E.commands]);if(O===HS)return;HS=O;let{snippets:C,commands:D}=E;h_.innerHTML="";for(let B of[...D,...C]){let Q=document.createElement("button"),H=jS(B.label);Q.style.borderColor=H,Q.style.background=`color-mix(in srgb, ${H} 16%, transparent)`,Q.textContent=B.label,Q.title=B.text.length>200?B.text.slice(0,200):B.text,Q.onclick=()=>void wS(X_,B.text,(m)=>{EE.textContent=m}),h_.appendChild(Q)}if(h_.children.length===0)h_.innerHTML='<span class="mut">暂无快捷</span>';let Y=Math.ceil(D_.getBoundingClientRect().height);X_.setHeight(Y).catch(()=>{return})};new ResizeObserver(()=>{let _=Math.ceil(D_.getBoundingClientRect().height);X_.setHeight(_).catch(()=>{return})}).observe(D_);setInterval(()=>{if(!document.hidden)bS(FT)},30000);X_.onReady((_)=>{fT(_,document.documentElement),FT=_.directory??null,bS(FT)});})();
