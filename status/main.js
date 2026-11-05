(()=>{var V="openchamber.sdk",f=1;var l_=`
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
`;function cT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(C)=>{let D=C.target===_?E:C.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let I=O.get(D);if(I!==void 0)clearTimeout(I);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var gS=`(${cT.toString()})(document);`;var n_=128,o_=65536;var P_=128;var $_=65536;var uT=/^[a-z][a-z0-9-]{0,39}$/;var dT=(_)=>Object(_)===_&&!Array.isArray(_),a_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),pT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,vT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,lT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!dT(O)||!uT.test(O.id)||!pT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!a_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!a_(O,["kind","id","label","value","options","disabled"]))return!1;if(!vT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let C=new Set;for(let D of O.options){if(!dT(D)||!a_(D,["value","label"])||!vT(D.value)||!pT(D.label)||C.has(D.value))return!1;C.add(D.value)}if(!C.has(O.value))return!1}return!0};var nT=["{id}","{segment}","{segments+}"];var VE=new Set(nT);var oT=["turn-finished","turn-failed","permission-asked","question-asked"];var NE=new Set(oT);var L_=20000000,Y_=256;var i_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,aT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var iT=/^[A-Za-z0-9_-]{1,80}$/;var rT=["left","right","top","bottom"];var sT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let C=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of C)if(!sT(D,E+1,O))return!1;return!0},r_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(r_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(r_)}return String(_)===_||Number.isFinite(_)},s_=(_)=>{try{if(String(_.id)!==_.id||!iT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!rT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!sT(_.data)||!r_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var eT=["file","directory","other","missing"],e_=(_)=>Boolean(_&&"sessionId"in _),_T=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var _S=/^[0-9a-f]{7,64}$/i,TT=(_)=>_S.test(_),Q_=500,k_=32000,TS=16000,SS=128,ES=200,OS=2000,US=16000,AS=80,MS=200,RS=16000;var CS=2000;var ST=20000,z_=1024,Z_=2000000;var F_=64000,J_=8000,ET=4000;var OT=960000;var GS=999,XS=1e4,C_=500,DS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],IS=["stopped","starting","ready","failed"],mS=new Set(DS),VS=(_)=>mS.has(_),fS=(_)=>_&&VS(_)?_:"HOST_REJECTED",__=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(__);if(Object(_)===_)return Object.values(_).every(__);return!1},NS=(_)=>__(_)&&JSON.stringify(_).length<=RS,tT=(_)=>_?.trim().slice(0,MS)??"",T_=(_)=>{let E=_.id.trim().slice(0,SS),O=_.title.trim().slice(0,ES),C=_.url.trim().slice(0,OS),D=_.text?.trim().slice(0,US),I=_.author?.trim().slice(0,AS),k=_.kind==="pull"?"pull":"issue",Y={providerId:_.providerId.trim(),id:E,title:O||E,url:C,kind:k};if(D)Y.text=D;if(I)Y.author=I;if(k==="pull"){let B=tT(_.branches?.head),h=tT(_.branches?.base);if(B&&h)Y.branches={head:B,base:h}}if(NS(_.data))Y.data=_.data;return Y},UT=(_)=>{let E=T_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},AT=(_)=>{let E={text:_.text.trim().slice(0,TS)};if(_.send)E.send=!0;return E},MT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(GS,Math.max(0,Math.round(_)))},RT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(XS,Math.max(0,Math.ceil(_)))};var S_=(_)=>_.length>0&&_.length<=z_&&!_.includes("\x00")&&!_.includes("\\");var B_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>CS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},cS=new Set(IS),CT=(_)=>Boolean(_&&"status"in _&&cS.has(String(_.status))&&!("body"in _)),K_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),GT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),XT=(_)=>Boolean(_&&"written"in _&&_.written===!0),DT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),dS=new Set(eT),IT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&dS.has(String(_.kind))&&Number.isFinite(_.size)),VT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),pS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),vS=(_)=>Object(_)===_?_:null,t_=(_)=>String(_)===_&&_.length>0,uS=(_)=>{if(!t_(_.id))return null;if(_.ok===!0){let E={channel:V,v:f,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&t_(_.error))return{channel:V,v:f,type:"result",id:_.id,ok:!1,error:_.error,code:fS(t_(_.code)?_.code:void 0)};return null},fT=(_)=>{let E=vS(_);if(!E||E.channel!==V||E.v!==f)return null;if(E.type==="result")return uS(E);if(!pS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var WS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),lS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var PS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),j_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${z_} characters without NUL or backslash.`)),x_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},NT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),C=_.requestTimeoutMs??ST,D=new Set,I=new Set,k=new Set,Y=new Set,B=new Set,h=new Set,a=new Set,m=new Set,x=new Set,z=new Set,w=[],c=null,d=null,I_=new Set,V_=new Set,U_=null,A_=null,d_=!1,s=new Map,t=new Map,e=new Map,v=!1,G={value:0},R=null,u=null,M_=!1,R_=!1,BT=null,KT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},y=(T)=>{E.parent.postMessage(T,"*")},jT=()=>{if(v||E.parent===E||z.size===0||R?.features?.lateGenerateResults!==!0)return;y({channel:V,v:f,type:"generate-late-listen"})},Q=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},xT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=fT(T.data);if(!S)return;if(S.type==="workspace"){let A=t.get(S.payload.subscriptionId);if(A)Q([A],S.payload.snapshot);return}if(S.type==="shells"){let A=e.get(S.payload.subscriptionId);if(A)Q([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,u=KT(S.payload.session),Q(D,S.payload),Q(I,S.payload.directory),Q(k,S.payload.session),u)Q(Y,u);Q(B,S.payload.connection),Q(h,S.payload.settings),Q(a,S.payload.item),jT();return}if(S.type==="generate-late"){if(z.size===0)w.push(S.payload);else Q(z,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};Q(I,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)u=null;else if(u?.sessionId!==S.payload.session.id)u=KT(S.payload.session);Q(k,S.payload.session);return}if(S.type==="session-lifecycle"){u=S.payload,Q(Y,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};Q(B,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};Q(h,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};Q(a,S.payload.item);return}if(S.type==="status-control-event"){Q(m,S.payload);return}if(S.type==="popover-closed"){Q(x,S.payload);return}if(S.type==="action"){let A=(N)=>{if(!v)y({channel:V,v:f,type:"action-result",id:S.id,payload:N})},W=d;if(!W){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(S.payload)).then(()=>A({ok:!0}),(N)=>{let J=(N instanceof Error?N.message:String(N)).trim();A({ok:!1,error:(J||"Action failed.").slice(0,C_)})});return}if(S.type==="file-open"){let A=S.payload;if(A_&&aT(A_,A))return;A_=A,Q(I_,S.payload);return}if(S.type==="file-saved"){Q(V_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(J)=>{if(!v)y({channel:V,v:f,type:"file-snapshot-result",id:S.id,payload:J})},W=(J)=>A({error:(J.trim()||"Could not read the edited file.").slice(0,C_)}),N=U_;if(!N){W("This extension does not edit files.");return}Promise.resolve().then(()=>N(S.payload.purpose)).then((J)=>{if(i_(J)>L_){W(`The file is over ${L_} ${"bytes"in J?"bytes":"characters"}.`);return}if(J.version.length>Y_){W(`The snapshot version is over ${Y_} characters.`);return}A({snapshot:"bytes"in J?{bytes:J.bytes,version:J.version}:{content:J.content,version:J.version}})},(J)=>W(J instanceof Error?J.message:String(J)));return}if(S.type==="resolve"){let A=(N)=>{y({channel:V,v:f,type:"resolve-result",id:S.id,payload:N})},W=c;if(!W){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(S.payload)).then((N)=>A({item:N?T_(N):null}),(N)=>{let J=(N instanceof Error?N.message:String(N)).trim();A({error:(J||"Command failed.").slice(0,C_)})});return}let U=s.get(S.id);if(!U)return;if(clearTimeout(U.timer),s.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",xT),y({channel:V,v:f,type:"hello"});let K=(T,S=C)=>{if(v||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let W=setTimeout(()=>{s.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);s.set(T.id,{resolve:U,reject:A,timer:W}),y(T)})},Z=(T)=>K(T).then(()=>{return}),F={channel:V,v:f},p_=(T)=>{if(!v&&E.parent!==E)y(T)},wT=()=>p_({...F,type:"file-save"}),HT=(T)=>{if(!WS(T)||!lS(T))return;T.preventDefault(),wT()},bT=(T)=>{if(!WS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),hT(R.popover.id,"escape").catch(()=>{return})},f_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=M_||R_;if(BT===S)return;BT=S,mT(T.id,S).catch(()=>{return})},N_=()=>{if(R?.surface!=="popover"||M_)return;M_=!0,f_()},qT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!M_)return;M_=!1,f_()},yT=()=>{if(R?.surface!=="popover"||R_)return;R_=!0,f_()},gT=()=>{if(R?.surface!=="popover"||!R_)return;R_=!1,f_()},p=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},v_=async(T)=>{if(T.kind!=="projects")p(T.projectId);let S=await K({...F,type:"workspace-read",id:X(G),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},u_=async(T,S)=>{if(T.kind!=="projects")p(T.projectId);let U=X(G);t.set(U,S);try{await Z({...F,type:"workspace-subscribe",id:X(G),payload:{subscriptionId:U,query:T}})}catch(A){if(t.delete(U),!v)y({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!t.delete(U)||v)return;y({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},yS=async(T,S)=>{if(T.kind==="session")p(T.sessionId);if(T.kind==="project")p(T.projectId);let U=X(G);e.set(U,S);try{await Z({...F,type:"shells-subscribe",id:X(G),payload:{subscriptionId:U,scope:T}})}catch(A){if(e.delete(U),!v)y({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!e.delete(U)||v)return;y({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},W_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>n_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!__(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>o_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await K({...F,type:"storage",id:X(G),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},hT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Z({...F,type:"popover-close",id:X(G),payload:S?{id:T,reason:S}:{id:T}}),mT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Z({...F,type:"popover-anchor",id:X(G),payload:{id:T,active:S}});return E.addEventListener("keydown",bT,!0),E.addEventListener("pointerover",N_),E.addEventListener("pointermove",N_),E.addEventListener("pointerout",qT),E.addEventListener("focus",yT),E.addEventListener("blur",gT),{onAction:(T)=>{return d=T,()=>{if(d===T)d=null}},listProjects:async()=>{let T=await v_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await v_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await v_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>u_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>u_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>u_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>yS(T,S),readShellOutput:async(T,S)=>{p(T,P_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>$_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${$_}.`);let N=await K({...F,type:"shell-output",id:X(G),payload:{shellId:T,cursor:U,tailBytes:A}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(T)=>{if(p(T,P_),(await K({...F,type:"shell-stop",id:X(G),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{p(T),await Z({...F,type:"open-session",id:X(G),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=x_(S),A={op:"get",key:T};if(U)A.scope=U;let W=await W_(A);return W.op==="get"&&W.found?W.value:void 0},set:async(T,S,U)=>{let A=x_(U),W={op:"set",key:T,value:S};if(A)W.scope=A;await W_(W)},delete:async(T,S)=>{let U=x_(S),A={op:"delete",key:T};if(U)A.scope=U;await W_(A)},keys:async(T)=>{let S=x_(T),U={op:"keys"};if(S)U.scope=S;let A=await W_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(D.add(T),R)T(R);return()=>{D.delete(T)}},onDirectory:(T)=>{if(I.add(T),R)T(R.directory);return()=>{I.delete(T)}},onSession:(T)=>{if(k.add(T),R)T(R.session);return()=>{k.delete(T)}},onSessionLifecycle:(T)=>{if(Y.add(T),u)T(u);return()=>{Y.delete(T)}},onConnection:(T)=>{if(B.add(T),R)T(R.connection);return()=>{B.delete(T)}},onSettings:(T)=>{if(h.add(T),R)T(R.settings);return()=>{h.delete(T)}},onItem:(T)=>{if(a.add(T),R)T(R.item);return()=>{a.delete(T)}},onStatusControl:(T)=>{return m.add(T),()=>{m.delete(T)}},onPopoverClosed:(T)=>{return x.add(T),()=>{x.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!lT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Z({...F,type:"status-controls",id:X(G),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!s_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Z({...F,type:"popover-open",id:X(G),payload:T})},closePopover:hT,setPopoverAnchorActive:mT,onResolve:(T)=>{return c=T,()=>{if(c===T)c=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>Q_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${Q_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>k_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${k_} characters.`));return Z({channel:V,v:f,type:"toast",id:X(G),payload:{...T,message:S}})},openUrl:(T)=>Z({channel:V,v:f,type:"open-url",id:X(G),payload:{url:T}}),openCommit:(T)=>TT(T)?Z({channel:V,v:f,type:"open-commit",id:X(G),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>Z({channel:V,v:f,type:"open-surface",id:X(G),payload:{surfaceId:T}}),writeClipboard:(T)=>Z({channel:V,v:f,type:"clipboard-write",id:X(G),payload:{text:T}}),compose:(T)=>Z({channel:V,v:f,type:"compose",id:X(G),payload:T}),attach:(T)=>Z({channel:V,v:f,type:"attach",id:X(G),payload:T_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)p(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")p(S.directory);else{if(S.name!==void 0)p(S.name,200);if(S.baseBranch!==void 0)p(S.baseBranch,200)}let U=await K({channel:V,v:f,type:"start-session",id:X(G),payload:UT(T)},_.requestTimeoutMs??180000);if(!e_(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>K({channel:V,v:f,type:"prompt",id:X(G),payload:AT(T)}).then((S)=>{if(!_T(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>Z({channel:V,v:f,type:"session-link",id:X(G),payload:T_(T)}),close:()=>Z({channel:V,v:f,type:"close",id:X(G)}),oauthStart:()=>Z({channel:V,v:f,type:"oauth-start",id:X(G)}),oauthDisconnect:()=>Z({channel:V,v:f,type:"oauth-disconnect",id:X(G)}),request:(T)=>(B_(T.path)?K({channel:V,v:f,type:"request",id:X(G),payload:T}):PS()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(B_(T.path)?K({channel:V,v:f,type:"service-request",id:X(G),payload:T}):PS()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>K({channel:V,v:f,type:"service-status",id:X(G)}).then((T)=>{if(!CT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(S_(T)?K({channel:V,v:f,type:"file-read",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!GT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!S_(T))return j_();if(S.length>Z_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${Z_} characters.`));return K({channel:V,v:f,type:"file-write",id:X(G),payload:{path:T,content:S}}).then((U)=>{if(!XT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(S_(T)?K({channel:V,v:f,type:"file-list",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!DT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(S_(T)?K({channel:V,v:f,type:"file-stat",id:X(G),payload:{path:T}}):j_()).then((S)=>{if(!IT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>F_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${F_} characters.`));if(U!==void 0&&(U.length===0||U.length>J_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${J_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(ET,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:S};if(U!==void 0)W.system=U;if(A!==void 0)W.maxOutputTokens=A;return K({channel:V,v:f,type:"generate",id:X(G),payload:W},_.requestTimeoutMs??OT).then((N)=>{if(!VT(N))throw new M("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(T)=>{z.add(T);for(let S of w.splice(0))Q([T],S);return jT(),()=>{z.delete(T)}},setBadge:(T)=>Z({channel:V,v:f,type:"badge",id:X(G),payload:{count:MT(T)}}),setHeight:(T)=>Z({channel:V,v:f,type:"resize",id:X(G),payload:{height:RT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!d_)d_=!0,E.addEventListener("keydown",HT,!0);if(A_)T(A_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},onFileSaved:(T)=>{return V_.add(T),()=>{V_.delete(T)}},reportFileChange:(T)=>p_({...F,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:wT,reportFileUnsupported:()=>p_({...F,type:"file-unsupported"}),dispose:()=>{for(let T of t.keys())y({...F,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:T}});t.clear();for(let T of e.keys())y({...F,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:T}});if(e.clear(),v=!0,c=null,d=null,U_=null,I_.clear(),V_.clear(),d_)E.removeEventListener("keydown",HT,!0);E.removeEventListener("message",xT),E.removeEventListener("keydown",bT,!0),E.removeEventListener("pointerover",N_),E.removeEventListener("pointermove",N_),E.removeEventListener("pointerout",qT),E.removeEventListener("focus",yT),E.removeEventListener("blur",gT);for(let T of s.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));s.clear(),D.clear(),I.clear(),k.clear(),Y.clear(),B.clear(),h.clear(),a.clear(),m.clear(),x.clear(),z.clear(),w.length=0}}};var $S=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var jE=new Set($S);var LS=["none","agent","user"];var wE=new Set(LS);var nS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],oS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],YS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,C]of nS)E.style.setProperty(O,_.tokens[C]);for(let[O,C,D]of oS){let I=_.tokens[D]??"";E.style.setProperty(O,I),E.style.setProperty(C,I)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},WT=(_,E)=>{if(YS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var aS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(_,E)=>`var(--${_}, var(--oc-${aS[_]}, ${E}))`,n=P("surface-background","transparent"),H_=P("surface-elevated","transparent"),E_=P("surface-elevated-foreground","inherit"),g=P("surface-foreground","inherit"),$=P("surface-muted-foreground","gray"),iS=P("surface-muted","transparent"),i=P("interactive-border","currentColor"),H=P("interactive-hover","transparent"),r=P("interactive-active","transparent"),PT=P("interactive-selection","transparent"),$T=P("interactive-selection-foreground","inherit"),l=P("primary","currentColor"),LT=P("primary-text","inherit"),YT=P("error-text","inherit"),rS=P("font-sans","inherit"),QT=P("font-mono","monospace"),ZS=P("radius","9px"),kT=`calc(${ZS} - 2px)`,QS=`calc(${ZS} - 4px)`,L=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,kS=`background-image: linear-gradient(${H}, ${H});`,zT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,ZT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",zS="box-shadow: var(--oc-sdk-lit);",FT=`inset 0 0.5px 0 0 ${L(g,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,sS=`
:root {
  --oc-sdk-edge: ${L(g,16)};
  --oc-sdk-field-bg: ${H_};
  --oc-sdk-raised-bg: ${n};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${L(g,14)};
  --oc-sdk-field-bg: ${L(n,50,H_)};
  --oc-sdk-raised-bg: ${H_};
  --oc-sdk-field-lift: ${FT};
  --oc-sdk-raised-lift: ${FT};
  --oc-sdk-lit: ${FT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,w_=(_)=>{let E=P(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${P(`${_}-text`,"inherit")}; }`},tS=`
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
.oc-sdk-mono { font-family: ${QT}; }
.oc-sdk-muted { color: ${$}; }
${w_("success")}${w_("warning")}${w_("error")}${w_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${l}; --oc-sdk-tone-text: ${LT}; }

.oc-sdk-btn { border-radius: ${kT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${QS}; }
.oc-sdk-btn[data-variant="default"] { color: ${LT}; background: ${L(l,10,n)}; border-color: ${L(l,12)}; ${zS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(l,16,n)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(l,22,n)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${iS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${E_}; ${ZT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${r}, ${r}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${r}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${YT}; background: ${L("var(--oc-sdk-tone)",7,n)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${zS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,n)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,n)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${YT}; }
.oc-sdk-input { border-radius: ${kT}; background: var(--oc-sdk-field-bg); color: ${E_}; ${zT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${zT(L(g,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${zT(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${QT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${l}; }
.oc-sdk-search-clear { border-radius: ${QS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${g}; }

.oc-sdk-trigger { border-radius: ${kT}; background: var(--oc-sdk-raised-bg); color: ${E_}; ${ZT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${r}, ${r}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${E_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${H_}; background-clip: padding-box; color: ${E_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${PT}; color: ${$T}; }
.oc-sdk-option-check { color: ${g}; }
.oc-sdk-option[data-destructive="true"] { color: ${YT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${L(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${i}; border-radius: 4px; color: ${g}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${L(g,60,i)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${i}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${n}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${l}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${kS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(g,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${g}; }
.oc-sdk-tab[aria-selected="true"] { color: ${$T}; background: ${PT}; border-color: ${i}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${E_}; background: var(--oc-sdk-raised-bg); ${ZT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${L(g,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${L("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${PT}; color: ${$T}; }
.oc-sdk-row-lead { font-family: ${QT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${i}; border-top-color: ${l}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${L("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${L(i,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${L(g,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${l}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${LT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${L(i,60)}; }
`,j=`
${l_}
${tS}
${FS}`;var JS=["#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"],xS=(_)=>{let E=2166136261,O=new TextEncoder().encode(_);for(let C of O)E^=C,E=Math.imul(E,16777619)>>>0;return JS[E%JS.length]},h_=(_)=>[..._].sort((E,O)=>E.label.localeCompare(O.label,"zh-CN")),BS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((C)=>/^\s*description\s*:/.test(C));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},EE=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),KS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((C)=>C.kind==="file"&&C.name.endsWith(".md")).map((C)=>C.name)}catch{return[]}},jS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},wS=async(_,E)=>{let O=[],C=[],D=new Set,I=new Map,k="~/.config/opencode/snippet";for(let m of await KS(_,"~/.config/opencode/snippet")){let x=await jS(_,`~/.config/opencode/snippet/${m}`);if(x===null)continue;let z=EE(x);if(!z)continue;let w=m.replace(/\.md$/,""),c=BS(x)??w,d=`snip:${z}`;if(D.has(d))continue;D.add(d),O.push({label:c,text:z}),I.set(w,c)}let Y=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let m of Y)for(let x of await KS(_,m)){let z=await jS(_,`${m}/${x}`);if(z===null)continue;let w=x.replace(/\.md$/,""),c=BS(z)??w;I.set(w,c);let d=`cmd:/${w}`;if(D.has(d))continue;D.add(d),C.push({label:c,text:`/${w}`})}if(E)try{let{content:m}=await _.readFile(".openchamber/project.json"),x=JSON.parse(m);if(Array.isArray(x.draftStarters))for(let z of x.draftStarters.slice(0,30)){if(typeof z?.name!=="string"||!z.name)continue;let w=`cmd:/${z.name}`;if(D.has(w))continue;D.add(w),C.unshift({label:I.get(z.name)??z.name,text:`/${z.name}`})}}catch{}let B=h_(O),h=h_(C);O.length=0,O.push(...B),C.length=0,C.push(...h);let a=O.length+C.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:C,hint:a}},HS=async(_,E,O,C,D)=>{try{let I=await _.prompt({text:O,send:!0});if(I.sent==="sent"){C("已提交到会话");return}C(`未直接发出（${I.sent}），已填入输入框`),await _.prompt({text:O}).catch(()=>{return});return}catch(I){if(!(I instanceof M)){C(String(I));return}if(I.code==="SESSION_BUSY"){C("会话忙已填入输入框稍后发送"),await _.prompt({text:O}).catch(()=>{return});return}if(I.code!=="NO_SESSION"){C(`${I.code}`);return}}if(!D){C("先在左侧选择项目再点按钮");return}C("无会话建新会话中…");try{let I;try{I=(await _.listProjects()).projects.find((B)=>B.directory===D)?.id}catch{}let k=await _.startSession({providerId:"shortcuts",id:E.slice(0,100)||"shortcut",title:E.slice(0,180),url:"",text:O,projectId:I});C(k.sent==="sent"?"已建新会话并提交":`新会话已建发送状态：${k.sent}进新会话手动发送`)}catch(I){C(I instanceof M?`建会话失败：${I.code}先选项目再试`:"建会话失败")}};var X_=NT(),D_=document.querySelector("#root");if(!D_)throw Error("Missing #root");D_.innerHTML=`<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0)}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6}
.mut{font-size:12px;opacity:.7}
</style><div class="grid" id="g"></div><div class="mut" id="out"></div>
<div class="mut" style="font-size:11px;opacity:.5">status v0.1.0-sessions直发</div>`;var m_=document.querySelector("#g"),OE=document.querySelector("#out"),bS="",c_=null,qS=async(_)=>{let E=await wS(X_,_),O=JSON.stringify([E.snippets,E.commands]);if(O===bS)return;bS=O;let{snippets:C,commands:D}=E;m_.innerHTML="";for(let k of h_([...D,...C])){let Y=document.createElement("button"),B=xS(k.label);Y.style.borderColor=B,Y.style.background=`color-mix(in srgb, ${B} 16%, transparent)`,Y.textContent=k.label,Y.title=k.text.length>200?k.text.slice(0,200):k.text,Y.onclick=()=>void HS(X_,k.label,k.text,(h)=>{OE.textContent=h},c_),m_.appendChild(Y)}if(m_.children.length===0)m_.innerHTML='<span class="mut">暂无快捷</span>';let I=Math.ceil(D_.getBoundingClientRect().height);X_.setHeight(I).catch(()=>{return})};new ResizeObserver(()=>{let _=Math.ceil(D_.getBoundingClientRect().height);X_.setHeight(_).catch(()=>{return})}).observe(D_);setInterval(()=>{if(!document.hidden)qS(c_)},30000);X_.onReady((_)=>{WT(_,document.documentElement),c_=_.directory??null,qS(c_)});})();
