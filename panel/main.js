(()=>{var D="openchamber.sdk",X=1;var v_=`
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
`;function cT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let U=new WeakMap;_.addEventListener("scroll",(N)=>{let I=N.target===_?E:N.target;if(!(I instanceof Element))return;if(!I.hasAttribute("data-oc-scrolling"))I.setAttribute("data-oc-scrolling","");let k=U.get(I);if(k!==void 0)clearTimeout(k);U.set(I,setTimeout(()=>{U.delete(I),I.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var xS=`(${cT.toString()})(document);`;var u_=128,l_=65536;var $_=128;var L_=65536;var uT=/^[a-z][a-z0-9-]{0,39}$/;var dT=(_)=>Object(_)===_&&!Array.isArray(_),n_=(_,E)=>Object.keys(_).every((U)=>E.includes(U)),pT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,vT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,lT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let U of _){if(!dT(U)||!uT.test(U.id)||!pT(U.label))return!1;if(U.disabled!==void 0&&U.disabled!==!0&&U.disabled!==!1)return!1;if(E.has(U.id))return!1;if(E.add(U.id),U.kind==="button"){if(!n_(U,["kind","id","label","disabled"]))return!1;continue}if(U.kind!=="select"||!n_(U,["kind","id","label","value","options","disabled"]))return!1;if(!vT(U.value)||!Array.isArray(U.options)||U.options.length<1||U.options.length>16)return!1;let N=new Set;for(let I of U.options){if(!dT(I)||!n_(I,["value","label"])||!vT(I.value)||!pT(I.label)||N.has(I.value))return!1;N.add(I.value)}if(!N.has(U.value))return!1}return!0};var nT=["{id}","{segment}","{segments+}"];var DE=new Set(nT);var aT=["turn-finished","turn-failed","permission-asked","question-asked"];var IE=new Set(aT);var Y_=20000000,f_=256;var a_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,oT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let U=0;U<_.bytes.byteLength;U+=1)if(_.bytes[U]!==E.bytes[U])return!1;return!0};var iT=/^[A-Za-z0-9_-]{1,80}$/;var rT=["left","right","top","bottom"];var sT=(_,E=0,U={remaining:16000})=>{if(--U.remaining<0||E>=32)return!1;if(_===null)return!0;let N=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let I of N)if(!sT(I,E+1,U))return!1;return!0},o_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(o_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(o_)}return String(_)===_||Number.isFinite(_)},i_=(_)=>{try{if(String(_.id)!==_.id||!iT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!rT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!sT(_.data)||!o_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var eT=["file","directory","other","missing"],s_=(_)=>Boolean(_&&"sessionId"in _),t_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var _S=/^[0-9a-f]{7,64}$/i,e_=(_)=>_S.test(_),Q_=500,Z_=32000,TS=16000,SS=128,ES=200,OS=2000,US=16000,AS=80,MS=200,RS=16000;var CS=2000;var _T=20000,k_=1024,z_=2000000;var F_=64000,J_=8000,TT=4000;var ST=960000;var GS=999,DS=1e4,C_=500,XS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],IS=["stopped","starting","ready","failed"],qS=new Set(XS),VS=(_)=>qS.has(_),NS=(_)=>_&&VS(_)?_:"HOST_REJECTED",i=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(i);if(Object(_)===_)return Object.values(_).every(i);return!1},WS=(_)=>i(_)&&JSON.stringify(_).length<=RS,tT=(_)=>_?.trim().slice(0,MS)??"",r=(_)=>{let E=_.id.trim().slice(0,SS),U=_.title.trim().slice(0,ES),N=_.url.trim().slice(0,OS),I=_.text?.trim().slice(0,US),k=_.author?.trim().slice(0,AS),m=_.kind==="pull"?"pull":"issue",H={providerId:_.providerId.trim(),id:E,title:U||E,url:N,kind:m};if(I)H.text=I;if(k)H.author=k;if(m==="pull"){let c=tT(_.branches?.head),d=tT(_.branches?.base);if(c&&d)H.branches={head:c,base:d}}if(WS(_.data))H.data=_.data;return H},ET=(_)=>{let E=r(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},OT=(_)=>{let E={text:_.text.trim().slice(0,TS)};if(_.send)E.send=!0;return E},UT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(GS,Math.max(0,Math.round(_)))},AT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(DS,Math.max(0,Math.ceil(_)))};var s=(_)=>_.length>0&&_.length<=k_&&!_.includes("\x00")&&!_.includes("\\");var B_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>CS)return!1;return!_.split("/").some((U)=>U==="."||U==="..")},yS=new Set(IS),MT=(_)=>Boolean(_&&"status"in _&&yS.has(String(_.status))&&!("body"in _)),K_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),RT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),CT=(_)=>Boolean(_&&"written"in _&&_.written===!0),GT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),hS=new Set(eT),DT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&hS.has(String(_.kind))&&Number.isFinite(_.size)),XT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),gS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),mS=(_)=>Object(_)===_?_:null,r_=(_)=>String(_)===_&&_.length>0,cS=(_)=>{if(!r_(_.id))return null;if(_.ok===!0){let E={channel:D,v:X,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&r_(_.error))return{channel:D,v:X,type:"result",id:_.id,ok:!1,error:_.error,code:NS(r_(_.code)?_.code:void 0)};return null},IT=(_)=>{let E=mS(_);if(!E||E.channel!==D||E.v!==X)return null;if(E.type==="result")return cS(E);if(!gS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var PS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),dS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var $S=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),j_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${k_} characters without NUL or backslash.`)),w_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},VT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let U=_.acceptSource??((T)=>T===E.parent),N=_.requestTimeoutMs??_T,I=new Set,k=new Set,m=new Set,H=new Set,c=new Set,d=new Set,S_=new Set,D_=new Set,X_=new Set,l=new Set,g_=[],E_=null,O_=null,I_=new Set,V_=new Set,U_=null,A_=null,m_=!1,n=new Map,a=new Map,o=new Map,b=!1,C={value:0},R=null,q=null,M_=!1,R_=!1,BT=null,KT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},j=(T)=>{E.parent.postMessage(T,"*")},jT=()=>{if(b||E.parent===E||l.size===0||R?.features?.lateGenerateResults!==!0)return;j({channel:D,v:X,type:"generate-late-listen"})},Y=(T,S)=>{for(let O of T)try{O(S)}catch(A){console.error(A)}},wT=(T)=>{if(!(T instanceof MessageEvent))return;if(!U(T.source))return;let S=IT(T.data);if(!S)return;if(S.type==="workspace"){let A=a.get(S.payload.subscriptionId);if(A)Y([A],S.payload.snapshot);return}if(S.type==="shells"){let A=o.get(S.payload.subscriptionId);if(A)Y([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,q=KT(S.payload.session),Y(I,S.payload),Y(k,S.payload.directory),Y(m,S.payload.session),q)Y(H,q);Y(c,S.payload.connection),Y(d,S.payload.settings),Y(S_,S.payload.item),jT();return}if(S.type==="generate-late"){if(l.size===0)g_.push(S.payload);else Y(l,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};Y(k,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)q=null;else if(q?.sessionId!==S.payload.session.id)q=KT(S.payload.session);Y(m,S.payload.session);return}if(S.type==="session-lifecycle"){q=S.payload,Y(H,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};Y(c,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};Y(d,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};Y(S_,S.payload.item);return}if(S.type==="status-control-event"){Y(D_,S.payload);return}if(S.type==="popover-closed"){Y(X_,S.payload);return}if(S.type==="action"){let A=(V)=>{if(!b)j({channel:D,v:X,type:"action-result",id:S.id,payload:V})},W=O_;if(!W){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(S.payload)).then(()=>A({ok:!0}),(V)=>{let Z=(V instanceof Error?V.message:String(V)).trim();A({ok:!1,error:(Z||"Action failed.").slice(0,C_)})});return}if(S.type==="file-open"){let A=S.payload;if(A_&&oT(A_,A))return;A_=A,Y(I_,S.payload);return}if(S.type==="file-saved"){Y(V_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(Z)=>{if(!b)j({channel:D,v:X,type:"file-snapshot-result",id:S.id,payload:Z})},W=(Z)=>A({error:(Z.trim()||"Could not read the edited file.").slice(0,C_)}),V=U_;if(!V){W("This extension does not edit files.");return}Promise.resolve().then(()=>V(S.payload.purpose)).then((Z)=>{if(a_(Z)>Y_){W(`The file is over ${Y_} ${"bytes"in Z?"bytes":"characters"}.`);return}if(Z.version.length>f_){W(`The snapshot version is over ${f_} characters.`);return}A({snapshot:"bytes"in Z?{bytes:Z.bytes,version:Z.version}:{content:Z.content,version:Z.version}})},(Z)=>W(Z instanceof Error?Z.message:String(Z)));return}if(S.type==="resolve"){let A=(V)=>{j({channel:D,v:X,type:"resolve-result",id:S.id,payload:V})},W=E_;if(!W){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(S.payload)).then((V)=>A({item:V?r(V):null}),(V)=>{let Z=(V instanceof Error?V.message:String(V)).trim();A({error:(Z||"Command failed.").slice(0,C_)})});return}let O=n.get(S.id);if(!O)return;if(clearTimeout(O.timer),n.delete(S.id),S.ok){O.resolve(S.payload);return}O.reject(new M(S.code,S.error))};E.addEventListener("message",wT),j({channel:D,v:X,type:"hello"});let z=(T,S=N)=>{if(b||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((O,A)=>{let W=setTimeout(()=>{n.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);n.set(T.id,{resolve:O,reject:A,timer:W}),j(T)})},f=(T)=>z(T).then(()=>{return}),Q={channel:D,v:X},c_=(T)=>{if(!b&&E.parent!==E)j(T)},HT=()=>c_({...Q,type:"file-save"}),xT=(T)=>{if(!PS(T)||!dS(T))return;T.preventDefault(),HT()},bT=(T)=>{if(!PS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),gT(R.popover.id,"escape").catch(()=>{return})},N_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=M_||R_;if(BT===S)return;BT=S,mT(T.id,S).catch(()=>{return})},W_=()=>{if(R?.surface!=="popover"||M_)return;M_=!0,N_()},qT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!M_)return;M_=!1,N_()},yT=()=>{if(R?.surface!=="popover"||R_)return;R_=!0,N_()},hT=()=>{if(R?.surface!=="popover"||!R_)return;R_=!1,N_()},x=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},d_=async(T)=>{if(T.kind!=="projects")x(T.projectId);let S=await z({...Q,type:"workspace-read",id:G(C),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},p_=async(T,S)=>{if(T.kind!=="projects")x(T.projectId);let O=G(C);a.set(O,S);try{await f({...Q,type:"workspace-subscribe",id:G(C),payload:{subscriptionId:O,query:T}})}catch(A){if(a.delete(O),!b)j({...Q,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:O}});throw A}return()=>{if(!a.delete(O)||b)return;j({...Q,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:O}})}},HS=async(T,S)=>{if(T.kind==="session")x(T.sessionId);if(T.kind==="project")x(T.projectId);let O=G(C);o.set(O,S);try{await f({...Q,type:"shells-subscribe",id:G(C),payload:{subscriptionId:O,scope:T}})}catch(A){if(o.delete(O),!b)j({...Q,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:O}});throw A}return()=>{if(!o.delete(O)||b)return;j({...Q,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:O}})}},P_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>u_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!i(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>l_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await z({...Q,type:"storage",id:G(C),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},gT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):f({...Q,type:"popover-close",id:G(C),payload:S?{id:T,reason:S}:{id:T}}),mT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):f({...Q,type:"popover-anchor",id:G(C),payload:{id:T,active:S}});return E.addEventListener("keydown",bT,!0),E.addEventListener("pointerover",W_),E.addEventListener("pointermove",W_),E.addEventListener("pointerout",qT),E.addEventListener("focus",yT),E.addEventListener("blur",hT),{onAction:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},listProjects:async()=>{let T=await d_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await d_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await d_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>p_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>p_({kind:"worktrees",projectId:T},(O)=>{if(O.kind==="worktrees")S(O)}),onSessions:(T,S)=>p_({kind:"sessions",projectId:T},(O)=>{if(O.kind==="sessions")S(O)}),onRunningShells:(T,S)=>HS(T,S),readShellOutput:async(T,S)=>{x(T,$_);let O=S?.cursor;if(O!==void 0&&(!Number.isInteger(O)||O<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>L_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${L_}.`);let V=await z({...Q,type:"shell-output",id:G(C),payload:{shellId:T,cursor:O,tailBytes:A}});if(!V||typeof V.output!=="string"||!Number.isFinite(V.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return V},stopShell:async(T)=>{if(x(T,$_),(await z({...Q,type:"shell-stop",id:G(C),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{x(T),await f({...Q,type:"open-session",id:G(C),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let O=w_(S),A={op:"get",key:T};if(O)A.scope=O;let W=await P_(A);return W.op==="get"&&W.found?W.value:void 0},set:async(T,S,O)=>{let A=w_(O),W={op:"set",key:T,value:S};if(A)W.scope=A;await P_(W)},delete:async(T,S)=>{let O=w_(S),A={op:"delete",key:T};if(O)A.scope=O;await P_(A)},keys:async(T)=>{let S=w_(T),O={op:"keys"};if(S)O.scope=S;let A=await P_(O);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(I.add(T),R)T(R);return()=>{I.delete(T)}},onDirectory:(T)=>{if(k.add(T),R)T(R.directory);return()=>{k.delete(T)}},onSession:(T)=>{if(m.add(T),R)T(R.session);return()=>{m.delete(T)}},onSessionLifecycle:(T)=>{if(H.add(T),q)T(q);return()=>{H.delete(T)}},onConnection:(T)=>{if(c.add(T),R)T(R.connection);return()=>{c.delete(T)}},onSettings:(T)=>{if(d.add(T),R)T(R.settings);return()=>{d.delete(T)}},onItem:(T)=>{if(S_.add(T),R)T(R.item);return()=>{S_.delete(T)}},onStatusControl:(T)=>{return D_.add(T),()=>{D_.delete(T)}},onPopoverClosed:(T)=>{return X_.add(T),()=>{X_.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!lT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return f({...Q,type:"status-controls",id:G(C),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!i_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return f({...Q,type:"popover-open",id:G(C),payload:T})},closePopover:gT,setPopoverAnchorActive:mT,onResolve:(T)=>{return E_=T,()=>{if(E_===T)E_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>Q_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${Q_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>Z_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${Z_} characters.`));return f({channel:D,v:X,type:"toast",id:G(C),payload:{...T,message:S}})},openUrl:(T)=>f({channel:D,v:X,type:"open-url",id:G(C),payload:{url:T}}),openCommit:(T)=>e_(T)?f({channel:D,v:X,type:"open-commit",id:G(C),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>f({channel:D,v:X,type:"open-surface",id:G(C),payload:{surfaceId:T}}),writeClipboard:(T)=>f({channel:D,v:X,type:"clipboard-write",id:G(C),payload:{text:T}}),compose:(T)=>f({channel:D,v:X,type:"compose",id:G(C),payload:T}),attach:(T)=>f({channel:D,v:X,type:"attach",id:G(C),payload:r(T)}),startSession:async(T)=>{if(T.projectId!==void 0)x(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")x(S.directory);else{if(S.name!==void 0)x(S.name,200);if(S.baseBranch!==void 0)x(S.baseBranch,200)}let O=await z({channel:D,v:X,type:"start-session",id:G(C),payload:ET(T)},_.requestTimeoutMs??180000);if(!s_(O))throw new M("HOST_REJECTED","Host did not return a session.");return O},prompt:(T)=>z({channel:D,v:X,type:"prompt",id:G(C),payload:OT(T)}).then((S)=>{if(!t_(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>f({channel:D,v:X,type:"session-link",id:G(C),payload:r(T)}),close:()=>f({channel:D,v:X,type:"close",id:G(C)}),oauthStart:()=>f({channel:D,v:X,type:"oauth-start",id:G(C)}),oauthDisconnect:()=>f({channel:D,v:X,type:"oauth-disconnect",id:G(C)}),request:(T)=>(B_(T.path)?z({channel:D,v:X,type:"request",id:G(C),payload:T}):$S()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(B_(T.path)?z({channel:D,v:X,type:"service-request",id:G(C),payload:T}):$S()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>z({channel:D,v:X,type:"service-status",id:G(C)}).then((T)=>{if(!MT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(s(T)?z({channel:D,v:X,type:"file-read",id:G(C),payload:{path:T}}):j_()).then((S)=>{if(!RT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!s(T))return j_();if(S.length>z_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${z_} characters.`));return z({channel:D,v:X,type:"file-write",id:G(C),payload:{path:T,content:S}}).then((O)=>{if(!CT(O))throw new M("HOST_REJECTED","Host did not confirm the write.");return O})},listDir:(T)=>(s(T)?z({channel:D,v:X,type:"file-list",id:G(C),payload:{path:T}}):j_()).then((S)=>{if(!GT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(s(T)?z({channel:D,v:X,type:"file-stat",id:G(C),payload:{path:T}}):j_()).then((S)=>{if(!DT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),O=T.system?.trim();if(S.length===0||S.length>F_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${F_} characters.`));if(O!==void 0&&(O.length===0||O.length>J_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${J_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(TT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:S};if(O!==void 0)W.system=O;if(A!==void 0)W.maxOutputTokens=A;return z({channel:D,v:X,type:"generate",id:G(C),payload:W},_.requestTimeoutMs??ST).then((V)=>{if(!XT(V))throw new M("HOST_REJECTED","Host did not return generated text.");return V})},onLateGenerateResult:(T)=>{l.add(T);for(let S of g_.splice(0))Y([T],S);return jT(),()=>{l.delete(T)}},setBadge:(T)=>f({channel:D,v:X,type:"badge",id:G(C),payload:{count:UT(T)}}),setHeight:(T)=>f({channel:D,v:X,type:"resize",id:G(C),payload:{height:AT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!m_)m_=!0,E.addEventListener("keydown",xT,!0);if(A_)T(A_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},onFileSaved:(T)=>{return V_.add(T),()=>{V_.delete(T)}},reportFileChange:(T)=>c_({...Q,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:HT,reportFileUnsupported:()=>c_({...Q,type:"file-unsupported"}),dispose:()=>{for(let T of a.keys())j({...Q,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:T}});a.clear();for(let T of o.keys())j({...Q,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:T}});if(o.clear(),b=!0,E_=null,O_=null,U_=null,I_.clear(),V_.clear(),m_)E.removeEventListener("keydown",xT,!0);E.removeEventListener("message",wT),E.removeEventListener("keydown",bT,!0),E.removeEventListener("pointerover",W_),E.removeEventListener("pointermove",W_),E.removeEventListener("pointerout",qT),E.removeEventListener("focus",yT),E.removeEventListener("blur",hT);for(let T of n.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));n.clear(),I.clear(),k.clear(),m.clear(),H.clear(),c.clear(),d.clear(),S_.clear(),D_.clear(),X_.clear(),l.clear(),g_.length=0}}};var LS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var JE=new Set(LS);var YS=["none","agent","user"];var KE=new Set(YS);var pS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],vS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],fS=(_,E)=>{E.style.colorScheme=_.mode;for(let[U,N]of pS)E.style.setProperty(U,_.tokens[N]);for(let[U,N,I]of vS){let k=_.tokens[I]??"";E.style.setProperty(U,k),E.style.setProperty(N,k)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},NT=(_,E)=>{if(fS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var uS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(_,E)=>`var(--${_}, var(--oc-${uS[_]}, ${E}))`,h=P("surface-background","transparent"),x_=P("surface-elevated","transparent"),t=P("surface-elevated-foreground","inherit"),w=P("surface-foreground","inherit"),$=P("surface-muted-foreground","gray"),lS=P("surface-muted","transparent"),v=P("interactive-border","currentColor"),J=P("interactive-hover","transparent"),u=P("interactive-active","transparent"),WT=P("interactive-selection","transparent"),PT=P("interactive-selection-foreground","inherit"),y=P("primary","currentColor"),$T=P("primary-text","inherit"),LT=P("error-text","inherit"),nS=P("font-sans","inherit"),YT=P("font-mono","monospace"),zS=P("radius","9px"),fT=`calc(${zS} - 2px)`,QS=`calc(${zS} - 4px)`,L=(_,E,U="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${U})`,ZS=`background-image: linear-gradient(${J}, ${J});`,QT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,ZT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",kS="box-shadow: var(--oc-sdk-lit);",kT=`inset 0 0.5px 0 0 ${L(w,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,aS=`
:root {
  --oc-sdk-edge: ${L(w,16)};
  --oc-sdk-field-bg: ${x_};
  --oc-sdk-raised-bg: ${h};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${L(w,14)};
  --oc-sdk-field-bg: ${L(h,50,x_)};
  --oc-sdk-raised-bg: ${x_};
  --oc-sdk-field-lift: ${kT};
  --oc-sdk-raised-lift: ${kT};
  --oc-sdk-lit: ${kT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,H_=(_)=>{let E=P(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${P(`${_}-text`,"inherit")}; }`},oS=`
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
`,FS=`${aS}
.oc-sdk { color: ${w}; font-family: ${nS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ZS} }
.oc-sdk-mono { font-family: ${YT}; }
.oc-sdk-muted { color: ${$}; }
${H_("success")}${H_("warning")}${H_("error")}${H_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${y}; --oc-sdk-tone-text: ${$T}; }

.oc-sdk-btn { border-radius: ${fT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${QS}; }
.oc-sdk-btn[data-variant="default"] { color: ${$T}; background: ${L(y,10,h)}; border-color: ${L(y,12)}; ${kS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(y,16,h)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(y,22,h)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${lS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${u}, ${u}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${t}; ${ZT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${u}, ${u}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${J}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${u}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${LT}; background: ${L("var(--oc-sdk-tone)",7,h)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${kS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,h)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,h)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${LT}; }
.oc-sdk-input { border-radius: ${fT}; background: var(--oc-sdk-field-bg); color: ${t}; ${QT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${QT(L(w,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${QT(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${YT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${y}; }
.oc-sdk-search-clear { border-radius: ${QS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${J}; color: ${w}; }

.oc-sdk-trigger { border-radius: ${fT}; background: var(--oc-sdk-raised-bg); color: ${t}; ${ZT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${u}, ${u}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${t}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${x_}; background-clip: padding-box; color: ${t}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${J}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${WT}; color: ${PT}; }
.oc-sdk-option-check { color: ${w}; }
.oc-sdk-option[data-destructive="true"] { color: ${LT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${L(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${v}; border-radius: 4px; color: ${w}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${L(w,60,v)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${v}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${h}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${y}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ZS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(w,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${w}; }
.oc-sdk-tab[aria-selected="true"] { color: ${PT}; background: ${WT}; border-color: ${v}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${t}; background: var(--oc-sdk-raised-bg); ${ZT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${L(w,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${L("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${J}; }
.oc-sdk-row[aria-selected="true"] { background: ${WT}; color: ${PT}; }
.oc-sdk-row-lead { font-family: ${YT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${v}; border-top-color: ${y}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${L("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${L(v,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${L(w,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${y}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${$T}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${L(v,60)}; }
`,F=`
${v_}
${oS}
${FS}`;var __=VT(),BS=document.querySelector("#root");if(!BS)throw Error("Missing #root");BS.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:14px/1.6 system-ui,sans-serif}
#root{padding:10px;display:flex;flex-direction:column;gap:10px;min-height:100%;max-width:100%;overflow-x:hidden}
h3{margin:4px 0 0;font-size:13px;opacity:.65;font-weight:600}
.grid{display:flex;flex-wrap:wrap;gap:8px}
button{padding:8px 14px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0);font-weight:700}
button:disabled{opacity:.5}
button.danger{padding:4px 8px;font-size:12px}
.row{display:flex;gap:8px;align-items:center}
input{flex:1;min-width:0;padding:7px 9px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit)}
.mut{font-size:13px;opacity:.7}
.err{font-size:13px;color:var(--error,#d33)}
</style>
<h3>常用命令</h3>
<div class="grid" id="preset"></div>
<h3>我的快捷</h3>
<div class="grid" id="custom"></div>
<div class="row">
  <input id="new-label" placeholder="名称，如 发版检查" maxlength="20" />
  <input id="new-text" placeholder="发送内容，如 /ci" maxlength="500" />
  <button id="btn-add" title="添加快捷按钮">＋</button>
</div>
<div class="mut" id="out">点按钮直接发到当前会话</div>
`;var p=(_)=>document.querySelector(`#${_}`),JS=p("preset"),FT=p("custom"),T_=p("out"),eS=[{label:"/news",text:"/news"},{label:"/ci",text:"/ci"},{label:"/cd",text:"/cd"},{label:"/tag",text:"/tag"}],KS=async()=>{try{let _=await __.storage.get("shortcuts");if(Array.isArray(_))return _.filter((E)=>typeof E==="object"&&E!==null&&typeof E.label==="string"&&typeof E.text==="string").slice(0,30)}catch{}return[]},jS=(_)=>{__.storage.set("shortcuts",JSON.parse(JSON.stringify(_))).catch(()=>{return})},_E=async(_)=>{try{let E=await __.prompt({text:_,send:!0});if(T_.textContent=E.sent==="sent"?"已提交到会话":`未直接发出（${E.sent}），已填入输入框`,E.sent!=="sent")await __.prompt({text:_}).catch(()=>{return})}catch(E){if(E instanceof M&&(E.code==="NO_SESSION"||E.code==="SESSION_BUSY"))T_.textContent=E.code==="NO_SESSION"?"无会话，已填入输入框":"会话忙已填入输入框稍后发送",await __.prompt({text:_}).catch(()=>{return});else T_.textContent=E instanceof M?`${E.code}`:"发送失败"}},wS=(_)=>{let E=document.createElement("button");return E.className="cmd",E.textContent=_.label,E.title=_.text,E.onclick=()=>void _E(_.text),E},TE=(_)=>{if(FT.innerHTML="",_.length===0){FT.innerHTML='<span class="mut">暂无，下面加一个</span>';return}for(let E of _){let U=document.createElement("span");U.className="row",U.appendChild(wS(E));let N=document.createElement("button");N.className="danger",N.textContent="✕",N.title=`删除 ${E.label}`,N.onclick=()=>{let I=_.filter((k)=>k!==E);jS(I),JT()},U.appendChild(N),FT.appendChild(U)}},JT=async()=>{JS.innerHTML="";for(let _ of eS)JS.appendChild(wS(_));TE(await KS())};p("btn-add").onclick=()=>{let _=p("new-label").value.trim().slice(0,20),E=p("new-text").value.trim().slice(0,500);if(!_||!E){T_.textContent="名称和内容都要填";return}KS().then((U)=>{if(U.length>=30){T_.textContent="最多 30 个";return}let N=[...U,{label:_,text:E}];jS(N),p("new-label").value="",p("new-text").value="",JT()}).catch(()=>{T_.textContent="添加失败"})};__.onReady((_)=>{NT(_,document.documentElement),JT()});})();
