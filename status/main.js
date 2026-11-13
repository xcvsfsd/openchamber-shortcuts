(()=>{var I="openchamber.sdk",V=1;var a_=`
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
`;function nT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(D)=>{let C=D.target===_?E:D.target;if(!(C instanceof Element))return;if(!C.hasAttribute("data-oc-scrolling"))C.setAttribute("data-oc-scrolling","");let L=O.get(C);if(L!==void 0)clearTimeout(L);O.set(C,setTimeout(()=>{O.delete(C),C.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var lS=`(${nT.toString()})(document);`;var i_=128,o_=65536;var Q_=128;var L_=65536;var rT=/^[a-z][a-z0-9-]{0,39}$/;var aT=(_)=>Object(_)===_&&!Array.isArray(_),r_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),iT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,oT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,sT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!aT(O)||!rT.test(O.id)||!iT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!r_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!r_(O,["kind","id","label","value","options","disabled"]))return!1;if(!oT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let D=new Set;for(let C of O.options){if(!aT(C)||!r_(C,["value","label"])||!oT(C.value)||!iT(C.label)||D.has(C.value))return!1;D.add(C.value)}if(!D.has(O.value))return!1}return!0};var tT=["{id}","{segment}","{segments+}"];var zE=new Set(tT);var eT=["turn-finished","turn-failed","permission-asked","question-asked"];var FE=new Set(eT);var Z_=20000000,z_=256;var s_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,_S=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var TS=/^[A-Za-z0-9_-]{1,80}$/;var SS=["left","right","top","bottom"];var ES=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let D=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let C of D)if(!ES(C,E+1,O))return!1;return!0},t_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(t_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(t_)}return String(_)===_||Number.isFinite(_)},e_=(_)=>{try{if(String(_.id)!==_.id||!TS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!SS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!ES(_.data)||!t_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var US=["file","directory","other","missing"],TT=(_)=>Boolean(_&&"sessionId"in _),ST=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var AS=/^[0-9a-f]{7,64}$/i,ET=(_)=>AS.test(_),k_=500,F_=32000,MS=16000,RS=128,CS=200,GS=2000,XS=16000,DS=80,IS=200,VS=16000;var NS=2000;var OT=20000,J_=1024,f_=2000000;var K_=64000,B_=8000,UT=4000;var AT=960000;var WS=999,PS=1e4,I_=500,$S=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],YS=["stopped","starting","ready","failed"],aS=new Set($S),QS=(_)=>aS.has(_),LS=(_)=>_&&QS(_)?_:"HOST_REJECTED",S_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(S_);if(Object(_)===_)return Object.values(_).every(S_);return!1},ZS=(_)=>S_(_)&&JSON.stringify(_).length<=VS,OS=(_)=>_?.trim().slice(0,IS)??"",E_=(_)=>{let E=_.id.trim().slice(0,RS),O=_.title.trim().slice(0,CS),D=_.url.trim().slice(0,GS),C=_.text?.trim().slice(0,XS),L=_.author?.trim().slice(0,DS),f=_.kind==="pull"?"pull":"issue",Z={providerId:_.providerId.trim(),id:E,title:O||E,url:D,kind:f};if(C)Z.text=C;if(L)Z.author=L;if(f==="pull"){let q=OS(_.branches?.head),h=OS(_.branches?.base);if(q&&h)Z.branches={head:q,base:h}}if(ZS(_.data))Z.data=_.data;return Z},MT=(_)=>{let E=E_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},RT=(_)=>{let E={text:_.text.trim().slice(0,MS)};if(_.send)E.send=!0;return E},CT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(WS,Math.max(0,Math.round(_)))},GT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(PS,Math.max(0,Math.ceil(_)))};var O_=(_)=>_.length>0&&_.length<=J_&&!_.includes("\x00")&&!_.includes("\\");var j_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>NS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},iS=new Set(YS),XT=(_)=>Boolean(_&&"status"in _&&iS.has(String(_.status))&&!("body"in _)),w_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),DT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),IT=(_)=>Boolean(_&&"written"in _&&_.written===!0),VT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),oS=new Set(US),NT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&oS.has(String(_.kind))&&Number.isFinite(_.size)),WT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),rS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),sS=(_)=>Object(_)===_?_:null,_T=(_)=>String(_)===_&&_.length>0,tS=(_)=>{if(!_T(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&_T(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:LS(_T(_.code)?_.code:void 0)};return null},PT=(_)=>{let E=sS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return tS(E);if(!rS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var zS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),eS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var kS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),H_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${J_} characters without NUL or backslash.`)),x_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},$T=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),D=_.requestTimeoutMs??OT,C=new Set,L=new Set,f=new Set,Z=new Set,q=new Set,h=new Set,i=new Set,m=new Set,j=new Set,z=new Set,w=[],c=null,d=null,N_=new Set,W_=new Set,C_=null,G_=null,v_=!1,e=new Map,__=new Map,T_=new Map,v=!1,G={value:0},R=null,u=null,X_=!1,D_=!1,bT=null,qT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},y=(T)=>{E.parent.postMessage(T,"*")},yT=()=>{if(v||E.parent===E||z.size===0||R?.features?.lateGenerateResults!==!0)return;y({channel:I,v:V,type:"generate-late-listen"})},Q=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},gT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=PT(T.data);if(!S)return;if(S.type==="workspace"){let A=__.get(S.payload.subscriptionId);if(A)Q([A],S.payload.snapshot);return}if(S.type==="shells"){let A=T_.get(S.payload.subscriptionId);if(A)Q([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,u=qT(S.payload.session),Q(C,S.payload),Q(L,S.payload.directory),Q(f,S.payload.session),u)Q(Z,u);Q(q,S.payload.connection),Q(h,S.payload.settings),Q(i,S.payload.item),yT();return}if(S.type==="generate-late"){if(z.size===0)w.push(S.payload);else Q(z,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};Q(L,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)u=null;else if(u?.sessionId!==S.payload.session.id)u=qT(S.payload.session);Q(f,S.payload.session);return}if(S.type==="session-lifecycle"){u=S.payload,Q(Z,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};Q(q,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};Q(h,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};Q(i,S.payload.item);return}if(S.type==="status-control-event"){Q(m,S.payload);return}if(S.type==="popover-closed"){Q(j,S.payload);return}if(S.type==="action"){let A=(N)=>{if(!v)y({channel:I,v:V,type:"action-result",id:S.id,payload:N})},W=d;if(!W){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(S.payload)).then(()=>A({ok:!0}),(N)=>{let J=(N instanceof Error?N.message:String(N)).trim();A({ok:!1,error:(J||"Action failed.").slice(0,I_)})});return}if(S.type==="file-open"){let A=S.payload;if(G_&&_S(G_,A))return;G_=A,Q(N_,S.payload);return}if(S.type==="file-saved"){Q(W_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(J)=>{if(!v)y({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:J})},W=(J)=>A({error:(J.trim()||"Could not read the edited file.").slice(0,I_)}),N=C_;if(!N){W("This extension does not edit files.");return}Promise.resolve().then(()=>N(S.payload.purpose)).then((J)=>{if(s_(J)>Z_){W(`The file is over ${Z_} ${"bytes"in J?"bytes":"characters"}.`);return}if(J.version.length>z_){W(`The snapshot version is over ${z_} characters.`);return}A({snapshot:"bytes"in J?{bytes:J.bytes,version:J.version}:{content:J.content,version:J.version}})},(J)=>W(J instanceof Error?J.message:String(J)));return}if(S.type==="resolve"){let A=(N)=>{y({channel:I,v:V,type:"resolve-result",id:S.id,payload:N})},W=c;if(!W){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(S.payload)).then((N)=>A({item:N?E_(N):null}),(N)=>{let J=(N instanceof Error?N.message:String(N)).trim();A({error:(J||"Command failed.").slice(0,I_)})});return}let U=e.get(S.id);if(!U)return;if(clearTimeout(U.timer),e.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",gT),y({channel:I,v:V,type:"hello"});let K=(T,S=D)=>{if(v||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let W=setTimeout(()=>{e.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);e.set(T.id,{resolve:U,reject:A,timer:W}),y(T)})},k=(T)=>K(T).then(()=>{return}),F={channel:I,v:V},u_=(T)=>{if(!v&&E.parent!==E)y(T)},hT=()=>u_({...F,type:"file-save"}),mT=(T)=>{if(!zS(T)||!eS(T))return;T.preventDefault(),hT()},cT=(T)=>{if(!zS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),uT(R.popover.id,"escape").catch(()=>{return})},P_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=X_||D_;if(bT===S)return;bT=S,lT(T.id,S).catch(()=>{return})},$_=()=>{if(R?.surface!=="popover"||X_)return;X_=!0,P_()},dT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!X_)return;X_=!1,P_()},pT=()=>{if(R?.surface!=="popover"||D_)return;D_=!0,P_()},vT=()=>{if(R?.surface!=="popover"||!D_)return;D_=!1,P_()},p=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},l_=async(T)=>{if(T.kind!=="projects")p(T.projectId);let S=await K({...F,type:"workspace-read",id:X(G),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},n_=async(T,S)=>{if(T.kind!=="projects")p(T.projectId);let U=X(G);__.set(U,S);try{await k({...F,type:"workspace-subscribe",id:X(G),payload:{subscriptionId:U,query:T}})}catch(A){if(__.delete(U),!v)y({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!__.delete(U)||v)return;y({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},uS=async(T,S)=>{if(T.kind==="session")p(T.sessionId);if(T.kind==="project")p(T.projectId);let U=X(G);T_.set(U,S);try{await k({...F,type:"shells-subscribe",id:X(G),payload:{subscriptionId:U,scope:T}})}catch(A){if(T_.delete(U),!v)y({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!T_.delete(U)||v)return;y({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},Y_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>i_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!S_(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>o_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await K({...F,type:"storage",id:X(G),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},uT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...F,type:"popover-close",id:X(G),payload:S?{id:T,reason:S}:{id:T}}),lT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...F,type:"popover-anchor",id:X(G),payload:{id:T,active:S}});return E.addEventListener("keydown",cT,!0),E.addEventListener("pointerover",$_),E.addEventListener("pointermove",$_),E.addEventListener("pointerout",dT),E.addEventListener("focus",pT),E.addEventListener("blur",vT),{onAction:(T)=>{return d=T,()=>{if(d===T)d=null}},listProjects:async()=>{let T=await l_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await l_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await l_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>n_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>n_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>n_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>uS(T,S),readShellOutput:async(T,S)=>{p(T,Q_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>L_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${L_}.`);let N=await K({...F,type:"shell-output",id:X(G),payload:{shellId:T,cursor:U,tailBytes:A}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(T)=>{if(p(T,Q_),(await K({...F,type:"shell-stop",id:X(G),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{p(T),await k({...F,type:"open-session",id:X(G),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=x_(S),A={op:"get",key:T};if(U)A.scope=U;let W=await Y_(A);return W.op==="get"&&W.found?W.value:void 0},set:async(T,S,U)=>{let A=x_(U),W={op:"set",key:T,value:S};if(A)W.scope=A;await Y_(W)},delete:async(T,S)=>{let U=x_(S),A={op:"delete",key:T};if(U)A.scope=U;await Y_(A)},keys:async(T)=>{let S=x_(T),U={op:"keys"};if(S)U.scope=S;let A=await Y_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(C.add(T),R)T(R);return()=>{C.delete(T)}},onDirectory:(T)=>{if(L.add(T),R)T(R.directory);return()=>{L.delete(T)}},onSession:(T)=>{if(f.add(T),R)T(R.session);return()=>{f.delete(T)}},onSessionLifecycle:(T)=>{if(Z.add(T),u)T(u);return()=>{Z.delete(T)}},onConnection:(T)=>{if(q.add(T),R)T(R.connection);return()=>{q.delete(T)}},onSettings:(T)=>{if(h.add(T),R)T(R.settings);return()=>{h.delete(T)}},onItem:(T)=>{if(i.add(T),R)T(R.item);return()=>{i.delete(T)}},onStatusControl:(T)=>{return m.add(T),()=>{m.delete(T)}},onPopoverClosed:(T)=>{return j.add(T),()=>{j.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!sT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...F,type:"status-controls",id:X(G),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!e_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...F,type:"popover-open",id:X(G),payload:T})},closePopover:uT,setPopoverAnchorActive:lT,onResolve:(T)=>{return c=T,()=>{if(c===T)c=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>k_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${k_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>F_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${F_} characters.`));return k({channel:I,v:V,type:"toast",id:X(G),payload:{...T,message:S}})},openUrl:(T)=>k({channel:I,v:V,type:"open-url",id:X(G),payload:{url:T}}),openCommit:(T)=>ET(T)?k({channel:I,v:V,type:"open-commit",id:X(G),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>k({channel:I,v:V,type:"open-surface",id:X(G),payload:{surfaceId:T}}),writeClipboard:(T)=>k({channel:I,v:V,type:"clipboard-write",id:X(G),payload:{text:T}}),compose:(T)=>k({channel:I,v:V,type:"compose",id:X(G),payload:T}),attach:(T)=>k({channel:I,v:V,type:"attach",id:X(G),payload:E_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)p(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")p(S.directory);else{if(S.name!==void 0)p(S.name,200);if(S.baseBranch!==void 0)p(S.baseBranch,200)}let U=await K({channel:I,v:V,type:"start-session",id:X(G),payload:MT(T)},_.requestTimeoutMs??180000);if(!TT(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>K({channel:I,v:V,type:"prompt",id:X(G),payload:RT(T)}).then((S)=>{if(!ST(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>k({channel:I,v:V,type:"session-link",id:X(G),payload:E_(T)}),close:()=>k({channel:I,v:V,type:"close",id:X(G)}),oauthStart:()=>k({channel:I,v:V,type:"oauth-start",id:X(G)}),oauthDisconnect:()=>k({channel:I,v:V,type:"oauth-disconnect",id:X(G)}),request:(T)=>(j_(T.path)?K({channel:I,v:V,type:"request",id:X(G),payload:T}):kS()).then((S)=>{if(!w_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(j_(T.path)?K({channel:I,v:V,type:"service-request",id:X(G),payload:T}):kS()).then((S)=>{if(!w_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>K({channel:I,v:V,type:"service-status",id:X(G)}).then((T)=>{if(!XT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(O_(T)?K({channel:I,v:V,type:"file-read",id:X(G),payload:{path:T}}):H_()).then((S)=>{if(!DT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!O_(T))return H_();if(S.length>f_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${f_} characters.`));return K({channel:I,v:V,type:"file-write",id:X(G),payload:{path:T,content:S}}).then((U)=>{if(!IT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(O_(T)?K({channel:I,v:V,type:"file-list",id:X(G),payload:{path:T}}):H_()).then((S)=>{if(!VT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(O_(T)?K({channel:I,v:V,type:"file-stat",id:X(G),payload:{path:T}}):H_()).then((S)=>{if(!NT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>K_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${K_} characters.`));if(U!==void 0&&(U.length===0||U.length>B_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${B_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(UT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:S};if(U!==void 0)W.system=U;if(A!==void 0)W.maxOutputTokens=A;return K({channel:I,v:V,type:"generate",id:X(G),payload:W},_.requestTimeoutMs??AT).then((N)=>{if(!WT(N))throw new M("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(T)=>{z.add(T);for(let S of w.splice(0))Q([T],S);return yT(),()=>{z.delete(T)}},setBadge:(T)=>k({channel:I,v:V,type:"badge",id:X(G),payload:{count:CT(T)}}),setHeight:(T)=>k({channel:I,v:V,type:"resize",id:X(G),payload:{height:GT(T)}}),onFileOpen:(T)=>{if(N_.add(T),!v_)v_=!0,E.addEventListener("keydown",mT,!0);if(G_)T(G_);return()=>{N_.delete(T)}},onFileSnapshot:(T)=>{return C_=T,()=>{if(C_===T)C_=null}},onFileSaved:(T)=>{return W_.add(T),()=>{W_.delete(T)}},reportFileChange:(T)=>u_({...F,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:hT,reportFileUnsupported:()=>u_({...F,type:"file-unsupported"}),dispose:()=>{for(let T of __.keys())y({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:T}});__.clear();for(let T of T_.keys())y({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:T}});if(T_.clear(),v=!0,c=null,d=null,C_=null,N_.clear(),W_.clear(),v_)E.removeEventListener("keydown",mT,!0);E.removeEventListener("message",gT),E.removeEventListener("keydown",cT,!0),E.removeEventListener("pointerover",$_),E.removeEventListener("pointermove",$_),E.removeEventListener("pointerout",dT),E.removeEventListener("focus",pT),E.removeEventListener("blur",vT);for(let T of e.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));e.clear(),C.clear(),L.clear(),f.clear(),Z.clear(),q.clear(),h.clear(),i.clear(),m.clear(),j.clear(),z.clear(),w.length=0}}};var FS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var mE=new Set(FS);var JS=["none","agent","user"];var dE=new Set(JS);var _E=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],TE=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],fS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,D]of _E)E.style.setProperty(O,_.tokens[D]);for(let[O,D,C]of TE){let L=_.tokens[C]??"";E.style.setProperty(O,L),E.style.setProperty(D,L)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},YT=(_,E)=>{if(fS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var SE={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(_,E)=>`var(--${_}, var(--oc-${SE[_]}, ${E}))`,n=P("surface-background","transparent"),q_=P("surface-elevated","transparent"),U_=P("surface-elevated-foreground","inherit"),g=P("surface-foreground","inherit"),$=P("surface-muted-foreground","gray"),EE=P("surface-muted","transparent"),o=P("interactive-border","currentColor"),H=P("interactive-hover","transparent"),r=P("interactive-active","transparent"),QT=P("interactive-selection","transparent"),LT=P("interactive-selection-foreground","inherit"),l=P("primary","currentColor"),ZT=P("primary-text","inherit"),zT=P("error-text","inherit"),OE=P("font-sans","inherit"),kT=P("font-mono","monospace"),wS=P("radius","9px"),FT=`calc(${wS} - 2px)`,KS=`calc(${wS} - 4px)`,Y=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,BS=`background-image: linear-gradient(${H}, ${H});`,JT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,fT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",jS="box-shadow: var(--oc-sdk-lit);",KT=`inset 0 0.5px 0 0 ${Y(g,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,UE=`
:root {
  --oc-sdk-edge: ${Y(g,16)};
  --oc-sdk-field-bg: ${q_};
  --oc-sdk-raised-bg: ${n};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Y(g,14)};
  --oc-sdk-field-bg: ${Y(n,50,q_)};
  --oc-sdk-raised-bg: ${q_};
  --oc-sdk-field-lift: ${KT};
  --oc-sdk-raised-lift: ${KT};
  --oc-sdk-lit: ${KT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,b_=(_)=>{let E=P(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${P(`${_}-text`,"inherit")}; }`},AE=`
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
`,HS=`${UE}
.oc-sdk { color: ${g}; font-family: ${OE}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${BS} }
.oc-sdk-mono { font-family: ${kT}; }
.oc-sdk-muted { color: ${$}; }
${b_("success")}${b_("warning")}${b_("error")}${b_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${l}; --oc-sdk-tone-text: ${ZT}; }

.oc-sdk-btn { border-radius: ${FT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${KS}; }
.oc-sdk-btn[data-variant="default"] { color: ${ZT}; background: ${Y(l,10,n)}; border-color: ${Y(l,12)}; ${jS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Y(l,16,n)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Y(l,22,n)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${EE}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${U_}; ${fT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${r}, ${r}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${r}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${zT}; background: ${Y("var(--oc-sdk-tone)",7,n)}; border-color: ${Y("var(--oc-sdk-tone)",12)}; ${jS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Y("var(--oc-sdk-tone)",9,n)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Y("var(--oc-sdk-tone)",11,n)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${zT}; }
.oc-sdk-input { border-radius: ${FT}; background: var(--oc-sdk-field-bg); color: ${U_}; ${JT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${JT(Y(g,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${JT(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${kT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${l}; }
.oc-sdk-search-clear { border-radius: ${KS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${g}; }

.oc-sdk-trigger { border-radius: ${FT}; background: var(--oc-sdk-raised-bg); color: ${U_}; ${fT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${U_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${q_}; background-clip: padding-box; color: ${U_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${QT}; color: ${LT}; }
.oc-sdk-option-check { color: ${g}; }
.oc-sdk-option[data-destructive="true"] { color: ${zT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Y(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${o}; border-radius: 4px; color: ${g}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Y(g,60,o)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${o}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${n}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${l}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${BS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Y(g,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${g}; }
.oc-sdk-tab[aria-selected="true"] { color: ${LT}; background: ${QT}; border-color: ${o}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${U_}; background: var(--oc-sdk-raised-bg); ${fT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Y(g,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${QT}; color: ${LT}; }
.oc-sdk-row-lead { font-family: ${kT}; color: ${$}; }
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
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y(g,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${l}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${ZT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Y(o,60)}; }
`,B=`
${a_}
${AE}
${HS}`;var xS=["#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"],gS=(_)=>{let E=2166136261,O=new TextEncoder().encode(_);for(let D of O)E^=D,E=Math.imul(E,16777619)>>>0;return xS[E%xS.length]},c_=(_)=>[..._].sort((E,O)=>E.label.localeCompare(O.label,"zh-CN",{numeric:!0})),bS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((D)=>/^\s*description\s*:/.test(D));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},XE=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),qS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((D)=>D.kind==="file"&&D.name.endsWith(".md")).map((D)=>D.name)}catch{return[]}},yS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},hS=async(_,E)=>{let O=[],D=[],C=new Set,L=new Map,f="~/.config/opencode/snippet";for(let m of await qS(_,"~/.config/opencode/snippet")){let j=await yS(_,`~/.config/opencode/snippet/${m}`);if(j===null)continue;let z=XE(j);if(!z)continue;let w=m.replace(/\.md$/,""),c=bS(j)??w,d=`snip:${z}`;if(C.has(d))continue;C.add(d),O.push({label:c,text:z}),L.set(w,c)}let Z=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let m of Z)for(let j of await qS(_,m)){let z=await yS(_,`${m}/${j}`);if(z===null)continue;let w=j.replace(/\.md$/,""),c=bS(z)??w;L.set(w,c);let d=`cmd:/${w}`;if(C.has(d))continue;C.add(d),D.push({label:c,text:`/${w}`})}if(E)try{let{content:m}=await _.readFile(".openchamber/project.json"),j=JSON.parse(m);if(Array.isArray(j.draftStarters))for(let z of j.draftStarters.slice(0,30)){if(typeof z?.name!=="string"||!z.name)continue;let w=`cmd:/${z.name}`;if(C.has(w))continue;C.add(w),D.unshift({label:L.get(z.name)??z.name,text:`/${z.name}`})}}catch{}let q=c_(O),h=c_(D);O.length=0,O.push(...q),D.length=0,D.push(...h);let i=O.length+D.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:D,hint:i}},mS=async(_,E,O,D)=>{if(D===!1){O("先打开或新建一个会话再点");return}try{let C=await _.prompt({text:E,send:!0});if(C.sent==="sent"){O("已提交到会话");return}O(`未直接发出（${C.sent}），已填入输入框`),await _.prompt({text:E}).catch(()=>{return});return}catch(C){if(!(C instanceof M)){O(String(C));return}if(C.code==="NO_SESSION"){O("先打开或新建一个会话再点");return}if(C.code==="SESSION_BUSY"){O("会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});return}O(`${C.code}`)}};var t=$T();t.onStatusControl((_)=>{if(_.id==="refresh")vS()});var d_=document.querySelector("#root");if(!d_)throw Error("Missing #root");d_.innerHTML=`<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0)}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6}
button:disabled{opacity:.5}
button[hidden]{display:none}
.ref{padding:2px 8px;font-size:12px;font-weight:400;background:var(--oc-elevated,inherit)}
.mut{font-size:12px;opacity:.7}
.t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;opacity:.75;font-variant-numeric:tabular-nums}
.res{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;opacity:.75}
.res.bad{color:#f87171;opacity:1}
</style>
<div class="grid" id="g"></div>
<div class="grid"><button class="ref" id="b-refresh" title="重读片段与命令配置" hidden>↻ 重读配置</button></div>
<div class="t" id="t"></div>
<div class="res" id="out"></div>`;var M_=document.querySelector("#g"),wT=document.querySelector("#out"),DE=document.querySelector("#t"),s=document.querySelector("#b-refresh"),cS="",R_=null,dS=!1,HT=!1,IE=()=>new Date().toTimeString().slice(0,8),jT=(_,E=!1)=>{wT.textContent=_,wT.classList.toggle("bad",E)},xT=()=>{let _=Math.ceil(d_.getBoundingClientRect().height);t.setHeight(_).catch(()=>{return})},pS=async()=>{try{await t.setStatusControls([{kind:"button",id:"refresh",label:"↻"}]),HT=!0,s.hidden=!0}catch{HT=!1,s.hidden=!1}},p_=async(_,E=!1)=>{let O=await hS(t,_),D=JSON.stringify([O.snippets,O.commands]);if(!E&&D===cS)return;cS=D;let{snippets:C,commands:L}=O;M_.innerHTML="";for(let f of c_([...L,...C])){let Z=document.createElement("button"),q=gS(f.label);Z.style.borderColor=q,Z.style.background=`color-mix(in srgb, ${q} 16%, transparent)`,Z.textContent=f.label,Z.title=f.text.length>200?f.text.slice(0,200):f.text,Z.onclick=()=>void mS(t,f.text,(h)=>{wT.textContent=h},dS),M_.appendChild(Z)}if(M_.children.length===0)M_.innerHTML='<span class="mut">暂无快捷</span>';DE.textContent=`上次刷新 ${IE()}`,xT()};async function vS(){if(s.disabled)return;s.disabled=!0,jT("重读配置…");try{await p_(R_,!0);let _=M_.children.length;jT(`已重读：${_===1&&M_.querySelector(".mut")?0:_} 个快捷`)}catch(_){jT(`重读失败：${_.message?.slice(0,40)??"未知错误"}`,!0)}finally{s.disabled=!1,xT()}}s.onclick=()=>void vS();new ResizeObserver(()=>xT()).observe(d_);setInterval(()=>{if(!document.hidden)p_(R_)},30000);t.onReady((_)=>{if(YT(_,document.documentElement),R_=_.directory??null,dS=!!_.session,_.features?.statusControls===!0)pS();else s.hidden=!1;p_(R_)});t.onDirectory((_)=>{if(R_=_,HT)pS();p_(R_)});})();
