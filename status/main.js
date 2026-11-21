(()=>{var D="openchamber.sdk",I=1;var o_=`
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
`;function iT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(V)=>{let X=V.target===_?E:V.target;if(!(X instanceof Element))return;if(!X.hasAttribute("data-oc-scrolling"))X.setAttribute("data-oc-scrolling","");let W=O.get(X);if(W!==void 0)clearTimeout(W);O.set(X,setTimeout(()=>{O.delete(X),X.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var eS=`(${iT.toString()})(document);`;var r_=128,s_=65536;var z_=128;var k_=65536;var tT=/^[a-z][a-z0-9-]{0,39}$/;var oT=(_)=>Object(_)===_&&!Array.isArray(_),t_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),rT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,sT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,eT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!oT(O)||!tT.test(O.id)||!rT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!t_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!t_(O,["kind","id","label","value","options","disabled"]))return!1;if(!sT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let V=new Set;for(let X of O.options){if(!oT(X)||!t_(X,["value","label"])||!sT(X.value)||!rT(X.label)||V.has(X.value))return!1;V.add(X.value)}if(!V.has(O.value))return!1}return!0};var _S=["{id}","{segment}","{segments+}"];var cE=new Set(_S);var TS=["turn-finished","turn-failed","permission-asked","question-asked"];var pE=new Set(TS);var L_=20000000,F_=256;var e_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,SS=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var ES=/^[A-Za-z0-9_-]{1,80}$/;var OS=["left","right","top","bottom"];var US=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let V=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let X of V)if(!US(X,E+1,O))return!1;return!0},_T=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(_T);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(_T)}return String(_)===_||Number.isFinite(_)},TT=(_)=>{try{if(String(_.id)!==_.id||!ES.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!OS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!US(_.data)||!_T(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var MS=["file","directory","other","missing"],ET=(_)=>Boolean(_&&"sessionId"in _),OT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var RS=/^[0-9a-f]{7,64}$/i,UT=(_)=>RS.test(_),J_=500,K_=32000,CS=16000,GS=128,XS=200,DS=2000,IS=16000,VS=80,WS=200,NS=16000;var $S=2000;var AT=20000,f_=1024,B_=2000000;var j_=64000,w_=8000,MT=4000;var RT=960000;var PS=999,YS=1e4,W_=500,QS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],ZS=["stopped","starting","ready","failed"],TE=new Set(QS),zS=(_)=>TE.has(_),kS=(_)=>_&&zS(_)?_:"HOST_REJECTED",S_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(S_);if(Object(_)===_)return Object.values(_).every(S_);return!1},LS=(_)=>S_(_)&&JSON.stringify(_).length<=NS,AS=(_)=>_?.trim().slice(0,WS)??"",E_=(_)=>{let E=_.id.trim().slice(0,GS),O=_.title.trim().slice(0,XS),V=_.url.trim().slice(0,DS),X=_.text?.trim().slice(0,IS),W=_.author?.trim().slice(0,VS),K=_.kind==="pull"?"pull":"issue",Y={providerId:_.providerId.trim(),id:E,title:O||E,url:V,kind:K};if(X)Y.text=X;if(W)Y.author=W;if(K==="pull"){let m=AS(_.branches?.head),h=AS(_.branches?.base);if(m&&h)Y.branches={head:m,base:h}}if(LS(_.data))Y.data=_.data;return Y},CT=(_)=>{let E=E_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},GT=(_)=>{let E={text:_.text.trim().slice(0,CS)};if(_.send)E.send=!0;return E},XT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(PS,Math.max(0,Math.round(_)))},DT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(YS,Math.max(0,Math.ceil(_)))};var O_=(_)=>_.length>0&&_.length<=f_&&!_.includes("\x00")&&!_.includes("\\");var H_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>$S)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},SE=new Set(ZS),IT=(_)=>Boolean(_&&"status"in _&&SE.has(String(_.status))&&!("body"in _)),x_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),VT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),WT=(_)=>Boolean(_&&"written"in _&&_.written===!0),NT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),EE=new Set(MS),$T=(_)=>Boolean(_&&"kind"in _&&"size"in _&&EE.has(String(_.kind))&&Number.isFinite(_.size)),PT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),OE=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),UE=(_)=>Object(_)===_?_:null,ST=(_)=>String(_)===_&&_.length>0,AE=(_)=>{if(!ST(_.id))return null;if(_.ok===!0){let E={channel:D,v:I,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&ST(_.error))return{channel:D,v:I,type:"result",id:_.id,ok:!1,error:_.error,code:kS(ST(_.code)?_.code:void 0)};return null},YT=(_)=>{let E=UE(_);if(!E||E.channel!==D||E.v!==I)return null;if(E.type==="result")return AE(E);if(!OE.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var FS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),ME=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var JS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),b_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${f_} characters without NUL or backslash.`)),q_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},QT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),V=_.requestTimeoutMs??AT,X=new Set,W=new Set,K=new Set,Y=new Set,m=new Set,h=new Set,q=new Set,w=new Set,J=new Set,f=new Set,v=[],c=null,G_=null,$_=new Set,P_=new Set,X_=null,D_=null,l_=!1,e=new Map,__=new Map,T_=new Map,p=!1,C={value:0},R=null,u=null,I_=!1,V_=!1,yT=null,gT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},y=(T)=>{E.parent.postMessage(T,"*")},mT=()=>{if(p||E.parent===E||f.size===0||R?.features?.lateGenerateResults!==!0)return;y({channel:D,v:I,type:"generate-late-listen"})},z=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},hT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=YT(T.data);if(!S)return;if(S.type==="workspace"){let A=__.get(S.payload.subscriptionId);if(A)z([A],S.payload.snapshot);return}if(S.type==="shells"){let A=T_.get(S.payload.subscriptionId);if(A)z([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,u=gT(S.payload.session),z(X,S.payload),z(W,S.payload.directory),z(K,S.payload.session),u)z(Y,u);z(m,S.payload.connection),z(h,S.payload.settings),z(q,S.payload.item),mT();return}if(S.type==="generate-late"){if(f.size===0)v.push(S.payload);else z(f,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};z(W,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)u=null;else if(u?.sessionId!==S.payload.session.id)u=gT(S.payload.session);z(K,S.payload.session);return}if(S.type==="session-lifecycle"){u=S.payload,z(Y,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};z(m,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};z(h,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};z(q,S.payload.item);return}if(S.type==="status-control-event"){z(w,S.payload);return}if(S.type==="popover-closed"){z(J,S.payload);return}if(S.type==="action"){let A=(N)=>{if(!p)y({channel:D,v:I,type:"action-result",id:S.id,payload:N})},$=G_;if(!$){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>$(S.payload)).then(()=>A({ok:!0}),(N)=>{let F=(N instanceof Error?N.message:String(N)).trim();A({ok:!1,error:(F||"Action failed.").slice(0,W_)})});return}if(S.type==="file-open"){let A=S.payload;if(D_&&SS(D_,A))return;D_=A,z($_,S.payload);return}if(S.type==="file-saved"){z(P_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(F)=>{if(!p)y({channel:D,v:I,type:"file-snapshot-result",id:S.id,payload:F})},$=(F)=>A({error:(F.trim()||"Could not read the edited file.").slice(0,W_)}),N=X_;if(!N){$("This extension does not edit files.");return}Promise.resolve().then(()=>N(S.payload.purpose)).then((F)=>{if(e_(F)>L_){$(`The file is over ${L_} ${"bytes"in F?"bytes":"characters"}.`);return}if(F.version.length>F_){$(`The snapshot version is over ${F_} characters.`);return}A({snapshot:"bytes"in F?{bytes:F.bytes,version:F.version}:{content:F.content,version:F.version}})},(F)=>$(F instanceof Error?F.message:String(F)));return}if(S.type==="resolve"){let A=(N)=>{y({channel:D,v:I,type:"resolve-result",id:S.id,payload:N})},$=c;if(!$){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>$(S.payload)).then((N)=>A({item:N?E_(N):null}),(N)=>{let F=(N instanceof Error?N.message:String(N)).trim();A({error:(F||"Command failed.").slice(0,W_)})});return}let U=e.get(S.id);if(!U)return;if(clearTimeout(U.timer),e.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",hT),y({channel:D,v:I,type:"hello"});let B=(T,S=V)=>{if(p||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let $=setTimeout(()=>{e.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);e.set(T.id,{resolve:U,reject:A,timer:$}),y(T)})},k=(T)=>B(T).then(()=>{return}),L={channel:D,v:I},n_=(T)=>{if(!p&&E.parent!==E)y(T)},cT=()=>n_({...L,type:"file-save"}),dT=(T)=>{if(!FS(T)||!ME(T))return;T.preventDefault(),cT()},pT=(T)=>{if(!FS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),nT(R.popover.id,"escape").catch(()=>{return})},Y_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=I_||V_;if(yT===S)return;yT=S,aT(T.id,S).catch(()=>{return})},Q_=()=>{if(R?.surface!=="popover"||I_)return;I_=!0,Y_()},vT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!I_)return;I_=!1,Y_()},uT=()=>{if(R?.surface!=="popover"||V_)return;V_=!0,Y_()},lT=()=>{if(R?.surface!=="popover"||!V_)return;V_=!1,Y_()},d=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},a_=async(T)=>{if(T.kind!=="projects")d(T.projectId);let S=await B({...L,type:"workspace-read",id:G(C),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},i_=async(T,S)=>{if(T.kind!=="projects")d(T.projectId);let U=G(C);__.set(U,S);try{await k({...L,type:"workspace-subscribe",id:G(C),payload:{subscriptionId:U,query:T}})}catch(A){if(__.delete(U),!p)y({...L,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!__.delete(U)||p)return;y({...L,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},tS=async(T,S)=>{if(T.kind==="session")d(T.sessionId);if(T.kind==="project")d(T.projectId);let U=G(C);T_.set(U,S);try{await k({...L,type:"shells-subscribe",id:G(C),payload:{subscriptionId:U,scope:T}})}catch(A){if(T_.delete(U),!p)y({...L,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!T_.delete(U)||p)return;y({...L,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},Z_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>r_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!S_(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>s_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await B({...L,type:"storage",id:G(C),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},nT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...L,type:"popover-close",id:G(C),payload:S?{id:T,reason:S}:{id:T}}),aT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...L,type:"popover-anchor",id:G(C),payload:{id:T,active:S}});return E.addEventListener("keydown",pT,!0),E.addEventListener("pointerover",Q_),E.addEventListener("pointermove",Q_),E.addEventListener("pointerout",vT),E.addEventListener("focus",uT),E.addEventListener("blur",lT),{onAction:(T)=>{return G_=T,()=>{if(G_===T)G_=null}},listProjects:async()=>{let T=await a_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await a_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await a_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>i_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>i_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>i_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>tS(T,S),readShellOutput:async(T,S)=>{d(T,z_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>k_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${k_}.`);let N=await B({...L,type:"shell-output",id:G(C),payload:{shellId:T,cursor:U,tailBytes:A}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(T)=>{if(d(T,z_),(await B({...L,type:"shell-stop",id:G(C),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{d(T),await k({...L,type:"open-session",id:G(C),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=q_(S),A={op:"get",key:T};if(U)A.scope=U;let $=await Z_(A);return $.op==="get"&&$.found?$.value:void 0},set:async(T,S,U)=>{let A=q_(U),$={op:"set",key:T,value:S};if(A)$.scope=A;await Z_($)},delete:async(T,S)=>{let U=q_(S),A={op:"delete",key:T};if(U)A.scope=U;await Z_(A)},keys:async(T)=>{let S=q_(T),U={op:"keys"};if(S)U.scope=S;let A=await Z_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(X.add(T),R)T(R);return()=>{X.delete(T)}},onDirectory:(T)=>{if(W.add(T),R)T(R.directory);return()=>{W.delete(T)}},onSession:(T)=>{if(K.add(T),R)T(R.session);return()=>{K.delete(T)}},onSessionLifecycle:(T)=>{if(Y.add(T),u)T(u);return()=>{Y.delete(T)}},onConnection:(T)=>{if(m.add(T),R)T(R.connection);return()=>{m.delete(T)}},onSettings:(T)=>{if(h.add(T),R)T(R.settings);return()=>{h.delete(T)}},onItem:(T)=>{if(q.add(T),R)T(R.item);return()=>{q.delete(T)}},onStatusControl:(T)=>{return w.add(T),()=>{w.delete(T)}},onPopoverClosed:(T)=>{return J.add(T),()=>{J.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!eT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...L,type:"status-controls",id:G(C),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!TT(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...L,type:"popover-open",id:G(C),payload:T})},closePopover:nT,setPopoverAnchorActive:aT,onResolve:(T)=>{return c=T,()=>{if(c===T)c=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>J_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${J_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>K_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${K_} characters.`));return k({channel:D,v:I,type:"toast",id:G(C),payload:{...T,message:S}})},openUrl:(T)=>k({channel:D,v:I,type:"open-url",id:G(C),payload:{url:T}}),openCommit:(T)=>UT(T)?k({channel:D,v:I,type:"open-commit",id:G(C),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>k({channel:D,v:I,type:"open-surface",id:G(C),payload:{surfaceId:T}}),writeClipboard:(T)=>k({channel:D,v:I,type:"clipboard-write",id:G(C),payload:{text:T}}),compose:(T)=>k({channel:D,v:I,type:"compose",id:G(C),payload:T}),attach:(T)=>k({channel:D,v:I,type:"attach",id:G(C),payload:E_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)d(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")d(S.directory);else{if(S.name!==void 0)d(S.name,200);if(S.baseBranch!==void 0)d(S.baseBranch,200)}let U=await B({channel:D,v:I,type:"start-session",id:G(C),payload:CT(T)},_.requestTimeoutMs??180000);if(!ET(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>B({channel:D,v:I,type:"prompt",id:G(C),payload:GT(T)}).then((S)=>{if(!OT(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>k({channel:D,v:I,type:"session-link",id:G(C),payload:E_(T)}),close:()=>k({channel:D,v:I,type:"close",id:G(C)}),oauthStart:()=>k({channel:D,v:I,type:"oauth-start",id:G(C)}),oauthDisconnect:()=>k({channel:D,v:I,type:"oauth-disconnect",id:G(C)}),request:(T)=>(H_(T.path)?B({channel:D,v:I,type:"request",id:G(C),payload:T}):JS()).then((S)=>{if(!x_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(H_(T.path)?B({channel:D,v:I,type:"service-request",id:G(C),payload:T}):JS()).then((S)=>{if(!x_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>B({channel:D,v:I,type:"service-status",id:G(C)}).then((T)=>{if(!IT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(O_(T)?B({channel:D,v:I,type:"file-read",id:G(C),payload:{path:T}}):b_()).then((S)=>{if(!VT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!O_(T))return b_();if(S.length>B_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${B_} characters.`));return B({channel:D,v:I,type:"file-write",id:G(C),payload:{path:T,content:S}}).then((U)=>{if(!WT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(O_(T)?B({channel:D,v:I,type:"file-list",id:G(C),payload:{path:T}}):b_()).then((S)=>{if(!NT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(O_(T)?B({channel:D,v:I,type:"file-stat",id:G(C),payload:{path:T}}):b_()).then((S)=>{if(!$T(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>j_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${j_} characters.`));if(U!==void 0&&(U.length===0||U.length>w_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${w_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(MT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let $={prompt:S};if(U!==void 0)$.system=U;if(A!==void 0)$.maxOutputTokens=A;return B({channel:D,v:I,type:"generate",id:G(C),payload:$},_.requestTimeoutMs??RT).then((N)=>{if(!PT(N))throw new M("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(T)=>{f.add(T);for(let S of v.splice(0))z([T],S);return mT(),()=>{f.delete(T)}},setBadge:(T)=>k({channel:D,v:I,type:"badge",id:G(C),payload:{count:XT(T)}}),setHeight:(T)=>k({channel:D,v:I,type:"resize",id:G(C),payload:{height:DT(T)}}),onFileOpen:(T)=>{if($_.add(T),!l_)l_=!0,E.addEventListener("keydown",dT,!0);if(D_)T(D_);return()=>{$_.delete(T)}},onFileSnapshot:(T)=>{return X_=T,()=>{if(X_===T)X_=null}},onFileSaved:(T)=>{return P_.add(T),()=>{P_.delete(T)}},reportFileChange:(T)=>n_({...L,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:cT,reportFileUnsupported:()=>n_({...L,type:"file-unsupported"}),dispose:()=>{for(let T of __.keys())y({...L,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:T}});__.clear();for(let T of T_.keys())y({...L,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:T}});if(T_.clear(),p=!0,c=null,G_=null,X_=null,$_.clear(),P_.clear(),l_)E.removeEventListener("keydown",dT,!0);E.removeEventListener("message",hT),E.removeEventListener("keydown",pT,!0),E.removeEventListener("pointerover",Q_),E.removeEventListener("pointermove",Q_),E.removeEventListener("pointerout",vT),E.removeEventListener("focus",uT),E.removeEventListener("blur",lT);for(let T of e.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));e.clear(),X.clear(),W.clear(),K.clear(),Y.clear(),m.clear(),h.clear(),q.clear(),w.clear(),J.clear(),f.clear(),v.length=0}}};var KS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var SO=new Set(KS);var fS=["none","agent","user"];var OO=new Set(fS);var RE=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],CE=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],BS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,V]of RE)E.style.setProperty(O,_.tokens[V]);for(let[O,V,X]of CE){let W=_.tokens[X]??"";E.style.setProperty(O,W),E.style.setProperty(V,W)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},ZT=(_,E)=>{if(BS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var GE={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(_,E)=>`var(--${_}, var(--oc-${GE[_]}, ${E}))`,n=P("surface-background","transparent"),g_=P("surface-elevated","transparent"),U_=P("surface-elevated-foreground","inherit"),g=P("surface-foreground","inherit"),Q=P("surface-muted-foreground","gray"),XE=P("surface-muted","transparent"),o=P("interactive-border","currentColor"),H=P("interactive-hover","transparent"),r=P("interactive-active","transparent"),zT=P("interactive-selection","transparent"),kT=P("interactive-selection-foreground","inherit"),l=P("primary","currentColor"),LT=P("primary-text","inherit"),FT=P("error-text","inherit"),DE=P("font-sans","inherit"),JT=P("font-mono","monospace"),xS=P("radius","9px"),KT=`calc(${xS} - 2px)`,jS=`calc(${xS} - 4px)`,Z=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,wS=`background-image: linear-gradient(${H}, ${H});`,fT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,BT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",HS="box-shadow: var(--oc-sdk-lit);",jT=`inset 0 0.5px 0 0 ${Z(g,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,IE=`
:root {
  --oc-sdk-edge: ${Z(g,16)};
  --oc-sdk-field-bg: ${g_};
  --oc-sdk-raised-bg: ${n};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Z(g,14)};
  --oc-sdk-field-bg: ${Z(n,50,g_)};
  --oc-sdk-raised-bg: ${g_};
  --oc-sdk-field-lift: ${jT};
  --oc-sdk-raised-lift: ${jT};
  --oc-sdk-lit: ${jT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,y_=(_)=>{let E=P(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${P(`${_}-text`,"inherit")}; }`},VE=`
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
`,bS=`${IE}
.oc-sdk { color: ${g}; font-family: ${DE}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${wS} }
.oc-sdk-mono { font-family: ${JT}; }
.oc-sdk-muted { color: ${Q}; }
${y_("success")}${y_("warning")}${y_("error")}${y_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${l}; --oc-sdk-tone-text: ${LT}; }

.oc-sdk-btn { border-radius: ${KT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${jS}; }
.oc-sdk-btn[data-variant="default"] { color: ${LT}; background: ${Z(l,10,n)}; border-color: ${Z(l,12)}; ${HS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Z(l,16,n)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Z(l,22,n)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${XE}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${U_}; ${BT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${r}, ${r}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${r}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${FT}; background: ${Z("var(--oc-sdk-tone)",7,n)}; border-color: ${Z("var(--oc-sdk-tone)",12)}; ${HS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Z("var(--oc-sdk-tone)",9,n)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Z("var(--oc-sdk-tone)",11,n)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Q}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${FT}; }
.oc-sdk-input { border-radius: ${KT}; background: var(--oc-sdk-field-bg); color: ${U_}; ${fT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Q}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${fT(Z(g,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${fT(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${JT}; }

.oc-sdk-search-icon { color: ${Q}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${l}; }
.oc-sdk-search-clear { border-radius: ${jS}; color: ${Q}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${g}; }

.oc-sdk-trigger { border-radius: ${KT}; background: var(--oc-sdk-raised-bg); color: ${U_}; ${BT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Q}; }
.oc-sdk-trigger-chevron { color: ${Q}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${U_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${g_}; background-clip: padding-box; color: ${U_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${zT}; color: ${kT}; }
.oc-sdk-option-check { color: ${g}; }
.oc-sdk-option[data-destructive="true"] { color: ${FT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Z(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Q}; }
.oc-sdk-popup-empty { color: ${Q}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${o}; border-radius: 4px; color: ${g}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Z(g,60,o)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${o}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${n}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${l}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${wS} }
.oc-sdk-check-desc { color: ${Q}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Z(g,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Q}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${g}; }
.oc-sdk-tab[aria-selected="true"] { color: ${kT}; background: ${zT}; border-color: ${o}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${U_}; background: var(--oc-sdk-raised-bg); ${BT} }
.oc-sdk-tab-count { color: ${Q}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Z(g,6)}; color: ${Q}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${zT}; color: ${kT}; }
.oc-sdk-row-lead { font-family: ${JT}; color: ${Q}; }
.oc-sdk-row-sub { color: ${Q}; }
.oc-sdk-row-meta { color: ${Q}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Q}; }

.oc-sdk-empty-body { color: ${Q}; }

.oc-sdk-spinner { color: ${Q}; }
.oc-sdk-spinner-ring { border-color: ${o}; border-top-color: ${l}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Q}; }

.oc-sdk-separator { color: ${Q}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Z(o,40)}; }

.oc-sdk-progress-label { color: ${Q}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Z(g,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${l}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${LT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Z(o,60)}; }
`,j=`
${o_}
${VE}
${bS}`;var qS="~/.config/opencode/snippet",yS=["~/.config/opencode/command","~/.config/opencode/commands"],YE=["command","commands",".opencode/command",".opencode/commands"],QE=".openchamber/project.json",ZE=30,gS=["#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"],dS=(_)=>{let E=2166136261,O=new TextEncoder().encode(_);for(let V of O)E^=V,E=Math.imul(E,16777619)>>>0;return gS[E%gS.length]},p_=(_)=>[..._].sort((E,O)=>E.label.localeCompare(O.label,"zh-CN",{numeric:!0})),mS=(_)=>{let E=_.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);if(!E)return null;let O=E[1].split(`
`).find((V)=>/^\s*description\s*:/.test(V));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},zE=(_)=>_.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*\r?\n?/,"").trim(),hS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((V)=>V.kind==="file"&&V.name.endsWith(".md")).map((V)=>V.name)}catch{return[]}},cS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},pS=async(_,E)=>{let O=[],V=[],X=new Set,W=new Map;for(let q of await hS(_,qS)){let w=await cS(_,`${qS}/${q}`);if(w===null)continue;let J=zE(w);if(!J)continue;let f=q.replace(/\.md$/,""),v=mS(w)??f,c=`snip:${J}`;if(X.has(c))continue;X.add(c),O.push({label:v,text:J}),W.set(f,v)}let K=E?[...yS,...YE]:[...yS];for(let q of K)for(let w of await hS(_,q)){let J=await cS(_,`${q}/${w}`);if(J===null)continue;let f=w.replace(/\.md$/,""),v=mS(J)??f;W.set(f,v);let c=`cmd:/${f}`;if(X.has(c))continue;X.add(c),V.push({label:v,text:`/${f}`})}if(E)try{let{content:q}=await _.readFile(QE),w=JSON.parse(q);if(Array.isArray(w.draftStarters))for(let J of w.draftStarters.slice(0,ZE)){if(typeof J?.name!=="string"||!J.name)continue;let f=`cmd:/${J.name}`;if(X.has(f))continue;X.add(f),V.unshift({label:W.get(J.name)??J.name,text:`/${J.name}`})}}catch{}let Y={snippets:p_(O),commands:p_(V)},h=Y.snippets.length+Y.commands.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md，命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters，去各自位置管理";return{...Y,hint:h}},vS=async(_,E,O,V,X=!0)=>{if(V===!1){O("先打开或新建一个会话再点");return}if(!X){try{await _.prompt({text:E}),O("已填入输入框，未自动发送")}catch(W){O(kE(W)?"先打开或新建一个会话再点":`请求失败：${LE(W)}`)}return}try{let W=await _.prompt({text:E,send:!0});if(W.sent==="sent"){O("已提交到会话");return}O(`未直接发出（${W.sent}），已填入输入框`),await _.prompt({text:E}).catch(()=>{return})}catch(W){if(!uS(W)){O(String(W));return}if(W.code==="NO_SESSION"){O("先打开或新建一个会话再点");return}if(W.code==="SESSION_BUSY"){O("会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});return}O(`${W.code}`)}},uS=(_)=>_ instanceof M,kE=(_)=>uS(_)&&_.code==="NO_SESSION",LE=(_)=>_.code??_;var t=QT(),nS="oc-shortcuts-autosend",FE=30000;t.onStatusControl((_)=>{if(_.id==="refresh")oS()});var v_=document.querySelector("#root");if(!v_)throw Error("Missing #root");v_.innerHTML=`<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
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
<div class="res" id="out"></div>`;var M_=document.querySelector("#g"),HT=document.querySelector("#out"),JE=document.querySelector("#t"),s=document.querySelector("#b-refresh"),xT=document.querySelector("#autosend"),KE=document.querySelector("#modehint"),fE=()=>{try{return localStorage.getItem(nS)!=="0"}catch{return!0}},BE=(_)=>{try{localStorage.setItem(nS,_?"1":"0")}catch{}},i=fE(),lS="",C_=null,aS=!1,bT=!1,jE=()=>new Date().toTimeString().slice(0,8),R_=(_,E=!1)=>{HT.textContent=_,HT.title=_,HT.classList.toggle("bad",E),u_()},u_=()=>{let _=Math.ceil(v_.getBoundingClientRect().height);t.setHeight(_).catch(()=>{return})},iS=async()=>{try{await t.setStatusControls([{kind:"button",id:"refresh",label:"↻"}]),bT=!0,s.hidden=!0}catch{bT=!1,s.hidden=!1}},qT=async(_,E=!1)=>{let O=await pS(t,_),V=JSON.stringify([O.snippets,O.commands]);if(!E&&V===lS)return;lS=V;let{snippets:X,commands:W}=O;M_.innerHTML="";for(let K of p_([...W,...X])){let Y=document.createElement("button"),m=dS(K.label);Y.style.borderColor=m,Y.style.background=`color-mix(in srgb, ${m} 16%, transparent)`,Y.textContent=K.label,Y.title=K.text.length>200?K.text.slice(0,200):K.text,Y.onclick=()=>void vS(t,K.text,(h)=>R_(h),aS,i),M_.appendChild(Y)}if(M_.children.length===0)M_.innerHTML='<span class="mut">暂无快捷</span>';JE.textContent=`上次刷新 ${jE()}`,u_()};async function oS(){if(s.disabled)return;s.disabled=!0,R_("重读配置…");try{await qT(C_,!0);let _=M_.children.length;R_(`已重读：${_===1&&M_.querySelector(".mut")?0:_} 个快捷`)}catch(_){R_(`重读失败：${_.message?.slice(0,40)??"未知错误"}`,!0)}finally{s.disabled=!1,u_()}}s.onclick=()=>void oS();var rS=()=>{xT.classList.toggle("on",i),xT.setAttribute("aria-checked",String(i)),KE.textContent=i?"开：点即发送":"关：只填入不发送"};xT.onclick=()=>{i=!i,BE(i),rS(),R_(i?"已开自动发送":"已关自动发送，只填入")};rS();new ResizeObserver(()=>u_()).observe(v_);var sS=(_,E=!1)=>{qT(_,E).catch((O)=>R_(`加载失败：${O.message?.slice(0,60)??O}`,!0))};setInterval(()=>{if(!document.hidden)qT(C_)},FE);t.onReady((_)=>{if(ZT(_,document.documentElement),C_=_.directory??null,aS=!!_.session,_.features?.statusControls===!0)iS();else s.hidden=!1;sS(C_)});t.onDirectory((_)=>{if(C_=_,bT)iS();sS(C_)});})();
