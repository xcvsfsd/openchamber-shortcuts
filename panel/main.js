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
`;function dT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(R)=>{let D=R.target===_?E:R.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let Y=O.get(D);if(Y!==void 0)clearTimeout(Y);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var dS=`(${dT.toString()})(document);`;var u_=128,l_=65536;var $_=128;var Y_=65536;var lT=/^[a-z][a-z0-9-]{0,39}$/;var pT=(_)=>Object(_)===_&&!Array.isArray(_),n_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),vT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,uT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,nT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!pT(O)||!lT.test(O.id)||!vT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!n_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!n_(O,["kind","id","label","value","options","disabled"]))return!1;if(!uT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let R=new Set;for(let D of O.options){if(!pT(D)||!n_(D,["value","label"])||!uT(D.value)||!vT(D.label)||R.has(D.value))return!1;R.add(D.value)}if(!R.has(O.value))return!1}return!0};var aT=["{id}","{segment}","{segments+}"];var LE=new Set(aT);var iT=["turn-finished","turn-failed","permission-asked","question-asked"];var ZE=new Set(iT);var L_=20000000,Q_=256;var a_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,oT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var rT=/^[A-Za-z0-9_-]{1,80}$/;var sT=["left","right","top","bottom"];var tT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let R=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of R)if(!tT(D,E+1,O))return!1;return!0},i_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(i_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(i_)}return String(_)===_||Number.isFinite(_)},o_=(_)=>{try{if(String(_.id)!==_.id||!rT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!sT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!tT(_.data)||!i_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var _S=["file","directory","other","missing"],s_=(_)=>Boolean(_&&"sessionId"in _),t_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var TS=/^[0-9a-f]{7,64}$/i,e_=(_)=>TS.test(_),Z_=500,z_=32000,SS=16000,ES=128,OS=200,US=2000,AS=16000,MS=80,RS=200,CS=16000;var GS=2000;var _T=20000,f_=1024,k_=2000000;var F_=64000,J_=8000,TT=4000;var ST=960000;var XS=999,DS=1e4,G_=500,IS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],VS=["stopped","starting","ready","failed"],vS=new Set(IS),NS=(_)=>vS.has(_),WS=(_)=>_&&NS(_)?_:"HOST_REJECTED",__=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(__);if(Object(_)===_)return Object.values(_).every(__);return!1},PS=(_)=>__(_)&&JSON.stringify(_).length<=CS,eT=(_)=>_?.trim().slice(0,RS)??"",T_=(_)=>{let E=_.id.trim().slice(0,ES),O=_.title.trim().slice(0,OS),R=_.url.trim().slice(0,US),D=_.text?.trim().slice(0,AS),Y=_.author?.trim().slice(0,MS),w=_.kind==="pull"?"pull":"issue",z={providerId:_.providerId.trim(),id:E,title:O||E,url:R,kind:w};if(D)z.text=D;if(Y)z.author=Y;if(w==="pull"){let m=eT(_.branches?.head),N=eT(_.branches?.base);if(m&&N)z.branches={head:m,base:N}}if(PS(_.data))z.data=_.data;return z},ET=(_)=>{let E=T_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},OT=(_)=>{let E={text:_.text.trim().slice(0,SS)};if(_.send)E.send=!0;return E},UT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(XS,Math.max(0,Math.round(_)))},AT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(DS,Math.max(0,Math.ceil(_)))};var S_=(_)=>_.length>0&&_.length<=f_&&!_.includes("\x00")&&!_.includes("\\");var K_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>GS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},uS=new Set(VS),MT=(_)=>Boolean(_&&"status"in _&&uS.has(String(_.status))&&!("body"in _)),B_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),RT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),CT=(_)=>Boolean(_&&"written"in _&&_.written===!0),GT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),lS=new Set(_S),XT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&lS.has(String(_.kind))&&Number.isFinite(_.size)),DT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),nS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),aS=(_)=>Object(_)===_?_:null,r_=(_)=>String(_)===_&&_.length>0,iS=(_)=>{if(!r_(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&r_(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:WS(r_(_.code)?_.code:void 0)};return null},IT=(_)=>{let E=aS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return iS(E);if(!nS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var $S=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),oS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var YS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),j_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${f_} characters without NUL or backslash.`)),w_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},VT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),R=_.requestTimeoutMs??_T,D=new Set,Y=new Set,w=new Set,z=new Set,m=new Set,N=new Set,v=new Set,y=new Set,K=new Set,f=new Set,H=[],c=null,d=null,I_=new Set,V_=new Set,A_=null,M_=null,m_=!1,s=new Map,t=new Map,e=new Map,u=!1,G={value:0},C=null,l=null,R_=!1,C_=!1,BT=null,jT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},g=(T)=>{E.parent.postMessage(T,"*")},wT=()=>{if(u||E.parent===E||f.size===0||C?.features?.lateGenerateResults!==!0)return;g({channel:I,v:V,type:"generate-late-listen"})},Z=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},HT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=IT(T.data);if(!S)return;if(S.type==="workspace"){let A=t.get(S.payload.subscriptionId);if(A)Z([A],S.payload.snapshot);return}if(S.type==="shells"){let A=e.get(S.payload.subscriptionId);if(A)Z([A],S.payload.snapshot);return}if(S.type==="ready"){if(C=S.payload,l=jT(S.payload.session),Z(D,S.payload),Z(Y,S.payload.directory),Z(w,S.payload.session),l)Z(z,l);Z(m,S.payload.connection),Z(N,S.payload.settings),Z(v,S.payload.item),wT();return}if(S.type==="generate-late"){if(f.size===0)H.push(S.payload);else Z(f,S.payload);return}if(S.type==="directory"){if(C)C={...C,directory:S.payload.directory};Z(Y,S.payload.directory);return}if(S.type==="session"){if(C)C={...C,session:S.payload.session};if(!S.payload.session)l=null;else if(l?.sessionId!==S.payload.session.id)l=jT(S.payload.session);Z(w,S.payload.session);return}if(S.type==="session-lifecycle"){l=S.payload,Z(z,S.payload);return}if(S.type==="connection"){if(C)C={...C,connection:S.payload.connection};Z(m,S.payload.connection);return}if(S.type==="settings"){if(C)C={...C,settings:S.payload.settings};Z(N,S.payload.settings);return}if(S.type==="item"){if(C)C={...C,item:S.payload.item};Z(v,S.payload.item);return}if(S.type==="status-control-event"){Z(y,S.payload);return}if(S.type==="popover-closed"){Z(K,S.payload);return}if(S.type==="action"){let A=(W)=>{if(!u)g({channel:I,v:V,type:"action-result",id:S.id,payload:W})},P=d;if(!P){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>P(S.payload)).then(()=>A({ok:!0}),(W)=>{let J=(W instanceof Error?W.message:String(W)).trim();A({ok:!1,error:(J||"Action failed.").slice(0,G_)})});return}if(S.type==="file-open"){let A=S.payload;if(M_&&oT(M_,A))return;M_=A,Z(I_,S.payload);return}if(S.type==="file-saved"){Z(V_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(J)=>{if(!u)g({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:J})},P=(J)=>A({error:(J.trim()||"Could not read the edited file.").slice(0,G_)}),W=A_;if(!W){P("This extension does not edit files.");return}Promise.resolve().then(()=>W(S.payload.purpose)).then((J)=>{if(a_(J)>L_){P(`The file is over ${L_} ${"bytes"in J?"bytes":"characters"}.`);return}if(J.version.length>Q_){P(`The snapshot version is over ${Q_} characters.`);return}A({snapshot:"bytes"in J?{bytes:J.bytes,version:J.version}:{content:J.content,version:J.version}})},(J)=>P(J instanceof Error?J.message:String(J)));return}if(S.type==="resolve"){let A=(W)=>{g({channel:I,v:V,type:"resolve-result",id:S.id,payload:W})},P=c;if(!P){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>P(S.payload)).then((W)=>A({item:W?T_(W):null}),(W)=>{let J=(W instanceof Error?W.message:String(W)).trim();A({error:(J||"Command failed.").slice(0,G_)})});return}let U=s.get(S.id);if(!U)return;if(clearTimeout(U.timer),s.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",HT),g({channel:I,v:V,type:"hello"});let B=(T,S=R)=>{if(u||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let P=setTimeout(()=>{s.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);s.set(T.id,{resolve:U,reject:A,timer:P}),g(T)})},k=(T)=>B(T).then(()=>{return}),F={channel:I,v:V},c_=(T)=>{if(!u&&E.parent!==E)g(T)},xT=()=>c_({...F,type:"file-save"}),bT=(T)=>{if(!$S(T)||!oS(T))return;T.preventDefault(),xT()},qT=(T)=>{if(!$S(T)||T.key!=="Escape"||C?.surface!=="popover"||!C.popover)return;T.preventDefault(),mT(C.popover.id,"escape").catch(()=>{return})},N_=()=>{let T=C?.surface==="popover"?C.popover:void 0;if(!T)return;let S=R_||C_;if(BT===S)return;BT=S,cT(T.id,S).catch(()=>{return})},W_=()=>{if(C?.surface!=="popover"||R_)return;R_=!0,N_()},yT=(T)=>{if(C?.surface!=="popover"||T.relatedTarget!==null||!R_)return;R_=!1,N_()},gT=()=>{if(C?.surface!=="popover"||C_)return;C_=!0,N_()},hT=()=>{if(C?.surface!=="popover"||!C_)return;C_=!1,N_()},p=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},d_=async(T)=>{if(T.kind!=="projects")p(T.projectId);let S=await B({...F,type:"workspace-read",id:X(G),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},p_=async(T,S)=>{if(T.kind!=="projects")p(T.projectId);let U=X(G);t.set(U,S);try{await k({...F,type:"workspace-subscribe",id:X(G),payload:{subscriptionId:U,query:T}})}catch(A){if(t.delete(U),!u)g({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!t.delete(U)||u)return;g({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},cS=async(T,S)=>{if(T.kind==="session")p(T.sessionId);if(T.kind==="project")p(T.projectId);let U=X(G);e.set(U,S);try{await k({...F,type:"shells-subscribe",id:X(G),payload:{subscriptionId:U,scope:T}})}catch(A){if(e.delete(U),!u)g({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!e.delete(U)||u)return;g({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},P_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>u_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!__(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>l_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&C?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await B({...F,type:"storage",id:X(G),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},mT=(T,S)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...F,type:"popover-close",id:X(G),payload:S?{id:T,reason:S}:{id:T}}),cT=(T,S)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...F,type:"popover-anchor",id:X(G),payload:{id:T,active:S}});return E.addEventListener("keydown",qT,!0),E.addEventListener("pointerover",W_),E.addEventListener("pointermove",W_),E.addEventListener("pointerout",yT),E.addEventListener("focus",gT),E.addEventListener("blur",hT),{onAction:(T)=>{return d=T,()=>{if(d===T)d=null}},listProjects:async()=>{let T=await d_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await d_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await d_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>p_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>p_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>p_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>cS(T,S),readShellOutput:async(T,S)=>{p(T,$_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>Y_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Y_}.`);let W=await B({...F,type:"shell-output",id:X(G),payload:{shellId:T,cursor:U,tailBytes:A}});if(!W||typeof W.output!=="string"||!Number.isFinite(W.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return W},stopShell:async(T)=>{if(p(T,$_),(await B({...F,type:"shell-stop",id:X(G),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{p(T),await k({...F,type:"open-session",id:X(G),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=w_(S),A={op:"get",key:T};if(U)A.scope=U;let P=await P_(A);return P.op==="get"&&P.found?P.value:void 0},set:async(T,S,U)=>{let A=w_(U),P={op:"set",key:T,value:S};if(A)P.scope=A;await P_(P)},delete:async(T,S)=>{let U=w_(S),A={op:"delete",key:T};if(U)A.scope=U;await P_(A)},keys:async(T)=>{let S=w_(T),U={op:"keys"};if(S)U.scope=S;let A=await P_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(D.add(T),C)T(C);return()=>{D.delete(T)}},onDirectory:(T)=>{if(Y.add(T),C)T(C.directory);return()=>{Y.delete(T)}},onSession:(T)=>{if(w.add(T),C)T(C.session);return()=>{w.delete(T)}},onSessionLifecycle:(T)=>{if(z.add(T),l)T(l);return()=>{z.delete(T)}},onConnection:(T)=>{if(m.add(T),C)T(C.connection);return()=>{m.delete(T)}},onSettings:(T)=>{if(N.add(T),C)T(C.settings);return()=>{N.delete(T)}},onItem:(T)=>{if(v.add(T),C)T(C.item);return()=>{v.delete(T)}},onStatusControl:(T)=>{return y.add(T),()=>{y.delete(T)}},onPopoverClosed:(T)=>{return K.add(T),()=>{K.delete(T)}},setStatusControls:(T)=>{if(C?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!nT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...F,type:"status-controls",id:X(G),payload:{controls:T}})},openPopover:(T)=>{if(C?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!o_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...F,type:"popover-open",id:X(G),payload:T})},closePopover:mT,setPopoverAnchorActive:cT,onResolve:(T)=>{return c=T,()=>{if(c===T)c=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>Z_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${Z_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>z_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${z_} characters.`));return k({channel:I,v:V,type:"toast",id:X(G),payload:{...T,message:S}})},openUrl:(T)=>k({channel:I,v:V,type:"open-url",id:X(G),payload:{url:T}}),openCommit:(T)=>e_(T)?k({channel:I,v:V,type:"open-commit",id:X(G),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>k({channel:I,v:V,type:"open-surface",id:X(G),payload:{surfaceId:T}}),writeClipboard:(T)=>k({channel:I,v:V,type:"clipboard-write",id:X(G),payload:{text:T}}),compose:(T)=>k({channel:I,v:V,type:"compose",id:X(G),payload:T}),attach:(T)=>k({channel:I,v:V,type:"attach",id:X(G),payload:T_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)p(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")p(S.directory);else{if(S.name!==void 0)p(S.name,200);if(S.baseBranch!==void 0)p(S.baseBranch,200)}let U=await B({channel:I,v:V,type:"start-session",id:X(G),payload:ET(T)},_.requestTimeoutMs??180000);if(!s_(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>B({channel:I,v:V,type:"prompt",id:X(G),payload:OT(T)}).then((S)=>{if(!t_(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>k({channel:I,v:V,type:"session-link",id:X(G),payload:T_(T)}),close:()=>k({channel:I,v:V,type:"close",id:X(G)}),oauthStart:()=>k({channel:I,v:V,type:"oauth-start",id:X(G)}),oauthDisconnect:()=>k({channel:I,v:V,type:"oauth-disconnect",id:X(G)}),request:(T)=>(K_(T.path)?B({channel:I,v:V,type:"request",id:X(G),payload:T}):YS()).then((S)=>{if(!B_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(K_(T.path)?B({channel:I,v:V,type:"service-request",id:X(G),payload:T}):YS()).then((S)=>{if(!B_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>B({channel:I,v:V,type:"service-status",id:X(G)}).then((T)=>{if(!MT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(S_(T)?B({channel:I,v:V,type:"file-read",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!RT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!S_(T))return j_();if(S.length>k_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${k_} characters.`));return B({channel:I,v:V,type:"file-write",id:X(G),payload:{path:T,content:S}}).then((U)=>{if(!CT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(S_(T)?B({channel:I,v:V,type:"file-list",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!GT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(S_(T)?B({channel:I,v:V,type:"file-stat",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!XT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>F_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${F_} characters.`));if(U!==void 0&&(U.length===0||U.length>J_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${J_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(TT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let P={prompt:S};if(U!==void 0)P.system=U;if(A!==void 0)P.maxOutputTokens=A;return B({channel:I,v:V,type:"generate",id:X(G),payload:P},_.requestTimeoutMs??ST).then((W)=>{if(!DT(W))throw new M("HOST_REJECTED","Host did not return generated text.");return W})},onLateGenerateResult:(T)=>{f.add(T);for(let S of H.splice(0))Z([T],S);return wT(),()=>{f.delete(T)}},setBadge:(T)=>k({channel:I,v:V,type:"badge",id:X(G),payload:{count:UT(T)}}),setHeight:(T)=>k({channel:I,v:V,type:"resize",id:X(G),payload:{height:AT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!m_)m_=!0,E.addEventListener("keydown",bT,!0);if(M_)T(M_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return A_=T,()=>{if(A_===T)A_=null}},onFileSaved:(T)=>{return V_.add(T),()=>{V_.delete(T)}},reportFileChange:(T)=>c_({...F,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:xT,reportFileUnsupported:()=>c_({...F,type:"file-unsupported"}),dispose:()=>{for(let T of t.keys())g({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:T}});t.clear();for(let T of e.keys())g({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:T}});if(e.clear(),u=!0,c=null,d=null,A_=null,I_.clear(),V_.clear(),m_)E.removeEventListener("keydown",bT,!0);E.removeEventListener("message",HT),E.removeEventListener("keydown",qT,!0),E.removeEventListener("pointerover",W_),E.removeEventListener("pointermove",W_),E.removeEventListener("pointerout",yT),E.removeEventListener("focus",gT),E.removeEventListener("blur",hT);for(let T of s.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));s.clear(),D.clear(),Y.clear(),w.clear(),z.clear(),m.clear(),N.clear(),v.clear(),y.clear(),K.clear(),f.clear(),H.length=0}}};var LS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var yE=new Set(LS);var QS=["none","agent","user"];var hE=new Set(QS);var rS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],sS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ZS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,R]of rS)E.style.setProperty(O,_.tokens[R]);for(let[O,R,D]of sS){let Y=_.tokens[D]??"";E.style.setProperty(O,Y),E.style.setProperty(R,Y)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},NT=(_,E)=>{if(ZS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var tS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},$=(_,E)=>`var(--${_}, var(--oc-${tS[_]}, ${E}))`,a=$("surface-background","transparent"),x_=$("surface-elevated","transparent"),E_=$("surface-elevated-foreground","inherit"),h=$("surface-foreground","inherit"),L=$("surface-muted-foreground","gray"),eS=$("surface-muted","transparent"),o=$("interactive-border","currentColor"),x=$("interactive-hover","transparent"),r=$("interactive-active","transparent"),WT=$("interactive-selection","transparent"),PT=$("interactive-selection-foreground","inherit"),n=$("primary","currentColor"),$T=$("primary-text","inherit"),YT=$("error-text","inherit"),_E=$("font-sans","inherit"),LT=$("font-mono","monospace"),FS=$("radius","9px"),QT=`calc(${FS} - 2px)`,zS=`calc(${FS} - 4px)`,Q=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,fS=`background-image: linear-gradient(${x}, ${x});`,ZT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,zT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",kS="box-shadow: var(--oc-sdk-lit);",fT=`inset 0 0.5px 0 0 ${Q(h,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,TE=`
:root {
  --oc-sdk-edge: ${Q(h,16)};
  --oc-sdk-field-bg: ${x_};
  --oc-sdk-raised-bg: ${a};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Q(h,14)};
  --oc-sdk-field-bg: ${Q(a,50,x_)};
  --oc-sdk-raised-bg: ${x_};
  --oc-sdk-field-lift: ${fT};
  --oc-sdk-raised-lift: ${fT};
  --oc-sdk-lit: ${fT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,H_=(_)=>{let E=$(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${$(`${_}-text`,"inherit")}; }`},SE=`
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
`,JS=`${TE}
.oc-sdk { color: ${h}; font-family: ${_E}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${fS} }
.oc-sdk-mono { font-family: ${LT}; }
.oc-sdk-muted { color: ${L}; }
${H_("success")}${H_("warning")}${H_("error")}${H_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${n}; --oc-sdk-tone-text: ${$T}; }

.oc-sdk-btn { border-radius: ${QT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${zS}; }
.oc-sdk-btn[data-variant="default"] { color: ${$T}; background: ${Q(n,10,a)}; border-color: ${Q(n,12)}; ${kS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Q(n,16,a)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Q(n,22,a)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${eS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${E_}; ${zT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${r}, ${r}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${x}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${r}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${$("status-error","red")}; color: ${YT}; background: ${Q("var(--oc-sdk-tone)",7,a)}; border-color: ${Q("var(--oc-sdk-tone)",12)}; ${kS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Q("var(--oc-sdk-tone)",9,a)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Q("var(--oc-sdk-tone)",11,a)}; box-shadow: none; }

.oc-sdk-field-note { color: ${L}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${YT}; }
.oc-sdk-input { border-radius: ${QT}; background: var(--oc-sdk-field-bg); color: ${E_}; ${ZT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${L}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${ZT(Q(h,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${ZT($("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${LT}; }

.oc-sdk-search-icon { color: ${L}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${n}; }
.oc-sdk-search-clear { border-radius: ${zS}; color: ${L}; }
.oc-sdk-search-clear:hover { background: ${x}; color: ${h}; }

.oc-sdk-trigger { border-radius: ${QT}; background: var(--oc-sdk-raised-bg); color: ${E_}; ${zT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${L}; }
.oc-sdk-trigger-chevron { color: ${L}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${E_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${x_}; background-clip: padding-box; color: ${E_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${x}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${WT}; color: ${PT}; }
.oc-sdk-option-check { color: ${h}; }
.oc-sdk-option[data-destructive="true"] { color: ${YT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Q($("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${L}; }
.oc-sdk-popup-empty { color: ${L}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${o}; border-radius: 4px; color: ${h}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Q(h,60,o)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${o}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${a}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${n}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${fS} }
.oc-sdk-check-desc { color: ${L}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Q(h,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${L}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${h}; }
.oc-sdk-tab[aria-selected="true"] { color: ${PT}; background: ${WT}; border-color: ${o}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${E_}; background: var(--oc-sdk-raised-bg); ${zT} }
.oc-sdk-tab-count { color: ${L}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Q(h,6)}; color: ${L}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Q("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${x}; }
.oc-sdk-row[aria-selected="true"] { background: ${WT}; color: ${PT}; }
.oc-sdk-row-lead { font-family: ${LT}; color: ${L}; }
.oc-sdk-row-sub { color: ${L}; }
.oc-sdk-row-meta { color: ${L}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${L}; }

.oc-sdk-empty-body { color: ${L}; }

.oc-sdk-spinner { color: ${L}; }
.oc-sdk-spinner-ring { border-color: ${o}; border-top-color: ${n}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Q("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${L}; }

.oc-sdk-separator { color: ${L}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Q(o,40)}; }

.oc-sdk-progress-label { color: ${L}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Q(h,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${n}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${$("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${$("success-text","inherit")}; }

.oc-sdk-text a { color: ${$T}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Q(o,60)}; }
`,j=`
${v_}
${SE}
${JS}`;var KS=["#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"],xS=(_)=>{let E=2166136261,O=new TextEncoder().encode(_);for(let R of O)E^=R,E=Math.imul(E,16777619)>>>0;return KS[E%KS.length]},BS=(_)=>[..._].sort((E,O)=>E.label.localeCompare(O.label,"zh-CN")),jS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((R)=>/^\s*description\s*:/.test(R));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},ME=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),wS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((R)=>R.kind==="file"&&R.name.endsWith(".md")).map((R)=>R.name)}catch{return[]}},HS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},bS=async(_,E)=>{let O=[],R=[],D=new Set,Y=new Map,w="~/.config/opencode/snippet";for(let y of await wS(_,"~/.config/opencode/snippet")){let K=await HS(_,`~/.config/opencode/snippet/${y}`);if(K===null)continue;let f=ME(K);if(!f)continue;let H=y.replace(/\.md$/,""),c=jS(K)??H,d=`snip:${f}`;if(D.has(d))continue;D.add(d),O.push({label:c,text:f}),Y.set(H,c)}let z=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let y of z)for(let K of await wS(_,y)){let f=await HS(_,`${y}/${K}`);if(f===null)continue;let H=K.replace(/\.md$/,""),c=jS(f)??H;Y.set(H,c);let d=`cmd:/${H}`;if(D.has(d))continue;D.add(d),R.push({label:c,text:`/${H}`})}if(E)try{let{content:y}=await _.readFile(".openchamber/project.json"),K=JSON.parse(y);if(Array.isArray(K.draftStarters))for(let f of K.draftStarters.slice(0,30)){if(typeof f?.name!=="string"||!f.name)continue;let H=`cmd:/${f.name}`;if(D.has(H))continue;D.add(H),R.unshift({label:Y.get(f.name)??f.name,text:`/${f.name}`})}}catch{}let m=BS(O),N=BS(R);O.length=0,O.push(...m),R.length=0,R.push(...N);let v=O.length+R.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:R,hint:v}},qS=async(_,E,O,R,D,Y)=>{if(Y!==!1)try{let N=await _.prompt({text:O,send:!0});if(N.sent==="sent"){R("已提交到会话");return}R(`未直接发出（${N.sent}），已填入输入框`),await _.prompt({text:O}).catch(()=>{return});return}catch(N){if(!(N instanceof M)){R(String(N));return}if(N.code==="SESSION_BUSY"){R("会话忙已填入输入框稍后发送"),await _.prompt({text:O}).catch(()=>{return});return}if(N.code!=="NO_SESSION"){R(`${N.code}`);return}}if(!D){R("先在左侧选择项目再点按钮");return}R("无会话建新会话中…");let w=!1,z=(N)=>{w=!0,R(N)},m=(async()=>{let N;try{N=(await _.listProjects()).projects.find((K)=>K.directory===D)?.id}catch{}let v=await _.startSession({providerId:"shortcuts",id:E.slice(0,100)||"shortcut",title:E.slice(0,180),url:"",text:O,projectId:N});z(v.sent==="sent"?"已建新会话并提交":`新会话已建发送状态：${v.sent}进新会话手动发送`)})().catch((N)=>{z(N instanceof M?`建会话失败：${N.code}先选项目再试`:"建会话失败")});if(await Promise.race([m,new Promise((N)=>setTimeout(N,35000))]),!w)R("建会话较慢可能已在后台创建去会话列表确认没有再重发")};var KT=VT(),hS=document.querySelector("#root");if(!hS)throw Error("Missing #root");hS.innerHTML=`
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
<div class="mut" style="font-size:11px;opacity:.5">panel v0.1.2-建会话熔断</div>
`;var D_=(_)=>document.querySelector(`#${_}`),FT=D_("cmds"),JT=D_("snips"),RE=D_("out"),CE=D_("src"),GE=(_)=>{RE.textContent=_},yS=(_,E)=>{let O=document.createElement("button");O.className=E;let R=xS(_.label);return O.style.borderColor=R,O.style.background=`color-mix(in srgb, ${R} 16%, transparent)`,O.textContent=_.label,O.title=_.text.length>200?_.text.slice(0,200):_.text,O.onclick=()=>void qS(KT,_.label,_.text,GE,U_,mS),O},gS="",U_=null,mS=!1,h_=async(_,E=!1)=>{let O=await bS(KT,_),R=JSON.stringify([O.snippets,O.commands]);if(!E&&R===gS)return;gS=R;let{snippets:D,commands:Y,hint:w}=O;FT.innerHTML="";for(let z of Y)FT.appendChild(yS(z,"cmd"));if(Y.length===0)FT.innerHTML='<span class="mut">暂无</span>';JT.innerHTML="";for(let z of D)JT.appendChild(yS(z,"snip"));if(D.length===0)JT.innerHTML='<span class="mut">暂无</span>';CE.textContent=w};D_("btn-refresh").onclick=()=>void h_(U_,!0);setInterval(()=>{if(!document.hidden)h_(U_)},30000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)h_(U_)});KT.onReady((_)=>{NT(_,document.documentElement),U_=_.directory??null,mS=!!_.session,h_(U_,!0)});})();
