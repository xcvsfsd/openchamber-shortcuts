(()=>{var I="openchamber.sdk",V=1;var o_=`
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
`;function iT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(X)=>{let D=X.target===_?E:X.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let N=O.get(D);if(N!==void 0)clearTimeout(N);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var rS=`(${iT.toString()})(document);`;var r_=128,s_=65536;var Z_=128;var z_=65536;var tT=/^[a-z][a-z0-9-]{0,39}$/;var oT=(_)=>Object(_)===_&&!Array.isArray(_),t_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),rT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,sT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,eT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!oT(O)||!tT.test(O.id)||!rT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!t_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!t_(O,["kind","id","label","value","options","disabled"]))return!1;if(!sT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let X=new Set;for(let D of O.options){if(!oT(D)||!t_(D,["value","label"])||!sT(D.value)||!rT(D.label)||X.has(D.value))return!1;X.add(D.value)}if(!X.has(O.value))return!1}return!0};var _S=["{id}","{segment}","{segments+}"];var wE=new Set(_S);var TS=["turn-finished","turn-failed","permission-asked","question-asked"];var xE=new Set(TS);var k_=20000000,F_=256;var e_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,SS=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var ES=/^[A-Za-z0-9_-]{1,80}$/;var OS=["left","right","top","bottom"];var US=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let X=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of X)if(!US(D,E+1,O))return!1;return!0},_T=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(_T);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(_T)}return String(_)===_||Number.isFinite(_)},TT=(_)=>{try{if(String(_.id)!==_.id||!ES.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!OS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!US(_.data)||!_T(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var MS=["file","directory","other","missing"],ET=(_)=>Boolean(_&&"sessionId"in _),OT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var RS=/^[0-9a-f]{7,64}$/i,UT=(_)=>RS.test(_),J_=500,K_=32000,CS=16000,GS=128,XS=200,DS=2000,IS=16000,VS=80,NS=200,WS=16000;var PS=2000;var AT=20000,f_=1024,B_=2000000;var j_=64000,w_=8000,MT=4000;var RT=960000;var $S=999,YS=1e4,N_=500,QS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],LS=["stopped","starting","ready","failed"],tS=new Set(QS),ZS=(_)=>tS.has(_),zS=(_)=>_&&ZS(_)?_:"HOST_REJECTED",E_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(E_);if(Object(_)===_)return Object.values(_).every(E_);return!1},kS=(_)=>E_(_)&&JSON.stringify(_).length<=WS,AS=(_)=>_?.trim().slice(0,NS)??"",O_=(_)=>{let E=_.id.trim().slice(0,GS),O=_.title.trim().slice(0,XS),X=_.url.trim().slice(0,DS),D=_.text?.trim().slice(0,IS),N=_.author?.trim().slice(0,VS),K=_.kind==="pull"?"pull":"issue",Z={providerId:_.providerId.trim(),id:E,title:O||E,url:X,kind:K};if(D)Z.text=D;if(N)Z.author=N;if(K==="pull"){let q=AS(_.branches?.head),h=AS(_.branches?.base);if(q&&h)Z.branches={head:q,base:h}}if(kS(_.data))Z.data=_.data;return Z},CT=(_)=>{let E=O_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},GT=(_)=>{let E={text:_.text.trim().slice(0,CS)};if(_.send)E.send=!0;return E},XT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min($S,Math.max(0,Math.round(_)))},DT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(YS,Math.max(0,Math.ceil(_)))};var U_=(_)=>_.length>0&&_.length<=f_&&!_.includes("\x00")&&!_.includes("\\");var H_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>PS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},eS=new Set(LS),IT=(_)=>Boolean(_&&"status"in _&&eS.has(String(_.status))&&!("body"in _)),x_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),VT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),NT=(_)=>Boolean(_&&"written"in _&&_.written===!0),WT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),_E=new Set(MS),PT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&_E.has(String(_.kind))&&Number.isFinite(_.size)),$T=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),TE=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),SE=(_)=>Object(_)===_?_:null,ST=(_)=>String(_)===_&&_.length>0,EE=(_)=>{if(!ST(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&ST(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:zS(ST(_.code)?_.code:void 0)};return null},YT=(_)=>{let E=SE(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return EE(E);if(!TE.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var FS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),OE=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var JS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),b_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${f_} characters without NUL or backslash.`)),q_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},QT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),X=_.requestTimeoutMs??AT,D=new Set,N=new Set,K=new Set,Z=new Set,q=new Set,h=new Set,o=new Set,m=new Set,j=new Set,z=new Set,w=[],c=null,d=null,P_=new Set,$_=new Set,X_=null,D_=null,l_=!1,__=new Map,T_=new Map,S_=new Map,v=!1,C={value:0},R=null,u=null,I_=!1,V_=!1,yT=null,gT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},y=(T)=>{E.parent.postMessage(T,"*")},hT=()=>{if(v||E.parent===E||z.size===0||R?.features?.lateGenerateResults!==!0)return;y({channel:I,v:V,type:"generate-late-listen"})},L=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},mT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=YT(T.data);if(!S)return;if(S.type==="workspace"){let A=T_.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="shells"){let A=S_.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,u=gT(S.payload.session),L(D,S.payload),L(N,S.payload.directory),L(K,S.payload.session),u)L(Z,u);L(q,S.payload.connection),L(h,S.payload.settings),L(o,S.payload.item),hT();return}if(S.type==="generate-late"){if(z.size===0)w.push(S.payload);else L(z,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};L(N,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)u=null;else if(u?.sessionId!==S.payload.session.id)u=gT(S.payload.session);L(K,S.payload.session);return}if(S.type==="session-lifecycle"){u=S.payload,L(Z,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};L(q,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};L(h,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};L(o,S.payload.item);return}if(S.type==="status-control-event"){L(m,S.payload);return}if(S.type==="popover-closed"){L(j,S.payload);return}if(S.type==="action"){let A=(W)=>{if(!v)y({channel:I,v:V,type:"action-result",id:S.id,payload:W})},P=d;if(!P){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>P(S.payload)).then(()=>A({ok:!0}),(W)=>{let J=(W instanceof Error?W.message:String(W)).trim();A({ok:!1,error:(J||"Action failed.").slice(0,N_)})});return}if(S.type==="file-open"){let A=S.payload;if(D_&&SS(D_,A))return;D_=A,L(P_,S.payload);return}if(S.type==="file-saved"){L($_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(J)=>{if(!v)y({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:J})},P=(J)=>A({error:(J.trim()||"Could not read the edited file.").slice(0,N_)}),W=X_;if(!W){P("This extension does not edit files.");return}Promise.resolve().then(()=>W(S.payload.purpose)).then((J)=>{if(e_(J)>k_){P(`The file is over ${k_} ${"bytes"in J?"bytes":"characters"}.`);return}if(J.version.length>F_){P(`The snapshot version is over ${F_} characters.`);return}A({snapshot:"bytes"in J?{bytes:J.bytes,version:J.version}:{content:J.content,version:J.version}})},(J)=>P(J instanceof Error?J.message:String(J)));return}if(S.type==="resolve"){let A=(W)=>{y({channel:I,v:V,type:"resolve-result",id:S.id,payload:W})},P=c;if(!P){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>P(S.payload)).then((W)=>A({item:W?O_(W):null}),(W)=>{let J=(W instanceof Error?W.message:String(W)).trim();A({error:(J||"Command failed.").slice(0,N_)})});return}let U=__.get(S.id);if(!U)return;if(clearTimeout(U.timer),__.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",mT),y({channel:I,v:V,type:"hello"});let f=(T,S=X)=>{if(v||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let P=setTimeout(()=>{__.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);__.set(T.id,{resolve:U,reject:A,timer:P}),y(T)})},k=(T)=>f(T).then(()=>{return}),F={channel:I,v:V},n_=(T)=>{if(!v&&E.parent!==E)y(T)},cT=()=>n_({...F,type:"file-save"}),dT=(T)=>{if(!FS(T)||!OE(T))return;T.preventDefault(),cT()},pT=(T)=>{if(!FS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),nT(R.popover.id,"escape").catch(()=>{return})},Y_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=I_||V_;if(yT===S)return;yT=S,aT(T.id,S).catch(()=>{return})},Q_=()=>{if(R?.surface!=="popover"||I_)return;I_=!0,Y_()},vT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!I_)return;I_=!1,Y_()},uT=()=>{if(R?.surface!=="popover"||V_)return;V_=!0,Y_()},lT=()=>{if(R?.surface!=="popover"||!V_)return;V_=!1,Y_()},p=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},a_=async(T)=>{if(T.kind!=="projects")p(T.projectId);let S=await f({...F,type:"workspace-read",id:G(C),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},i_=async(T,S)=>{if(T.kind!=="projects")p(T.projectId);let U=G(C);T_.set(U,S);try{await k({...F,type:"workspace-subscribe",id:G(C),payload:{subscriptionId:U,query:T}})}catch(A){if(T_.delete(U),!v)y({...F,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!T_.delete(U)||v)return;y({...F,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},oS=async(T,S)=>{if(T.kind==="session")p(T.sessionId);if(T.kind==="project")p(T.projectId);let U=G(C);S_.set(U,S);try{await k({...F,type:"shells-subscribe",id:G(C),payload:{subscriptionId:U,scope:T}})}catch(A){if(S_.delete(U),!v)y({...F,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!S_.delete(U)||v)return;y({...F,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},L_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>r_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!E_(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>s_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await f({...F,type:"storage",id:G(C),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},nT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...F,type:"popover-close",id:G(C),payload:S?{id:T,reason:S}:{id:T}}),aT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...F,type:"popover-anchor",id:G(C),payload:{id:T,active:S}});return E.addEventListener("keydown",pT,!0),E.addEventListener("pointerover",Q_),E.addEventListener("pointermove",Q_),E.addEventListener("pointerout",vT),E.addEventListener("focus",uT),E.addEventListener("blur",lT),{onAction:(T)=>{return d=T,()=>{if(d===T)d=null}},listProjects:async()=>{let T=await a_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await a_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await a_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>i_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>i_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>i_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>oS(T,S),readShellOutput:async(T,S)=>{p(T,Z_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>z_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${z_}.`);let W=await f({...F,type:"shell-output",id:G(C),payload:{shellId:T,cursor:U,tailBytes:A}});if(!W||typeof W.output!=="string"||!Number.isFinite(W.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return W},stopShell:async(T)=>{if(p(T,Z_),(await f({...F,type:"shell-stop",id:G(C),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{p(T),await k({...F,type:"open-session",id:G(C),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=q_(S),A={op:"get",key:T};if(U)A.scope=U;let P=await L_(A);return P.op==="get"&&P.found?P.value:void 0},set:async(T,S,U)=>{let A=q_(U),P={op:"set",key:T,value:S};if(A)P.scope=A;await L_(P)},delete:async(T,S)=>{let U=q_(S),A={op:"delete",key:T};if(U)A.scope=U;await L_(A)},keys:async(T)=>{let S=q_(T),U={op:"keys"};if(S)U.scope=S;let A=await L_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(D.add(T),R)T(R);return()=>{D.delete(T)}},onDirectory:(T)=>{if(N.add(T),R)T(R.directory);return()=>{N.delete(T)}},onSession:(T)=>{if(K.add(T),R)T(R.session);return()=>{K.delete(T)}},onSessionLifecycle:(T)=>{if(Z.add(T),u)T(u);return()=>{Z.delete(T)}},onConnection:(T)=>{if(q.add(T),R)T(R.connection);return()=>{q.delete(T)}},onSettings:(T)=>{if(h.add(T),R)T(R.settings);return()=>{h.delete(T)}},onItem:(T)=>{if(o.add(T),R)T(R.item);return()=>{o.delete(T)}},onStatusControl:(T)=>{return m.add(T),()=>{m.delete(T)}},onPopoverClosed:(T)=>{return j.add(T),()=>{j.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!eT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...F,type:"status-controls",id:G(C),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!TT(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...F,type:"popover-open",id:G(C),payload:T})},closePopover:nT,setPopoverAnchorActive:aT,onResolve:(T)=>{return c=T,()=>{if(c===T)c=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>J_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${J_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>K_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${K_} characters.`));return k({channel:I,v:V,type:"toast",id:G(C),payload:{...T,message:S}})},openUrl:(T)=>k({channel:I,v:V,type:"open-url",id:G(C),payload:{url:T}}),openCommit:(T)=>UT(T)?k({channel:I,v:V,type:"open-commit",id:G(C),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>k({channel:I,v:V,type:"open-surface",id:G(C),payload:{surfaceId:T}}),writeClipboard:(T)=>k({channel:I,v:V,type:"clipboard-write",id:G(C),payload:{text:T}}),compose:(T)=>k({channel:I,v:V,type:"compose",id:G(C),payload:T}),attach:(T)=>k({channel:I,v:V,type:"attach",id:G(C),payload:O_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)p(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")p(S.directory);else{if(S.name!==void 0)p(S.name,200);if(S.baseBranch!==void 0)p(S.baseBranch,200)}let U=await f({channel:I,v:V,type:"start-session",id:G(C),payload:CT(T)},_.requestTimeoutMs??180000);if(!ET(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>f({channel:I,v:V,type:"prompt",id:G(C),payload:GT(T)}).then((S)=>{if(!OT(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>k({channel:I,v:V,type:"session-link",id:G(C),payload:O_(T)}),close:()=>k({channel:I,v:V,type:"close",id:G(C)}),oauthStart:()=>k({channel:I,v:V,type:"oauth-start",id:G(C)}),oauthDisconnect:()=>k({channel:I,v:V,type:"oauth-disconnect",id:G(C)}),request:(T)=>(H_(T.path)?f({channel:I,v:V,type:"request",id:G(C),payload:T}):JS()).then((S)=>{if(!x_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(H_(T.path)?f({channel:I,v:V,type:"service-request",id:G(C),payload:T}):JS()).then((S)=>{if(!x_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>f({channel:I,v:V,type:"service-status",id:G(C)}).then((T)=>{if(!IT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(U_(T)?f({channel:I,v:V,type:"file-read",id:G(C),payload:{path:T}}):b_()).then((S)=>{if(!VT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!U_(T))return b_();if(S.length>B_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${B_} characters.`));return f({channel:I,v:V,type:"file-write",id:G(C),payload:{path:T,content:S}}).then((U)=>{if(!NT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(U_(T)?f({channel:I,v:V,type:"file-list",id:G(C),payload:{path:T}}):b_()).then((S)=>{if(!WT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(U_(T)?f({channel:I,v:V,type:"file-stat",id:G(C),payload:{path:T}}):b_()).then((S)=>{if(!PT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>j_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${j_} characters.`));if(U!==void 0&&(U.length===0||U.length>w_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${w_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(MT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let P={prompt:S};if(U!==void 0)P.system=U;if(A!==void 0)P.maxOutputTokens=A;return f({channel:I,v:V,type:"generate",id:G(C),payload:P},_.requestTimeoutMs??RT).then((W)=>{if(!$T(W))throw new M("HOST_REJECTED","Host did not return generated text.");return W})},onLateGenerateResult:(T)=>{z.add(T);for(let S of w.splice(0))L([T],S);return hT(),()=>{z.delete(T)}},setBadge:(T)=>k({channel:I,v:V,type:"badge",id:G(C),payload:{count:XT(T)}}),setHeight:(T)=>k({channel:I,v:V,type:"resize",id:G(C),payload:{height:DT(T)}}),onFileOpen:(T)=>{if(P_.add(T),!l_)l_=!0,E.addEventListener("keydown",dT,!0);if(D_)T(D_);return()=>{P_.delete(T)}},onFileSnapshot:(T)=>{return X_=T,()=>{if(X_===T)X_=null}},onFileSaved:(T)=>{return $_.add(T),()=>{$_.delete(T)}},reportFileChange:(T)=>n_({...F,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:cT,reportFileUnsupported:()=>n_({...F,type:"file-unsupported"}),dispose:()=>{for(let T of T_.keys())y({...F,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:T}});T_.clear();for(let T of S_.keys())y({...F,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:T}});if(S_.clear(),v=!0,c=null,d=null,X_=null,P_.clear(),$_.clear(),l_)E.removeEventListener("keydown",dT,!0);E.removeEventListener("message",mT),E.removeEventListener("keydown",pT,!0),E.removeEventListener("pointerover",Q_),E.removeEventListener("pointermove",Q_),E.removeEventListener("pointerout",vT),E.removeEventListener("focus",uT),E.removeEventListener("blur",lT);for(let T of __.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));__.clear(),D.clear(),N.clear(),K.clear(),Z.clear(),q.clear(),h.clear(),o.clear(),m.clear(),j.clear(),z.clear(),w.length=0}}};var KS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var aE=new Set(KS);var fS=["none","agent","user"];var oE=new Set(fS);var UE=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],AE=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],BS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,X]of UE)E.style.setProperty(O,_.tokens[X]);for(let[O,X,D]of AE){let N=_.tokens[D]??"";E.style.setProperty(O,N),E.style.setProperty(X,N)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},LT=(_,E)=>{if(BS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var ME={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},$=(_,E)=>`var(--${_}, var(--oc-${ME[_]}, ${E}))`,n=$("surface-background","transparent"),g_=$("surface-elevated","transparent"),A_=$("surface-elevated-foreground","inherit"),g=$("surface-foreground","inherit"),Y=$("surface-muted-foreground","gray"),RE=$("surface-muted","transparent"),r=$("interactive-border","currentColor"),H=$("interactive-hover","transparent"),s=$("interactive-active","transparent"),ZT=$("interactive-selection","transparent"),zT=$("interactive-selection-foreground","inherit"),l=$("primary","currentColor"),kT=$("primary-text","inherit"),FT=$("error-text","inherit"),CE=$("font-sans","inherit"),JT=$("font-mono","monospace"),xS=$("radius","9px"),KT=`calc(${xS} - 2px)`,jS=`calc(${xS} - 4px)`,Q=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,wS=`background-image: linear-gradient(${H}, ${H});`,fT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,BT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",HS="box-shadow: var(--oc-sdk-lit);",jT=`inset 0 0.5px 0 0 ${Q(g,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,GE=`
:root {
  --oc-sdk-edge: ${Q(g,16)};
  --oc-sdk-field-bg: ${g_};
  --oc-sdk-raised-bg: ${n};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Q(g,14)};
  --oc-sdk-field-bg: ${Q(n,50,g_)};
  --oc-sdk-raised-bg: ${g_};
  --oc-sdk-field-lift: ${jT};
  --oc-sdk-raised-lift: ${jT};
  --oc-sdk-lit: ${jT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,y_=(_)=>{let E=$(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${$(`${_}-text`,"inherit")}; }`},XE=`
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
`,bS=`${GE}
.oc-sdk { color: ${g}; font-family: ${CE}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${wS} }
.oc-sdk-mono { font-family: ${JT}; }
.oc-sdk-muted { color: ${Y}; }
${y_("success")}${y_("warning")}${y_("error")}${y_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${l}; --oc-sdk-tone-text: ${kT}; }

.oc-sdk-btn { border-radius: ${KT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${jS}; }
.oc-sdk-btn[data-variant="default"] { color: ${kT}; background: ${Q(l,10,n)}; border-color: ${Q(l,12)}; ${HS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Q(l,16,n)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Q(l,22,n)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${RE}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${s}, ${s}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${A_}; ${BT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${s}, ${s}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${s}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${$("status-error","red")}; color: ${FT}; background: ${Q("var(--oc-sdk-tone)",7,n)}; border-color: ${Q("var(--oc-sdk-tone)",12)}; ${HS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Q("var(--oc-sdk-tone)",9,n)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Q("var(--oc-sdk-tone)",11,n)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Y}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${FT}; }
.oc-sdk-input { border-radius: ${KT}; background: var(--oc-sdk-field-bg); color: ${A_}; ${fT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Y}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${fT(Q(g,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${fT($("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${JT}; }

.oc-sdk-search-icon { color: ${Y}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${l}; }
.oc-sdk-search-clear { border-radius: ${jS}; color: ${Y}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${g}; }

.oc-sdk-trigger { border-radius: ${KT}; background: var(--oc-sdk-raised-bg); color: ${A_}; ${BT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${s}, ${s}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Y}; }
.oc-sdk-trigger-chevron { color: ${Y}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${A_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${g_}; background-clip: padding-box; color: ${A_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ZT}; color: ${zT}; }
.oc-sdk-option-check { color: ${g}; }
.oc-sdk-option[data-destructive="true"] { color: ${FT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Q($("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Y}; }
.oc-sdk-popup-empty { color: ${Y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${r}; border-radius: 4px; color: ${g}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Q(g,60,r)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${r}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${n}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${l}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${wS} }
.oc-sdk-check-desc { color: ${Y}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Q(g,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Y}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${g}; }
.oc-sdk-tab[aria-selected="true"] { color: ${zT}; background: ${ZT}; border-color: ${r}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${A_}; background: var(--oc-sdk-raised-bg); ${BT} }
.oc-sdk-tab-count { color: ${Y}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Q(g,6)}; color: ${Y}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Q("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${ZT}; color: ${zT}; }
.oc-sdk-row-lead { font-family: ${JT}; color: ${Y}; }
.oc-sdk-row-sub { color: ${Y}; }
.oc-sdk-row-meta { color: ${Y}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Y}; }

.oc-sdk-empty-body { color: ${Y}; }

.oc-sdk-spinner { color: ${Y}; }
.oc-sdk-spinner-ring { border-color: ${r}; border-top-color: ${l}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Q("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Y}; }

.oc-sdk-separator { color: ${Y}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Q(r,40)}; }

.oc-sdk-progress-label { color: ${Y}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Q(g,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${l}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${$("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${$("success-text","inherit")}; }

.oc-sdk-text a { color: ${kT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Q(r,60)}; }
`,B=`
${o_}
${XE}
${bS}`;var qS=["#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"],mS=(_)=>{let E=2166136261,O=new TextEncoder().encode(_);for(let X of O)E^=X,E=Math.imul(E,16777619)>>>0;return qS[E%qS.length]},p_=(_)=>[..._].sort((E,O)=>E.label.localeCompare(O.label,"zh-CN",{numeric:!0})),yS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((X)=>/^\s*description\s*:/.test(X));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},WE=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),gS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((X)=>X.kind==="file"&&X.name.endsWith(".md")).map((X)=>X.name)}catch{return[]}},hS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},cS=async(_,E)=>{let O=[],X=[],D=new Set,N=new Map,K="~/.config/opencode/snippet";for(let m of await gS(_,"~/.config/opencode/snippet")){let j=await hS(_,`~/.config/opencode/snippet/${m}`);if(j===null)continue;let z=WE(j);if(!z)continue;let w=m.replace(/\.md$/,""),c=yS(j)??w,d=`snip:${z}`;if(D.has(d))continue;D.add(d),O.push({label:c,text:z}),N.set(w,c)}let Z=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let m of Z)for(let j of await gS(_,m)){let z=await hS(_,`${m}/${j}`);if(z===null)continue;let w=j.replace(/\.md$/,""),c=yS(z)??w;N.set(w,c);let d=`cmd:/${w}`;if(D.has(d))continue;D.add(d),X.push({label:c,text:`/${w}`})}if(E)try{let{content:m}=await _.readFile(".openchamber/project.json"),j=JSON.parse(m);if(Array.isArray(j.draftStarters))for(let z of j.draftStarters.slice(0,30)){if(typeof z?.name!=="string"||!z.name)continue;let w=`cmd:/${z.name}`;if(D.has(w))continue;D.add(w),X.unshift({label:N.get(z.name)??z.name,text:`/${z.name}`})}}catch{}let q=p_(O),h=p_(X);O.length=0,O.push(...q),X.length=0,X.push(...h);let o=O.length+X.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:X,hint:o}},dS=async(_,E,O,X,D=!0)=>{if(X===!1){O("先打开或新建一个会话再点");return}if(!D)try{await _.prompt({text:E}),O("已填入输入框，未自动发送");return}catch(N){if(N instanceof M&&N.code==="NO_SESSION"){O("先打开或新建一个会话再点");return}O(`请求失败：${N.code??N}`);return}try{let N=await _.prompt({text:E,send:!0});if(N.sent==="sent"){O("已提交到会话");return}O(`未直接发出（${N.sent}），已填入输入框`),await _.prompt({text:E}).catch(()=>{return});return}catch(N){if(!(N instanceof M)){O(String(N));return}if(N.code==="NO_SESSION"){O("先打开或新建一个会话再点");return}if(N.code==="SESSION_BUSY"){O("会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});return}O(`${N.code}`)}};var e=QT();e.onStatusControl((_)=>{if(_.id==="refresh")nS()});var v_=document.querySelector("#root");if(!v_)throw Error("Missing #root");v_.innerHTML=`<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0)}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6}
button:disabled{opacity:.5}
button[hidden]{display:none}
.bar{display:flex;align-items:center;gap:8px}
.cap{display:inline-flex;align-items:center;gap:8px;font-size:12px;opacity:.9;user-select:none}
.pill{position:relative;width:38px;height:20px;padding:0;border-radius:999px;border:1px solid var(--oc-border,#8888);background:color-mix(in srgb,currentColor 12%,transparent);cursor:pointer}
.pill .knob{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:currentColor;opacity:.55;transition:left .15s,opacity .15s}
.pill.on{border-color:var(--primary,#3574f0)}
.pill.on .knob{left:20px;background:var(--primary,#3574f0);opacity:1}
.ref{padding:2px 8px;font-size:12px;font-weight:400;background:var(--oc-elevated,inherit)}
.mut{font-size:12px;opacity:.7}
.t{white-space:normal;word-break:break-all;font-size:11px;opacity:.75;font-variant-numeric:tabular-nums}
.res{white-space:normal;word-break:break-all;font-size:11px;opacity:.75}
.res.bad{color:#f87171;opacity:1}
</style>
<div class="grid" id="g"></div>
<div class="bar"><span class="cap" title="开：点按钮自动发送到会话；关：只填入输入框不发送">自动发送<button class="pill on" id="autosend" role="switch" aria-checked="true" aria-label="自动发送"><span class="knob"></span></button></span><span class="mut" id="modehint"></span></div>
<div class="grid"><button class="ref" id="b-refresh" title="重读片段与命令配置" hidden>↻ 重读配置</button></div>
<div class="t" id="t"></div>
<div class="res" id="out"></div>`;var R_=document.querySelector("#g"),HT=document.querySelector("#out"),PE=document.querySelector("#t"),t=document.querySelector("#b-refresh"),vS="oc-shortcuts-autosend",$E=()=>{try{return localStorage.getItem(vS)!=="0"}catch{return!0}},YE=(_)=>{try{localStorage.setItem(vS,_?"1":"0")}catch{}},i=$E(),xT=document.querySelector("#autosend"),QE=document.querySelector("#modehint"),pS="",G_=null,uS=!1,bT=!1,LE=()=>new Date().toTimeString().slice(0,8),C_=(_,E=!1)=>{HT.textContent=_,HT.title=_,HT.classList.toggle("bad",E),u_()},u_=()=>{let _=Math.ceil(v_.getBoundingClientRect().height);e.setHeight(_).catch(()=>{return})},lS=async()=>{try{await e.setStatusControls([{kind:"button",id:"refresh",label:"↻"}]),bT=!0,t.hidden=!0}catch{bT=!1,t.hidden=!1}},qT=async(_,E=!1)=>{let O=await cS(e,_),X=JSON.stringify([O.snippets,O.commands]);if(!E&&X===pS)return;pS=X;let{snippets:D,commands:N}=O;R_.innerHTML="";for(let K of p_([...N,...D])){let Z=document.createElement("button"),q=mS(K.label);Z.style.borderColor=q,Z.style.background=`color-mix(in srgb, ${q} 16%, transparent)`,Z.textContent=K.label,Z.title=K.text.length>200?K.text.slice(0,200):K.text,Z.onclick=()=>void dS(e,K.text,(h)=>C_(h),uS,i),R_.appendChild(Z)}if(R_.children.length===0)R_.innerHTML='<span class="mut">暂无快捷</span>';PE.textContent=`上次刷新 ${LE()}`,u_()};async function nS(){if(t.disabled)return;t.disabled=!0,C_("重读配置…");try{await qT(G_,!0);let _=R_.children.length;C_(`已重读：${_===1&&R_.querySelector(".mut")?0:_} 个快捷`)}catch(_){C_(`重读失败：${_.message?.slice(0,40)??"未知错误"}`,!0)}finally{t.disabled=!1,u_()}}t.onclick=()=>void nS();var aS=()=>{xT.classList.toggle("on",i),xT.setAttribute("aria-checked",String(i)),QE.textContent=i?"开：点即发送":"关：只填入不发送"};xT.onclick=()=>{i=!i,YE(i),aS(),C_(i?"已开自动发送":"已关自动发送，只填入")};aS();new ResizeObserver(()=>u_()).observe(v_);var iS=(_,E=!1)=>{qT(_,E).catch((O)=>C_(`加载失败：${O.message?.slice(0,60)??O}`,!0))};setInterval(()=>{if(!document.hidden)qT(G_)},30000);e.onReady((_)=>{if(LT(_,document.documentElement),G_=_.directory??null,uS=!!_.session,_.features?.statusControls===!0)lS();else t.hidden=!1;iS(G_)});e.onDirectory((_)=>{if(G_=_,bT)lS();iS(G_)});})();
